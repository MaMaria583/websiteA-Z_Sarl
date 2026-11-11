// Page « Réalisations » : chiffres clés, études de cas, liste filtrable des références, galeries et visionneuse
import { icon } from '../icons.mjs';
import { pageHero, picture, largest, partnerLogo, partnerUrl, sectionHead, contactBand, zoneMap, projectShort, allMissions, keyFigures, referenceItem, esc } from '../components.mjs';

export const copy = {
  fr: {
    title: 'Réalisations',
    description: 'Références d’A-Z Sarl depuis 2021 : évaluations et études pour Save the Children, la GIZ, World Renew et FRES, formations et appui-conseil, de Kayes à Gao.',
    eyebrow: 'Réalisations',
    h1: 'Sur le terrain, en salle <span class="accent">et aux côtés de nos partenaires.</span>',
    lead: (k) => `Évaluations, études, formations et appui-conseil : ${k.missions} missions menées depuis ${k.since} pour ${k.clients} commanditaires, de Kayes à Gao.`,
    figures: (k) => [[k.missions, 'missions de référence'], [k.clients, 'commanditaires'], [k.regions, 'régions et le district de Bamako']],
    allRefs: 'Voir toutes nos références',
    toc: 'Aller à',
    tocRefs: (n) => `Toutes nos références (${n})`,
    refsEyebrow: 'Références',
    refsTitle: 'Toutes nos missions, <span class="accent">année après année.</span>',
    refsLead: 'Évaluations, études, formations et appui-conseil, de la mission la plus récente à la plus ancienne.',
    all: 'Toutes',
    refsStatus: '{n} missions affichées',
    refsFilter: 'Filtrer les références',
    partnerOnly: 'Missions avec',
    poleOnly: 'Missions du pôle',
    showAll: 'Afficher toutes les missions',
    featured: 'À la une',
    partner: 'Partenaire',
    photos: 'photos',
    photo: 'photo',
    enlarge: 'Agrandir la photo',
    modules: 'Au programme',
    missions: 'Les deux volets de la mission',
    duoEyebrow: 'Formations',
    duoTitle: 'Former les équipes <span class="accent">de nos partenaires.</span>',
    galleryNote: 'Cliquez sur une photo pour l’agrandir.',
    credit: 'Photos de remise d’attestations : MansaPic.',
    moreTitle: 'Votre projet sera <span class="accent">notre prochaine réalisation.</span>',
  },
  en: {
    title: 'Projects',
    description: 'A-Z Sarl track record since 2021: evaluations and studies for Save the Children, GIZ, World Renew and FRES, training and advisory support, from Kayes to Gao.',
    eyebrow: 'Projects',
    h1: 'In the field, in the training room <span class="accent">and alongside our partners.</span>',
    lead: (k) => `Evaluations, studies, training and advisory support: ${k.missions} assignments since ${k.since} for ${k.clients} clients, from Kayes to Gao.`,
    figures: (k) => [[k.missions, 'reference assignments'], [k.clients, 'clients'], [k.regions, 'regions plus the Bamako district']],
    allRefs: 'See our full track record',
    toc: 'Jump to',
    tocRefs: (n) => `Full track record (${n})`,
    refsEyebrow: 'Track record',
    refsTitle: 'All our assignments, <span class="accent">year after year.</span>',
    refsLead: 'Evaluations, studies, training and advisory support, from the most recent assignment to the oldest.',
    all: 'All',
    refsStatus: '{n} assignments shown',
    refsFilter: 'Filter the track record',
    partnerOnly: 'Assignments with',
    poleOnly: 'Assignments in',
    showAll: 'Show all assignments',
    featured: 'Featured',
    partner: 'Partner',
    photos: 'photos',
    photo: 'photo',
    enlarge: 'Enlarge photo',
    modules: 'Programme',
    missions: 'The two components of the assignment',
    duoEyebrow: 'Training',
    duoTitle: 'Training <span class="accent">our partners’ teams.</span>',
    galleryNote: 'Click a photo to enlarge it.',
    credit: 'Certificate ceremony photos: MansaPic.',
    moreTitle: 'Your project could be <span class="accent">our next success story.</span>',
  },
};

