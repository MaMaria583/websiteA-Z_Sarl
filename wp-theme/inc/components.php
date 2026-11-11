<?php
/**
 * Composants dynamiques : même HTML que les gabarits d'origine (src/templates/components.mjs et pages/),
 * alimentés par les contenus de l'administration. Les fonctions az_c_* répondent aux repères [[az:c:…]].
 */

if (!defined('ABSPATH')) exit;

// ---------- Éléments de base ----------

function az_icon($name, $extra = '') {
    $icons = az_data('icons');
    if (isset($icons['filled'][$name])) {
        return '<svg class="icon ' . $extra . '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' . $icons['filled'][$name] . '</svg>';
    }
    return '<svg class="icon icon-stroke ' . $extra . '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' . ($icons['paths'][$name] ?? '') . '</svg>';
}

function az_brand($white = false) {
    return '<a class="brand" href="' . esc_url(az_url('home')) . '" aria-label="' . az_t('homeAria') . '">
      <img src="' . az_asset('img/brand/' . ($white ? 'az-mark-white' : 'az-mark') . '.svg') . '" width="195" height="101" alt="">
      <span class="brand__text"><span class="brand__name">' . az_data('name') . '</span><span class="brand__line">' . az_L(az_data('brandLine')) . '</span></span>
    </a>';
}

function az_lang_switch($alternate) {
    $t = az_t();
    $out = '';
    foreach (['fr', 'en'] as $l) {
        $out .= $l === az_lang()
            ? '<a aria-current="true" lang="' . $l . '" title="' . $t['langNames'][$l] . '">' . strtoupper($l) . '</a>'
            : '<a href="' . esc_url($alternate) . '" lang="' . $l . '" hreflang="' . $l . '" title="' . $t['langNames'][$l] . '">' . strtoupper($l) . '</a>';
    }
    return '<div class="lang" role="group" aria-label="' . $t['langLabel'] . '">' . $out . '</div>';
}

/** Données structurées de la page d'accueil (schema.org). */
function az_json_ld() {
    $lang = az_lang();
    $areas = [['@type' => 'Country', 'name' => 'Mali']];
    foreach (az_data('places') as $p) {
        $areas[] = ['@type' => 'AdministrativeArea', 'name' => !empty($p['hq']) ? ($lang === 'en' ? 'Bamako District' : 'District de Bamako') : ($lang === 'en' ? $p['name'] . ' Region' : 'Région de ' . $p['name'])];
    }
    $geo = az_data('geo');
    $data = [
        '@context' => 'https://schema.org',
        '@type' => 'ProfessionalService',
        'name' => az_data('name'),
        'description' => az_plain(az_L(az_data('tagline'))),
        'slogan' => az_plain(az_L(az_data('tagline'))),
        'address' => ['@type' => 'PostalAddress', 'streetAddress' => az_opt('street'), 'addressLocality' => az_opt('city'), 'addressCountry' => 'ML'],
        'geo' => ['@type' => 'GeoCoordinates', 'latitude' => $geo['lat'], 'longitude' => $geo['lon']],
        'telephone' => array_column(az_phones(), 'tel'),
        'email' => az_opt('email'),
        'areaServed' => $areas,
        'knowsAbout' => array_map(function ($s) { return az_plain(az_L($s['title'])); }, az_data('services')),
        'knowsLanguage' => ['fr', 'en'],
        'employee' => ['@type' => 'Person', 'name' => az_opt('director_name'), 'jobTitle' => az_opt('director_role'), 'email' => az_opt('director_email')],
        'url' => home_url('/'),
        'logo' => az_asset('img/brand/icon-512.png'),
        'image' => az_asset('img/brand/og-image.jpg'),
    ];
    $social = az_social();
    if ($social) $data['sameAs'] = array_column($social, 'url');
    return '<script type="application/ld+json">' . wp_json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>';
}

// ---------- Images ----------

/** Une photo est soit une photo fournie avec le thème ({ id }), soit un fichier de la médiathèque ({ att }). */
function az_photo_att($ph) {
    if (is_array($ph) && !empty($ph['att'])) return (int) $ph['att'];
    // Photo du thème remplacée dans l'administration (menu « Photos du site »)
    $name = is_array($ph) ? ($ph['id'] ?? '') : (string) $ph;
    $over = get_option('az_photos', []);
    return ($name !== '' && is_array($over) && !empty($over[$name]) && wp_attachment_is_image((int) $over[$name])) ? (int) $over[$name] : 0;
}

/** Photo des gabarits (repère [[az:c:picture:…]]) : photo du thème, ou celle choisie dans « Photos du site ». */
function az_c_picture($a) {
    return az_picture(['id' => $a['name'] ?? ''], [
        'alt' => $a['alt'] ?? '', 'sizes' => $a['sizes'] ?? '100vw', 'cls' => $a['cls'] ?? '', 'loading' => $a['loading'] ?? 'lazy',
        'priority' => !empty($a['priority']), 'style' => $a['style'] ?? '',
    ]);
}

