<?php
/**
 * Administration : types de contenus (Réalisations, Références, Partenaires), formulaires de saisie
 * bilingues et page « Coordonnées ». Chaque fiche enregistre ses champs dans la métadonnée _az_data.
 */

if (!defined('ABSPATH')) exit;

// ---------- Types de contenus ----------

function az_types() {
    return [
        'project' => ['Réalisations', 'Réalisation', 'dashicons-awards', 'une réalisation'],
        'reference' => ['Références', 'Référence', 'dashicons-list-view', 'une référence'],
        'partner' => ['Partenaires', 'Partenaire', 'dashicons-groups', 'un partenaire'],
    ];
}

add_action('init', function () {
    $pos = 21;
    foreach (az_types() as $type => $l) {
        register_post_type('az_' . $type, [
            'labels' => [
                'name' => $l[0], 'singular_name' => $l[1], 'menu_name' => $l[0],
                'add_new' => 'Ajouter', 'add_new_item' => 'Ajouter ' . $l[3], 'edit_item' => 'Modifier ' . $l[3],
                'new_item' => $l[1], 'search_items' => 'Rechercher', 'all_items' => 'Toutes les fiches',
                'not_found' => 'Aucune fiche.', 'not_found_in_trash' => 'Aucune fiche dans la corbeille.',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => false,
            'menu_position' => $pos++,
            'menu_icon' => $l[2],
            'capability_type' => 'page',
            'map_meta_cap' => true,
            'supports' => ['page-attributes'],
            'has_archive' => false,
            'rewrite' => false,
            'query_var' => false,
        ]);
    }
});

// ---------- Description des champs ----------
// Types : line (une ligne), line2 (une ligne FR + EN), text2 (paragraphe FR + EN), lines2 (liste, une entrée
// par ligne, FR + EN), paras2 (paragraphes séparés par une ligne vide, FR + EN), facts (« Libellé | Valeur »
// par ligne, FR + EN), select, checks, partner, link, logo, photos.

function az_fields($type) {
    $kinds = [];
    foreach (az_data('kinds') as $id => $k) $kinds[$id] = $k['fr'];
    $poles = [];
    foreach (az_data('services') as $s) $poles[$s['id']] = $s['short']['fr'];
    $cats = [];
    foreach (az_data('categories') as $c) $cats[$c['id']] = $c['title']['fr'];
    $zones = [];
    foreach (az_data('places') as $p) if (empty($p['hq'])) $zones[$p['id']] = $p['name'];

    switch ($type) {
        case 'reference':
            return [
                ['title', 'Intitulé de la mission', 'text2', 'help' => 'Affiché dans la liste « Toutes nos missions » de la page Réalisations.', 'required' => true],
                ['year', 'Année', 'line', 'help' => 'Exemple : 2026. La liste est triée de la mission la plus récente à la plus ancienne.'],
                ['partner', 'Commanditaire', 'partner', 'help' => 'Laisser « A-Z Sarl » pour une initiative propre du bureau.'],
                ['kind', 'Type de mission', 'select', 'options' => $kinds],
                ['services', 'Pôles concernés', 'checks', 'options' => $poles, 'help' => 'La mission apparaît aussi sur la page de chaque pôle coché.'],
                ['zone', 'Lieu', 'line2', 'help' => 'Exemple : Cercle de Barouéli.'],
                ['note', 'Remarque', 'line2', 'help' => 'Facultatif. Courte précision affichée après le lieu.'],
            ];
        case 'partner':
            return [
                ['acronym', 'Nom court ou sigle', 'line', 'help' => 'Exemple : GIZ, World Renew.', 'required' => true],
                ['name', 'Nom complet', 'line2'],
                ['category', 'Catégorie', 'select', 'options' => $cats],
                ['where', 'Pays ou localisation', 'line2', 'help' => 'Exemple : Allemagne · bureau à Bamako.'],
                ['logo', 'Logo', 'logo', 'help' => 'PNG ou WebP sur fond transparent, 600 px de large environ. Sans logo, le sigle est affiché à la place.'],
                ['url', 'Site web', 'line2', 'help' => 'Adresse complète (https://…). Si le site n’a qu’une version, saisir la même adresse dans les deux langues. Laisser vide s’il n’y a pas de site.'],
                ['desc', 'Présentation du partenaire', 'text2'],
                ['work', 'Avec A-Z Sarl', 'text2', 'help' => 'Ce que le bureau a réalisé avec ce partenaire.'],
            ];
        case 'project':
            return [
                ['title', 'Intitulé complet', 'text2', 'required' => true],
                ['short', 'Intitulé court', 'line2', 'help' => 'Facultatif. Utilisé sur les cartes et dans le sommaire quand l’intitulé complet est long.'],
                ['tag', 'Étiquette', 'line2', 'help' => 'Exemple : Formation · Digital & IA.'],
                ['year', 'Année', 'line'],
                ['kind', 'Type de mission', 'select', 'options' => $kinds],
                ['partner', 'Partenaire', 'partner'],
                ['services', 'Pôles concernés', 'checks', 'options' => $poles, 'help' => 'Sert aux filtres de la liste des références.'],
                ['zone', 'Lieu', 'line2'],
                ['layout', 'Présentation sur la page Réalisations', 'select', 'options' => ['case' => 'Étude de cas (pleine largeur)', 'duo' => 'Carte (rubrique « Formations »)']],
                ['show_on', 'Mettre en avant sur', 'checks', 'options' => ['home' => 'Page d’accueil (3 au plus)'] + $poles, 'help' => 'Pages qui affichent la carte de cette réalisation.'],
                ['quote', 'Phrase d’accroche', 'line2', 'help' => 'Facultatif. Affichée entre guillemets sous le titre.'],
                ['text', 'Texte', 'paras2', 'help' => 'Séparer les paragraphes par une ligne vide. Le même nombre de paragraphes est attendu dans les deux langues.'],
                ['missions', 'Volets de la mission', 'lines2', 'help' => 'Facultatif. Un volet par ligne.'],
                ['modulesLabel', 'Titre de la liste de thèmes', 'line2', 'help' => 'Facultatif. Par défaut : « Au programme ».'],
                ['modules', 'Thèmes ou modules', 'lines2', 'help' => 'Facultatif. Un thème par ligne.'],
                ['facts', 'Fiche technique', 'facts', 'help' => 'Une information par ligne, sous la forme : Libellé | Valeur. Exemple : Lieu | Bamako.'],
                ['link', 'Document à consulter', 'link', 'help' => 'Facultatif. Lien vers un rapport public, par exemple.'],
                ['photos', 'Photos', 'photos', 'help' => 'La première photo sert de visuel principal. Glisser les lignes pour changer l’ordre. Décrire chaque photo en une phrase (texte lu par les lecteurs d’écran et affiché dans la visionneuse).'],
                ['zones', 'Carte des zones', 'checks', 'options' => $zones, 'help' => 'Utilisée seulement s’il n’y a aucune photo : la réalisation est alors illustrée par une carte des zones cochées.'],
            ];
    }
    return [];
}

function az_option_fields() {
    return [
        'Téléphone et messagerie' => [
            ['phones', 'Numéros de téléphone', 'area', 'help' => 'Un numéro par ligne, au format international. Exemple : +223 79 27 73 60.'],
            ['whatsapp', 'Numéro WhatsApp', 'line', 'help' => 'Format international, chiffres seulement. Exemple : 22379277360.'],
            ['email', 'Adresse e-mail affichée sur le site', 'line'],
            ['form_email', 'Adresse qui reçoit les formulaires', 'line', 'help' => 'Les formulaires Contact et Banque d’experts passent par le service FormSubmit. Après un changement d’adresse, envoyer un message test puis cliquer sur le lien d’activation reçu dans cette boîte.'],
        ],
        'Adresse' => [
            ['street', 'Rue ou quartier', 'line'],
            ['city', 'Ville', 'line'],
            ['country', 'Pays', 'line'],
        ],
        'Direction' => [
            ['director_name', 'Nom', 'line'],
            ['director_initials', 'Initiales', 'line'],
            ['director_role_fr', 'Fonction (français)', 'line'],
            ['director_role_en', 'Fonction (anglais)', 'line'],
            ['director_email', 'E-mail', 'line'],
        ],
        'Réseaux sociaux et mentions légales' => [
            ['linkedin', 'Page LinkedIn', 'line', 'help' => 'Adresse complète. Laisser vide pour masquer l’icône.'],
            ['facebook', 'Page Facebook', 'line'],
            ['legal_host', 'Hébergeur (mentions légales)', 'line'],
        ],
    ];
}

// ---------- Nettoyage des saisies ----------

function az_clean($value, $multiline = false) {
    $allowed = [
        'span' => ['class' => true], 'strong' => [], 'b' => [], 'em' => [], 'i' => [], 'small' => [], 'sup' => [], 'br' => [],
        'a' => ['href' => true, 'target' => true, 'rel' => true],
    ];
    // « & » reste tel quel (comme dans les contenus d'origine), pour se relire normalement dans les formulaires
    $value = str_replace('&amp;', '&', wp_kses((string) $value, $allowed));
    $value = $multiline ? preg_replace('/\r\n?/', "\n", $value) : preg_replace('/\s+/u', ' ', $value);
    return trim($value);
}

function az_clean_pair($v, $multiline = false) {
    $out = ['fr' => az_clean($v['fr'] ?? '', $multiline), 'en' => az_clean($v['en'] ?? '', $multiline)];
    if ($out['fr'] === '' && $out['en'] === '') return null;
    if ($out['en'] === '') $out['en'] = $out['fr'];
    return $out;
}

function az_split_lines($text) {
    return array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) $text)), 'strlen'));
}

