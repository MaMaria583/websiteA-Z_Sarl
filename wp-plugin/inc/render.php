<?php
/** Repères [[az:…]] des fragments, textes communs et finitions typographiques. */

if (!defined('ABSPATH')) exit;

/**
 * Repères posés par le générateur (build-plugin.mjs) dans les fragments :
 *   [[az:asset:chemin]]   fichier du dossier assets/ de l'extension
 *   [[az:url:page]]       adresse d'une page du site (langue courante, ou page@en)
 *   [[az:opt:clé]]        coordonnée (menu « Coordonnées »)
 *   [[az:fig:clé]]        chiffre clé calculé
 *   [[az:t:clé]]          texte commun (data/texts.json)
 *   [[az:c:nom:args]]     composant (inc/components.php)
 */
function az_tokens($html) {
    $html = preg_replace_callback('/<[^<>]*\[\[az:t:[^\]]+\]\][^<>]*>/', function ($tag) {
        return preg_replace_callback('/\[\[az:t:([^\]]+)\]\]/', function ($m) {
            return esc_attr(wp_strip_all_tags(az_text($m[1])));
        }, $tag[0]);
    }, $html);
    $html = preg_replace_callback('/%5B%5Baz%3At%3A([\w.%-]+?)%5D%5D/', function ($m) {
        return rawurlencode(wp_strip_all_tags(az_text(rawurldecode($m[1]))));
    }, $html);
    return preg_replace_callback('/\[\[az:(\w+):([^\]]*)\]\]/', function ($m) {
        $v = $m[2];
        switch ($m[1]) {
            case 'asset': return az_asset($v);
            case 'url':
                $parts = explode('@', $v);
                return esc_url(az_url($parts[0], $parts[1] ?? null));
            case 'opt': return esc_html(az_opt($v));
            case 't': return az_text($v);
            case 'fig': return (string) (az_figures()[$v] ?? '');
            case 'c':
                $parts = explode(':', $v, 2);
                $args = json_decode((string) base64_decode(strtr($parts[1] ?? '', '-_', '+/')), true);
                $fn = 'az_c_' . $parts[0];
                return function_exists($fn) ? $fn(is_array($args) ? $args : []) : '';
        }
        return '';
    }, $html);
}

/** Texte commun (bandeaux, libellés des composants) avec repères de chiffres et de coordonnées. */
function az_text($key, $lang = null) {
    $lang = $lang ?: az_lang();
    $def = az_json('texts')['texts'][$key] ?? null;
    return az_placeholders((string) ($def[$lang] ?? ''));
}

/**
 * Repères utilisables dans tous les textes du site (titres, paragraphes, boutons…) :
 * {missions} {commanditaires} {partenaires} {regions} {depuis} — chiffres clés calculés à partir des fiches ;
 * {rue} {ville} {pays} {email} {telephones} {whatsapp} {hebergeur} — menu « Coordonnées ».
 */
function az_placeholders($value) {
    if (strpos($value, '{') === false) return $value;
    $k = az_figures();
    return strtr($value, [
        '{missions}' => $k['missions'], '{commanditaires}' => $k['clients'], '{partenaires}' => $k['partners'], '{regions}' => $k['regions'], '{depuis}' => $k['since'],
        '{rue}' => esc_html(az_opt('street')), '{ville}' => esc_html(az_opt('city')), '{pays}' => esc_html(az_opt('country')),
        '{email}' => esc_html(az_opt('email')), '{telephones}' => esc_html(implode(' / ', array_column(az_phones(), 'display'))),
        '{whatsapp}' => esc_html(az_opt('whatsapp')), '{hebergeur}' => esc_html(az_opt('legal_host')),
    ]);
}

function az_plain($s) {
    return wp_strip_all_tags(az_tokens((string) $s));
}

/** Espaces insécables du français et adresses e-mail sécables (texte seulement, jamais les balises). */
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
