// Page « Partenaires » : logos cliquables vers les sites officiels
import { icon } from '../icons.mjs';
import { pageHero, partnerLogo, partnerUrl, zonesSection, allMissions, contactBand, esc, tx } from '../components.mjs';

export const copy = {
  fr: {
    title: 'Partenaires',
    description: 'Les partenaires d’A-Z Sarl : GIZ, LuxDev, World Renew, Save the Children, FRES, CANAM, FAWE Mali, CAD-Mali, SEXAGON et des organisations du Mali.',
    eyebrow: 'Partenaires',
    h1: 'Ils nous font <span class="accent">confiance.</span>',
    lead: 'Partenaires internationaux, institution publique, société civile et organisations paysannes : nous travaillons aux côtés d’acteurs engagés pour le développement du Mali.',
    all: 'Tous',
    status: '{n} partenaires affichés',
    mapEyebrow: 'Zones d’intervention',
    mapTitle: 'Nos zones d’intervention, <span class="accent">de Kayes à Gao.</span>',
    mapText: 'Les partenaires, institutions, ONG, projets et programmes pour lesquels nous sommes intervenus couvrent les régions de Kayes, Nioro, Koulikoro, Dioïla, Bougouni, Sikasso, Ségou, Mopti, Bandiagara, Douentza et Gao, ainsi que le district de Bamako.',
    withAz: 'Avec A-Z Sarl',
    missions: (n) => (n > 1 ? `Voir les ${n} missions` : 'Voir la mission'),
    becomeTitle: 'Construisons <span class="accent">un partenariat utile.</span>',
    note: 'Les logos sont la propriété de leurs titulaires. Un clic ouvre le site officiel du partenaire dans un nouvel onglet.',
  },
  en: {
    title: 'Partners',
    description: 'A-Z Sarl’s partners: GIZ, LuxDev, World Renew, Save the Children, FRES, CANAM, FAWE Mali, CAD-Mali, SEXAGON and organisations in Mali.',
    eyebrow: 'Partners',
    h1: 'They <span class="accent">trust us.</span>',
    lead: 'International partners, a public institution, civil society and farmers’ organisations: we work alongside committed actors for Mali’s development.',
    all: 'All',
    status: '{n} partners shown',
    mapEyebrow: 'Areas of intervention',
    mapTitle: 'Our areas of intervention, <span class="accent">from Kayes to Gao.</span>',
    mapText: 'The partners, institutions, NGOs, projects and programmes we have worked for cover the Kayes, Nioro, Koulikoro, Dioïla, Bougouni, Sikasso, Ségou, Mopti, Bandiagara, Douentza and Gao regions, as well as the Bamako district.',
    withAz: 'With A-Z Sarl',
    missions: (n) => (n > 1 ? `See the ${n} assignments` : 'See the assignment'),
    becomeTitle: 'Let’s build <span class="accent">a meaningful partnership.</span>',
    note: 'Logos are the property of their respective owners. Clicking opens the partner’s official website in a new tab.',
  },
};

export default function partnersPage(ctx) {
  const c = copy[ctx.lang];
  const count = (cat) => ctx.partners.filter((p) => p.category === cat).length;
  const missionsOf = (id) => allMissions(ctx).filter((m) => m.partner === id).length;
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
        ${p.work ? `<div class="partner-card__work"><p class="partner-card__work-label">${c.withAz}</p><p>${ctx.L(p.work)}</p>${missionsOf(p.id) ? `<a class="partner-card__missions" href="${ctx.href('projects')}?partner=${p.id}#references">${c.missions(missionsOf(p.id))} ${icon('arrow')}</a>` : ''}</div>` : ''}
        <div class="partner-card__foot"><span class="pin">${icon('pin')} ${ctx.L(p.where)}</span>${link}</div>
      </div>
    </article>`;
  }).join('');

  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }] })}

<section class="section" aria-label="${c.title}">
  <div class="container">
    <div class="filters" role="group" aria-label="${tx(ctx, 'partners.filtresLibelle')}">${ctx.wp ? ctx.wp('partnerFilters') : filters}</div>
    <p class="sr-only" aria-live="polite" data-filter-status data-template="${c.status}"></p>
    <div class="partner-grid">${ctx.wp ? ctx.wp('partnerCards') : cards}</div>
    <p class="muted" style="margin-top:28px;font-size:.88rem">${c.note}</p>
  </div>
</section>

${zonesSection(ctx, { eyebrow: c.mapEyebrow, title: c.mapTitle, text: c.mapText, headingId: 'carte-partenaires' })}

${contactBand(ctx, { title: c.becomeTitle })}
`;
  return { title: c.title, description: c.description, body };
}