function az_split_paras($text) {
    $paras = preg_split('/\n\s*\n/', preg_replace('/\r\n?/', "\n", (string) $text));
    return array_values(array_filter(array_map(function ($p) { return az_clean(preg_replace('/\s*\n\s*/', ' ', $p)); }, $paras), 'strlen'));
}

/** Valeur enregistrée d'un champ à partir de la saisie ; null = champ vide (non enregistré). */
function az_field_value($field, $raw) {
    switch ($field[2]) {
        case 'line':
        case 'area':
            $v = $field[2] === 'area' ? az_clean($raw, true) : az_clean($raw);
            return $v === '' ? null : $v;
        case 'line2':
            return az_clean_pair(is_array($raw) ? $raw : []);
        case 'text2':
            $pair = az_clean_pair(is_array($raw) ? $raw : [], true);
            return $pair ? array_map(function ($t) { return preg_replace('/\s*\n\s*/', ' ', $t); }, $pair) : null;
        case 'lines2':
            $fr = array_map('az_clean', az_split_lines($raw['fr'] ?? ''));
            $en = array_map('az_clean', az_split_lines($raw['en'] ?? ''));
            return $fr || $en ? ['fr' => $fr ?: $en, 'en' => $en ?: $fr] : null;
        case 'paras2':
            $fr = az_split_paras($raw['fr'] ?? '');
            $en = az_split_paras($raw['en'] ?? '');
            $out = [];
            for ($i = 0; $i < max(count($fr), count($en)); $i++) {
                $out[] = ['fr' => $fr[$i] ?? ($en[$i] ?? ''), 'en' => $en[$i] ?? ($fr[$i] ?? '')];
            }
            return $out ?: null;
        case 'facts':
            $parse = function ($text) {
                return array_map(function ($line) {
                    $parts = array_map('az_clean', explode('|', $line, 2));
                    return [$parts[0], $parts[1] ?? ''];
                }, az_split_lines($text));
            };
            $fr = $parse($raw['fr'] ?? '');
            $en = $parse($raw['en'] ?? '');
            $out = [];
            for ($i = 0; $i < max(count($fr), count($en)); $i++) {
                $a = $fr[$i] ?? $en[$i];
                $b = $en[$i] ?? $fr[$i];
                $out[] = ['k' => ['fr' => $a[0], 'en' => $b[0]], 'v' => ['fr' => $a[1], 'en' => $b[1]]];
            }
            return $out ?: null;
        case 'select':
        case 'partner':
            $v = sanitize_key($raw);
            if ($field[2] === 'select' && !isset($field['options'][$v])) $v = (string) array_key_first($field['options']);
            return $v === '' ? null : $v;
        case 'checks':
            $v = array_values(array_intersect(array_keys($field['options']), array_map('sanitize_key', (array) $raw)));
            return $v ?: null;
        case 'link':
            $url = esc_url_raw(trim((string) ($raw['url'] ?? '')));
            if ($url === '') return null;
            return ['url' => $url, 'label' => az_clean_pair($raw['label'] ?? []) ?: ['fr' => 'Consulter le document', 'en' => 'Read the document']];
        case 'logo':
            $v = json_decode((string) $raw, true);
            if (!is_array($v)) return null;
            if (!empty($v['att'])) return ['att' => (int) $v['att']];
            if (empty($v['file'])) return null;
            $out = ['file' => sanitize_file_name($v['file']), 'width' => (int) ($v['width'] ?? 0), 'height' => (int) ($v['height'] ?? 0)];
            if (!empty($v['raster'])) $out['raster'] = true;
            if (!empty($v['alt']) && is_array($v['alt'])) $out['alt'] = az_clean_pair($v['alt']);
            return $out;
        case 'photos':
            $list = json_decode((string) $raw, true);
            $out = [];
            foreach (is_array($list) ? $list : [] as $ph) {
                $item = !empty($ph['att']) ? ['att' => (int) $ph['att']] : (!empty($ph['id']) ? ['id' => sanitize_file_name($ph['id'])] : null);
                if (!$item) continue;
                $item['alt'] = az_clean_pair($ph['alt'] ?? []) ?: ['fr' => '', 'en' => ''];
                $out[] = $item;
            }
            return $out ?: null;
    }
    return null;
}

