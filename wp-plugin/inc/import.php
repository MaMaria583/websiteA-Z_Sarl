<?php
/**
 * Outils d'installation (appelés une seule fois lors de la mise en place du site) :
 * - az_install_content() : fiches et coordonnées de départ (data/seed.json) si elles n'existent pas encore ;
 * - az_import_media($dir) : photos du site d'origine copiées dans la médiathèque, réalisations reliées aux images.
 */

if (!defined('ABSPATH')) exit;

function az_install_content() {
    $seed = az_json('seed');
    if (get_option('az_options') === false && !empty($seed['options'])) add_option('az_options', $seed['options']);
    $done = [];
    foreach (['partner' => 'partners', 'project' => 'projects', 'reference' => 'references'] as $type => $key) {
        $count = array_sum((array) wp_count_posts('az_' . $type));
        if ($count > 0 || empty($seed[$key])) { $done[$type] = $count; continue; }
        foreach ($seed[$key] as $i => $item) {
            $slug = $item['id'];
            unset($item['id']);
            $title = $type === 'partner' ? $item['acronym'] : wp_strip_all_tags($item['title']['fr']);
            if (isset($item['year'])) $item['year'] = (string) $item['year'];
            $id = wp_insert_post(wp_slash(['post_type' => 'az_' . $type, 'post_status' => 'publish', 'post_title' => $title, 'post_name' => $slug, 'menu_order' => ($i + 1) * 10]));
            if ($id && !is_wp_error($id)) update_post_meta($id, '_az_data', wp_slash($item));
        }
        $done[$type] = count($seed[$key]);
    }
    return $done;
}

/** Copie un fichier dans la médiathèque (une seule fois : retrouvé ensuite par son nom d'origine). */
function az_media_from_file($file, $title, $alt = '') {
    $existing = get_posts(['post_type' => 'attachment', 'post_status' => 'inherit', 'numberposts' => 1, 'fields' => 'ids', 'meta_key' => '_az_source', 'meta_value' => basename($file)]);
    if ($existing) return (int) $existing[0];
    if (!is_file($file)) return 0;
    require_once ABSPATH . 'wp-admin/includes/image.php';
    $upload = wp_upload_bits(basename($file), null, file_get_contents($file));
    if (!empty($upload['error'])) return 0;
    $type = wp_check_filetype($upload['file']);
    $id = wp_insert_attachment(['post_mime_type' => $type['type'] ?: 'image/svg+xml', 'post_title' => $title, 'post_status' => 'inherit'], $upload['file']);
    if (!$id || is_wp_error($id)) return 0;
    if (strpos((string) $type['type'], 'svg') === false) wp_update_attachment_metadata($id, wp_generate_attachment_metadata($id, $upload['file']));
    update_post_meta($id, '_az_source', basename($file));
    if ($alt !== '') update_post_meta($id, '_wp_attachment_image_alt', $alt);
    return (int) $id;
}

/**
 * Photos (plus grande taille JPEG) et logos des partenaires → médiathèque ; fiches mises à jour pour utiliser
 * ces images. $dir : dossier assets/img du site d'origine. Renvoie la table nom → numéro d'image.
 */
function az_import_media($dir) {
    @set_time_limit(600);
    $map = get_option('az_media_map', []);
    if (!is_array($map)) $map = [];
    foreach (az_json('photos') as $name => $m) {
        if (!empty($map[$name])) continue;
        $file = rtrim($dir, '/') . "/photos/$name-" . end($m['widths']) . '.jpg';
        $id = az_media_from_file($file, ucfirst(str_replace('-', ' ', $name)));
        if ($id) $map[$name] = $id;
    }
    update_option('az_media_map', $map, false);

    // Réalisations : photos du thème → images de la médiathèque (avec leur description)
    foreach (get_posts(['post_type' => 'az_project', 'post_status' => 'any', 'numberposts' => -1]) as $p) {
        $d = get_post_meta($p->ID, '_az_data', true);
        if (!is_array($d) || empty($d['photos'])) continue;
        $changed = false;
        foreach ($d['photos'] as &$ph) {
            if (empty($ph['att']) && !empty($ph['id']) && !empty($map[$ph['id']])) {
                $ph = ['att' => (int) $map[$ph['id']]] + $ph;
                unset($ph['id']);
                if (!empty($ph['alt']['fr'])) update_post_meta((int) $ph['att'], '_wp_attachment_image_alt', $ph['alt']['fr']);
                $changed = true;
            }
        }
        unset($ph);
        if ($changed) update_post_meta($p->ID, '_az_data', wp_slash($d));
    }

    // Logos des partenaires : restent fournis par l'extension (assets/img/partners) ; remplaçables dans chaque fiche
    return $map;
}
