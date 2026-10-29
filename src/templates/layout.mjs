// Gabarit commun : <head>, en-tête, menu mobile, pied de page.
import { icon } from './icons.mjs';
import { esc } from './components.mjs';

function langSwitch(ctx) {
  const a = (l) => (l === ctx.lang
    ? `<a aria-current="true" lang="${l}" title="${ctx.t.langNames[l]}">${l.toUpperCase()}</a>`
    : `<a href="${ctx.alternate}" lang="${l}" hreflang="${l}" title="${ctx.t.langNames[l]}">${l.toUpperCase()}</a>`);
  return `<div class="lang" role="group" aria-label="${ctx.t.langLabel}">${a('fr')}${a('en')}</div>`;
}

function brand(ctx, { white = false } = {}) {
  return `<a class="brand" href="${ctx.href('home')}" aria-label="${ctx.t.homeAria}">
      <img src="${ctx.asset(`img/brand/${white ? 'az-mark-white' : 'az-mark'}.svg`)}" width="137" height="88" alt="">
      <span class="brand__text"><span class="brand__name">${ctx.site.name}</span><span class="brand__line">${ctx.L(ctx.site.brandLine)}</span></span>
    </a>`;
}

function header(ctx) {
  const t = ctx.t;
  const cur = (id) => (ctx.section === id ? ' aria-current="page"' : '');
  const mega = ctx.services.map((s) => `
            <a class="mega__link" href="${ctx.href(`service:${s.id}`)}">
              <span class="mega__icon">${icon(s.icon)}</span>
              <span><span class="mega__title">${ctx.L(s.title)}</span><span class="mega__desc">${ctx.L(s.summary)}</span></span>
            </a>`).join('');
  return `
<header class="site-header">
  <div class="container header__inner">
    ${brand(ctx)}
    <nav class="nav" aria-label="${t.mainNav}">
      <ul class="nav__list">
        <li><a class="nav__link" href="${ctx.href('about')}"${cur('about')}>${t.nav.about}</a></li>
        <li class="nav__item--mega" data-mega>
          <button class="nav__link" type="button" aria-expanded="false" aria-controls="mega-expertises"${ctx.section === 'expertises' ? ' aria-current="page"' : ''}>${t.nav.expertises} ${icon('chevron')}</button>
          <div class="mega" id="mega-expertises">
            <div class="mega__grid">${mega}
              <div class="mega__feature">
                <div><strong>${t.megaTitle}</strong><p style="margin-top:10px">${t.megaText}</p></div>
                <a class="link-arrow" href="${ctx.href('expertises')}">${t.megaAll} ${icon('arrow')}</a>
              </div>
            </div>
          </div>
        </li>
        <li><a class="nav__link" href="${ctx.href('projects')}"${cur('projects')}>${t.nav.projects}</a></li>
        <li><a class="nav__link" href="${ctx.href('partners')}"${cur('partners')}>${t.nav.partners}</a></li>
        <li><a class="nav__link" href="${ctx.href('join')}"${cur('join')}>${t.nav.join}</a></li>
        <li class="nav__item--contact"><a class="nav__link" href="${ctx.href('contact')}"${cur('contact')}>${t.nav.contact}</a></li>
      </ul>
    </nav>
    <div class="header__actions">
      ${langSwitch(ctx)}
      <a class="btn btn--sm header__cta" href="${ctx.href('contact')}">${t.cta} ${icon('arrow', 'icon--arrow')}</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav"><span class="sr-only">${t.menu}</span><span class="nav-toggle__bars" aria-hidden="true"></span></button>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="${t.menu}" aria-hidden="true" inert>
  <div class="mobile-nav__top">
    ${brand(ctx, { white: true })}
    <button class="mobile-nav__close" type="button" data-close-menu aria-label="${t.closeMenu}">${icon('close')}</button>
  </div>
  <ul class="mobile-nav__list">
    <li><a href="${ctx.href('home')}">${t.home}</a></li>
    <li><a href="${ctx.href('about')}">${t.nav.about}</a></li>
    <li><details><summary>${t.nav.expertises} ${icon('chevron')}</summary>
      <ul class="mobile-nav__sub">
        <li><a href="${ctx.href('expertises')}">${t.megaAll}</a></li>
        ${ctx.services.map((s) => `<li><a href="${ctx.href(`service:${s.id}`)}">${ctx.L(s.short)}</a></li>`).join('')}
      </ul></details></li>
    <li><a href="${ctx.href('projects')}">${t.nav.projects}</a></li>
    <li><a href="${ctx.href('partners')}">${t.nav.partners}</a></li>
    <li><a href="${ctx.href('join')}">${t.nav.join}</a></li>
    <li><a href="${ctx.href('contact')}">${t.nav.contact}</a></li>
  </ul>
  <div class="mobile-nav__foot">
    <a class="btn btn--accent" href="${ctx.href('contact')}">${t.cta} ${icon('arrow', 'icon--arrow')}</a>
    <div class="mobile-nav__contact">
      ${ctx.site.phones.map((p) => `<a href="tel:${p.tel}">${p.display}</a>`).join('')}
      <a href="mailto:${ctx.site.email}">${ctx.site.email}</a>
    </div>
    ${langSwitch(ctx)}
  </div>
</div>`;
}