// ---------- Formulaires des fiches ----------

add_action('add_meta_boxes', function () {
    foreach (az_types() as $type => $l) {
        add_meta_box('az_fields', $l[1], 'az_render_fields', 'az_' . $type, 'normal', 'high', ['type' => $type]);
    }
});

function az_render_fields($post, $box) {
    $type = $box['args']['type'];
    $data = get_post_meta($post->ID, '_az_data', true);
    if (!is_array($data)) $data = [];
    wp_nonce_field('az_save_' . $type, 'az_nonce');
    echo '<p class="az-intro">Les champs à deux colonnes se remplissent en <strong>français</strong> et en <strong>anglais</strong>. Si l’anglais est laissé vide, le texte français est repris.</p>';
    echo '<table class="form-table az-form"><tbody>';
    foreach (az_fields($type) as $f) {
        echo '<tr><th scope="row"><label>' . esc_html($f[1]) . (!empty($f['required']) ? ' <span class="az-req">*</span>' : '') . '</label></th><td>';
        az_render_field($f, $data[$f[0]] ?? null, 'az[' . $f[0] . ']');
        if (!empty($f['help'])) echo '<p class="description">' . esc_html($f['help']) . '</p>';
        echo '</td></tr>';
    }
    echo '</tbody></table>';
}

