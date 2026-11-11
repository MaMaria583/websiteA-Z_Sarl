<?php
/**
 * Menu « Textes des pages » : tous les textes des pages (titres, paragraphes, listes, libellés) en français et en
 * anglais. Seuls les textes modifiés sont enregistrés (option az_texts) ; les autres suivent le texte d'origine
 * fourni par le thème (data/texts.json). Affichage : az_text() dans inc/render.php.
 */

if (!defined('ABSPATH')) exit;

/** Rubrique de « Textes des pages » qui correspond à une page du site (identifiant _az_page). */
function az_text_group_of_page($page_id) {
    $page_id = (string) $page_id;
    if (strpos($page_id, 'service:') === 0) return 'pole:' . substr($page_id, 8);
    return isset(az_json('texts')['groups'][$page_id]) ? $page_id : '';
}

add_action('admin_menu', function () {
    add_menu_page('Textes des pages', 'Textes des pages', 'edit_pages', 'az-textes', 'az_render_texts', 'dashicons-edit-page', 20);
});

/** Emplacement lisible d'un texte : « hero › title ». */
function az_text_label($key, $group) {
    if (strpos($group, 'pole:') === 0) $prefix = 'pole.' . substr($group, 5) . '.';
    elseif ($group === 'domaines') $prefix = 'domaines.';
    else $prefix = $group . '.';
    $path = strpos($key, $prefix) === 0 ? substr($key, strlen($prefix)) : $key;
    return str_replace('.', ' › ', $path);
}

function az_render_texts() {
    if (!current_user_can('edit_pages')) return;
    $data = az_json('texts');
    $groups = $data['groups'] ?? [];
    $group = sanitize_text_field(wp_unslash($_GET['groupe'] ?? ''));
    if (!isset($groups[$group])) $group = (string) array_key_first($groups);
    $keys = array_keys(array_filter($data['texts'] ?? [], function ($t) use ($group) { return $t['group'] === $group; }));
    $saved = get_option('az_texts', []);
    if (!is_array($saved)) $saved = [];
    $notice = '';

    if (isset($_POST['az_texts_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['az_texts_nonce'])), 'az_texts_' . $group)) {
        $posted = wp_unslash($_POST['az_t'] ?? []);
        $reset = array_map('sanitize_text_field', (array) wp_unslash($_POST['az_reset'] ?? []));
        foreach ($keys as $key) {
            $field = 'k' . md5($key);
            $def = $data['texts'][$key];
            if (in_array($field, $reset, true)) { unset($saved[$key]); continue; }
            if (!isset($posted[$field]) || !is_array($posted[$field])) continue;
            $value = [];
            foreach (['fr', 'en'] as $l) {
                $v = az_clean($posted[$field][$l] ?? '');
                $value[$l] = $v === '' ? $def[$l] : $v;
            }
            if ($value['fr'] === $def['fr'] && $value['en'] === $def['en']) unset($saved[$key]);
            else $saved[$key] = $value;
        }
        update_option('az_texts', $saved, true);
        do_action('litespeed_purge_all');
        $notice = '<div class="notice notice-success is-dismissible"><p>Textes enregistrés : ils sont en ligne. Si une page affiche encore l’ancien texte, videz le cache (hPanel → Performance → Vider le cache).</p></div>';
    }

    echo '<div class="wrap az-texts"><h1>Textes des pages</h1>' . $notice;
    echo '<p>Choisissez une page, modifiez ses textes en français et en anglais, puis enregistrez. Un texte vidé reprend le texte d’origine.</p>';
    echo '<details class="az-help"><summary>Mise en forme possible</summary><ul>'
        . '<li><code>&lt;span class="accent"&gt;…&lt;/span&gt;</code> : passage en couleur et en italique (fin des grands titres).</li>'
        . '<li><code>&lt;strong&gt;…&lt;/strong&gt;</code> : gras ; <code>&lt;br&gt;</code> : retour à la ligne.</li>'
        . '<li><code>{missions}</code>, <code>{commanditaires}</code>, <code>{partenaires}</code>, <code>{regions}</code>, <code>{depuis}</code> : chiffres clés calculés automatiquement à partir des réalisations, références et partenaires.</li>'
        . '</ul></details>';

    echo '<nav class="nav-tab-wrapper az-tabs">';
    foreach ($groups as $id => $label) {
        $n = 0;
        foreach (array_keys($saved) as $k) if (($data['texts'][$k]['group'] ?? '') === $id) $n++;
        echo '<a class="nav-tab' . ($id === $group ? ' nav-tab-active' : '') . '" href="' . esc_url(admin_url('admin.php?page=az-textes&groupe=' . rawurlencode($id))) . '">'
            . esc_html($label) . ($n ? ' <span class="az-count">' . $n . '</span>' : '') . '</a>';
    }
    echo '</nav>';

    echo '<form method="post">';
    wp_nonce_field('az_texts_' . $group, 'az_texts_nonce');
    submit_button('Enregistrer les textes');
    echo '<table class="widefat striped az-texts__table"><thead><tr><th style="width:18%">Emplacement</th><th>Français</th><th>English</th></tr></thead><tbody>';
    foreach ($keys as $i => $key) {
        $field = 'k' . md5($key);
        $def = $data['texts'][$key];
        $cur = $saved[$key] ?? $def;
        $rows = max(1, min(24, (int) ceil(max(mb_strlen($cur['fr']), mb_strlen($cur['en'])) / 70)));
        $changed = isset($saved[$key]);
        echo '<tr' . ($changed ? ' class="az-changed"' : '') . '><td><span class="az-key">' . ($i + 1) . '. ' . esc_html(az_text_label($key, $group)) . '</span>';
        if ($changed) echo '<br><span class="az-mod">Modifié</span> <label class="az-reset"><input type="checkbox" name="az_reset[]" value="' . $field . '"> rétablir l’original</label>';
        echo '</td>';
        foreach (['fr', 'en'] as $l) {
            echo '<td><textarea name="az_t[' . $field . '][' . $l . ']" rows="' . $rows . '">' . esc_textarea($cur[$l]) . '</textarea></td>';
        }
        echo '</tr>';
    }
    echo '</tbody></table>';
    submit_button('Enregistrer les textes');
    echo '</form></div>';
}
