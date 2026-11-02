// Page « Réalisations » : études de cas, galeries photos et visionneuse
import { icon } from '../icons.mjs';
import { pageHero, picture, largest, partnerLogo, partnerUrl, sectionHead, contactBand, esc } from '../components.mjs';

const copy = {
  fr: {
    title: 'Réalisations',
    description: 'Réalisations d’A-Z Sarl : camp Digital & IA 2026, évaluation du modèle FRES, formation en GPEC avec la CANAM, formations LuxDev et World Renew.',
    eyebrow: 'Réalisations',
    h1: 'Sur le terrain, en salle <span class="accent">et aux côtés de nos partenaires.</span>',
    lead: 'Études et évaluations, formations, projets numériques : une sélection de missions menées par A-Z Sarl, en images.',
    toc: 'Aller à',
    featured: 'À la une',
    partner: 'Partenaire',
    photos: 'photos',
    photo: 'photo',
    enlarge: 'Agrandir la photo',
    modules: 'Au programme',
    duoEyebrow: 'Formations',
    duoTitle: 'Former les équipes <span class="accent">de nos partenaires.</span>',
    galleryNote: 'Cliquez sur une photo pour l’agrandir.',
    credit: 'Photos de remise d’attestations : MansaPic.',
    moreTitle: 'Votre projet sera <span class="accent">notre prochaine réalisation.</span>',
  },
  en: {
    title: 'Projects',
    description: 'A-Z Sarl projects: Digital & AI Camp 2026, FRES model evaluation, GPEC training with CANAM, LuxDev and World Renew training, field data collection.',
    eyebrow: 'Projects',
    h1: 'In the field, in the training room <span class="accent">and alongside our partners.</span>',
    lead: 'Studies and evaluations, training, digital projects: a selection of assignments delivered by A-Z Sarl, in pictures.',
    toc: 'Jump to',
    featured: 'Featured',
    partner: 'Partner',
    photos: 'photos',
    photo: 'photo',
    enlarge: 'Enlarge photo',
    modules: 'Programme',
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
  const ph = p.photos[0];
  return `<a class="project__cover" href="${largest(ctx, ph.id)}" data-lightbox="${p.id}" data-caption="${esc(ctx.L(ph.alt))}" aria-label="${esc(`${c.enlarge} : ${ctx.L(ph.alt)}`)}">
      ${picture(ctx, ph.id, { alt: ctx.L(ph.alt), sizes })}
      ${p.year ? `<span class="project__year">${p.year}</span>` : ''}
      <span class="project__count">${icon('zoom')} ${p.photos.length} ${p.photos.length > 1 ? c.photos : c.photo}</span>
    </a>`;
}

function facts(ctx, p) {
  if (!p.facts) return '';
  return `<dl class="facts">${p.facts.map((f) => `<div><dt>${ctx.L(f.k)}</dt><dd>${ctx.L(f.v)}</dd></div>`).join('')}</dl>`;
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
        <h2 class="h2 project__title" id="${p.id}-title">${ctx.L(p.title)}</h2>
        ${p.quote ? `<p class="project__quote">« ${ctx.L(p.quote)} »</p>` : ''}
        ${p.text.map((t) => `<p class="project__text">${ctx.L(t)}</p>`).join('')}
        ${p.modules ? `<p class="project__label">${c.modules}</p><ul class="chip-list">${ctx.L(p.modules).map((m) => `<li class="chip chip--teal">${m}</li>`).join('')}</ul>` : ''}
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
    ${thumbs(ctx, p, c)}
    <div class="project__actions">${partnerBadge(ctx, p, c)}</div>
  </div>
</article>`;
}

export default function projects(ctx) {
  const c = copy[ctx.lang];
  const big = ['camp-digital-ia-2026', 'evaluation-modele-fres-2021', 'gpec-canam-2026'].map((id) => ctx.projects.find((p) => p.id === id));
  const duo = ['formation-luxdev', 'formation-world-renew'].map((id) => ctx.projects.find((p) => p.id === id));
  const galleries = ctx.galleries;

  const toc = [...big, ...duo].map((p) => `<li><a class="chip" href="#${p.id}">${ctx.L(p.title)}</a></li>`)
    .concat(galleries.map((g) => `<li><a class="chip" href="#g-${g.id}">${ctx.L(g.title)}</a></li>`)).join('');

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
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }] })}

<nav class="toc" aria-label="${c.toc}">
  <div class="container"><span class="toc__label">${c.toc}</span><ul class="chip-list">${toc}</ul></div>
</nav>

${big.map((p, i) => caseStudy(ctx, p, c, i)).join('')}

<section class="section" aria-labelledby="duo-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.duoEyebrow, title: c.duoTitle, id: 'duo-title' })}
    <div class="duo">${duo.map((p) => duoCard(ctx, p, c)).join('')}</div>
  </div>
</section>

${galleries.map((g, i) => gallery(g, i + 1)).join('')}

${contactBand(ctx, { title: c.moreTitle })}
`;
  return { title: c.title, description: c.description, body };
}
