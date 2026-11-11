<?php
/** Affichage des pages : corps générés (pages/<langue>/…html), repères [[az:…]], typographie. */

if (!defined('ABSPATH')) exit;

/** Corps d'une page du site, repères remplacés. */
function az_render_page($id, $lang) {
    $file = AZ_DIR . '/pages/' . $lang . '/' . str_replace(':', '-', $id) . '.html';
    if (!is_file($file)) $file = AZ_DIR . '/pages/fr/' . str_replace(':', '-', $id) . '.html';
    return is_file($file) ? az_tokens(file_get_contents($file)) : '';
}

/**
 * Repères posés par le générateur (build-wp.mjs) :
 *   [[az:asset:chemin]]        fichier du dossier assets/ du thème
 *   [[az:url:page]] / [[az:url:page@en]]   adresse d'une page du site
 *   [[az:opt:clé]]             coordonnée (menu « Coordonnées »)
 *   [[az:fig:clé]]             chiffre clé calculé (missions, partners, clients, regions, since)
 *   [[az:c:nom:arguments]]     composant dynamique (inc/components.php)
 */
function az_tokens($html) {
    // Textes modifiables placés dans une balise (attribut alt, aria-label, content…) : texte brut échappé
    $html = preg_replace_callback('/<[^<>]*[[az:t:[^]]+]][^<>]*>/', function ($tag) {
        return preg_replace_callback('/[[az:t:([^]]+)]]/', function ($m) {
            return esc_attr(wp_strip_all_tags(az_text($m[1])));
        }, $tag[0]);
    }, $html);
    // Textes modifiables encodés dans une adresse (message WhatsApp prérempli…)
    $html = preg_replace_callback('/%5B%5Baz%3At%3A([\w.%-]+?)%5D%5D/', function ($m) {
        return rawurlencode(wp_strip_all_tags(az_text(rawurldecode($m[1]))));
    }, $html);
    return preg_replace_callback('/\[\[az:(\w+):([^\]]*)\]\]/', function ($m) {
        $v = $m[2];
        switch ($m[1]) {
            case 'asset':
                return az_asset($v);
            case 'url':
                $parts = explode('@', $v);
                return esc_url(az_url($parts[0], $parts[1] ?? null));
            case 'opt':
                return esc_html(az_opt($v));
            case 't':
                return az_text($v);
            case 'fig':
                return (string) (az_figures()[$v] ?? '');
            case 'c':
                $parts = explode(':', $v, 2);
                $args = json_decode((string) base64_decode(strtr($parts[1] ?? '', '-_', '+/')), true);
                $fn = 'az_c_' . $parts[0];
                return function_exists($fn) ? $fn(is_array($args) ? $args : []) : '';
        }
        return '';
    }, $html);
}

/**
 * Texte modifiable (menu « Textes des pages ») : version enregistrée dans l'administration, sinon texte d'origine.
 * Les repères {missions}, {commanditaires}, {partenaires}, {regions} et {depuis} reçoivent les chiffres clés.
 */
function az_text($key, $lang = null) {
    static $saved = null;
    if ($saved === null) { $saved = get_option('az_texts', []); if (!is_array($saved)) $saved = []; }
    $lang = $lang ?: az_lang();
    $def = az_json('texts')['texts'][$key] ?? null;
    $value = $saved[$key][$lang] ?? ($def[$lang] ?? '');
    if (strpos($value, '{') === false) return $value;
    $k = az_figures();
    return strtr($value, [
        '{missions}' => $k['missions'], '{commanditaires}' => $k['clients'], '{partenaires}' => $k['partners'], '{regions}' => $k['regions'], '{depuis}' => $k['since'],
        // Coordonnées (menu « Coordonnées »), utilisées notamment dans les mentions légales
        '{rue}' => esc_html(az_opt('street')), '{ville}' => esc_html(az_opt('city')), '{pays}' => esc_html(az_opt('country')),
        '{email}' => esc_html(az_opt('email')), '{telephones}' => esc_html(implode(' / ', array_column(az_phones(), 'display'))),
        '{hebergeur}' => esc_html(az_opt('legal_host')),
    ]);
}

/** Texte brut d'une valeur qui peut contenir des repères (libellés de l'administration). */
function az_plain($s) {
    return wp_strip_all_tags(az_tokens((string) $s));
}

/**
 * Finitions typographiques, appliquées au texte seulement (jamais aux balises, scripts ou styles) :
 * adresses e-mail sécables après « @ » ; en français, espace insécable avant « : ; ! ? » et dans les guillemets.
 */
function az_typography($html, $lang) {
    $parts = preg_split('/(<[^>]+>)/', $html, -1, PREG_SPLIT_DELIM_CAPTURE);
    if ($parts === false) return $html;
    $raw = false;
    $nbsp = "\u{00A0}";
    foreach ($parts as $i => $tok) {
        if ($i % 2) {
            if (preg_match('/^<(script|style|title|textarea)\b/i', $tok)) $raw = true;
            elseif (preg_match('/^<\/(script|style|title|textarea)>/i', $tok)) $raw = false;
            continue;
        }
        if ($raw || trim($tok) === '') continue;
        $tok = preg_replace('/([\w.+-])@([\w-]+\.[\w.]+)/', '$1@<wbr>$2', $tok);
        if ($lang === 'fr') {
            $tok = preg_replace('/ ([:;!?»])/u', $nbsp . '$1', $tok);
            $tok = str_replace('« ', '«' . $nbsp, $tok);
        }
        $parts[$i] = $tok;
    }
    return implode('', $parts);
}

/** Titre, description et adresses de la page courante (balises <head>). */
function az_head_meta() {
    $cur = az_current();
    $lang = $cur['lang'];
    $name = az_data('name');
    $meta = $cur['id'] && $cur['id'] !== 'notfound' ? az_page_meta($cur['id']) : null;
    $out = ['noindex' => false, 'bodyClass' => '', 'section' => '', 'links' => null];
    if ($meta) {
        $title = $meta['title'][$lang];
        $out['title'] = $cur['id'] === 'home' ? $name . ' — ' . $title : $title . ' | ' . $name;
        $out['description'] = $meta['description'][$lang];
        $out['noindex'] = !empty($meta['noindex']);
        $out['bodyClass'] = $meta['bodyClass'];
        $out['section'] = $meta['section'];
        $out['links'] = ['self' => az_url($cur['id'], $lang), 'fr' => az_url($cur['id'], 'fr'), 'en' => az_url($cur['id'], 'en')];
        $out['alternate'] = az_url($cur['id'], $lang === 'fr' ? 'en' : 'fr');
    } elseif ($cur['id'] === 'notfound') {
        $out['title'] = 'Page introuvable | ' . $name;
        $out['description'] = 'Page introuvable.';
        $out['noindex'] = true;
        $out['alternate'] = az_url('home', $lang === 'fr' ? 'en' : 'fr');
    } else {
        // Page ou article créé librement dans WordPress
        $out['title'] = wp_strip_all_tags(is_singular() ? get_the_title() : wp_get_document_title()) . ' | ' . $name;
        $out['description'] = is_singular() ? wp_strip_all_tags(get_the_excerpt()) : az_L(az_data('tagline'));
        $out['alternate'] = az_url('home', $lang === 'fr' ? 'en' : 'fr');
        if (is_singular()) $out['links'] = ['self' => get_permalink(), 'fr' => null, 'en' => null];
    }
    return $out;
}
