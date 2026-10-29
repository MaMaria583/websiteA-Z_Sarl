// Composants réutilisés par les pages.
import { icon } from './icons.mjs';

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Image responsive (WebP + JPEG) à partir du manifeste src/data/photos.json */
export function picture(ctx, name, { alt = '', sizes = '100vw', cls = '', loading = 'lazy', priority = false, style = '' } = {}) {
  const m = ctx.photos[name];
  if (!m) throw new Error(`Photo inconnue : ${name}`);
  const src = (w, ext) => ctx.asset(`img/photos/${name}-${w}.${ext}`);
  const set = (ext) => m.widths.map((w) => `${src(w, ext)} ${w}w`).join(', ');
  const fallback = m.widths.find((w) => w >= 800) || m.widths[m.widths.length - 1];
  return `<picture><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${src(fallback, 'jpg')}" srcset="${set('jpg')}" sizes="${sizes}" width="${m.width}" height="${m.height}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''} loading="${priority ? 'eager' : loading}" decoding="async"${priority ? ' fetchpriority="high"' : ''}></picture>`;
}

/** Plus grande version d'une photo (pour la visionneuse) */
export const largest = (ctx, name) => ctx.asset(`img/photos/${name}-${ctx.photos[name].widths.at(-1)}.jpg`);

/** Logo d'un partenaire, ou plaque typographique s'il n'y a pas de logo */
export function partnerLogo(ctx, p, { loading = 'lazy' } = {}) {
  if (!p.logo) {
    return `<span class="logo-plate"><b>${esc(p.acronym)}</b><small>${esc(ctx.L(categoryShort[p.category]))}</small></span>`;
  }
  const alt = ctx.lang === 'en' ? `${p.acronym} logo` : `Logo ${p.acronym}`;
  if (p.logo.raster) {
    const base = ctx.asset(`img/partners/${p.logo.file}`);
    return `<picture><source type="image/webp" srcset="${base}.webp"><img class="logo--${p.id}" src="${base}.png" width="${p.logo.width}" height="${p.logo.height}" alt="${esc(alt)}" loading="${loading}" decoding="async"></picture>`;
  }
  return `<img class="logo--${p.id}" src="${ctx.asset(`img/partners/${p.logo.file}`)}" width="${p.logo.width}" height="${p.logo.height}" alt="${esc(alt)}" loading="${loading}" decoding="async">`;
}
const categoryShort = {
  international: { fr: 'Coopération', en: 'Cooperation' },
  public: { fr: 'Institution', en: 'Institution' },
  civil: { fr: 'Société civile', en: 'Civil society' },
  rural: { fr: 'Monde rural', en: 'Rural' },
};

/** Lien sortant vers le site d'un partenaire (nouvel onglet, sécurisé) */
export const partnerUrl = (ctx, p) => (p.url ? ctx.L(p.url) : null);

/** En-tête de section */
export function sectionHead(ctx, { eyebrow, title, lead = '', center = false, split = false, tag = 'h2', id = '' }) {
  const cls = ['section-head', center && 'section-head--center', split && 'section-head--split'].filter(Boolean).join(' ');
  const titleHtml = `<${tag} class="h2"${id ? ` id="${id}"` : ''}>${title}</${tag}>`;
  if (split) {
    return `<div class="${cls}" data-reveal><div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}${titleHtml}</div>${lead ? `<p class="lead">${lead}</p>` : ''}</div>`;
  }
  return `<div class="${cls}" data-reveal>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}${titleHtml}${lead ? `<p class="lead">${lead}</p>` : ''}</div>`;
}

/** Fil d'Ariane */
export function breadcrumb(ctx, items) {
  const li = items.map((it, i) => (i === items.length - 1
    ? `<li><span aria-current="page">${it.label}</span></li>`
    : `<li><a href="${it.href}">${it.label}</a></li>`)).join('');
  return `<nav aria-label="${ctx.t.breadcrumb}"><ol class="breadcrumb">${li}</ol></nav>`;
}