function az_pair_inputs($name, $fr, $en, $rows = 0) {
    echo '<div class="az-pair">';
    foreach (['fr' => ['Français', $fr], 'en' => ['English', $en]] as $l => $v) {
        echo '<label><span class="az-lang">' . $v[0] . '</span>';
        if ($rows) echo '<textarea name="' . esc_attr($name . '[' . $l . ']') . '" rows="' . (int) $rows . '">' . esc_textarea($v[1]) . '</textarea>';
        else echo '<input type="text" name="' . esc_attr($name . '[' . $l . ']') . '" value="' . esc_attr($v[1]) . '">';
        echo '</label>';
    }
    echo '</div>';
}

function az_render_field($f, $value, $name) {
    switch ($f[2]) {
        case 'line':
            echo '<input type="text" class="regular-text" name="' . esc_attr($name) . '" value="' . esc_attr((string) $value) . '">';
            break;
        case 'area':
            echo '<textarea class="large-text" rows="3" name="' . esc_attr($name) . '">' . esc_textarea((string) $value) . '</textarea>';
            break;
        case 'line2':
            az_pair_inputs($name, $value['fr'] ?? '', $value['en'] ?? '');
            break;
        case 'text2':
            az_pair_inputs($name, $value['fr'] ?? '', $value['en'] ?? '', 4);
            break;
        case 'lines2':
            az_pair_inputs($name, implode("\n", $value['fr'] ?? []), implode("\n", $value['en'] ?? []), 6);
            break;
        case 'paras2':
            $value = is_array($value) ? $value : [];
            az_pair_inputs($name, implode("\n\n", array_column($value, 'fr')), implode("\n\n", array_column($value, 'en')), 10);
            break;
        case 'facts':
            $join = function ($l) use ($value) {
                return implode("\n", array_map(function ($x) use ($l) { return ($x['k'][$l] ?? '') . ' | ' . ($x['v'][$l] ?? ''); }, is_array($value) ? $value : []));
            };
            az_pair_inputs($name, $join('fr'), $join('en'), 6);
            break;
        case 'select':
            echo '<select name="' . esc_attr($name) . '">';
            foreach ($f['options'] as $k => $label) echo '<option value="' . esc_attr($k) . '"' . selected($value, $k, false) . '>' . esc_html($label) . '</option>';
            echo '</select>';
            break;
        case 'partner':
            echo '<select name="' . esc_attr($name) . '"><option value="">A-Z Sarl (aucun partenaire)</option>';
            foreach (az_partners() as $p) echo '<option value="' . esc_attr($p['id']) . '"' . selected($value, $p['id'], false) . '>' . esc_html($p['acronym'] ?? $p['id']) . '</option>';
            echo '</select>';
            break;
        case 'checks':
            echo '<fieldset class="az-checks">';
            foreach ($f['options'] as $k => $label) {
                echo '<label><input type="checkbox" name="' . esc_attr($name) . '[]" value="' . esc_attr($k) . '"' . checked(in_array($k, (array) $value, true), true, false) . '> ' . esc_html($label) . '</label>';
            }
            echo '</fieldset>';
            break;
        case 'link':
            echo '<input type="url" class="large-text" placeholder="https://…" name="' . esc_attr($name) . '[url]" value="' . esc_attr($value['url'] ?? '') . '">';
            echo '<p class="az-sub">Texte du lien</p>';
            az_pair_inputs($name . '[label]', $value['label']['fr'] ?? '', $value['label']['en'] ?? '');
            break;
        case 'logo':
            $preview = '';
            if (!empty($value['att'])) $preview = (string) wp_get_attachment_image_url((int) $value['att'], 'medium');
            elseif (!empty($value['file'])) $preview = az_asset('img/partners/' . $value['file'] . (!empty($value['raster']) ? '.png' : ''));
            echo '<div class="az-logo" data-az-logo>';
            echo '<input type="hidden" name="' . esc_attr($name) . '" value="' . esc_attr(wp_json_encode($value ?: null)) . '">';
            echo '<span class="az-logo__preview">' . ($preview ? '<img src="' . esc_url($preview) . '" alt="">' : '<em>Aucun logo</em>') . '</span> ';
            echo '<button type="button" class="button" data-az-logo-pick>Choisir un logo</button> <button type="button" class="button-link az-remove" data-az-logo-clear>Retirer</button>';
            echo '</div>';
            break;
        case 'photos':
            $items = [];
            foreach (is_array($value) ? $value : [] as $ph) {
                $thumb = !empty($ph['att']) ? (string) wp_get_attachment_image_url((int) $ph['att'], 'thumbnail') : az_asset('img/photos/' . ($ph['id'] ?? '') . '-480.jpg');
                $items[] = $ph + ['thumb' => $thumb];
            }
            echo '<div class="az-photos" data-az-photos>';
            echo '<input type="hidden" name="' . esc_attr($name) . '" value="' . esc_attr(wp_json_encode($items)) . '">';
            echo '<ul class="az-photos__list"></ul>';
            echo '<button type="button" class="button button-secondary" data-az-photos-add>Ajouter des photos</button>';
            echo '</div>';
            break;
    }
}

