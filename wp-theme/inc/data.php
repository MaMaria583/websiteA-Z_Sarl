<?php
/** Données du thème, coordonnées et contenus gérés dans l'administration. */

if (!defined('ABSPATH')) exit;

/** Fichier JSON du dossier data/ (lu une seule fois par requête). */
function az_json($name) {
    static $cache = [];
    if (!isset($cache[$name])) {
        $file = AZ_DIR . '/data/' . $name . '.json';
        $cache[$name] = is_file($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($cache[$name])) $cache[$name] = [];
    }
    return $cache[$name];
}

/** Donnée fixe du thème (data/site.json) : libellés, pôles, zones, icônes… */
function az_data($key) {
    $d = az_json('site');
    return $d[$key] ?? null;
}

/** Texte dans la langue de la page : accepte une chaîne ou un couple { fr, en }. */
function az_L($o, $lang = null) {
    if ($o === null) return '';
    if (!is_array($o)) return (string) $o;
    $lang = $lang ?: az_lang();
    return $o[$lang] ?? ($o['fr'] ?? '');
}

/** Libellés d'interface de la langue courante. */
function az_t($key = null) {
    $ui = az_data('ui')[az_lang()];
    return $key === null ? $ui : ($ui[$key] ?? '');
}

/** Libellé d'un gabarit (groupes : projects, partners, service). $n : variante au singulier / pluriel. */
function az_s($group, $key, $n = null) {
    $v = az_data('strings')[$group][az_lang()][$key] ?? '';
    if (is_array($v)) return $n === null ? $v['many'] : str_replace('{n}', (string) $n, $n > 1 ? $v['many'] : $v['one']);
    return $v;
}

/** Échappement identique à celui du site d'origine (& < > "). */
function az_esc($s) {
    return str_replace(['&', '<', '>', '"'], ['&amp;', '&lt;', '&gt;', '&quot;'], (string) $s);
}

function az_asset($path) {
    return AZ_URI . '/assets/' . $path;
}

// ---------- Coordonnées (menu « Coordonnées ») ----------

function az_options() {
    static $o = null;
    if ($o === null) {
        $seed = az_json('seed')['options'] ?? [];
        $saved = get_option('az_options', []);
        $o = array_merge($seed, is_array($saved) ? $saved : []);
    }
    return $o;
}

/** Numéros de téléphone : [ [ 'display' => '+223 …', 'tel' => '+223…' ], … ] */
function az_phones() {
    $out = [];
    foreach (preg_split('/\r?\n/', (string) (az_options()['phones'] ?? '')) as $line) {
        $line = trim($line);
        if ($line !== '') $out[] = ['display' => $line, 'tel' => preg_replace('/[^\d+]/', '', $line)];
    }
    return $out;
}

function az_opt($key) {
    $o = az_options();
    if (preg_match('/^phone(\d)(_tel)?$/', $key, $m)) {
        $p = az_phones()[(int) $m[1] - 1] ?? null;
        return $p ? $p[empty($m[2]) ? 'display' : 'tel'] : '';
    }
    switch ($key) {
        case 'director_role': return $o['director_role_' . az_lang()] ?? '';
        case 'form_endpoint': return 'https://formsubmit.co/' . ($o['form_email'] ?: $o['email']);
        case 'whatsapp': return preg_replace('/\D/', '', (string) ($o['whatsapp'] ?? ''));
    }
    return $o[$key] ?? '';
}

function az_social() {
    $out = [];
    foreach (['linkedin' => 'LinkedIn', 'facebook' => 'Facebook'] as $icon => $name) {
        $url = trim((string) az_opt($icon));
        if ($url !== '') $out[] = ['name' => $name, 'icon' => $icon, 'url' => $url];
    }
    return $out;
}

function az_whatsapp_url() {
    return 'https://wa.me/' . az_opt('whatsapp') . '?text=' . rawurlencode(az_t('whatsappMsg'));
}

// ---------- Contenus gérés dans l'administration ----------

/**
 * Fiches publiées d'un type (partner, project, reference), dans l'ordre de l'administration.
 * Chaque fiche est un tableau de champs ; `id` est l'identifiant (slug) de la fiche.
 */
function az_items($type) {
    static $cache = [];
    if (!isset($cache[$type])) {
        $posts = get_posts([
            'post_type' => 'az_' . $type,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => ['menu_order' => 'ASC', 'ID' => 'DESC'],
            'suppress_filters' => false,
        ]);
        $cache[$type] = [];
        foreach ($posts as $p) {
            $d = get_post_meta($p->ID, '_az_data', true);
            if (!is_array($d)) $d = [];
            $d['id'] = $p->post_name;
            $cache[$type][] = $d;
        }
    }
    return $cache[$type];
}

function az_partners() { return az_items('partner'); }
function az_projects() { return az_items('project'); }
function az_references() { return az_items('reference'); }

function az_find($list, $id) {
    foreach ($list as $x) if (($x['id'] ?? null) === $id) return $x;
    return null;
}

function az_service($id) {
    return az_find(az_data('services'), $id);
}

/** Adresse d'une réalisation (ancre de la page Réalisations). */
function az_project_href($p) {
    return az_url('projects') . '#' . $p['id'];
}

/** Toutes les missions : réalisations illustrées + références, de la plus récente à la plus ancienne. */
function az_all_missions() {
    static $cache = [];
    $lang = az_lang();
    if (!isset($cache[$lang])) {
        $all = [];
        foreach (az_projects() as $p) {
            $all[] = [
                'id' => $p['id'], 'year' => (int) ($p['year'] ?? 0), 'sort' => (int) ($p['year'] ?? 0),
                'partner' => ($p['partner'] ?? '') ?: null, 'kind' => $p['kind'] ?? 'etude', 'services' => $p['services'] ?? [],
                'title' => $p['title'] ?? '', 'zone' => $p['zone'] ?? null, 'caseHref' => az_project_href($p),
            ];
        }
        foreach (az_references() as $r) {
            $r['year'] = (int) ($r['year'] ?? 0);
            $r['sort'] = (int) (($r['sort'] ?? 0) ?: $r['year']);
            $r['partner'] = ($r['partner'] ?? '') ?: null;
            $r['services'] = $r['services'] ?? [];
            $r['kind'] = $r['kind'] ?? 'etude';
            $all[] = $r;
        }
        // Tri stable : à année égale, les réalisations illustrées d'abord, puis l'ordre de l'administration
        foreach ($all as $i => &$m) $m['_i'] = $i;
        unset($m);
        usort($all, function ($a, $b) { return ($b['sort'] <=> $a['sort']) ?: ($a['_i'] <=> $b['_i']); });
        $cache[$lang] = $all;
    }
    return $cache[$lang];
}

/** Chiffres clés calculés à partir des contenus (missions, partenaires, commanditaires, régions). */
function az_figures() {
    static $k = null;
    if ($k === null) {
        $missions = az_all_missions();
        $years = array_filter(array_map(function ($m) { return $m['year']; }, $missions));
        $clients = array_unique(array_filter(array_map(function ($m) { return $m['partner']; }, $missions)));
        $k = [
            'missions' => count($missions),
            'partners' => count(az_partners()),
            'clients' => count($clients),
            'regions' => count(array_filter(az_data('places'), function ($p) { return empty($p['hq']); })),
            'since' => $years ? min($years) : (int) date('Y'),
        ];
    }
    return $k;
}
