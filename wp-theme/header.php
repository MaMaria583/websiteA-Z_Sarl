<?php
/** En-tête commun : <head>, barre de navigation, menu mobile. */

if (!defined('ABSPATH')) exit;

$lang = az_lang();
$t = az_t();
$head = az_head_meta();
$name = az_data('name');
$services = az_data('services');
$section = $head['section'];
$cur = function ($id) use ($section) { return $section === $id ? ' aria-current="page"' : ''; };
$ver = '?v=' . wp_get_theme()->get('Version') . '-' . filemtime(AZ_DIR . '/assets/css/main.css');
$og = az_asset('img/brand/og-image' . ($lang === 'en' ? '-en' : '') . '.jpg');
?>
<!doctype html>
<html lang="<?php echo $lang; ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo az_esc($head['title']); ?></title>
  <meta name="description" content="<?php echo az_esc($head['description']); ?>">
  <meta name="theme-color" content="#0F2E47">
  <meta name="author" content="<?php echo $name; ?>">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="<?php echo $name; ?>">
  <meta property="og:locale" content="<?php echo $t['locale']; ?>">
  <meta property="og:title" content="<?php echo az_esc($head['title']); ?>">
  <meta property="og:description" content="<?php echo az_esc($head['description']); ?>">
  <meta name="twitter:card" content="summary_large_image">
<?php if ($head['links'] && !$head['noindex']) : ?>
  <link rel="canonical" href="<?php echo esc_url($head['links']['self']); ?>">
<?php if ($head['links']['fr']) : ?>
  <link rel="alternate" hreflang="fr" href="<?php echo esc_url($head['links']['fr']); ?>">
  <link rel="alternate" hreflang="en" href="<?php echo esc_url($head['links']['en']); ?>">
  <link rel="alternate" hreflang="x-default" href="<?php echo esc_url($head['links']['fr']); ?>">
<?php endif; ?>
  <meta property="og:url" content="<?php echo esc_url($head['links']['self']); ?>">
  <meta property="og:image" content="<?php echo esc_url($og); ?>">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:image" content="<?php echo esc_url($og); ?>">
<?php endif; ?>
  <link rel="icon" href="<?php echo az_asset('img/brand/favicon.svg'); ?>" type="image/svg+xml">
  <link rel="icon" href="<?php echo az_asset('img/brand/favicon-32.png'); ?>" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="<?php echo az_asset('img/brand/apple-touch-icon.png'); ?>">
  <link rel="manifest" href="<?php echo AZ_URI; ?>/site.webmanifest">
  <link rel="preload" href="<?php echo az_asset('fonts/manrope-latin.woff2'); ?>" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="<?php echo az_asset('css/main.css') . $ver; ?>">
  <script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__az)document.documentElement.classList.remove('js')},3000);</script>
  <script src="<?php echo az_asset('js/main.js') . $ver; ?>" defer></script>
  <?php if (az_current()['id'] === 'home') echo az_json_ld(); ?>

<?php wp_head(); ?>
</head>
<body class="<?php echo esc_attr(trim($head['bodyClass'] . (is_admin_bar_showing() ? ' admin-bar' : ''))); ?>">
  <a class="skip-link" href="#contenu"><?php echo $t['skip']; ?></a>