add_action('admin_enqueue_scripts', function ($hook) {
    $screen = get_current_screen();
    $is_az = $screen && (strpos((string) $screen->post_type, 'az_') === 0 || strpos((string) $screen->id, 'az-coordonnees') !== false);
    if (!$is_az) return;
    wp_enqueue_style('az-admin', AZ_URI . '/admin/admin.css', [], filemtime(AZ_DIR . '/admin/admin.css'));
    if (in_array($hook, ['post.php', 'post-new.php'], true)) {
        wp_enqueue_media();
        wp_enqueue_script('az-admin', AZ_URI . '/admin/admin.js', ['jquery', 'jquery-ui-sortable'], filemtime(AZ_DIR . '/admin/admin.js'), true);
    }
});

// ---------- Enregistrement des fiches ----------

function az_posted_type() {
    $post_type = (string) ($_POST['post_type'] ?? '');
    $type = strpos($post_type, 'az_') === 0 ? substr($post_type, 3) : '';
    if (!isset(az_types()[$type]) || !isset($_POST['az'], $_POST['az_nonce'])) return '';
    return wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['az_nonce'])), 'az_save_' . $type) ? $type : '';
}

function az_posted_data($type) {
    $posted = wp_unslash($_POST['az']);
    $data = [];
    foreach (az_fields($type) as $f) {
        $v = az_field_value($f, $posted[$f[0]] ?? null);
        if ($v !== null) $data[$f[0]] = $v;
    }
    return $data;
}