/** En-tête des pages intérieures */
export function pageHero(ctx, { eyebrow, title, lead = '', crumbs = [], aside = '' }) {
  return `
<section class="page-hero pattern">
  <div class="container">
    ${breadcrumb(ctx, [{ label: ctx.t.home, href: ctx.href('home') }, ...crumbs])}
    <div class="page-hero__grid">
      <div>
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
        <h1 class="h1">${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
      </div>
      ${aside ? `<div class="page-hero__aside">${aside}</div>` : ''}
    </div>
  </div>
  <svg class="page-hero__swoosh" viewBox="0 0 520 140" aria-hidden="true" focusable="false"><path d="M0 132C160 128 330 96 470 22"/><path class="head" d="M497 6 461 13l17 23Z"/></svg>
</section>`;
}

/** Carte d'un pôle d'expertise */
export function serviceCard(ctx, s, { feature = false } = {}) {
  const media = feature && s.photo
    ? `<div class="service-card__media" aria-hidden="true">${picture(ctx, s.photo, { sizes: '(min-width: 1100px) 520px, 100vw' })}</div>` : '';
  return `
<a class="service-card${feature ? ' service-card--feature' : ''}" href="${ctx.href(`service:${s.id}`)}" data-reveal>
  ${media}
  <div class="service-card__top"><span class="service-card__icon">${icon(s.icon)}</span><span class="service-card__num">${s.num}</span></div>
  <h3 class="service-card__title">${ctx.L(s.title)}</h3>
  <p class="service-card__desc">${ctx.L(s.summary)}</p>
  <ul class="chip-list">${ctx.L(s.keys).map((k) => `<li class="chip">${k}</li>`).join('')}</ul>
  <span class="service-card__more">${ctx.t.learnMore} ${icon('arrow')}</span>
</a>`;
}

/** Les 13 domaines regroupés par famille */
export function sectorFamilies(ctx) {
  return `<div class="families">${ctx.families.map((f, i) => {
    const items = ctx.sectors.filter((s) => s.family === f.id);
    return `
  <section class="family" data-reveal style="--d:${i * 0.08}s" aria-labelledby="fam-${f.id}">
    <div class="family__head"><span class="family__count">${items.length}</span><h3 class="family__title" id="fam-${f.id}">${ctx.L(f.title)}</h3></div>
    <ul class="sector-list">${items.map((s) => `
      <li class="sector" id="domaine-${s.id}"><span class="sector__icon">${icon(s.icon)}</span><span><b>${ctx.L(s.title)}</b>${ctx.L(s.detail)}</span></li>`).join('')}
    </ul>
  </section>`;
  }).join('')}</div>`;
}