function az_c_largest($a) {
    return esc_url(az_largest(['id' => $a['name'] ?? '']));
}

/** Image responsive : WebP + JPEG pour les photos du thème, tailles WordPress pour la médiathèque. */
function az_picture($ph, $o = []) {
    $o += ['alt' => '', 'sizes' => '100vw', 'cls' => '', 'loading' => 'lazy', 'priority' => false, 'style' => ''];
    $tail = ' alt="' . az_esc($o['alt']) . '"' . ($o['cls'] ? ' class="' . $o['cls'] . '"' : '') . ($o['style'] ? ' style="' . $o['style'] . '"' : '')
        . ' loading="' . ($o['priority'] ? 'eager' : $o['loading']) . '" decoding="async"' . ($o['priority'] ? ' fetchpriority="high"' : '') . '>';

    if ($att = az_photo_att($ph)) {
        $img = wp_get_attachment_image_src($att, 'large');
        if (!$img) return '';
        $srcset = wp_get_attachment_image_srcset($att, 'large');
        // Dimensions absentes des métadonnées (image importée sans miniatures) : lues dans le fichier
        if ((int) $img[1] <= 1 && ($file = get_attached_file($att)) && ($size = @getimagesize($file))) $img = [$img[0], $size[0], $size[1]];
        $dims = (int) $img[1] > 1 ? ' width="' . (int) $img[1] . '" height="' . (int) $img[2] . '"' : '';
        return '<picture><img src="' . esc_url($img[0]) . '"' . ($srcset ? ' srcset="' . esc_attr($srcset) . '" sizes="' . $o['sizes'] . '"' : '') . $dims . $tail . '</picture>';
    }

    $name = is_array($ph) ? ($ph['id'] ?? '') : $ph;
    $m = az_json('photos')[$name] ?? null;
    if (!$m) return '';
    $src = function ($w, $ext) use ($name) { return az_asset("img/photos/$name-$w.$ext"); };
    $set = function ($ext) use ($m, $src) { return implode(', ', array_map(function ($w) use ($src, $ext) { return $src($w, $ext) . " {$w}w"; }, $m['widths'])); };
    $fallback = end($m['widths']);
    foreach ($m['widths'] as $w) if ($w >= 800) { $fallback = $w; break; }
    return '<picture><source type="image/webp" srcset="' . $set('webp') . '" sizes="' . $o['sizes'] . '"><img src="' . $src($fallback, 'jpg') . '" srcset="' . $set('jpg') . '" sizes="' . $o['sizes'] . '" width="' . $m['width'] . '" height="' . $m['height'] . '"' . $tail . '</picture>';
}

/** Plus grande version d'une photo (visionneuse). */
function az_largest($ph) {
    if ($att = az_photo_att($ph)) return (string) wp_get_attachment_image_url($att, 'az-xl');
    $name = is_array($ph) ? ($ph['id'] ?? '') : $ph;
    $m = az_json('photos')[$name] ?? null;
    return $m ? az_asset("img/photos/$name-" . end($m['widths']) . '.jpg') : '';
}

function az_category_short($cat) {
    $short = [
        'international' => ['fr' => 'International', 'en' => 'International'],
        'public' => ['fr' => 'Institution', 'en' => 'Institution'],
        'civil' => ['fr' => 'Société civile', 'en' => 'Civil society'],
        'rural' => ['fr' => 'Monde rural', 'en' => 'Rural'],
    ];
    return az_L($short[$cat] ?? '');
}

/** Logo d'un partenaire, ou plaque typographique s'il n'y a pas de logo. */
function az_partner_logo($p, $loading = 'lazy') {
    $logo = $p['logo'] ?? null;
    if (!$logo) {
        return '<span class="logo-plate"><b>' . az_esc($p['acronym']) . '</b><small>' . az_esc(az_category_short($p['category'] ?? '')) . '</small></span>';
    }
    $alt = !empty($logo['alt']) ? az_L($logo['alt']) : (az_lang() === 'en' ? $p['acronym'] . ' logo' : 'Logo ' . $p['acronym']);
    $tail = ' alt="' . az_esc($alt) . '" loading="' . $loading . '" decoding="async">';
    if (!empty($logo['att'])) {
        $img = wp_get_attachment_image_src((int) $logo['att'], 'medium_large');
        if (!$img) return '<span class="logo-plate"><b>' . az_esc($p['acronym']) . '</b></span>';
        return '<img class="logo--' . $p['id'] . '" src="' . esc_url($img[0]) . '" width="' . (int) $img[1] . '" height="' . (int) $img[2] . '"' . $tail;
    }
    if (!empty($logo['raster'])) {
        $base = az_asset('img/partners/' . $logo['file']);
        return '<picture><source type="image/webp" srcset="' . $base . '.webp"><img class="logo--' . $p['id'] . '" src="' . $base . '.png" width="' . $logo['width'] . '" height="' . $logo['height'] . '"' . $tail . '</picture>';
    }
    return '<img class="logo--' . $p['id'] . '" src="' . az_asset('img/partners/' . $logo['file']) . '" width="' . $logo['width'] . '" height="' . $logo['height'] . '"' . $tail;
}