// Titre et identifiant de la fiche, déduits des champs (le titre WordPress n'est pas saisi à part)
add_filter('wp_insert_post_data', function ($data, $postarr) {
    $type = az_posted_type();
    if (!$type || $data['post_type'] !== 'az_' . $type) return $data;
    $fields = az_posted_data($type);
    $title = $type === 'partner' ? ($fields['acronym'] ?? '') : ($fields['title']['fr'] ?? '');
    $title = wp_strip_all_tags($title);
    if ($title === '') return $data;
    $data['post_title'] = wp_slash($title);
    if ($data['post_name'] === '' && !in_array($data['post_status'], ['auto-draft', 'trash'], true)) {
        $base = sanitize_title(wp_trim_words($title, 8, '') . (!empty($fields['year']) && $type !== 'partner' ? ' ' . $fields['year'] : ''));
        $data['post_name'] = wp_unique_post_slug($base, (int) ($postarr['ID'] ?? 0), 'publish', $data['post_type'], 0);
    }
    return $data;
}, 10, 2);

add_action('save_post', function ($post_id, $post) {
    $type = az_posted_type();
    if (!$type || $post->post_type !== 'az_' . $type) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($post_id) || !current_user_can('edit_post', $post_id)) return;
    update_post_meta($post_id, '_az_data', wp_slash(az_posted_data($type)));
}, 10, 2);