function footer(ctx) {
  const t = ctx.t;
  const { site } = ctx;
  return `
<footer class="site-footer">
  <img class="footer__watermark" src="${ctx.asset('img/brand/az-mark-white.svg')}" alt="" width="137" height="88" loading="lazy">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        ${brand(ctx, { white: true })}
        <p class="footer__tagline">${ctx.L(site.tagline)}</p>
        <p style="margin-top:18px;max-width:42ch">${t.footerAbout}</p>
      </div>
      <div>
        <h2 class="footer__title">${t.footerNav}</h2>
        <ul class="footer__list">
          <li><a href="${ctx.href('about')}">${t.nav.about}</a></li>
          <li><a href="${ctx.href('projects')}">${t.nav.projects}</a></li>
          <li><a href="${ctx.href('partners')}">${t.nav.partners}</a></li>
          <li><a href="${ctx.href('join')}">${t.nav.join}</a></li>
          <li><a href="${ctx.href('contact')}">${t.nav.contact}</a></li>
          <li><a href="${ctx.asset(`docs/plaquette-a-z-sarl-${ctx.lang}.pdf`)}" download>${t.brochure}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer__title">${t.footerExpertise}</h2>
        <ul class="footer__list">
          ${ctx.services.map((s) => `<li><a href="${ctx.href(`service:${s.id}`)}">${ctx.L(s.short)}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h2 class="footer__title">${t.footerContact}</h2>
        <ul class="footer__list footer__contact">
          <li>${icon('pin')}<span>${site.address.street}<br>${site.address.city}, ${site.address.country}</span></li>
          <li>${icon('phone')}<span>${site.phones.map((p) => `<a href="tel:${p.tel}">${p.display}</a>`).join('<br>')}</span></li>
          <li>${icon('mail')}<span><a href="mailto:${site.email}">${site.email}</a></span></li>
          ${site.social.map((s) => `<li>${icon('globe')}<span><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a></span></li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© <span data-year>2026</span> ${site.name}. ${t.rights}</p>
      <ul>
        <li><a href="${ctx.href('legal')}">${t.legal}</a></li>
      </ul>
      ${langSwitch(ctx)}
    </div>
  </div>
</footer>`;
}

function jsonLd(ctx) {
  const { site } = ctx;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: ctx.L(site.tagline),
    slogan: ctx.L(site.tagline),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: 'ML',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lon },
    telephone: site.phones.map((p) => p.tel),
    email: site.email,
    areaServed: { '@type': 'Country', name: 'Mali' },
    knowsAbout: ctx.services.map((s) => ctx.L(s.title)),
    knowsLanguage: ['fr', 'en'],
    employee: { '@type': 'Person', name: site.director.name, jobTitle: ctx.L(site.director.role), email: site.director.email },
  };
  if (site.siteUrl) {
    data.url = `${site.siteUrl}/`;
    data.logo = `${site.siteUrl}/assets/img/brand/icon-512.png`;
    data.image = `${site.siteUrl}/assets/img/brand/og-image.jpg`;
  }
  if (site.social.length) data.sameAs = site.social.map((s) => s.url);
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function layout(ctx, { title, description, body, bodyClass = '' }) {
  const t = ctx.t;
  const { site } = ctx;
  const fullTitle = ctx.page === 'home' ? `${site.name} — ${title}` : `${title} | ${site.name}`;
  const abs = site.siteUrl ? {
    self: ctx.abs(ctx.page, ctx.lang),
    fr: ctx.abs(ctx.page, 'fr'),
    en: ctx.abs(ctx.page, 'en'),
    og: `${site.siteUrl}/assets/img/brand/og-image${ctx.lang === 'en' ? '-en' : ''}.jpg`,
  } : null;
  const seoLinks = abs && !ctx.noindex ? `
  <link rel="canonical" href="${abs.self}">
  <link rel="alternate" hreflang="fr" href="${abs.fr}">
  <link rel="alternate" hreflang="en" href="${abs.en}">
  <link rel="alternate" hreflang="x-default" href="${abs.fr}">
  <meta property="og:url" content="${abs.self}">
  <meta property="og:image" content="${abs.og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:image" content="${abs.og}">` : '';
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.whatsappMsg)}`;
  return `<!doctype html>
<html lang="${ctx.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  ${ctx.noindex || site.testMode ? '<meta name="robots" content="noindex, nofollow">' : ''}
  <meta name="theme-color" content="#0F2E47">
  <meta name="author" content="${site.name}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta name="twitter:card" content="summary_large_image">${seoLinks}
  <link rel="icon" href="${ctx.asset('img/brand/favicon.svg')}" type="image/svg+xml">
  <link rel="icon" href="${ctx.asset('img/brand/favicon-32.png')}" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${ctx.asset('img/brand/apple-touch-icon.png')}">
  <link rel="manifest" href="${ctx.root}site.webmanifest">
  <link rel="preload" href="${ctx.asset('fonts/manrope-latin.woff2')}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${ctx.asset('css/main.css')}?v=${ctx.version}">
  <script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__az)document.documentElement.classList.remove('js')},3000);</script>
  <script src="${ctx.asset('js/main.js')}?v=${ctx.version}" defer></script>
  ${ctx.page === 'home' ? jsonLd(ctx) : ''}
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#contenu">${t.skip}</a>
  ${header(ctx)}
  <main id="contenu" tabindex="-1">
${body}
  </main>
  ${footer(ctx)}
  <a class="fab-wa" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="${t.whatsappTip} ${t.newTab}">${icon('whatsapp')}<span class="fab-wa__tip" aria-hidden="true">${t.whatsappTip}</span></a>
  <button class="to-top" type="button" aria-label="${t.toTop}">${icon('arrow')}</button>
</body>
</html>
`;
}