<header class="site-header">
  <div class="container header__inner">
    <?php echo az_brand(); ?>
    <nav class="nav" aria-label="<?php echo $t['mainNav']; ?>">
      <ul class="nav__list">
        <li><a class="nav__link" href="<?php echo esc_url(az_url('about')); ?>"<?php echo $cur('about'); ?>><?php echo $t['nav']['about']; ?></a></li>
        <li class="nav__item--mega" data-mega>
          <button class="nav__link" type="button" aria-expanded="false" aria-controls="mega-expertises"<?php echo $cur('expertises'); ?>><?php echo $t['nav']['expertises']; ?> <?php echo az_icon('chevron'); ?></button>
          <div class="mega" id="mega-expertises">
            <div class="mega__grid"><?php foreach ($services as $s) : ?>

            <a class="mega__link" href="<?php echo esc_url(az_url('service:' . $s['id'])); ?>">
              <span class="mega__icon"><?php echo az_icon($s['icon']); ?></span>
              <span><span class="mega__title"><?php echo az_L($s['title']); ?></span><span class="mega__desc"><?php echo az_L($s['summary']); ?></span></span>
            </a><?php endforeach; ?>

              <div class="mega__feature">
                <div><strong><?php echo $t['megaTitle']; ?></strong><p style="margin-top:10px"><?php echo $t['megaText']; ?></p></div>
                <a class="link-arrow" href="<?php echo esc_url(az_url('expertises')); ?>"><?php echo $t['megaAll']; ?> <?php echo az_icon('arrow'); ?></a>
              </div>
            </div>
          </div>
        </li>
        <li><a class="nav__link" href="<?php echo esc_url(az_url('projects')); ?>"<?php echo $cur('projects'); ?>><?php echo $t['nav']['projects']; ?></a></li>
        <li><a class="nav__link" href="<?php echo esc_url(az_url('partners')); ?>"<?php echo $cur('partners'); ?>><?php echo $t['nav']['partners']; ?></a></li>
        <li><a class="nav__link" href="<?php echo esc_url(az_url('join')); ?>"<?php echo $cur('join'); ?>><?php echo $t['nav']['join']; ?></a></li>
        <li class="nav__item--contact"><a class="nav__link" href="<?php echo esc_url(az_url('contact')); ?>"<?php echo $cur('contact'); ?>><?php echo $t['nav']['contact']; ?></a></li>
      </ul>
    </nav>
    <div class="header__actions">
      <?php echo az_lang_switch($head['alternate']); ?>

      <a class="btn btn--sm header__cta" href="<?php echo esc_url(az_url('contact')); ?>"><?php echo $t['cta']; ?> <?php echo az_icon('arrow', 'icon--arrow'); ?></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav"><span class="sr-only"><?php echo $t['menu']; ?></span><span class="nav-toggle__bars" aria-hidden="true"></span></button>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="<?php echo $t['menu']; ?>" aria-hidden="true" inert>
  <div class="mobile-nav__top">
    <?php echo az_brand(true); ?>

    <button class="mobile-nav__close" type="button" data-close-menu aria-label="<?php echo $t['closeMenu']; ?>"><?php echo az_icon('close'); ?></button>
  </div>
  <ul class="mobile-nav__list">
    <li><a href="<?php echo esc_url(az_url('home')); ?>"><?php echo $t['home']; ?></a></li>
    <li><a href="<?php echo esc_url(az_url('about')); ?>"><?php echo $t['nav']['about']; ?></a></li>
    <li><details><summary><?php echo $t['nav']['expertises']; ?> <?php echo az_icon('chevron'); ?></summary>
      <ul class="mobile-nav__sub">
        <li><a href="<?php echo esc_url(az_url('expertises')); ?>"><?php echo $t['megaAll']; ?></a></li>
        <?php foreach ($services as $s) : ?><li><a href="<?php echo esc_url(az_url('service:' . $s['id'])); ?>"><?php echo az_L($s['short']); ?></a></li><?php endforeach; ?>

      </ul></details></li>
    <li><a href="<?php echo esc_url(az_url('projects')); ?>"><?php echo $t['nav']['projects']; ?></a></li>
    <li><a href="<?php echo esc_url(az_url('partners')); ?>"><?php echo $t['nav']['partners']; ?></a></li>
    <li><a href="<?php echo esc_url(az_url('join')); ?>"><?php echo $t['nav']['join']; ?></a></li>
    <li><a href="<?php echo esc_url(az_url('contact')); ?>"><?php echo $t['nav']['contact']; ?></a></li>
  </ul>
  <div class="mobile-nav__foot">
    <a class="btn btn--accent" href="<?php echo esc_url(az_url('contact')); ?>"><?php echo $t['cta']; ?> <?php echo az_icon('arrow', 'icon--arrow'); ?></a>
    <div class="mobile-nav__contact">
      <?php foreach (az_phones() as $p) : ?><a href="tel:<?php echo esc_attr($p['tel']); ?>"><?php echo esc_html($p['display']); ?></a><?php endforeach; ?>

      <a href="mailto:<?php echo esc_attr(az_opt('email')); ?>"><?php echo esc_html(az_opt('email')); ?></a>
    </div>
    <div class="mobile-nav__row"><?php echo az_lang_switch($head['alternate']) . az_c_social(['cls' => 'social--dark']); ?></div>
  </div>
</div>
  <main id="contenu" tabindex="-1">
