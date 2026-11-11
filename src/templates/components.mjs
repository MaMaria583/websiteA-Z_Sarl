// Composants réutilisés par les pages.
import { icon } from './icons.mjs';

/**
 * Textes écrits directement dans les gabarits (bandeaux communs, pages Merci et 404, mentions légales…).
 * Dans le thème WordPress, ils deviennent modifiables (menu « Textes des pages ») : tx() rend alors un repère.
 */
export const common = {
  'commun.carteFleuve': { fr: "fleuve Niger", en: "Niger river" },
  'commun.carteCredit': { fr: "Fond de carte : Natural Earth (domaine public), OpenStreetMap.", en: "Map data: Natural Earth (public domain), OpenStreetMap." },
  'commun.etudeDeCas': { fr: "Étude de cas", en: "Case study" },
  'commun.bandeauLogos': { fr: "Ils nous font confiance", en: "They trust us" },
  'commun.expertsSurtitre': { fr: "Banque d’experts", en: "Expert pool" },
  'commun.expertsTitre': { fr: "Consultants, experts, formateurs : <span class=\"accent\">rejoignez notre réseau.</span>", en: "Consultants, experts, trainers: <span class=\"accent\">join our network.</span>" },
  'commun.expertsTexte': { fr: "A-Z Sarl compose ses équipes mandat par mandat à partir d’une large banque de CV. Déposez le vôtre : nous vous contactons dès qu’une mission correspond à votre profil.", en: "A-Z Sarl builds its teams assignment by assignment from a large pool of CVs. Submit yours and we will contact you when a mission matches your profile." },
  'commun.expertsBouton': { fr: "Déposer mon CV", en: "Submit my CV" },
  'commun.contactSurtitre': { fr: "Parlons de votre projet", en: "Let’s talk about your project" },
  'commun.contactTitre': { fr: "Des termes de référence, un appel d’offres, un besoin de formation ? <span class=\"accent\">Écrivons la suite ensemble.</span>", en: "Terms of reference, a tender, a training need? <span class=\"accent\">Let’s write what comes next together.</span>" },
  'commun.contactBouton': { fr: "Nous écrire", en: "Write to us" },
  'commun.voirRealisation': { fr: "Voir la réalisation", en: "See the project" },
  'about.zonesSurtitre': { fr: "Zones d’intervention", en: "Areas of intervention" },
  'contact.planTitre': { fr: "Plan : Hamdallaye ACI 2000, Bamako", en: "Map: Hamdallaye ACI 2000, Bamako" },
  'join.formulaireSouci': { fr: "Un souci avec le formulaire ? Envoyez votre CV à", en: "Problem with the form? Email your CV to" },
  'partners.filtresLibelle': { fr: "Filtrer les partenaires", en: "Filter partners" },
  'projects.galerieTerrain': { fr: "Missions de terrain", en: "Field missions" },
  'projects.galerieFormations': { fr: "Formations", en: "Training" },
  'service.autresPoles': { fr: "Autres pôles", en: "Other practice areas" },
  'merci.surtitre': { fr: "Message envoyé", en: "Message sent" },
  'merci.titre': { fr: "Merci, <span class=\"accent\">bien reçu.</span>", en: "Thank you, <span class=\"accent\">message received.</span>" },
  'merci.texte': { fr: "Votre message a bien été transmis à l’équipe d’A-Z Sarl. Nous revenons vers vous dans les meilleurs délais.", en: "Your message has been sent to the A-Z Sarl team. We will get back to you as soon as possible." },
  'merci.boutonAccueil': { fr: "Retour à l’accueil", en: "Back to home" },
  'merci.boutonExpertises': { fr: "Voir nos expertises", en: "See our expertise" },
  'merci.nomPage': { fr: "Merci", en: "Thank you" },
  'merci.description': { fr: "Confirmation d’envoi du formulaire.", en: "Form submission confirmation." },
  'page404.surtitre': { fr: "Erreur 404 · Page not found", en: "Erreur 404 · Page not found" },
  'page404.titre': { fr: "Cette page <span class=\"accent\">n’existe pas.</span>", en: "Cette page <span class=\"accent\">n’existe pas.</span>" },
  'page404.texte': { fr: "La page demandée a peut-être été déplacée. Revenez à l’accueil ou consultez nos expertises.<br><span lang=\"en\">The page you requested may have moved. Go back to the home page or explore our expertise.</span>", en: "La page demandée a peut-être été déplacée. Revenez à l’accueil ou consultez nos expertises.<br><span lang=\"en\">The page you requested may have moved. Go back to the home page or explore our expertise.</span>" },
  'page404.boutonAccueil': { fr: "Accueil", en: "Accueil" },
  'page404.boutonAnglais': { fr: "English home", en: "English home" },
  'legal.surtitre': { fr: "Informations légales", en: "Legal information" },
  'legal.titre': { fr: "Mentions légales & confidentialité", en: "Legal notice & privacy" },
  'legal.description': { fr: "Mentions légales et politique de confidentialité du site d’A-Z Sarl, bureau d’études et de conseil à Bamako.", en: "Legal notice and privacy policy of the A-Z Sarl website, consulting firm in Bamako, Mali." },
};
export const tx = (ctx, key) => {
  const v = common[key];
  if (!v) throw new Error(`Texte inconnu : ${key}`);
  return ctx.wp ? `[[az:t:${key}]]` : (v[ctx.lang] ?? v.fr);
};

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Image responsive (WebP + JPEG) à partir du manifeste src/data/photos.json */
export function picture(ctx, name, { alt = '', sizes = '100vw', cls = '', loading = 'lazy', priority = false, style = '' } = {}) {
  // Thème WordPress : photo remplaçable depuis l'administration (menu « Photos du site »)
  if (ctx.wp) return ctx.wp('picture', { name, alt, sizes, cls, loading, priority, style });
  const m = ctx.photos[name];
  if (!m) throw new Error(`Photo inconnue : ${name}`);
  const src = (w, ext) => ctx.asset(`img/photos/${name}-${w}.${ext}`);
  const set = (ext) => m.widths.map((w) => `${src(w, ext)} ${w}w`).join(', ');
  const fallback = m.widths.find((w) => w >= 800) || m.widths[m.widths.length - 1];
  return `<picture><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${src(fallback, 'jpg')}" srcset="${set('jpg')}" sizes="${sizes}" width="${m.width}" height="${m.height}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''} loading="${priority ? 'eager' : loading}" decoding="async"${priority ? ' fetchpriority="high"' : ''}></picture>`;
}

