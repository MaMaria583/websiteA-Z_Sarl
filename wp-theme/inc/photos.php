<?php
/**
 * Menu « Photos du site » : chaque photo fournie avec le thème (accueil, Le Bureau, pôles, galeries, réalisations
 * de départ) peut être remplacée par une image de la médiathèque, puis rétablie. Option az_photos : nom → image.
 * Affichage : az_photo_att() dans inc/components.php.
 */

if (!defined('ABSPATH')) exit;

add_action('admin_menu', function () {
    add_menu_page('Photos du site', 'Photos du site', 'edit_pages', 'az-photos', 'az_render_photos', 'dashicons-format-gallery', 21);
});

add_action('admin_enqueue_scripts', function () {
    $screen = get_current_screen();
    if (!$screen || strpos((string) $screen->id, 'az-photos') === false) return;
    wp_enqueue_media();
    wp_enqueue_style('az-admin', AZ_URI . '/admin/admin.css', [], filemtime(AZ_DIR . '/admin/admin.css'));
    wp_enqueue_script('az-photos', AZ_URI . '/admin/photos.js', ['jquery'], filemtime(AZ_DIR . '/admin/photos.js'), true);
});

/** Nom lisible d'une photo du thème : « camp-groupe-banniere » → « Camp groupe banniere ». */
function az_photo_label($name) {
    return ucfirst(str_replace('-', ' ', $name));
}

function az_render_photos() {
    if (!current_user_can('edit_pages')) return;
    $photos = az_json('photos');
    $saved = get_option('az_photos', []);
    if (!is_array($saved)) $saved = [];
    $notice = '';

    if (isset($_POST['az_photos_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['az_photos_nonce'])), 'az_photos')) {
        $posted = (array) wp_unslash($_POST['az_photo'] ?? []);
        foreach ($photos as $name => $m) {
            $field = 'p' . md5($name);
            if (!array_key_exists($field, $posted)) continue;
            $id = (int) $posted[$field];
            if ($id && wp_attachment_is_image($id)) $saved[$name] = $id;
            else unset($saved[$name]);
        }
        update_option('az_photos', $saved, true);
        do_action('litespeed_purge_all');
        $notice = '<div class="notice notice-success is-dismissible"><p>Photos enregistrées : elles sont en ligne. Si une page affiche encore l’ancienne photo, videz le cache (hPanel → Performance → Vider le cache).</p></div>';
    }

    echo '<div class="wrap az-photos-page"><h1>Photos du site</h1>' . $notice;
    echo '<p>Photos fournies avec le site (accueil, Le Bureau, pôles d’expertise, galeries de la page Réalisations). Pour en changer une, cliquez sur « Remplacer » et choisissez une image de la médiathèque (format paysage, 1 600 px de large environ, moins de 500 Ko), puis enregistrez. Le texte de description de chaque photo se modifie dans « Textes des pages ».</p>';
    echo '<p>Les photos des réalisations ajoutées ou modifiées dans le menu « Réalisations » se gèrent directement dans chaque fiche.</p>';
    echo '<form method="post">';
    wp_nonce_field('az_photos', 'az_photos_nonce');
    submit_button('Enregistrer les photos');
    echo '<ul class="az-photo-grid">';
    foreach ($photos as $name => $m) {
        $field = 'p' . md5($name);
        $id = (int) ($saved[$name] ?? 0);
        $current = $id ? (string) wp_get_attachment_image_url($id, 'medium') : '';
        $small = $m['widths'][0] ?? 480;
        $original = az_asset("img/photos/$name-$small.jpg");
        echo '<li class="az-photo-card' . ($id ? ' is-replaced' : '') . '" data-az-photo data-original="' . esc_url($original) . '">'
            . '<img src="' . esc_url($current ?: $original) . '" alt="" loading="lazy">'
            . '<input type="hidden" name="az_photo[' . $field . ']" value="' . ($id ?: '') . '">'
            . '<span class="az-photo-card__name">' . esc_html(az_photo_label($name)) . '</span>'
            . '<span class="az-photo-card__state">' . ($id ? 'Remplacée' : 'Photo d’origine') . '</span>'
            . '<span class="az-photo-card__actions"><button type="button" class="button" data-az-photo-pick>Remplacer</button> '
            . '<button type="button" class="button-link az-remove" data-az-photo-reset' . ($id ? '' : ' hidden') . '>Rétablir</button></span>'
            . '</li>';
    }
    echo '</ul>';
    submit_button('Enregistrer les photos');
    echo '</form></div>';
}
