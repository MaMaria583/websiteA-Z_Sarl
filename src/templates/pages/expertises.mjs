// Page « Expertises » : les 5 pôles et les 13 domaines
import { icon } from '../icons.mjs';
import { pageHero, sectionHead, sectorFamilies, contactBand } from '../components.mjs';

const copy = {
  fr: {
    title: 'Nos expertises',
    description: 'Les 5 pôles d’A-Z Sarl : suivi-évaluation (SERA/MEAL), études socio-économiques, transformation digitale, formation et conseil en politiques publiques.',
    eyebrow: 'Expertises',
    h1: 'Cinq pôles d’expertise, <span class="accent">treize domaines d’intervention.</span>',
    lead: 'Une offre complète pour concevoir, suivre, évaluer et faire réussir les projets et les politiques de développement.',
    offer: 'Ce que nous faisons',
    see: 'Découvrir le pôle',
    sectorsEyebrow: 'Domaines d’intervention',
    sectorsTitle: 'Nos consultants interviennent <span class="accent">dans 13 domaines.</span>',
  },
  en: {
    title: 'Our expertise',
    description: 'A-Z Sarl’s 5 practice areas: monitoring and evaluation (MEAL), socio-economic studies, digital transformation, training and public policy advisory, across 13 sectors.',
    eyebrow: 'Expertise',
    h1: 'Five practice areas, <span class="accent">thirteen sectors.</span>',
    lead: 'A complete offer to design, monitor, evaluate and deliver successful development projects and policies.',
    offer: 'What we do',
    see: 'Explore this practice',
    sectorsEyebrow: 'Sectors',
    sectorsTitle: 'Our consultants work <span class="accent">across 13 sectors.</span>',
  },
};

export default function expertises(ctx) {
  const c = copy[ctx.lang];
  const rows = ctx.services.map((s) => `
    <article class="service-row" id="${s.id}" data-reveal>
      <div class="service-row__num"><span>${s.num}</span><span class="service-card__icon">${icon(s.icon)}</span></div>
      <div>
        <h2><a href="${ctx.href(`service:${s.id}`)}">${ctx.L(s.title)}</a></h2>
        <p>${ctx.L(s.lead)}</p>
        <a class="link-arrow" href="${ctx.href(`service:${s.id}`)}">${c.see} ${icon('arrow')}</a>
      </div>
      <div>
        <p class="eyebrow" style="margin-bottom:14px">${c.offer}</p>
        <ul class="ticks">${s.offer.slice(0, 4).map((o) => `<li>${icon('check')}<span>${ctx.L(o)}</span></li>`).join('')}</ul>
      </div>
    </article>`).join('');
  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }] })}

<section class="section" aria-label="${c.title}">
  <div class="container">${rows}</div>
</section>

<section class="section section--white" aria-labelledby="sectors-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.sectorsEyebrow, title: c.sectorsTitle, id: 'sectors-title' })}
    ${sectorFamilies(ctx)}
  </div>
</section>

${contactBand(ctx)}
`;
  return { title: c.title, description: c.description, body };
}
