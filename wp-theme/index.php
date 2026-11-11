<?php
/**
 * Gabarit unique du thème.
 * - Pages du site (champ _az_page) et page introuvable : corps fourni par le thème (pages/<langue>/).
 * - Toute autre page ou article créé dans WordPress : titre + contenu, dans la mise en page du site.
 */

if (!defined('ABSPATH')) exit;

$cur = az_current();
ob_start();
get_header();

if ($cur['id']) {
    echo az_render_page($cur['id'], $cur['lang']);
} else {
    while (have_posts()) {
        the_post();
        ?>
<section class="page-hero pattern">
  <div class="container">
    <div class="page-hero__grid"><div><h1 class="h1"><?php the_title(); ?></h1></div></div>
  </div>
</section>
<section class="section">
  <div class="container"><div class="prose"><?php the_content(); ?></div></div>
</section>
        <?php
    }
}

get_footer();
echo az_typography(ob_get_clean(), $cur['lang']);
