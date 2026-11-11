<?php
/** Langue courante (Polylang) et adresses des pages du site (repérées par les champs _az_page et _az_lang). */

if (!defined('ABSPATH')) exit;

/** Langue de la page affichée, ou de la page en cours de modification dans l'éditeur : 'fr' ou 'en'. */
function az_lang() {
    $lang = '';
    if (function_exists('pll_current_language')) $lang = (string) pll_current_language('slug');
    if ($lang === '' && function_exists('pll_get_post_language')) {
        $id = 0;
        if (!empty($_GET['post_id'])) $id = (int) $_GET['post_id'];                 // aperçu des blocs dans l'éditeur
        elseif (!empty($GLOBALS['post']->ID)) $id = (int) $GLOBALS['post']->ID;
        if ($id) $lang = (string) pll_get_post_language($id, 'slug');
    }
    return $lang === 'en' ? 'en' : 'fr';
}

/** Table « identifiant@langue » → numéro de la page WordPress. */
function az_page_map() {
    static $map = null;
    if ($map === null) {
        $map = [];
        $ids = get_posts(['post_type' => 'page', 'post_status' => ['publish', 'draft', 'private'], 'numberposts' => -1, 'meta_key' => '_az_page', 'fields' => 'ids', 'lang' => '']);
        foreach ($ids as $id) $map[get_post_meta($id, '_az_page', true) . '@' . (get_post_meta($id, '_az_lang', true) ?: 'fr')] = $id;
    }
    return $map;
}

function az_page_meta($id) {
    return az_find(az_data('pages') ?: [], $id);
}

/** Adresse d'une page du site dans une langue (par défaut : la langue courante). */
function az_url($id, $lang = null) {
    $lang = $lang ?: az_lang();
    $map = az_page_map();
    if (isset($map[$id . '@' . $lang])) return get_permalink($map[$id . '@' . $lang]);
    if (isset($map[$id . '@fr'])) return get_permalink($map[$id . '@fr']);
    return home_url('/');
}

// Anciennes adresses du site statique (/a-propos.html, /en/about.html, /en/contact/…) → page correspondante
add_action('template_redirect', function () {
    if (!is_404()) return;
    $path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    $query = (string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_QUERY);
    $slug = null; $lang = 'fr';
    if (preg_match('#/(en/)?([\w-]+)\.html$#', $path, $m)) { $lang = $m[1] ? 'en' : 'fr'; $slug = $m[2] === 'index' ? '' : $m[2]; }
    elseif (preg_match('#^/en/([\w-]+)/?$#', $path, $m)) { $lang = 'en'; $slug = $m[1]; }
    if ($slug === null) return;
    foreach (az_data('pages') ?: [] as $p) {
        if (($p['slug'][$lang] ?? null) === $slug) {
            $url = az_url($p['id'], $lang);
            if (untrailingslashit($url) === untrailingslashit(home_url($path))) return;
            wp_safe_redirect($url . ($query !== '' ? '?' . $query : ''), 301);
            exit;
        }
    }
}, 1);

// Page de confirmation des formulaires : non indexée
add_filter('wp_robots', function ($robots) {
    if (is_page() && get_post_meta(get_queried_object_id(), '_az_page', true) === 'thanks') return ['noindex' => true, 'nofollow' => true];
    return $robots;
});