function az_partner_url($p) {
    $url = az_L($p['url'] ?? null);
    return $url !== '' ? $url : null;
}

function az_section_head($o) {
    $o += ['eyebrow' => '', 'title' => '', 'lead' => '', 'split' => false, 'id' => ''];
    $title = '<h2 class="h2"' . ($o['id'] ? ' id="' . $o['id'] . '"' : '') . '>' . $o['title'] . '</h2>';
    $eyebrow = $o['eyebrow'] ? '<p class="eyebrow">' . $o['eyebrow'] . '</p>' : '';
    $lead = $o['lead'] ? '<p class="lead">' . $o['lead'] . '</p>' : '';
    if ($o['split']) return '<div class="section-head section-head--split" data-reveal><div>' . $eyebrow . $title . '</div>' . $lead . '</div>';
    return '<div class="section-head" data-reveal>' . $eyebrow . $title . $lead . '</div>';
}

// ---------- Cartes du Mali ----------

function az_num($n, $decimals = 1) {
    return number_format((float) $n, $decimals, '.', '');
}

/** Nombre affiché au plus court (600, 512.3), comme dans le site d'origine. */
function az_n($n) {
    return (string) round((float) $n, 6);
}

function az_map_ground($uid) {
    $map = az_json('mali-map');
    return '<defs><path id="mali-' . $uid . '" d="' . $map['country'] . '"/><clipPath id="clip-' . $uid . '"><use href="#mali-' . $uid . '"/></clipPath></defs>
    <use class="land-shadow" href="#mali-' . $uid . '" transform="translate(7 9)"/>
    <use class="land" href="#mali-' . $uid . '"/>
    <g clip-path="url(#clip-' . $uid . ')"><path class="river" d="' . $map['river'] . '"/></g>';
}

function az_map_inset($uid, $box, $right = false) {
    $map = az_json('mali-map');
    list($rx, $ry, $rw, $rh) = $box;
    list($fx, $fy, $fw, $fh) = $map['full']['viewBox'];
    $s = 118 / $fw;
    $ix = $right ? $rx + $rw - $fw * $s - 22 : $rx + 22;
    $iy = $ry + 40;
    return '<g aria-hidden="true">
    <rect class="inset-frame" x="' . az_num($ix - 8) . '" y="' . az_num($iy - 26) . '" width="' . az_num($fw * $s + 16) . '" height="' . az_num($fh * $s + 34) . '" rx="10"/>
    <text class="inset-label" x="' . az_num($ix) . '" y="' . az_num($iy - 10) . '">MALI</text>
    <g transform="translate(' . az_num($ix - $fx * $s, 2) . ' ' . az_num($iy - $fy * $s, 2) . ') scale(' . az_num($s, 5) . ')"><use class="inset-land" href="#mali-' . $uid . '"/><rect class="inset-box" x="' . az_n($rx) . '" y="' . az_n($ry) . '" width="' . az_n($rw) . '" height="' . az_n($rh) . '"/></g></g>';
}

/** Carte des zones d'une réalisation sans photo. */
function az_zone_map($p, $decorative = false, $uid = null) {
    $map = az_json('mali-map');
    $uid = $uid ?: $p['id'];
    $names = [];
    foreach (az_data('places') as $pl) $names[$pl['id']] = $pl['name'];
    $zones = array_values(array_filter($p['zones'] ?? [], function ($z) use ($map) { return isset($map['points'][$z]); }));
    if (!$zones) return '';
    $pts = array_map(function ($z) use ($map) { return $map['points'][$z]; }, array_merge($zones, ['bamako']));
    $mid = function ($k) use ($pts) { $v = array_column($pts, $k); return (min($v) + max($v)) / 2; };
    $box = [round($mid(0) - 300, 1), round($mid(1) - 225, 1), 600, 450];
    $list = array_map(function ($z) use ($names) { return $names[$z] ?? $z; }, $zones);
    $last = array_pop($list);
    $text = implode(', ', $list) . ' ' . (az_lang() === 'en' ? 'and' : 'et') . ' ' . $last;
    $label_pos = ['segou' => [24, 7, 'start'], 'sikasso' => [24, 7, 'start']];
    $pins = '';
    foreach ($zones as $i => $z) {
        list($x, $y) = $map['points'][$z];
        $lp = $label_pos[$z] ?? [0, -26, 'middle'];
        $pins .= '<g class="pin" data-place="' . $z . '"><circle class="zone-area" cx="' . az_n($x) . '" cy="' . az_n($y) . '" r="44"/><circle class="halo" cx="' . az_n($x) . '" cy="' . az_n($y) . '" r="13" style="animation-delay:' . az_n($i * 0.4) . 's"/><circle class="core" cx="' . az_n($x) . '" cy="' . az_n($y) . '" r="10"/><text class="pin-label" x="' . az_n($x + $lp[0]) . '" y="' . az_n($y + $lp[1]) . '" text-anchor="' . $lp[2] . '">' . ($names[$z] ?? $z) . '</text></g>';
    }
    list($bx, $by) = $map['points']['bamako'];
    $a11y = $decorative
        ? 'aria-hidden="true" focusable="false">'
        : 'role="img" aria-labelledby="zm-' . $uid . '-t"><title id="zm-' . $uid . '-t">' . (az_lang() === 'en' ? 'Map of the study areas: ' . $text : 'Carte des zones de l’étude : ' . $text) . '</title>';
    return '<svg class="map-svg zone-map" viewBox="' . implode(' ', array_map('az_n', $box)) . '" ' . $a11y . '
    ' . az_map_ground('zm-' . $uid) . '
    <circle class="ref-dot" cx="' . az_n($bx) . '" cy="' . az_n($by) . '" r="5"/><text class="ref-label" x="' . az_n($bx - 12) . '" y="' . az_n($by + 5) . '" text-anchor="end">Bamako</text>
    ' . $pins . '
    ' . az_map_inset('zm-' . $uid, $box, true) . '
  </svg>';
}

