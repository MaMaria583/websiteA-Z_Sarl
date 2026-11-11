<?php
/**
 * Blocs dynamiques « A-Z Sarl » (catégorie du même nom dans l'éditeur). Leur contenu vient des fiches et du menu
 * « Coordonnées » ; leur place dans la page, comme tous les autres blocs, se règle dans l'éditeur.
 * Repères {missions}, {email}… : remplacés dans tous les blocs (voir az_placeholders()).
 */

if (!defined('ABSPATH')) exit;

/** Liste des blocs : nom → [titre, description, icône Dashicons, attributs, rendu]. */
function az_block_list() {
    $poles = array_map(function ($s) { return $s['id']; }, az_data('services') ?: []);
    return [
        'references' => ['Références : liste complète', 'Toutes les missions (réalisations et références), filtrables par type, partenaire ou pôle.', 'list-view', [], function () {
            return '<div class="refs-section" data-refs>' . az_strip_section(str_replace(' data-refs>', '>', az_c_references([]))) . '</div>';
        }],
        'references-pole' => ['Références d’un pôle', 'Les missions d’un pôle d’expertise (6 au plus) et le lien vers la liste complète.', 'excerpt-view', ['pole' => ['type' => 'string', 'default' => 'sera', 'enum' => $poles]], function ($a) {
            $html = az_c_serviceRefs(['service' => $a['pole'] ?? 'sera']);
            preg_match('#<a class="link-arrow"[^>]*>.*?</a>#s', $html, $link);
            return az_strip_section($html) . (!empty($link[0]) ? '<p style="margin-top:24px">' . $link[0] . '</p>' : '');
        }],
        'realisations' => ['Cartes des réalisations', 'Les réalisations mises en avant sur l’accueil ou sur un pôle (case « Mettre en avant sur » des fiches).', 'grid-view', ['source' => ['type' => 'string', 'default' => 'home']], function ($a) {
            return az_project_grid($a['source'] ?? 'home');
        }],
        'etudes-de-cas' => ['Études de cas', 'Les réalisations présentées « Étude de cas » (page Réalisations).', 'awards', [], function () {
            return az_c_caseStudies([]);
        }],
        'formations' => ['Cartes « Formations »', 'Les réalisations présentées « Carte » (page Réalisations).', 'welcome-learn-more', [], function () {
            return '<div class="duo">' . az_c_duoCards([]) . '</div>';
        }],
        'sommaire-realisations' => ['Sommaire des réalisations', 'Liens vers chaque réalisation de la page.', 'menu', [], function () {
            return '<nav class="toc" aria-label="' . esc_attr(az_lang() === 'en' ? 'Jump to' : 'Aller à') . '"><ul class="chip-list">' . az_c_projectsToc([]) . '</ul></nav>';
        }],
        'partenaires' => ['Partenaires : fiches et filtres', 'Les fiches du menu « Partenaires », filtrables par catégorie.', 'groups', [], function () {
            return '<div class="filters" role="group" aria-label="' . esc_attr(az_lang() === 'en' ? 'Filter partners' : 'Filtrer les partenaires') . '">' . az_c_partnerFilters([])
                . '</div><p class="sr-only" aria-live="polite" data-filter-status data-template="' . esc_attr(az_s('partners', 'status')) . '"></p><div class="partner-grid">' . az_c_partnerCards([]) . '</div>';
        }],
        'logos' => ['Bandeau des logos partenaires', 'Logos des partenaires qui défilent.', 'images-alt2', [], function () {
            return az_c_marquee([]);
        }],
        'carte' => ['Carte des zones d’intervention', 'Carte du Mali, siège de Bamako et zones d’intervention, avec la légende.', 'location-alt', [], function () {
            return az_fragment('carte');
        }],
        'coordonnees' => ['Coordonnées', 'Adresse, téléphones, e-mails, direction et réseaux sociaux (menu « Coordonnées »).', 'id', ['variante' => ['type' => 'string', 'default' => 'cartes', 'enum' => ['cartes', 'lignes']]], function ($a) {
            return az_fragment(($a['variante'] ?? 'cartes') === 'lignes' ? 'contact-lignes' : 'contact-infos');
        }],
        'formulaire' => ['Formulaire', 'Formulaire de contact ou de dépôt de CV (envoyé à l’adresse du menu « Coordonnées »).', 'email-alt', ['type' => ['type' => 'string', 'default' => 'contact', 'enum' => ['contact', 'cv']]], function ($a) {
            return az_fragment(($a['type'] ?? 'contact') === 'cv' ? 'formulaire-cv' : 'formulaire-contact');
        }],
        'plan' => ['Plan d’accès', 'Plan OpenStreetMap du bureau et lien d’itinéraire.', 'location', [], function () {
            return az_fragment('plan-contact');
        }],
        'icone' => ['Icône A-Z', 'Une icône du jeu d’icônes du site, aux couleurs du bloc.', 'star-filled', ['nom' => ['type' => 'string', 'default' => 'check']], function ($a) {
            return '<span class="az-icone">' . az_icon(sanitize_key($a['nom'] ?? 'check')) . '</span>';
        }],
        'illustration' => ['Illustration « Transformation digitale »', 'Schéma animé de la page Transformation digitale.', 'chart-area', [], function () {
            return az_fragment('illustration-digital');
        }],
    ];
}