/** Plus grande version d'une photo (pour la visionneuse) */
export const largest = (ctx, name) => (ctx.wp ? ctx.wp('largest', { name }) : ctx.asset(`img/photos/${name}-${ctx.photos[name].widths.at(-1)}.jpg`));

/** Logo d'un partenaire, ou plaque typographique s'il n'y a pas de logo */
export function partnerLogo(ctx, p, { loading = 'lazy' } = {}) {
  if (!p.logo) {
    return `<span class="logo-plate"><b>${esc(p.acronym)}</b><small>${esc(ctx.L(categoryShort[p.category]))}</small></span>`;
  }
  const alt = p.logo.alt ? ctx.L(p.logo.alt) : (ctx.lang === 'en' ? `${p.acronym} logo` : `Logo ${p.acronym}`);
  if (p.logo.raster) {
    const base = ctx.asset(`img/partners/${p.logo.file}`);
    return `<picture><source type="image/webp" srcset="${base}.webp"><img class="logo--${p.id}" src="${base}.png" width="${p.logo.width}" height="${p.logo.height}" alt="${esc(alt)}" loading="${loading}" decoding="async"></picture>`;
  }
  return `<img class="logo--${p.id}" src="${ctx.asset(`img/partners/${p.logo.file}`)}" width="${p.logo.width}" height="${p.logo.height}" alt="${esc(alt)}" loading="${loading}" decoding="async">`;
}
const categoryShort = {
  international: { fr: 'International', en: 'International' },
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

/** Fond commun des cartes : tracé du Mali défini une seule fois (ombre, pays, fleuve découpé) */
function mapGround(ctx, uid) {
  const { map } = ctx;
  return `<defs><path id="mali-${uid}" d="${map.country}"/><clipPath id="clip-${uid}"><use href="#mali-${uid}"/></clipPath></defs>
    <use class="land-shadow" href="#mali-${uid}" transform="translate(7 9)"/>
    <use class="land" href="#mali-${uid}"/>
    <g clip-path="url(#clip-${uid})"><path class="river" d="${map.river}"/></g>`;
}

/** Médaillon : le Mali entier, avec la zone agrandie `box` (coin supérieur gauche, ou droit si `right`) */
function mapInset(ctx, uid, { right = false, box = ctx.map.region } = {}) {
  const { map } = ctx;
  const [rx, ry, rw, rh] = box;
  const [fx, fy, fw, fh] = map.full.viewBox;
  const s = 118 / fw;
  const ix = right ? rx + rw - fw * s - 22 : rx + 22, iy = ry + 40;
  return `<g aria-hidden="true">
    <rect class="inset-frame" x="${(ix - 8).toFixed(1)}" y="${(iy - 26).toFixed(1)}" width="${(fw * s + 16).toFixed(1)}" height="${(fh * s + 34).toFixed(1)}" rx="10"/>
    <text class="inset-label" x="${(ix).toFixed(1)}" y="${(iy - 10).toFixed(1)}">MALI</text>
    <g transform="translate(${(ix - fx * s).toFixed(2)} ${(iy - fy * s).toFixed(2)}) scale(${s.toFixed(5)})"><use class="inset-land" href="#mali-${uid}"/><rect class="inset-box" x="${rx}" y="${ry}" width="${rw}" height="${rh}"/></g></g>`;
}

const placeNames = { bamako: 'Bamako', koulikoro: 'Koulikoro', segou: 'Ségou', sikasso: 'Sikasso' };

/** Carte des zones d'une réalisation sans photo (décorative dans les cartes cliquables) */
export function zoneMap(ctx, p, { decorative = false, uid = p.id } = {}) {
  const { map } = ctx;
  // Cadrage centré sur les zones et Bamako (repère), au format 4:3 des visuels
  const pts = [...p.zones, 'bamako'].map((z) => map.points[z]);
  const mid = (k) => (Math.min(...pts.map((q) => q[k])) + Math.max(...pts.map((q) => q[k]))) / 2;
  const box = [+(mid(0) - 300).toFixed(1), +(mid(1) - 225).toFixed(1), 600, 450];
  const names = p.zones.map((z) => placeNames[z]);
  const list = `${names.slice(0, -1).join(', ')} ${ctx.lang === 'en' ? 'and' : 'et'} ${names.at(-1)}`;
  const labelPos = { koulikoro: { dx: 0, dy: -26, anchor: 'middle' }, segou: { dx: 24, dy: 7, anchor: 'start' }, sikasso: { dx: 24, dy: 7, anchor: 'start' } };
  const zones = p.zones.map((z, i) => {
    const [x, y] = map.points[z];
    const lp = labelPos[z] || { dx: 0, dy: -26, anchor: 'middle' };
    return `<g class="pin" data-place="${z}"><circle class="zone-area" cx="${x}" cy="${y}" r="44"/><circle class="halo" cx="${x}" cy="${y}" r="13" style="animation-delay:${i * 0.4}s"/><circle class="core" cx="${x}" cy="${y}" r="10"/><text class="pin-label" x="${x + lp.dx}" y="${y + lp.dy}" text-anchor="${lp.anchor}">${placeNames[z]}</text></g>`;
  }).join('');
  const [bx, by] = map.points.bamako;
  const a11y = decorative
    ? 'aria-hidden="true" focusable="false">'
    : `role="img" aria-labelledby="zm-${uid}-t"><title id="zm-${uid}-t">${ctx.lang === 'en' ? `Map of the study areas: ${list}` : `Carte des zones de l’étude : ${list}`}</title>`;
  return `<svg class="map-svg zone-map" viewBox="${box.join(' ')}" ${a11y}
    ${mapGround(ctx, `zm-${uid}`)}
    <circle class="ref-dot" cx="${bx}" cy="${by}" r="5"/><text class="ref-label" x="${bx - 12}" y="${by + 5}" text-anchor="end">Bamako</text>
    ${zones}
    ${mapInset(ctx, `zm-${uid}`, { right: true, box })}
  </svg>`;
}

// Vue nationale (moitié sud du Mali, de Kayes à Gao), en unités de src/data/mali-map.json
const NATIONAL_VIEW = [0, 830, 1300, 695];

/** Carte du Mali : siège de Bamako et zones d'intervention, reliées par des tracés */
export function maliMap(ctx, { headingId = 'carte-titre' } = {}) {
  const { map, places } = ctx;
  const pt = (id) => map.points[id];
  const hq = pt('bamako');
  const arcs = places.filter((p) => !p.hq).map((p) => {
    const [x, y] = pt(p.id);
    const mx = (hq[0] + x) / 2, my = (hq[1] + y) / 2;
    const dx = x - hq[0], dy = y - hq[1];
    const len = Math.hypot(dx, dy);
    let nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    const k = len * 0.18;
    return `<path class="arc" d="M${hq[0]} ${hq[1]}Q${(mx + nx * k).toFixed(1)} ${(my + ny * k).toFixed(1)} ${x} ${y}"/>`;
  }).join('');
  // Position des noms autour de chaque repère (évite les chevauchements dans le sud, où les villes sont proches)
  const labelPos = {
    bamako: { dx: -24, dy: -12, anchor: 'end' },
    kayes: { dx: 22, dy: 7, anchor: 'start' },
    nioro: { dx: 22, dy: 7, anchor: 'start' },
    koulikoro: { dx: 0, dy: -24, anchor: 'middle' },
    dioila: { dx: 22, dy: 8, anchor: 'start' },
    bougouni: { dx: -22, dy: 7, anchor: 'end' },
    sikasso: { dx: 22, dy: 7, anchor: 'start' },
    segou: { dx: 22, dy: -2, anchor: 'start' },
    mopti: { dx: -22, dy: 7, anchor: 'end' },
    bandiagara: { dx: 20, dy: 26, anchor: 'start' },
    douentza: { dx: 22, dy: 7, anchor: 'start' },
    gao: { dx: 22, dy: 7, anchor: 'start' },
  };
  const pins = places.map((p, i) => {
    const [x, y] = pt(p.id);
    const lp = labelPos[p.id] || { dx: 22, dy: 7, anchor: 'start' };
    return `<g class="pin${p.hq ? ' pin--hq' : ''}" data-place="${p.id}"><circle class="halo" cx="${x}" cy="${y}" r="19" style="animation-delay:${(i % 6) * 0.35}s"/><circle class="core" cx="${x}" cy="${y}" r="17"/><text class="pin-num" x="${x}" y="${y}">${i + 1}</text><text class="pin-label" x="${x + lp.dx}" y="${y + lp.dy}" text-anchor="${lp.anchor}">${p.name}</text></g>`;
  }).join('');
  const title = ctx.lang === 'en'
    ? `Map of Mali showing the A-Z Sarl head office in Bamako and its areas of intervention: ${places.filter((p) => !p.hq).map((p) => p.name).join(', ')}`
    : `Carte du Mali : siège d’A-Z Sarl à Bamako et zones d’intervention : ${places.filter((p) => !p.hq).map((p) => p.name).join(', ')}`;
  return `
<figure class="map-figure">
  <svg class="map-svg map-svg--national" viewBox="${NATIONAL_VIEW.join(' ')}" role="img" aria-labelledby="${headingId}-svg">
    <title id="${headingId}-svg">${title}</title>
    ${mapGround(ctx, headingId)}
    <text class="river-label" x="0" y="0" transform="translate(${(pt('segou')[0] + 95).toFixed(1)} ${(pt('segou')[1] - 27).toFixed(1)}) rotate(-28)">${tx(ctx, 'commun.carteFleuve')}</text>
    ${arcs}
    ${pins}
    ${mapInset(ctx, headingId, { box: NATIONAL_VIEW })}
  </svg>
  <figcaption class="map-credit">${tx(ctx, 'commun.carteCredit')}</figcaption>
</figure>`;
}

export function mapLegend(ctx) {
  return `<ol class="map-legend">${ctx.places.map((p, i) => `<li data-place="${p.id}"><span class="map-legend__num">${i + 1}</span><span class="map-legend__place">${p.name}${p.who ? `<span class="map-legend__who">${ctx.L(p.who)}</span>` : ''}</span></li>`).join('')}</ol>`;
}

/** Section « zones d'intervention » : en-tête, carte nationale pleine largeur, légende en colonnes */
export function zonesSection(ctx, { eyebrow, title, text, headingId, white = true }) {
  return `
<section class="section${white ? ' section--white' : ''} zones" aria-labelledby="${headingId}-title" data-map>
  <div class="container">
    <div class="section-head section-head--split" data-reveal>
      <div><p class="eyebrow">${eyebrow}</p><h2 class="h2" id="${headingId}-title">${title}</h2></div>
      <p class="lead">${text}</p>
    </div>
    <div class="zones__map" data-reveal>${maliMap(ctx, { headingId })}</div>
    ${mapLegend(ctx).replace('class="map-legend"', 'class="map-legend map-legend--grid"')}
  </div>
</section>`;
}

/** Toutes les missions : réalisations illustrées (projects) + références (references), triées de la plus récente */
export function allMissions(ctx) {
  const fromProjects = ctx.projects.map((p) => ({
    id: p.id, year: Number(p.year), sort: Number(p.year), partner: p.partner || null, kind: p.kind, services: p.services,
    title: p.title, zone: p.zone, caseHref: projectHref(ctx, p),
  }));
  const fromRefs = ctx.references.map((r) => ({ ...r, sort: r.sort || r.year }));
  // Tri stable : à année égale, les réalisations illustrées d'abord
  return [...fromProjects, ...fromRefs].sort((a, b) => b.sort - a.sort);
}

/** Chiffres clés calculés à partir des données (missions, partenaires, régions) */
export function keyFigures(ctx) {
  // Thème WordPress : chiffres calculés par le thème à partir des contenus de l'administration
  if (ctx.wp) return Object.fromEntries(['missions', 'partners', 'clients', 'regions', 'since'].map((k) => [k, `[[az:fig:${k}]]`]));
  const missions = allMissions(ctx);
  const years = missions.filter((m) => m.year).map((m) => m.year);
  return {
    missions: missions.length,
    partners: ctx.partners.length,
    clients: new Set(missions.map((m) => m.partner).filter(Boolean)).size,
    regions: ctx.places.filter((p) => !p.hq).length,
    since: Math.min(...years),
  };
}

/** Ligne d'une référence (liste complète de la page Réalisations, ou version compacte des pages pôles) */
export function referenceItem(ctx, m, { compact = false } = {}) {
  const partner = m.partner ? ctx.partners.find((x) => x.id === m.partner) : null;
  const kind = ctx.kinds[m.kind];
  const when = m.year ? String(m.year) : ctx.L(m.period);
  const logo = partner
    ? `<span class="ref__logo" aria-hidden="true">${partner.logo ? partnerLogo(ctx, partner) : `<b>${esc(partner.acronym)}</b>`}</span>`
    : `<span class="ref__logo ref__logo--az" aria-hidden="true"><img src="${ctx.asset('img/brand/az-mark.svg')}" alt="" width="40" height="28"></span>`;
  const who = partner ? esc(partner.acronym) : 'A-Z Sarl';
  return `<li class="ref${compact ? ' ref--compact' : ''}" data-ref data-kind="${kind.group}" data-partner="${m.partner || 'a-z'}" data-services="${m.services.join(' ')}" data-ref-year="${esc(when)}">
      <span class="ref__year">${esc(when)}${m.periodNote ? `<small>${ctx.L(m.periodNote)}</small>` : ''}</span>
      ${logo}
      <div class="ref__body">
        <p class="ref__meta"><span class="ref__kind ref__kind--${kind.group}">${ctx.L(kind)}</span><span class="ref__who">${who}</span></p>
        <p class="ref__title">${ctx.L(m.title)}</p>
        ${m.zone || m.note ? `<p class="ref__zone">${m.zone ? `${icon('pin')} ${ctx.L(m.zone)}` : ''}${m.note && !compact ? `<span class="ref__note">${ctx.L(m.note)}</span>` : ''}</p>` : ''}
      </div>
      ${m.caseHref ? `<a class="ref__case" href="${m.caseHref}">${tx(ctx, 'commun.etudeDeCas')} ${icon('arrow')}</a>` : ''}
    </li>`;
}

/** Bandeau défilant des logos partenaires */
export function marquee(ctx) {
  if (ctx.wp) return ctx.wp('marquee');
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
    <h2 class="trust__label" id="trust-title">${tx(ctx, 'commun.bandeauLogos')}</h2>
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
        <p class="eyebrow">${tx(ctx, 'commun.expertsSurtitre')}</p>
        <h2 class="h2">${tx(ctx, 'commun.expertsTitre')}</h2>
        <p class="lead">${tx(ctx, 'commun.expertsTexte')}</p>
      </div>
      <div class="btn-row">
        <a class="btn btn--accent" href="${ctx.href('join')}">${tx(ctx, 'commun.expertsBouton')} ${icon('arrow', 'icon--arrow')}</a>
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
      <p class="eyebrow">${tx(ctx, 'commun.contactSurtitre')}</p>
      <h2 class="h2" id="contact-band-title">${title || tx(ctx, 'commun.contactTitre')}</h2>
      <div class="btn-row" style="margin-top:32px">
        <a class="btn" href="${ctx.href('contact')}">${tx(ctx, 'commun.contactBouton')} ${icon('arrow', 'icon--arrow')}</a>
        <a class="btn btn--whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} WhatsApp</a>
      </div>
    </div>
    <div class="contact-band__links" data-reveal style="--d:.1s">
      ${ctx.wp ? ctx.wp('contactLines') : site.phones.map((p) => `<a class="contact-line" href="tel:${p.tel}"><span class="contact-line__icon">${icon('phone')}</span><span><small>${ctx.t.phone}</small>${p.display}</span></a>`).join('')}
      <a class="contact-line" href="mailto:${site.email}"><span class="contact-line__icon">${icon('mail')}</span><span><small>${ctx.t.email}</small>${site.email}</span></a>
    </div>
  </div>
</section>`;
}

/** Adresse d'une réalisation (ancre de la page Réalisations) */
export const projectHref = (ctx, p) => `${ctx.href('projects')}#${p.id}`;

/** Intitulé court d'une réalisation (cartes, sommaire, plaquette) */
export const projectShort = (ctx, p) => ctx.L(p.short || p.title);

/** Carte d'une réalisation (accueil, pages pôles) */
export function projectCard(ctx, p, { sizes = '(min-width: 1100px) 400px, (min-width: 700px) 50vw, 100vw', delay = 0 } = {}) {
  const visual = p.photos.length ? picture(ctx, p.photos[0].id, { alt: '', sizes }) : zoneMap(ctx, p, { decorative: true, uid: `${p.id}-card` });
  return `
<a class="proj-card" href="${projectHref(ctx, p)}" data-reveal style="--d:${delay}s">
  <div class="proj-card__media${p.photos.length ? '' : ' proj-card__media--map'}">${visual}${p.year ? `<span class="proj-card__year">${p.year}</span>` : ''}</div>
  <div class="proj-card__body">
    <span class="proj-card__tag">${ctx.L(p.tag)}</span>
    <h3 class="proj-card__title">${projectShort(ctx, p)}</h3>
    <span class="link-arrow">${tx(ctx, 'commun.voirRealisation')} ${icon('arrow')}</span>
  </div>
</a>`;
}

/** Liens vers les réseaux sociaux du bureau */
export function socialLinks(ctx, cls = '') {
  if (ctx.wp) return ctx.wp('social', { cls });
  if (!ctx.site.social.length) return '';
  return `<ul class="social ${cls}">${ctx.site.social.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`${s.name} ${ctx.site.name} ${ctx.t.newTab}`)}" title="${s.name}">${icon(s.icon)}</a></li>`).join('')}</ul>`;
}

/** Démarche en 4 étapes, version claire/compacte (pages pôles) */
export function miniSteps(ctx, steps) {
  return `<ol class="mini-steps">${steps.map((s, i) => `<li class="mini-step" data-reveal style="--d:${i * 0.08}s"><span class="mini-step__num">0${i + 1}</span><h3 class="mini-step__title">${ctx.L(s.title)}</h3><p>${ctx.L(s.text)}</p></li>`).join('')}</ol>`;
}
