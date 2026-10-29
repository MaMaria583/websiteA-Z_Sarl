// Page « Partenaires » : logos cliquables vers les sites officiels
import { icon } from '../icons.mjs';
import { pageHero, partnerLogo, partnerUrl, maliMap, mapLegend, contactBand, esc } from '../components.mjs';

const copy = {
  fr: {
    title: 'Partenaires',
    description: 'Les partenaires d’A-Z Sarl : GIZ, LuxDev, World Renew, CANAM, CAD-Mali, SEXAGON et des organisations de la société civile et du monde rural au Mali.',
    eyebrow: 'Partenaires',
    h1: 'Ils nous font <span class="accent">confiance.</span>',
    lead: 'Coopérations internationales, institution publique, société civile et organisations paysannes : nous travaillons aux côtés d’acteurs engagés pour le développement du Mali.',
    all: 'Tous',
    status: '{n} partenaires affichés',
    mapEyebrow: 'Implantations',
    mapTitle: 'Nos partenaires, <span class="accent">de Bamako aux régions.</span>',
    mapText: 'Les partenaires associatifs, coopératifs et paysans d’A-Z Sarl sont implantés dans les régions de Koulikoro, Ségou et Sikasso ; les institutions et coopérations internationales ont leur bureau à Bamako.',
    becomeTitle: 'Construisons <span class="accent">un partenariat utile.</span>',
    note: 'Les logos sont la propriété de leurs titulaires. Un clic ouvre le site officiel du partenaire dans un nouvel onglet.',
  },
  en: {
    title: 'Partners',
    description: 'A-Z Sarl’s partners: GIZ, LuxDev, World Renew, CANAM, CAD-Mali, SEXAGON and civil society and rural organisations in Mali.',
    eyebrow: 'Partners',
    h1: 'They <span class="accent">trust us.</span>',
    lead: 'International cooperation agencies, a public institution, civil society and farmers’ organisations: we work alongside committed actors for Mali’s development.',
    all: 'All',
    status: '{n} partners shown',
    mapEyebrow: 'Locations',
    mapTitle: 'Our partners, <span class="accent">from Bamako to the regions.</span>',
    mapText: 'A-Z Sarl’s community, cooperative and farmers’ partners are based in the Koulikoro, Ségou and Sikasso regions; institutions and international cooperation agencies have their offices in Bamako.',
    becomeTitle: 'Let’s build <span class="accent">a meaningful partnership.</span>',
    note: 'Logos are the property of their respective owners. Clicking opens the partner’s official website in a new tab.',
  },
};

export default function partnersPage(ctx) {
  const c = copy[ctx.lang];
  const count = (cat) => ctx.partners.filter((p) => p.category === cat).length;
  const filters = [`<button class="filter-btn" type="button" data-filter="all" aria-pressed="true">${c.all}<span>${ctx.partners.length}</span></button>`]
    .concat(ctx.categories.map((cat) => `<button class="filter-btn" type="button" data-filter="${cat.id}" aria-pressed="false">${ctx.L(cat.title)}<span>${count(cat.id)}</span></button>`)).join('');

  const cards = ctx.partners.map((p, i) => {
    const url = partnerUrl(ctx, p);
    const cat = ctx.categories.find((x) => x.id === p.category);
    const logo = p.logo
      ? partnerLogo(ctx, p)
      : `<span class="logo-plate"><span class="monogram">${icon(p.category === 'rural' ? 'grain' : 'group')}</span><b>${esc(p.acronym)}</b></span>`;
    const link = url
      ? `<a class="partner-card__link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`${ctx.t.visitOf} ${p.acronym} ${ctx.t.newTab}`)}">${ctx.t.visit} ${icon('external')}</a>`
      : `<span class="partner-card__nolink">${ctx.t.noSite}</span>`;
    return `
    <article class="partner-card${url ? ' has-link' : ''}" data-cat="${p.category}" data-reveal style="--d:${(i % 3) * 0.06}s">
      <div class="partner-card__logo">${logo}</div>
      <div class="partner-card__body">
        <span class="chip chip--teal partner-card__cat">${ctx.L(cat.title)}</span>
        <h2 class="partner-card__name">${esc(p.acronym)}</h2>
        ${ctx.L(p.name) !== p.acronym ? `<p class="partner-card__full">${esc(ctx.L(p.name))}</p>` : ''}
        <p class="partner-card__desc">${ctx.L(p.desc)}</p>
        <div class="partner-card__foot"><span class="pin">${icon('pin')} ${ctx.L(p.where)}</span>${link}</div>
      </div>
    </article>`;
  }).join('');

  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }] })}

<section class="section" aria-label="${c.title}">
  <div class="container">
    <div class="filters" role="group" aria-label="${ctx.lang === 'en' ? 'Filter partners' : 'Filtrer les partenaires'}">${filters}</div>
    <p class="sr-only" aria-live="polite" data-filter-status data-template="${c.status}"></p>
    <div class="partner-grid">${cards}</div>
    <p class="muted" style="margin-top:28px;font-size:.88rem">${c.note}</p>
  </div>
</section>

<section class="section section--white" aria-labelledby="map-title" data-map>
  <div class="container map-block">
    <div data-reveal>
      <p class="eyebrow">${c.mapEyebrow}</p>
      <h2 class="h2" id="map-title">${c.mapTitle}</h2>
      <p class="lead" style="margin-top:20px">${c.mapText}</p>
      ${mapLegend(ctx)}
    </div>
    <div data-reveal style="--d:.1s">${maliMap(ctx, { headingId: 'carte-partenaires' })}</div>
  </div>
</section>

${contactBand(ctx, { title: c.becomeTitle })}
`;
  return { title: c.title, description: c.description, body };
}