/** Fragment rendu par les gabarits du site, dans la langue courante. */
function az_fragment($id) {
    $f = az_json('fragments');
    $html = $f[az_lang()][$id] ?? ($f['fr'][$id] ?? '');
    return az_tokens(az_tokens($html));
}

/** Grille des cartes de réalisations : accueil (« home ») ou un pôle. */
function az_project_grid($source) {
    $list = array_values(array_filter(az_projects(), function ($p) use ($source) { return in_array($source, $p['show_on'] ?? [], true); }));
    if ($source === 'home') $list = array_slice($list, 0, 3);
    else {
        $order = array_flip(az_service($source)['projects'] ?? []);
        foreach ($list as $i => &$p) $p['_o'] = [isset($order[$p['id']]) ? 1 + $order[$p['id']] : 0, $i];
        unset($p);
        usort($list, function ($a, $b) { return $a['_o'] <=> $b['_o']; });
    }
    $n = count($list);
    $cards = '';
    foreach ($list as $k => $p) $cards .= az_project_card($p, $k * 0.06);
    return '<div class="proj-grid' . ($n === 1 ? ' proj-grid--one' : '') . ($n === 2 || $n === 4 ? ' proj-grid--two' : '') . '">' . $cards . '</div>';
}

add_action('init', function () {
    wp_register_style('az-blocks', AZ_URI . '/assets/blocks.css', [], AZ_PLUGIN_VERSION . '-' . filemtime(AZ_DIR . '/assets/blocks.css'));
    wp_register_script('az-front', AZ_URI . '/assets/front.js', [], AZ_PLUGIN_VERSION . '-' . filemtime(AZ_DIR . '/assets/front.js'), ['in_footer' => true, 'strategy' => 'defer']);
    wp_register_script('az-blocks-editor', AZ_URI . '/assets/editor.js', ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-server-side-render', 'wp-i18n'], AZ_PLUGIN_VERSION . '-' . filemtime(AZ_DIR . '/assets/editor.js'), true);

    $list = az_block_list();
    $editor = [];
    foreach ($list as $name => $b) {
        register_block_type('az/' . $name, [
            'api_version' => 3,
            'title' => $b[0],
            'description' => $b[1],
            'category' => 'az-sarl',
            'attributes' => $b[3] + ['className' => ['type' => 'string'], 'align' => ['type' => 'string']],
            'supports' => ['align' => ['wide', 'full'], 'html' => false, 'spacing' => ['margin' => true, 'padding' => true], 'color' => ['background' => true, 'text' => true]],
            'editor_script_handles' => ['az-blocks-editor'],
            'style_handles' => ['az-blocks'],
            'view_script_handles' => ['az-front'],
            'render_callback' => function ($attrs) use ($b) {
                $wrapper = get_block_wrapper_attributes(['class' => 'az-bloc']);
                return '<div ' . $wrapper . '>' . az_typography(($b[4])($attrs), az_lang()) . '</div>';
            },
        ]);
        $editor[] = ['name' => 'az/' . $name, 'title' => $b[0], 'description' => $b[1], 'icon' => $b[2], 'attributes' => $b[3]];
    }
    wp_add_inline_script('az-blocks-editor', 'window.azBlocks = ' . wp_json_encode([
        'blocks' => $editor,
        'poles' => array_map(function ($s) { return ['value' => $s['id'], 'label' => az_L($s['short'], 'fr')]; }, az_data('services') ?: []),
        'icons' => array_values(array_unique(array_merge(array_keys(az_data('icons')['paths'] ?? []), array_keys(az_data('icons')['filled'] ?? [])))),
    ]) . ';', 'before');
});

add_filter('block_categories_all', function ($cats) {
    array_unshift($cats, ['slug' => 'az-sarl', 'title' => 'A-Z Sarl', 'icon' => null]);
    return $cats;
});

// Styles des composants aussi dans l'éditeur (aperçu fidèle des blocs dynamiques)
add_action('enqueue_block_assets', function () {
    wp_enqueue_style('az-blocks');
});

// Repères {missions}, {email}… dans tous les blocs du contenu
add_filter('render_block', function ($html, $block) {
    return (is_string($html) && strpos($html, '{') !== false) ? az_placeholders($html) : $html;
}, 10, 2);

// Données structurées sur la page d'accueil
add_action('wp_head', function () {
    if (is_front_page()) echo az_json_ld() . "\n";
});

// ---------- Codes courts : utilisables dans les réglages d'Astra (en-tête, pied de page) et dans les blocs ----------
// [az cle="email"]   coordonnée : email, telephones, telephone1, telephone2, adresse, rue, ville, pays, whatsapp, directeur
// [az_lien page="contact"]   adresse d'une page du site dans la langue affichée (about, projects, partners, join,
//                            contact, legal, expertises, service:sera…)
// [az_reseaux]   icônes LinkedIn et Facebook (menu « Coordonnées »)
add_shortcode('az', function ($a) {
    $k = sanitize_key($a['cle'] ?? '');
    switch ($k) {
        case 'email': $e = az_opt('email'); return '<a href="mailto:' . esc_attr($e) . '">' . esc_html($e) . '</a>';
        case 'telephones': return implode('<br>', array_map(function ($p) { return '<a href="tel:' . esc_attr($p['tel']) . '">' . esc_html($p['display']) . '</a>'; }, az_phones()));
        case 'telephone1': case 'telephone2':
            $p = az_phones()[$k === 'telephone1' ? 0 : 1] ?? null;
            return $p ? '<a href="tel:' . esc_attr($p['tel']) . '">' . esc_html($p['display']) . '</a>' : '';
        case 'adresse': return esc_html(az_opt('street')) . '<br>' . esc_html(az_opt('city')) . ', ' . esc_html(az_opt('country'));
        case 'whatsapp': return esc_url(az_whatsapp_url());
        case 'directeur': return esc_html(az_opt('director_name'));
        default: return esc_html(az_opt($k));
    }
});
add_shortcode('az_lien', function ($a) {
    return esc_url(az_url(sanitize_text_field($a['page'] ?? 'home')));
});
add_shortcode('az_reseaux', function ($a) {
    return az_c_social(['cls' => sanitize_html_class($a['style'] ?? 'social--footer')]);
});
// Codes courts aussi dans les textes HTML et le copyright d'Astra
add_filter('astra_get_option_footer-copyright-editor', 'do_shortcode', 20);

// [az_pied cle="expertises"] / [az_pied cle="contact"] : colonnes du pied de page, dans la langue affichée
// (widgets du pied de page d'Astra ; le contenu suit les pôles et le menu « Coordonnées »)
add_shortcode('az_pied', function ($a) {
    $en = az_lang() === 'en';
    if (($a['cle'] ?? '') === 'contact') {
        return '<p><strong>Contact</strong></p><p>' . do_shortcode('[az cle="adresse"]') . '</p><p>' . do_shortcode('[az cle="telephones"]') . '</p><p>' . do_shortcode('[az cle="email"]') . '</p>';
    }
    $links = array_map(function ($s) { return '<a href="' . esc_url(az_url('service:' . $s['id'])) . '">' . esc_html(az_L($s['short'])) . '</a>'; }, az_data('services') ?: []);
    return '<p><strong>' . ($en ? 'Expertise' : 'Expertises') . '</strong></p><p>' . implode('<br>', $links) . '</p>';
});

/** Contenu d'une section des anciens gabarits sans son en-tête ni son enveloppe (le titre est fait en blocs). */
function az_strip_section($html) {
    $html = preg_replace('#<div class="section-head[^"]*"[^>]*>.*?</div>(?:<p class="lead">.*?</p>|<p><a class="link-arrow".*?</a></p>)?</div>#s', '', $html, 1);
    $html = preg_replace('#^\s*<section\b[^>]*>\s*<div class="container">#', '', $html);
    return preg_replace('#</div>\s*</section>\s*$#', '', $html);
}