// ---------- Listes de l'administration ----------

foreach (array_keys(az_types()) as $az_type) {
    add_filter('manage_az_' . $az_type . '_posts_columns', function ($cols) use ($az_type) {
        $out = ['cb' => $cols['cb'], 'title' => $az_type === 'partner' ? 'Partenaire' : 'Intitulé'];
        if ($az_type !== 'partner') $out += ['az_year' => 'Année', 'az_partner' => 'Commanditaire', 'az_kind' => 'Type'];
        else $out += ['az_category' => 'Catégorie'];
        if ($az_type === 'project') $out += ['az_layout' => 'Présentation'];
        return $out + ['az_order' => 'Ordre'];
    });
    add_action('manage_az_' . $az_type . '_posts_custom_column', function ($col, $post_id) {
        $d = get_post_meta($post_id, '_az_data', true);
        if (!is_array($d)) $d = [];
        switch ($col) {
            case 'az_year': echo esc_html($d['year'] ?? '—'); break;
            case 'az_partner':
                $p = !empty($d['partner']) ? az_find(az_partners(), $d['partner']) : null;
                echo esc_html($p ? $p['acronym'] : 'A-Z Sarl');
                break;
            case 'az_kind': echo esc_html(az_data('kinds')[$d['kind'] ?? '']['fr'] ?? '—'); break;
            case 'az_category':
                $c = az_find(az_data('categories'), $d['category'] ?? '');
                echo esc_html($c ? $c['title']['fr'] : '—');
                break;
            case 'az_layout': echo ($d['layout'] ?? 'case') === 'duo' ? 'Carte' : 'Étude de cas'; break;
            case 'az_order': echo (int) get_post($post_id)->menu_order; break;
        }
    }, 10, 2);
}
unset($az_type);

// Même ordre que sur le site : champ « Ordre » croissant, puis les fiches les plus récentes
add_action('pre_get_posts', function ($q) {
    if (!is_admin() || !$q->is_main_query() || $q->get('orderby')) return;
    if (strpos((string) $q->get('post_type'), 'az_') === 0) $q->set('orderby', ['menu_order' => 'ASC', 'ID' => 'DESC']);
});

add_filter('post_updated_messages', function ($messages) {
    foreach (az_types() as $type => $l) {
        $messages['az_' . $type] = array_fill(0, 11, 'Fiche enregistrée.');
        $messages['az_' . $type][6] = 'Fiche publiée : elle est visible sur le site.';
        $messages['az_' . $type][10] = 'Brouillon enregistré (non visible sur le site).';
    }
    return $messages;
});

// ---------- Page « Coordonnées » ----------

add_action('admin_menu', function () {
    add_menu_page('Coordonnées A-Z Sarl', 'Coordonnées', 'edit_pages', 'az-coordonnees', 'az_render_options', 'dashicons-location', 24);
});