// ---------- Références ----------

/** Ligne d'une référence (liste complète de la page Réalisations, ou version compacte des pages pôles). */
function az_reference_item($m, $compact = false) {
    $partner = !empty($m['partner']) ? az_find(az_partners(), $m['partner']) : null;
    $kinds = az_data('kinds');
    $kind = $kinds[$m['kind']] ?? $kinds['etude'];
    $when = !empty($m['year']) ? (string) $m['year'] : az_L($m['period'] ?? '');
    $logo = $partner
        ? '<span class="ref__logo" aria-hidden="true">' . (!empty($partner['logo']) ? az_partner_logo($partner) : '<b>' . az_esc($partner['acronym']) . '</b>') . '</span>'
        : '<span class="ref__logo ref__logo--az" aria-hidden="true"><img src="' . az_asset('img/brand/az-mark.svg') . '" alt="" width="40" height="28"></span>';
    $who = $partner ? az_esc($partner['acronym']) : 'A-Z Sarl';
    $zone = az_L($m['zone'] ?? null);
    $note = az_L($m['note'] ?? null);
    $zone_html = ($zone !== '' || $note !== '')
        ? '<p class="ref__zone">' . ($zone !== '' ? az_icon('pin') . ' ' . $zone : '') . ($note !== '' && !$compact ? '<span class="ref__note">' . $note . '</span>' : '') . '</p>'
        : '';
    return '<li class="ref' . ($compact ? ' ref--compact' : '') . '" data-ref data-kind="' . $kind['group'] . '" data-partner="' . ($partner ? $m['partner'] : (!empty($m['partner']) ? $m['partner'] : 'a-z')) . '" data-services="' . implode(' ', $m['services']) . '" data-ref-year="' . az_esc($when) . '">
      <span class="ref__year">' . az_esc($when) . (!empty($m['periodNote']) ? '<small>' . az_L($m['periodNote']) . '</small>' : '') . '</span>
      ' . $logo . '
      <div class="ref__body">
        <p class="ref__meta"><span class="ref__kind ref__kind--' . $kind['group'] . '">' . az_L($kind) . '</span><span class="ref__who">' . $who . '</span></p>
        <p class="ref__title">' . az_L($m['title']) . '</p>
        ' . $zone_html . '
      </div>
      ' . (!empty($m['caseHref']) ? '<a class="ref__case" href="' . esc_url($m['caseHref']) . '">' . az_text('commun.etudeDeCas') . ' ' . az_icon('arrow') . '</a>' : '') . '
    </li>';
}

/** Section « Toutes nos missions » de la page Réalisations, avec ses filtres. */
function az_c_references($args) {
    $items = az_all_missions();
    $kinds = az_data('kinds');
    $group_of = function ($m) use ($kinds) { return ($kinds[$m['kind']] ?? $kinds['etude'])['group']; };
    $filters = '<button class="filter-btn" type="button" data-ref-filter="all" aria-pressed="true">' . az_s('projects', 'all') . '<span>' . count($items) . '</span></button>';
    foreach (az_data('kindGroups') as $g) {
        $n = count(array_filter($items, function ($m) use ($g, $group_of) { return $group_of($m) === $g['id']; }));
        $filters .= '<button class="filter-btn" type="button" data-ref-filter="' . $g['id'] . '" aria-pressed="false">' . az_L($g['title']) . '<span>' . $n . '</span></button>';
    }
    $prev = null;
    $list = '';
    foreach ($items as $m) {
        $html = az_reference_item($m);
        $when = !empty($m['year']) ? (string) $m['year'] : az_L($m['period'] ?? '');
        if ($when !== $prev) $html = preg_replace('/class="ref"/', 'class="ref ref--first"', $html, 1);
        $prev = $when;
        $list .= $html;
    }
    $names = [];
    foreach (az_partners() as $p) $names[$p['id']] = $p['acronym'];
    foreach (az_data('services') as $s) $names['pole:' . $s['id']] = az_L($s['short']);
    return '
<section class="section section--white refs-section" id="references" aria-labelledby="references-title" data-refs>
  <div class="container">
    ' . az_section_head(['eyebrow' => az_s('projects', 'refsEyebrow'), 'title' => az_s('projects', 'refsTitle'), 'lead' => az_s('projects', 'refsLead'), 'split' => true, 'id' => 'references-title']) . '
    <div class="refs-tools">
      <div class="filters" role="group" aria-label="' . az_s('projects', 'refsFilter') . '">' . $filters . '</div>
      <p class="refs-partner" data-ref-partner data-names="' . az_esc(wp_json_encode($names, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) . '" data-label-partner="' . az_s('projects', 'partnerOnly') . '" data-label-pole="' . az_s('projects', 'poleOnly') . '" hidden><span data-ref-partner-label>' . az_s('projects', 'partnerOnly') . '</span> <b data-ref-partner-name></b><button type="button" class="refs-partner__clear">' . az_s('projects', 'showAll') . ' ' . az_icon('close') . '</button></p>
    </div>
    <p class="sr-only" aria-live="polite" data-ref-status data-template="' . az_s('projects', 'refsStatus') . '"></p>
    <ol class="refs">' . $list . '</ol>
  </div>
</section>';
}