/** Carte du Mali : siège et localités des partenaires */
export function maliMap(ctx, { headingId = 'carte-titre' } = {}) {
  const { map, places } = ctx;
  const pt = (id) => map.points[id];
  const [rx, ry, rw, rh] = map.region;
  const hq = pt('bamako');
  const arcs = places.filter((p) => !p.hq).map((p) => {
    const [x, y] = pt(p.id);
    const mx = (hq[0] + x) / 2, my = (hq[1] + y) / 2;
    const dx = x - hq[0], dy = y - hq[1];
    const len = Math.hypot(dx, dy);
    let nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    const k = len * 0.22;
    return `<path class="arc" d="M${hq[0]} ${hq[1]}Q${(mx + nx * k).toFixed(1)} ${(my + ny * k).toFixed(1)} ${x} ${y}"/>`;
  }).join('');
  const labelPos = {
    bamako: { dx: -24, dy: 6, anchor: 'end' },
    baroueli: { dx: -14, dy: -24, anchor: 'end' },
    dioila: { dx: 0, dy: 40, anchor: 'middle' },
    koutiala: { dx: 24, dy: 6, anchor: 'start' },
    niono: { dx: 24, dy: 6, anchor: 'start' },
  };
  const pins = places.map((p, i) => {
    const [x, y] = pt(p.id);
    const lp = labelPos[p.id];
    return `<g class="pin${p.hq ? ' pin--hq' : ''}" data-place="${p.id}"><circle class="halo" cx="${x}" cy="${y}" r="16" style="animation-delay:${i * 0.35}s"/><circle class="core" cx="${x}" cy="${y}" r="14"/><text class="pin-num" x="${x}" y="${y}">${i + 1}</text><text class="pin-label" x="${x + lp.dx}" y="${y + lp.dy}" text-anchor="${lp.anchor}">${p.name}</text></g>`;
  }).join('');
  const refs = [['segou', 'Ségou'], ['sikasso', 'Sikasso'], ['mopti', 'Mopti']].map(([id, name]) => {
    const [x, y] = pt(id);
    return `<circle class="ref-dot" cx="${x}" cy="${y}" r="4"/><text class="ref-label" x="${x + 9}" y="${y + 5}">${name}</text>`;
  }).join('');
  // Médaillon : le Mali entier, avec la zone agrandie
  const [fx, fy, fw, fh] = map.full.viewBox;
  const s = 118 / fw;
  const ix = rx + 22, iy = ry + 40; // coin supérieur gauche : aucun repère dans cette zone
  const inset = `<g aria-hidden="true">
    <rect class="inset-frame" x="${(ix - 8).toFixed(1)}" y="${(iy - 26).toFixed(1)}" width="${(fw * s + 16).toFixed(1)}" height="${(fh * s + 34).toFixed(1)}" rx="10"/>
    <text class="inset-label" x="${(ix).toFixed(1)}" y="${(iy - 10).toFixed(1)}">MALI</text>
    <g transform="translate(${(ix - fx * s).toFixed(2)} ${(iy - fy * s).toFixed(2)}) scale(${s.toFixed(5)})"><path class="inset-land" d="${map.country}"/><rect class="inset-box" x="${rx}" y="${ry}" width="${rw}" height="${rh}"/></g></g>`;
  const title = ctx.lang === 'en' ? 'Map of south-western Mali showing the A-Z Sarl head office in Bamako and the locations of its partners' : 'Carte du sud-ouest du Mali : siège d’A-Z Sarl à Bamako et localités de ses partenaires';
  return `
<figure class="map-figure">
  <svg class="map-svg" viewBox="${rx} ${ry} ${rw} ${rh}" role="img" aria-labelledby="${headingId}-svg">
    <title id="${headingId}-svg">${title}</title>
    <defs><clipPath id="clip-${headingId}"><path d="${map.country}"/></clipPath></defs>
    <path class="land-shadow" d="${map.country}" transform="translate(7 9)"/>
    <path class="land" d="${map.country}"/>
    <g clip-path="url(#clip-${headingId})"><path class="river" d="${map.river}"/></g>
    <text class="river-label" x="0" y="0" transform="translate(${(pt('segou')[0] + 92).toFixed(1)} ${(pt('segou')[1] - 22).toFixed(1)}) rotate(-28)">${ctx.lang === 'en' ? 'Niger river' : 'fleuve Niger'}</text>
    ${refs}
    ${arcs}
    ${pins}
    ${inset}
  </svg>
  <figcaption class="map-credit">${ctx.lang === 'en' ? 'Map data: Natural Earth (public domain), OpenStreetMap.' : 'Fond de carte : Natural Earth (domaine public), OpenStreetMap.'}</figcaption>
</figure>`;
}

export function mapLegend(ctx) {
  return `<ol class="map-legend">${ctx.places.map((p, i) => `<li data-place="${p.id}"><span class="map-legend__num">${i + 1}</span><span class="map-legend__place">${p.name}<span class="map-legend__who">${ctx.L(p.who)}</span></span></li>`).join('')}</ol>`;
}

/** Bandeau défilant des logos partenaires */
export function marquee(ctx) {
  const items = (hidden) => ctx.partners.map((p) => {
    const url = partnerUrl(ctx, p);
    const inner = partnerLogo(ctx, p);
    const label = `${ctx.t.visitOf} ${p.acronym} ${ctx.t.newTab}`;
    const content = url
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)}"${hidden ? ' tabindex="-1"' : ''}>${inner}</a>`
      : `<span>${inner}</span>`;
    return `<li class="logo-item">${content}</li>`;
  }).join('');
  return `
<section class="trust" aria-labelledby="trust-title">
  <div class="container trust__inner">
    <h2 class="trust__label" id="trust-title">${ctx.lang === 'en' ? 'They trust us' : 'Ils nous font confiance'}</h2>
    <div class="marquee">
      <div class="marquee__track">
        <ul class="marquee__group">${items(false)}</ul>
        <ul class="marquee__group" aria-hidden="true">${items(true)}</ul>
      </div>
    </div>
  </div>
</section>`;
}