function az_render_options() {
    if (!current_user_can('edit_pages')) return;
    $saved = false;
    if (isset($_POST['az_options_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['az_options_nonce'])), 'az_options')) {
        $posted = wp_unslash($_POST['az'] ?? []);
        $o = [];
        foreach (az_option_fields() as $fields) {
            foreach ($fields as $f) {
                $raw = (string) ($posted[$f[0]] ?? '');
                if (in_array($f[0], ['email', 'form_email', 'director_email'], true)) $o[$f[0]] = sanitize_email($raw);
                elseif (in_array($f[0], ['linkedin', 'facebook'], true)) $o[$f[0]] = esc_url_raw(trim($raw));
                elseif ($f[2] === 'area') $o[$f[0]] = sanitize_textarea_field($raw);
                else $o[$f[0]] = sanitize_text_field($raw);
            }
        }
        update_option('az_options', $o);
        $saved = true;
    }
    $saved_o = get_option('az_options', []);
    $o = array_merge(az_json('seed')['options'] ?? [], is_array($saved_o) ? $saved_o : []);
    echo '<div class="wrap"><h1>Coordonnées A-Z Sarl</h1>';
    if ($saved) echo '<div class="notice notice-success is-dismissible"><p>Coordonnées enregistrées. Elles sont à jour sur toutes les pages du site.</p></div>';
    echo '<p>Ces informations sont reprises partout sur le site : en-tête, pied de page, page Contact, mentions légales, bouton WhatsApp.</p>';
    echo '<form method="post">';
    wp_nonce_field('az_options', 'az_options_nonce');
    foreach (az_option_fields() as $title => $fields) {
        echo '<h2 class="title">' . esc_html($title) . '</h2><table class="form-table az-form"><tbody>';
        foreach ($fields as $f) {
            echo '<tr><th scope="row"><label>' . esc_html($f[1]) . '</label></th><td>';
            az_render_field($f, $o[$f[0]] ?? '', 'az[' . $f[0] . ']');
            if (!empty($f['help'])) echo '<p class="description">' . esc_html($f['help']) . '</p>';
            echo '</td></tr>';
        }
        echo '</tbody></table>';
    }
    submit_button('Enregistrer les coordonnées');
    echo '</form></div>';
}

// ---------- Pages du site : pas d'éditeur de blocs, un écran d'explication à la place ----------
// Le contenu de ces pages vient du thème : l'éditeur ne montrerait qu'un texte technique et laisserait croire
// que la page est vide.

function az_is_theme_page($post) {
    $post = get_post($post);
    return $post && $post->post_type === 'page' && get_post_meta($post->ID, '_az_page', true);
}

add_filter('use_block_editor_for_post', function ($use, $post) {
    return az_is_theme_page($post) ? false : $use;
}, 10, 2);

add_action('load-post.php', function () {
    $id = isset($_GET['post']) ? (int) $_GET['post'] : 0;
    if ($id && az_is_theme_page($id)) remove_post_type_support('page', 'editor');
});

add_action('edit_form_after_title', function ($post) {
    if (!az_is_theme_page($post)) return;
    $link = function ($type, $label) { return '<a class="button" href="' . esc_url(admin_url('edit.php?post_type=az_' . $type)) . '">' . $label . '</a>'; };
    echo '<div class="notice notice-info inline" style="margin:16px 0;padding:16px 20px">'
        . '<p style="font-size:15px;margin:0 0 8px"><strong>Cette page est une page du site A-Z Sarl : son design et ses textes sont fournis par le thème.</strong></p>'
        . '<p style="margin:0 0 14px">Il n’y a rien à modifier ici. Pour voir la page : <a href="' . esc_url(get_permalink($post)) . '" target="_blank">' . esc_html(get_permalink($post)) . '</a>. Pour modifier les contenus :</p>'
        . '<p style="margin:0;display:flex;gap:8px;flex-wrap:wrap">' . $link('project', 'Réalisations') . $link('reference', 'Références') . $link('partner', 'Partenaires')
        . '<a class="button" href="' . esc_url(admin_url('admin.php?page=az-coordonnees')) . '">Coordonnées</a></p>'
        . '<p style="margin:14px 0 0;color:#646970">Ne pas changer l’adresse (slug) de cette page ni la supprimer.</p></div>';
});

// Liste des pages : repère « Page du site (thème) »
add_filter('display_post_states', function ($states, $post) {
    if (az_is_theme_page($post)) $states['az'] = 'Page du site (thème)';
    return $states;
}, 10, 2);

// Barre d'administration sur le site : pas de lien « Modifier la page » vers un écran vide
add_action('admin_bar_menu', function ($bar) {
    if (!is_admin() && is_page() && az_is_theme_page(get_queried_object_id())) $bar->remove_node('edit');
}, 999);