/** Pages pôles : « D'autres missions de ce pôle » (références sans étude de cas, 6 au plus). */
function az_c_serviceRefs($args) {
    $sid = $args['service'] ?? '';
    $of_pole = array_values(array_filter(az_all_missions(), function ($m) use ($sid) { return in_array($sid, $m['services'], true); }));
    $refs = array_slice(array_values(array_filter($of_pole, function ($m) { return empty($m['caseHref']); })), 0, 6);
    if (!$refs) return '';
    return '
<section class="section" aria-labelledby="refs-title">
  <div class="container">
    <div class="section-head section-head--split" data-reveal>
      <div><p class="eyebrow">' . az_s('service', 'refsEyebrow') . '</p><h2 class="h2" id="refs-title">' . az_s('service', 'refsTitle') . '</h2></div>
      <p><a class="link-arrow" href="' . esc_url(az_url('projects')) . '?pole=' . $sid . '#references">' . az_s('service', 'refsAll', count($of_pole)) . ' ' . az_icon('arrow') . '</a></p>
    </div>
    <ol class="refs refs--compact" data-reveal>' . implode('', array_map(function ($m) { return az_reference_item($m, true); }, $refs)) . '</ol>
  </div>
</section>';
}

// ---------- Réalisations ----------

function az_project_short($p) {
    $short = az_L($p['short'] ?? null);
    return $short !== '' ? $short : az_L($p['title']);
}

function az_project_photos($p) {
    return array_values(array_filter($p['photos'] ?? [], function ($ph) { return az_largest($ph) !== ''; }));
}

/** Carte d'une réalisation (accueil, pages pôles). */
function az_project_card($p, $delay = 0) {
    $photos = az_project_photos($p);
    $visual = $photos
        ? az_picture($photos[0], ['alt' => '', 'sizes' => '(min-width: 1100px) 400px, (min-width: 700px) 50vw, 100vw'])
        : az_zone_map($p, true, $p['id'] . '-card');
    return '
<a class="proj-card" href="' . esc_url(az_project_href($p)) . '" data-reveal style="--d:' . az_n($delay) . 's">
  <div class="proj-card__media' . ($photos ? '' : ' proj-card__media--map') . '">' . $visual . (!empty($p['year']) ? '<span class="proj-card__year">' . az_esc($p['year']) . '</span>' : '') . '</div>
  <div class="proj-card__body">
    <span class="proj-card__tag">' . az_L($p['tag'] ?? '') . '</span>
    <h3 class="proj-card__title">' . az_project_short($p) . '</h3>
    <span class="link-arrow">' . az_text('commun.voirRealisation') . ' ' . az_icon('arrow') . '</span>
  </div>
</a>';
}

/** Accueil : les réalisations cochées « Page d'accueil » (3 au plus). */
function az_c_homeProjects($args) {
    $list = array_slice(array_values(array_filter(az_projects(), function ($p) { return in_array('home', $p['show_on'] ?? [], true); })), 0, 3);
    $out = '';
    foreach ($list as $i => $p) $out .= az_project_card($p, $i * 0.08);
    return $out;
}

