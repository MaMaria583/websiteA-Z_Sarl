<?php
/**
 * Mise en place à l'activation du thème : pages du site (FR à la racine, EN sous /en/), page d'accueil,
 * adresses lisibles, et import des contenus de départ (data/seed.json) dans l'administration.
 * Rien n'est écrasé : une page ou un type de contenu déjà présent est laissé tel quel.
 */

if (!defined('ABSPATH')) exit;

add_action('after_switch_theme', 'az_install');

// Filet de sécurité : si l'activation a eu lieu sans passer par l'écran des thèmes (outil en ligne de commande…)
add_action('admin_init', function () {
    if (get_option('az_installed') !== wp_get_theme()->get('Version')) az_install();
});

function az_install() {
    az_install_pages();
    az_install_content();

    if (get_option('permalink_structure') !== '/%postname%/') {
        global $wp_rewrite;
        $wp_rewrite->set_permalink_structure('/%postname%/');
    }
    flush_rewrite_rules();

    update_option('blogname', az_data('name'));
    update_option('blogdescription', az_plain(az_L(az_data('tagline'), 'fr')));
    update_option('az_installed', wp_get_theme()->get('Version'));
}

function az_install_pages() {
    $note = "<!-- wp:paragraph -->\n<p>La mise en page et les textes de cette page sont fournis par le thème A-Z Sarl. Les réalisations, références, partenaires et coordonnées se modifient dans les menus du même nom de l’administration.</p>\n<!-- /wp:paragraph -->";
    $existing = [];
    foreach (get_posts(['post_type' => 'page', 'post_status' => 'any', 'numberposts' => -1, 'meta_key' => '_az_page', 'fields' => 'ids']) as $id) {
        $existing[get_post_meta($id, '_az_page', true) . '@' . get_post_meta($id, '_az_lang', true)] = $id;
    }

    $pages = az_data('pages');
    // L'accueil en premier : la page d'accueil anglaise (/en/) est la page parente des pages anglaises
    usort($pages, function ($a, $b) { return ($b['id'] === 'home') <=> ($a['id'] === 'home'); });
    $order = 0;
    foreach (['fr', 'en'] as $lang) {
        foreach ($pages as $p) {
            $key = $p['id'] . '@' . $lang;
            $order++;
            if (isset($existing[$key])) continue;
            $is_home = $p['id'] === 'home';
            $id = wp_insert_post(wp_slash([
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_title' => ($lang === 'en' ? 'EN — ' : '') . ($is_home ? ($lang === 'en' ? 'Home' : 'Accueil') : $p['title'][$lang]),
                'post_name' => $is_home ? ($lang === 'en' ? 'en' : 'accueil') : $p['slug'][$lang],
                'post_parent' => $lang === 'en' && !$is_home ? (int) ($existing['home@en'] ?? 0) : 0,
                'post_content' => $note,
                'menu_order' => $order,
                'comment_status' => 'closed',
                'ping_status' => 'closed',
            ]));
            if ($id && !is_wp_error($id)) {
                update_post_meta($id, '_az_page', $p['id']);
                update_post_meta($id, '_az_lang', $lang);
                $existing[$key] = $id;
            }
        }
    }

    if (!empty($existing['home@fr'])) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', (int) $existing['home@fr']);
    }

    // Contenus d'exemple d'une installation neuve de WordPress : à la corbeille (récupérables)
    foreach (['hello-world', 'bonjour-tout-le-monde', 'sample-page', 'page-d-exemple'] as $slug) {
        foreach (get_posts(['name' => $slug, 'post_type' => ['post', 'page'], 'post_status' => 'publish', 'numberposts' => 1]) as $sample) {
            if (!get_post_meta($sample->ID, '_az_page', true)) wp_trash_post($sample->ID);
        }
    }
}

function az_install_content() {
    $seed = az_json('seed');
    if (get_option('az_options') === false && !empty($seed['options'])) add_option('az_options', $seed['options']);

    foreach (['partner' => 'partners', 'project' => 'projects', 'reference' => 'references'] as $type => $key) {
        $count = array_sum((array) wp_count_posts('az_' . $type));
        if ($count > 0 || empty($seed[$key])) continue;
        foreach ($seed[$key] as $i => $item) {
            $slug = $item['id'];
            unset($item['id']);
            $title = $type === 'partner' ? $item['acronym'] : wp_strip_all_tags($item['title']['fr']);
            if (isset($item['year'])) $item['year'] = (string) $item['year'];
            $id = wp_insert_post(wp_slash([
                'post_type' => 'az_' . $type,
                'post_status' => 'publish',
                'post_title' => $title,
                'post_name' => $slug,
                'menu_order' => ($i + 1) * 10,
            ]));
            if ($id && !is_wp_error($id)) update_post_meta($id, '_az_data', wp_slash($item));
        }
    }
}