// Vignettes cliquables (visionneuse), groupées par réalisation
function thumbs(ctx, p, c, { skipFirst = true, max = 12 } = {}) {
  const list = p.photos.slice(skipFirst ? 1 : 0, max);
  if (!list.length) return '';
  const cols = list.length <= 6 ? list.length : Math.ceil(list.length / 2);
  return `<ul class="thumbs" style="--cols:${Math.max(cols, 3)}">${list.map((ph) => `<li><a class="thumbs__item" href="${largest(ctx, ph.id)}" data-lightbox="${p.id}" data-caption="${esc(ctx.L(ph.alt))}" aria-label="${esc(`${c.enlarge} : ${ctx.L(ph.alt)}`)}">${picture(ctx, ph.id, { alt: '', sizes: '160px' })}</a></li>`).join('')}</ul>`;
}

function cover(ctx, p, c, sizes) {
  if (!p.photos.length) {
    return `<div class="project__cover project__cover--map">${zoneMap(ctx, p)}${p.year ? `<span class="project__year">${p.year}</span>` : ''}</div>`;
  }
  const ph = p.photos[0];
  return `<a class="project__cover" href="${largest(ctx, ph.id)}" data-lightbox="${p.id}" data-caption="${esc(ctx.L(ph.alt))}" aria-label="${esc(`${c.enlarge} : ${ctx.L(ph.alt)}`)}">
      ${picture(ctx, ph.id, { alt: ctx.L(ph.alt), sizes })}
      ${p.year ? `<span class="project__year">${p.year}</span>` : ''}
      <span class="project__count">${icon('zoom')} ${p.photos.length} ${p.photos.length > 1 ? c.photos : c.photo}</span>
    </a>`;
}

function facts(ctx, p, cls = '') {
  if (!p.facts) return '';
  return `<dl class="facts${cls ? ` ${cls}` : ''}">${p.facts.map((f) => `<div><dt>${ctx.L(f.k)}</dt><dd>${ctx.L(f.v)}</dd></div>`).join('')}</dl>`;
}

function modules(ctx, p, c) {
  if (!p.modules) return '';
  return `<p class="project__label">${p.modulesLabel ? ctx.L(p.modulesLabel) : c.modules}</p><ul class="chip-list">${ctx.L(p.modules).map((m) => `<li class="chip chip--teal">${m}</li>`).join('')}</ul>`;
}

// Volets d'une même mission, dans les termes du client
function missions(ctx, p, c) {
  if (!p.missions) return '';
  return `<p class="project__label">${c.missions}</p><ol class="missions">${ctx.L(p.missions).map((m, k) => `<li><span class="missions__num">0${k + 1}</span><span>${m}</span></li>`).join('')}</ol>`;
}