/** Pages pôles : « Ce pôle en action » (réalisations cochées pour ce pôle). */
function az_c_serviceCases($args) {
    $sid = $args['service'] ?? '';
    $service = az_service($sid);
    $order = array_flip($service['projects'] ?? []);
    $related = array_values(array_filter(az_projects(), function ($p) use ($sid) { return in_array($sid, $p['show_on'] ?? [], true); }));
    if (!$related) return '';
    // Ordre d'origine pour les réalisations de départ ; les nouvelles viennent en premier
    foreach ($related as $i => &$p) $p['_o'] = [isset($order[$p['id']]) ? 1 + $order[$p['id']] : 0, $i];
    unset($p);
    usort($related, function ($a, $b) { return $a['_o'] <=> $b['_o']; });
    $n = count($related);
    $cards = '';
    foreach ($related as $k => $p) $cards .= az_project_card($p, $k * 0.06);
    return '
<section class="section section--white" aria-labelledby="case-title">
  <div class="container">
    <div class="section-head section-head--split" data-reveal>
      <div><p class="eyebrow">' . az_s('service', 'caseEyebrow') . '</p><h2 class="h2" id="case-title">' . az_s('service', 'caseTitle') . '</h2></div>
      <p><a class="link-arrow" href="' . esc_url(az_url('projects')) . '">' . az_s('service', 'caseAll') . ' ' . az_icon('arrow') . '</a></p>
    </div>
    <div class="proj-grid' . ($n === 1 ? ' proj-grid--one' : '') . ($n === 2 || $n === 4 ? ' proj-grid--two' : '') . '">' . $cards . '</div>
  </div>
</section>';
}

function az_project_thumbs($p) {
    $list = array_slice(az_project_photos($p), 1, 11);
    if (!$list) return '';
    $cols = count($list) <= 6 ? count($list) : (int) ceil(count($list) / 2);
    $out = '';
    foreach ($list as $ph) {
        $alt = az_L($ph['alt'] ?? '');
        $out .= '<li><a class="thumbs__item" href="' . esc_url(az_largest($ph)) . '" data-lightbox="' . $p['id'] . '" data-caption="' . az_esc($alt) . '" aria-label="' . az_esc(az_s('projects', 'enlarge') . ' : ' . $alt) . '">' . az_picture($ph, ['alt' => '', 'sizes' => '160px']) . '</a></li>';
    }
    return '<ul class="thumbs" style="--cols:' . max($cols, 3) . '">' . $out . '</ul>';
}

function az_project_cover($p, $sizes) {
    $photos = az_project_photos($p);
    $year = !empty($p['year']) ? '<span class="project__year">' . az_esc($p['year']) . '</span>' : '';
    if (!$photos) {
        return '<div class="project__cover project__cover--map">' . az_zone_map($p) . $year . '</div>';
    }
    $ph = $photos[0];
    $alt = az_L($ph['alt'] ?? '');
    return '<a class="project__cover" href="' . esc_url(az_largest($ph)) . '" data-lightbox="' . $p['id'] . '" data-caption="' . az_esc($alt) . '" aria-label="' . az_esc(az_s('projects', 'enlarge') . ' : ' . $alt) . '">
      ' . az_picture($ph, ['alt' => $alt, 'sizes' => $sizes]) . '
      ' . $year . '
      <span class="project__count">' . az_icon('zoom') . ' ' . count($photos) . ' ' . az_s('projects', count($photos) > 1 ? 'photos' : 'photo') . '</span>
    </a>';
}

function az_project_facts($p, $cls = '') {
    if (empty($p['facts'])) return '';
    $out = '';
    foreach ($p['facts'] as $f) $out .= '<div><dt>' . az_L($f['k']) . '</dt><dd>' . az_L($f['v']) . '</dd></div>';
    return '<dl class="facts' . ($cls ? ' ' . $cls : '') . '">' . $out . '</dl>';
}

function az_project_modules($p) {
    $list = az_L($p['modules'] ?? null);
    if (!is_array($list) || !$list) return '';
    $label = az_L($p['modulesLabel'] ?? null);
    return '<p class="project__label">' . ($label !== '' ? $label : az_s('projects', 'modules')) . '</p><ul class="chip-list">' . implode('', array_map(function ($m) { return '<li class="chip chip--teal">' . $m . '</li>'; }, $list)) . '</ul>';
}

function az_project_missions($p) {
    $list = az_L($p['missions'] ?? null);
    if (!is_array($list) || !$list) return '';
    $out = '';
    foreach ($list as $k => $m) $out .= '<li><span class="missions__num">0' . ($k + 1) . '</span><span>' . $m . '</span></li>';
    return '<p class="project__label">' . az_s('projects', 'missions') . '</p><ol class="missions">' . $out . '</ol>';
}

function az_project_partner_badge($p) {
    $partner = !empty($p['partner']) ? az_find(az_partners(), $p['partner']) : null;
    if (!$partner) return '';
    $url = az_partner_url($partner);
    $inner = '<span class="project__partner-logo">' . az_partner_logo($partner) . '</span><span><small>' . az_s('projects', 'partner') . '</small>' . az_esc($partner['acronym']) . '</span>';
    return $url
        ? '<a class="project__partner" href="' . esc_url($url) . '" target="_blank" rel="noopener noreferrer" aria-label="' . az_esc(az_t('visitOf') . ' ' . $partner['acronym'] . ' ' . az_t('newTab')) . '">' . $inner . az_icon('external') . '</a>'
        : '<span class="project__partner">' . $inner . '</span>';
}

