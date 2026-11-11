<?php
/** Pied de page commun, bouton WhatsApp et retour en haut de page. */

if (!defined('ABSPATH')) exit;

$lang = az_lang();
$t = az_t();
$head = az_head_meta();
$name = az_data('name');
?>
  </main>
<footer class="site-footer">
  <img class="footer__watermark" src="<?php echo az_asset('img/brand/az-mark-white.svg'); ?>" alt="" width="195" height="101" loading="lazy">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <?php echo az_brand(true); ?>

        <p class="footer__tagline"><?php echo az_L(az_data('tagline')); ?></p>
        <p style="margin-top:18px;max-width:42ch"><?php echo $t['footerAbout']; ?></p>
        <?php echo az_c_social(['cls' => 'social--footer']); ?>

      </div>
      <div>
        <h2 class="footer__title"><?php echo $t['footerNav']; ?></h2>
        <ul class="footer__list">
          <li><a href="<?php echo esc_url(az_url('about')); ?>"><?php echo $t['nav']['about']; ?></a></li>
          <li><a href="<?php echo esc_url(az_url('projects')); ?>"><?php echo $t['nav']['projects']; ?></a></li>
          <li><a href="<?php echo esc_url(az_url('partners')); ?>"><?php echo $t['nav']['partners']; ?></a></li>
          <li><a href="<?php echo esc_url(az_url('join')); ?>"><?php echo $t['nav']['join']; ?></a></li>
          <li><a href="<?php echo esc_url(az_url('contact')); ?>"><?php echo $t['nav']['contact']; ?></a></li>
          <li><a href="<?php echo az_asset('docs/plaquette-a-z-sarl-' . $lang . '.pdf'); ?>" download><?php echo $t['brochure']; ?></a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer__title"><?php echo $t['footerExpertise']; ?></h2>
        <ul class="footer__list">
          <?php foreach (az_data('services') as $s) : ?><li><a href="<?php echo esc_url(az_url('service:' . $s['id'])); ?>"><?php echo az_L($s['short']); ?></a></li><?php endforeach; ?>

        </ul>
      </div>
      <div>
        <h2 class="footer__title"><?php echo $t['footerContact']; ?></h2>
        <ul class="footer__list footer__contact">
          <li><?php echo az_icon('pin'); ?><span><?php echo esc_html(az_opt('street')); ?><br><?php echo esc_html(az_opt('city')); ?>, <?php echo esc_html(az_opt('country')); ?></span></li>
          <li><?php echo az_icon('phone'); ?><span><?php echo implode('<br>', array_map(function ($p) { return '<a href="tel:' . esc_attr($p['tel']) . '">' . esc_html($p['display']) . '</a>'; }, az_phones())); ?></span></li>
          <li><?php echo az_icon('mail'); ?><span><a href="mailto:<?php echo esc_attr(az_opt('email')); ?>"><?php echo esc_html(az_opt('email')); ?></a></span></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© <span data-year>2026</span> <?php echo $name; ?>. <?php echo $t['rights']; ?></p>
      <ul>
        <li><a href="<?php echo esc_url(az_url('legal')); ?>"><?php echo $t['legal']; ?></a></li>
      </ul>
      <?php echo az_lang_switch($head['alternate']); ?>

    </div>
  </div>
</footer>
  <a class="fab-wa" href="<?php echo esc_url(az_whatsapp_url()); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo $t['whatsappTip'] . ' ' . $t['newTab']; ?>"><?php echo az_icon('whatsapp'); ?><span class="fab-wa__tip" aria-hidden="true"><?php echo $t['whatsappTip']; ?></span></a>
  <button class="to-top" type="button" aria-label="<?php echo $t['toTop']; ?>"><?php echo az_icon('arrow'); ?></button>
<?php wp_footer(); ?>
</body>
</html>