/** Appel aux experts */
export function expertsCta(ctx) {
  const fr = ctx.lang === 'fr';
  const nodes = [[60, 60], [190, 30], [320, 90], [120, 170], [260, 200], [410, 170], [80, 290], [220, 320], [370, 300], [480, 60], [500, 250]];
  const links = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [4, 5], [3, 6], [6, 7], [4, 7], [7, 8], [5, 8], [2, 9], [5, 10], [8, 10], [9, 5]];
  const svg = `<svg class="experts-cta__net" viewBox="0 0 540 360" aria-hidden="true" focusable="false">${links.map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`).join('')}${nodes.map(([x, y], i) => `<circle${i === 4 ? ' class="big"' : ''} cx="${x}" cy="${y}" r="${i === 4 ? 12 : 6}"/>`).join('')}</svg>`;
  return `
<section class="section section--tight">
  <div class="container">
    <div class="experts-cta on-dark" data-reveal>
      ${svg}
      <div>
        <p class="eyebrow">${fr ? 'Banque d’experts' : 'Expert pool'}</p>
        <h2 class="h2">${fr ? 'Consultants, experts, formateurs : <span class="accent">rejoignez notre réseau.</span>' : 'Consultants, experts, trainers: <span class="accent">join our network.</span>'}</h2>
        <p class="lead">${fr ? 'A-Z Sarl compose ses équipes mandat par mandat à partir d’une large banque de CV. Déposez le vôtre : nous vous contactons dès qu’une mission correspond à votre profil.' : 'A-Z Sarl builds its teams assignment by assignment from a large pool of CVs. Submit yours and we will contact you when a mission matches your profile.'}</p>
      </div>
      <div class="btn-row">
        <a class="btn btn--accent" href="${ctx.href('join')}">${fr ? 'Déposer mon CV' : 'Submit my CV'} ${icon('arrow', 'icon--arrow')}</a>
      </div>
    </div>
  </div>
</section>`;
}

/** Bandeau de contact (avant le pied de page) */
export function contactBand(ctx, { title } = {}) {
  const fr = ctx.lang === 'fr';
  const { site } = ctx;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(ctx.t.whatsappMsg)}`;
  return `
<section class="section section--sand contact-band pattern" aria-labelledby="contact-band-title">
  <div class="container contact-band__inner">
    <div data-reveal>
      <p class="eyebrow">${fr ? 'Parlons de votre projet' : 'Let’s talk about your project'}</p>
      <h2 class="h2" id="contact-band-title">${title || (fr ? 'Des termes de référence, un appel d’offres, un besoin de formation ? <span class="accent">Écrivons la suite ensemble.</span>' : 'Terms of reference, a tender, a training need? <span class="accent">Let’s write what comes next together.</span>')}</h2>
      <div class="btn-row" style="margin-top:32px">
        <a class="btn" href="${ctx.href('contact')}">${fr ? 'Nous écrire' : 'Write to us'} ${icon('arrow', 'icon--arrow')}</a>
        <a class="btn btn--whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} WhatsApp</a>
      </div>
    </div>
    <div class="contact-band__links" data-reveal style="--d:.1s">
      ${site.phones.map((p) => `<a class="contact-line" href="tel:${p.tel}"><span class="contact-line__icon">${icon('phone')}</span><span><small>${ctx.t.phone}</small>${p.display}</span></a>`).join('')}
      <a class="contact-line" href="mailto:${site.email}"><span class="contact-line__icon">${icon('mail')}</span><span><small>${ctx.t.email}</small>${site.email}</span></a>
    </div>
  </div>
</section>`;
}

/** Démarche en 4 étapes, version claire/compacte (pages pôles) */
export function miniSteps(ctx, steps) {
  return `<ol class="mini-steps">${steps.map((s, i) => `<li class="mini-step" data-reveal style="--d:${i * 0.08}s"><span class="mini-step__num">0${i + 1}</span><h3 class="mini-step__title">${ctx.L(s.title)}</h3><p>${ctx.L(s.text)}</p></li>`).join('')}</ol>`;
}