function az_project_texts($p) {
    return array_values(array_filter(array_map('az_L', $p['text'] ?? []), 'strlen'));
}

function az_projects_by_layout($layout) {
    return array_values(array_filter(az_projects(), function ($p) use ($layout) { return ($p['layout'] ?? 'case') === $layout; }));
}

/** Page Réalisations : études de cas (présentation « Étude de cas »). */
function az_c_caseStudies($args) {
    $out = '';
    foreach (az_projects_by_layout('case') as $i => $p) {
        $title = az_L($p['title']);
        $quote = az_L($p['quote'] ?? null);
        $link = !empty($p['link']['url']) ? '<a class="link-arrow" href="' . esc_url($p['link']['url']) . '" target="_blank" rel="noopener noreferrer">' . az_icon('doc') . ' ' . az_L($p['link']['label'] ?? '') . ' ' . az_icon('external') . '</a>' : '';
        $out .= '
<section class="section project' . ($i % 2 ? ' section--white' : '') . '" id="' . $p['id'] . '" aria-labelledby="' . $p['id'] . '-title">
  <div class="container">
    <div class="project__grid' . ($i % 2 ? ' project__grid--rev' : '') . '">
      <div class="project__media" data-reveal>' . az_project_cover($p, '(min-width: 980px) 640px, 100vw') . '</div>
      <div class="project__body" data-reveal style="--d:.1s">
        <p class="eyebrow">' . ($i === 0 ? az_s('projects', 'featured') . ' · ' : '') . az_L($p['tag'] ?? '') . '</p>
        <h2 class="h2 project__title' . (mb_strlen($title) > 90 ? ' project__title--long' : '') . '" id="' . $p['id'] . '-title">' . $title . '</h2>
        ' . ($quote !== '' ? '<p class="project__quote">« ' . $quote . ' »</p>' : '') . '
        ' . az_project_missions($p) . '
        ' . implode('', array_map(function ($t) { return '<p class="project__text">' . $t . '</p>'; }, az_project_texts($p))) . '
        ' . az_project_modules($p) . '
        ' . az_project_facts($p) . '
        <div class="project__actions">
          ' . az_project_partner_badge($p) . '
          ' . $link . '
        </div>
      </div>
    </div>
    ' . az_project_thumbs($p) . '
  </div>
</section>';
    }
    return $out;
}

/** Page Réalisations : cartes « Formations » (présentation « Carte »). */
function az_c_duoCards($args) {
    $out = '';
    foreach (az_projects_by_layout('duo') as $p) {
        $out .= '
<article class="duo-card" id="' . $p['id'] . '" data-reveal aria-labelledby="' . $p['id'] . '-title">
  ' . az_project_cover($p, '(min-width: 980px) 600px, 100vw') . '
  <div class="duo-card__body">
    <p class="eyebrow">' . az_L($p['tag'] ?? '') . '</p>
    <h3 class="h3" id="' . $p['id'] . '-title">' . az_L($p['title']) . '</h3>
    ' . implode('', array_map(function ($t) { return '<p>' . $t . '</p>'; }, az_project_texts($p))) . '
    ' . az_project_modules($p) . '
    ' . az_project_facts($p, 'facts--compact') . '
    ' . az_project_thumbs($p) . '
    <div class="project__actions">' . az_project_partner_badge($p) . '</div>
  </div>
</article>';
    }
    return $out;
}

/** Page Réalisations : sommaire. */
function az_c_projectsToc($args) {
    $out = '<li><a class="chip chip--strong" href="#references">' . az_s('projects', 'tocRefs', az_figures()['missions']) . '</a></li>';
    foreach (array_merge(az_projects_by_layout('case'), az_projects_by_layout('duo')) as $p) {
        $out .= '<li><a class="chip" href="#' . $p['id'] . '">' . az_esc(az_project_short($p)) . '</a></li>';
    }
    foreach (az_data('galleries') as $g) $out .= '<li><a class="chip" href="#g-' . $g['id'] . '">' . az_L($g['title']) . '</a></li>';
    return $out;
}

// ---------- Partenaires ----------

/** Bandeau défilant des logos partenaires. */
function az_c_marquee($args) {
    $items = function ($hidden) {
        $out = '';
        foreach (az_partners() as $p) {
            $url = az_partner_url($p);
            $inner = az_partner_logo($p);
            $label = az_t('visitOf') . ' ' . $p['acronym'] . ' ' . az_t('newTab');
            $out .= '<li class="logo-item">' . ($url
                ? '<a href="' . esc_url($url) . '" target="_blank" rel="noopener noreferrer" aria-label="' . az_esc($label) . '"' . ($hidden ? ' tabindex="-1"' : '') . '>' . $inner . '</a>'
                : '<span>' . $inner . '</span>') . '</li>';
        }
        return $out;
    };
    return '
<section class="trust" aria-labelledby="trust-title">
  <div class="container trust__inner">
    <h2 class="trust__label" id="trust-title">' . az_text('commun.bandeauLogos') . '</h2>
    <div class="marquee">
      <div class="marquee__track">
        <ul class="marquee__group">' . $items(false) . '</ul>
        <ul class="marquee__group" aria-hidden="true">' . $items(true) . '</ul>
      </div>
    </div>
  </div>
</section>';
}