// Liste complète des références, filtrable par type de mission et, depuis la page Partenaires, par partenaire
function referencesSection(ctx, c) {
  const items = allMissions(ctx);
  const count = (g) => items.filter((m) => ctx.kinds[m.kind].group === g).length;
  const filters = [`<button class="filter-btn" type="button" data-ref-filter="all" aria-pressed="true">${c.all}<span>${items.length}</span></button>`]
    .concat(ctx.kindGroups.map((g) => `<button class="filter-btn" type="button" data-ref-filter="${g.id}" aria-pressed="false">${ctx.L(g.title)}<span>${count(g.id)}</span></button>`)).join('');
  let prev = null;
  const list = items.map((m) => {
    const html = referenceItem(ctx, m);
    const when = m.year ? String(m.year) : ctx.L(m.period);
    const first = when !== prev;
    prev = when;
    return first ? html.replace('class="ref"', 'class="ref ref--first"') : html;
  }).join('');
  const names = Object.fromEntries(ctx.partners.map((p) => [p.id, p.acronym]).concat(ctx.services.map((s) => [`pole:${s.id}`, ctx.L(s.short)])));
  return `
<section class="section section--white refs-section" id="references" aria-labelledby="references-title" data-refs>
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.refsEyebrow, title: c.refsTitle, lead: c.refsLead, split: true, id: 'references-title' })}
    <div class="refs-tools">
      <div class="filters" role="group" aria-label="${c.refsFilter}">${filters}</div>
      <p class="refs-partner" data-ref-partner data-names="${esc(JSON.stringify(names))}" data-label-partner="${c.partnerOnly}" data-label-pole="${c.poleOnly}" hidden><span data-ref-partner-label>${c.partnerOnly}</span> <b data-ref-partner-name></b><button type="button" class="refs-partner__clear">${c.showAll} ${icon('close')}</button></p>
    </div>
    <p class="sr-only" aria-live="polite" data-ref-status data-template="${c.refsStatus}"></p>
    <ol class="refs">${list}</ol>
  </div>
</section>`;
}

function partnerBadge(ctx, p, c) {
  if (!p.partner) return '';
  const partner = ctx.partners.find((x) => x.id === p.partner);
  if (!partner) return '';
  const url = partnerUrl(ctx, partner);
  const inner = `<span class="project__partner-logo">${partnerLogo(ctx, partner)}</span><span><small>${c.partner}</small>${esc(partner.acronym)}</span>`;
  return url
    ? `<a class="project__partner" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`${ctx.t.visitOf} ${partner.acronym} ${ctx.t.newTab}`)}">${inner}${icon('external')}</a>`
    : `<span class="project__partner">${inner}</span>`;
}

function caseStudy(ctx, p, c, i) {
  const featured = i === 0;
  return `
<section class="section project${i % 2 ? ' section--white' : ''}" id="${p.id}" aria-labelledby="${p.id}-title">
  <div class="container">
    <div class="project__grid${i % 2 ? ' project__grid--rev' : ''}">
      <div class="project__media" data-reveal>${cover(ctx, p, c, '(min-width: 980px) 640px, 100vw')}</div>
      <div class="project__body" data-reveal style="--d:.1s">
        <p class="eyebrow">${featured ? `${c.featured} · ` : ''}${ctx.L(p.tag)}</p>
        <h2 class="h2 project__title${ctx.L(p.title).length > 90 ? ' project__title--long' : ''}" id="${p.id}-title">${ctx.L(p.title)}</h2>
        ${p.quote ? `<p class="project__quote">« ${ctx.L(p.quote)} »</p>` : ''}
        ${missions(ctx, p, c)}
        ${p.text.map((t) => `<p class="project__text">${ctx.L(t)}</p>`).join('')}
        ${modules(ctx, p, c)}
        ${facts(ctx, p)}
        <div class="project__actions">
          ${partnerBadge(ctx, p, c)}
          ${p.link ? `<a class="link-arrow" href="${p.link.url}" target="_blank" rel="noopener noreferrer">${icon('doc')} ${ctx.L(p.link.label)} ${icon('external')}</a>` : ''}
        </div>
      </div>
    </div>
    ${thumbs(ctx, p, c)}
  </div>
</section>`;
}

function duoCard(ctx, p, c) {
  return `
<article class="duo-card" id="${p.id}" data-reveal aria-labelledby="${p.id}-title">
  ${cover(ctx, p, c, '(min-width: 980px) 600px, 100vw')}
  <div class="duo-card__body">
    <p class="eyebrow">${ctx.L(p.tag)}</p>
    <h3 class="h3" id="${p.id}-title">${ctx.L(p.title)}</h3>
    ${p.text.map((t) => `<p>${ctx.L(t)}</p>`).join('')}
    ${modules(ctx, p, c)}
    ${facts(ctx, p, 'facts--compact')}
    ${thumbs(ctx, p, c)}
    <div class="project__actions">${partnerBadge(ctx, p, c)}</div>
  </div>
</article>`;
}

