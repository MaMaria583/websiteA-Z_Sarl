<?php
/** Réglages WordPress, adresses des pages, langue, redirections et référencement. */

if (!defined('ABSPATH')) exit;

add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    add_image_size('az-xl', 1600, 1600, false);
});

// ---------- Pages du site : identifiant du gabarit + langue (champs _az_page et _az_lang) ----------

/** Table « identifiant@langue » → numéro de la page WordPress. */
function az_page_map() {
    static $map = null;
    if ($map === null) {
        $map = [];
        $ids = get_posts(['post_type' => 'page', 'post_status' => 'publish', 'numberposts' => -1, 'meta_key' => '_az_page', 'fields' => 'ids']);
        foreach ($ids as $id) {
            $map[get_post_meta($id, '_az_page', true) . '@' . (get_post_meta($id, '_az_lang', true) ?: 'fr')] = $id;
        }
    }
    return $map;
}

function az_page_meta($id) {
    return az_find(az_data('pages'), $id);
}

/** Page affichée : [ 'id' => identifiant du gabarit ou null, 'lang' => 'fr' | 'en' ]. */
function az_current() {
    static $cur = null;
    if ($cur === null) {
        $path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
        $home = (string) parse_url(home_url('/'), PHP_URL_PATH);
        $rel = '/' . ltrim(substr($path, strlen(rtrim($home, '/'))), '/');
        $cur = ['id' => null, 'lang' => preg_match('#^/en(/|$)#', $rel) ? 'en' : 'fr'];
        if (is_page()) {
            $id = get_post_meta(get_queried_object_id(), '_az_page', true);
            if ($id && az_page_meta($id)) {
                $cur = ['id' => $id, 'lang' => get_post_meta(get_queried_object_id(), '_az_lang', true) ?: 'fr'];
            }
        } elseif (is_404()) {
            $cur['id'] = 'notfound';
        }
    }
    return $cur;
}

function az_lang() {
    return did_action('wp') ? az_current()['lang'] : 'fr';
}

/** Adresse d'une page du site dans une langue (par défaut : la langue courante). */
function az_url($id, $lang = null) {
    $lang = $lang ?: az_lang();
    $map = az_page_map();
    if (isset($map[$id . '@' . $lang])) return get_permalink($map[$id . '@' . $lang]);
    $meta = az_page_meta($id);
    $slug = $meta ? $meta['slug'][$lang] : '';
    return home_url('/' . ($lang === 'en' ? 'en/' : '') . ($slug !== '' ? $slug . '/' : ''));
}

// ---------- En-tête HTML : on ne garde que l'essentiel de WordPress ----------

add_action('init', function () {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rel_canonical');
    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_site_icon', 99);
    remove_action('wp_head', 'wp_resource_hints', 2);
    remove_action('template_redirect', 'rest_output_link_header', 11);
    remove_action('template_redirect', 'wp_shortlink_header', 11);
});

add_action('wp_enqueue_scripts', function () {
    foreach (['wp-block-library', 'wp-block-library-theme', 'global-styles', 'classic-theme-styles', 'core-block-supports'] as $h) wp_dequeue_style($h);
    wp_dequeue_script('wp-embed');
}, 100);
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
add_filter('wp_img_tag_add_auto_sizes', '__return_false');
add_filter('wp_speculation_rules_configuration', '__return_null');

// Barre d'administration : l'en-tête fixe du site passe dessous
add_action('wp_head', function () {
    if (is_admin_bar_showing()) echo '<style>.site-header{top:32px}@media (max-width:782px){.site-header{top:46px}}</style>' . "\n";
}, 99);

// Pages non indexables (confirmation d'envoi, page introuvable)
add_filter('wp_robots', function ($robots) {
    $cur = az_current();
    $meta = $cur['id'] ? az_page_meta($cur['id']) : null;
    if ($cur['id'] === 'notfound' || ($meta && !empty($meta['noindex']))) {
        return ['noindex' => true, 'nofollow' => true];
    }
    return $robots;
});

// Seul le site officiel est indexable : toute autre adresse (sous-domaine de test, copie locale) demande
// aux moteurs de recherche de ne pas l'indexer, quel que soit le réglage « Visibilité » de WordPress.
function az_is_official_host() {
    return in_array(wp_parse_url(home_url(), PHP_URL_HOST), ['www.azsarl.com', 'azsarl.com'], true);
}
add_filter('pre_option_blog_public', function ($value) {
    return az_is_official_host() ? $value : '0';
});

// Scripts ajoutés au site public par les extensions préinstallées de l'hébergeur : non utilisés
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_script('hostinger-reach-embed');
}, 100);

// ---------- Redirections ----------

add_action('template_redirect', function () {
    if (!is_404()) return;
    $path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    // Anciennes adresses du site statique : /a-propos.html → /a-propos/, /en/index.html → /en/
    if (preg_match('#/(en/)?([\w-]+)\.html$#', $path, $m)) {
        $lang = $m[1] ? 'en' : 'fr';
        $slug = $m[2] === 'index' ? '' : $m[2];
        foreach (az_data('pages') as $p) {
            if ($p['slug'][$lang] === $slug) {
                $query = (string) parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
                wp_safe_redirect(az_url($p['id'], $lang) . ($query !== '' ? '?' . $query : ''), 301);
                exit;
            }
        }
    }
});

// ---------- Plan du site (wp-sitemap.xml) : les pages seulement, sans la page de confirmation ----------

add_filter('wp_sitemaps_add_provider', function ($provider, $name) {
    return $name === 'posts' ? $provider : false;
}, 10, 2);

add_filter('wp_sitemaps_post_types', function ($types) {
    return isset($types['page']) ? ['page' => $types['page']] : [];
});

add_filter('wp_sitemaps_posts_query_args', function ($args) {
    $exclude = [];
    foreach (az_data('pages') as $p) {
        if (empty($p['noindex'])) continue;
        foreach (['fr', 'en'] as $lang) {
            $id = az_page_map()[$p['id'] . '@' . $lang] ?? 0;
            if ($id) $exclude[] = $id;
        }
    }
    if ($exclude) $args['post__not_in'] = $exclude;
    return $args;
});

// ---------- Divers ----------

// Les fiches (réalisations, références, partenaires) n'ont pas de page publique propre
add_filter('redirect_canonical', function ($url) {
    return is_404() ? false : $url;
});