function az_c_partnerFilters($args) {
    $partners = az_partners();
    $out = '<button class="filter-btn" type="button" data-filter="all" aria-pressed="true">' . az_s('partners', 'all') . '<span>' . count($partners) . '</span></button>';
    foreach (az_data('categories') as $cat) {
        $n = count(array_filter($partners, function ($p) use ($cat) { return ($p['category'] ?? '') === $cat['id']; }));
        $out .= '<button class="filter-btn" type="button" data-filter="' . $cat['id'] . '" aria-pressed="false">' . az_L($cat['title']) . '<span>' . $n . '</span></button>';
    }
    return $out;
}

function az_c_partnerCards($args) {
    $t = az_t();
    $missions = az_all_missions();
    $out = '';
    foreach (az_partners() as $i => $p) {
        $url = az_partner_url($p);
        $cat = az_find(az_data('categories'), $p['category'] ?? '') ?: az_data('categories')[0];
        $logo = !empty($p['logo'])
            ? az_partner_logo($p)
            : '<span class="logo-plate"><span class="monogram">' . az_icon($cat['id'] === 'rural' ? 'grain' : 'group') . '</span><b>' . az_esc($p['acronym']) . '</b></span>';
        $link = $url
            ? '<a class="partner-card__link" href="' . esc_url($url) . '" target="_blank" rel="noopener noreferrer" aria-label="' . az_esc($t['visitOf'] . ' ' . $p['acronym'] . ' ' . $t['newTab']) . '">' . $t['visit'] . ' ' . az_icon('external') . '</a>'
            : '<span class="partner-card__nolink">' . $t['noSite'] . '</span>';
        $n = count(array_filter($missions, function ($m) use ($p) { return $m['partner'] === $p['id']; }));
        $name = az_L($p['name'] ?? '');
        $work = az_L($p['work'] ?? null);
        $out .= '
    <article class="partner-card' . ($url ? ' has-link' : '') . '" data-cat="' . $cat['id'] . '" data-reveal style="--d:' . az_n(($i % 3) * 0.06) . 's">
      <div class="partner-card__logo">' . $logo . '</div>
      <div class="partner-card__body">
        <span class="chip chip--teal partner-card__cat">' . az_L($cat['title']) . '</span>
        <h2 class="partner-card__name">' . az_esc($p['acronym']) . '</h2>
        ' . ($name !== '' && $name !== $p['acronym'] ? '<p class="partner-card__full">' . az_esc($name) . '</p>' : '') . '
        <p class="partner-card__desc">' . az_L($p['desc'] ?? '') . '</p>
        ' . ($work !== '' ? '<div class="partner-card__work"><p class="partner-card__work-label">' . az_s('partners', 'withAz') . '</p><p>' . $work . '</p>' . ($n ? '<a class="partner-card__missions" href="' . esc_url(az_url('projects')) . '?partner=' . $p['id'] . '#references">' . az_s('partners', 'missions', $n) . ' ' . az_icon('arrow') . '</a>' : '') . '</div>' : '') . '
        <div class="partner-card__foot"><span class="pin">' . az_icon('pin') . ' ' . az_L($p['where'] ?? '') . '</span>' . $link . '</div>
      </div>
    </article>';
    }
    return $out;
}

// ---------- Coordonnées ----------

function az_c_social($args) {
    $social = az_social();
    if (!$social) return '';
    $out = '';
    foreach ($social as $s) {
        $out .= '<li><a href="' . esc_url($s['url']) . '" target="_blank" rel="noopener noreferrer" aria-label="' . az_esc($s['name'] . ' ' . az_data('name') . ' ' . az_t('newTab')) . '" title="' . $s['name'] . '">' . az_icon($s['icon']) . '</a></li>';
    }
    return '<ul class="social ' . ($args['cls'] ?? '') . '">' . $out . '</ul>';
}

/** Bandeau de contact : une ligne par numéro de téléphone. */
function az_c_contactLines($args) {
    $out = '';
    foreach (az_phones() as $p) {
        $out .= '<a class="contact-line" href="tel:' . esc_attr($p['tel']) . '"><span class="contact-line__icon">' . az_icon('phone') . '</span><span><small>' . az_t('phone') . '</small>' . esc_html($p['display']) . '</span></a>';
    }
    return $out;
}

/** Page Contact : numéros de téléphone, un par ligne. */
function az_c_phonesBlock($args) {
    $out = '';
    foreach (az_phones() as $p) $out .= '<a href="tel:' . esc_attr($p['tel']) . '" style="display:block">' . esc_html($p['display']) . '</a>';
    return $out;
}

/** Mentions légales : numéros de téléphone sur une ligne. */
function az_c_phonesInline($args) {
    return esc_html(implode(' / ', array_column(az_phones(), 'display')));
}