export default function projects(ctx) {
  const c = copy[ctx.lang];
  const big = ['camp-digital-ia-2026', 'evaluation-modele-fres-2021', 'etude-base-world-renew-2026', 'gpec-canam-2026'].map((id) => ctx.projects.find((p) => p.id === id));
  const duo = ['formation-luxdev', 'formation-world-renew'].map((id) => ctx.projects.find((p) => p.id === id));
  const galleries = ctx.galleries;
  const k = keyFigures(ctx);

  const toc = ctx.wp ? ctx.wp('projectsToc') : [`<li><a class="chip chip--strong" href="#references">${c.tocRefs(k.missions)}</a></li>`]
    .concat([...big, ...duo].map((p) => `<li><a class="chip" href="#${p.id}">${esc(projectShort(ctx, p))}</a></li>`))
    .concat(galleries.map((g) => `<li><a class="chip" href="#g-${g.id}">${ctx.L(g.title)}</a></li>`)).join('');

  const figures = `<div class="hero-figures">
      <dl>${c.figures(k).map(([n, label]) => `<div><dt><span data-count="${n}">${n}</span></dt><dd>${label}</dd></div>`).join('')}</dl>
      <a class="link-arrow" href="#references">${c.allRefs} ${icon('arrow')}</a>
    </div>`;

  const gallery = (g, i) => `
<section class="section${i % 2 ? ' section--white' : ''}" id="g-${g.id}" aria-labelledby="g-${g.id}-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: g.id === 'terrain' ? (ctx.lang === 'en' ? 'Field missions' : 'Missions de terrain') : (ctx.lang === 'en' ? 'Training' : 'Formations'), title: ctx.L(g.title), lead: c.galleryNote, id: `g-${g.id}-title` })}
    <div class="gallery${g.items.length % 3 === 0 ? ' gallery--3' : ''}">
      ${g.items.map((it, k) => {
        const alt = ctx.L(it.alt);
        return `<figure class="figure-plain" data-reveal style="--d:${(k % 4) * 0.06}s">
        <a class="gallery__item${it.tall ? ' gallery__item--tall' : ''}" href="${largest(ctx, it.photo)}" data-lightbox="${g.id}" data-caption="${esc(alt)}">
          ${picture(ctx, it.photo, { alt, sizes: '(min-width: 900px) 33vw, 50vw' })}
          <span class="gallery__zoom" aria-hidden="true">${icon('zoom')}</span>
        </a>
        <figcaption class="gallery__cap">${alt}</figcaption>
      </figure>`;
      }).join('')}
    </div>
    ${g.id === 'formations' ? `<p class="credit" style="margin-top:20px">${c.credit}</p>` : ''}
  </div>
</section>`;

  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead(k), crumbs: [{ label: c.title }], aside: figures })}

<nav class="toc" aria-label="${c.toc}">
  <div class="container"><span class="toc__label">${c.toc}</span><ul class="chip-list">${toc}</ul></div>
</nav>

${ctx.wp ? ctx.wp('caseStudies') : big.map((p, i) => caseStudy(ctx, p, c, i)).join('')}

<section class="section" aria-labelledby="duo-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.duoEyebrow, title: c.duoTitle, id: 'duo-title' })}
    <div class="duo">${ctx.wp ? ctx.wp('duoCards') : duo.map((p) => duoCard(ctx, p, c)).join('')}</div>
  </div>
</section>

${ctx.wp ? ctx.wp('references') : referencesSection(ctx, c)}

${galleries.map((g, i) => gallery(g, i)).join('')}

${contactBand(ctx, { title: c.moreTitle })}
`;
  return { title: c.title, description: c.description, body };
}
