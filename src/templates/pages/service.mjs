// Gabarit commun aux 5 pages « pôle d'expertise »
import { icon } from '../icons.mjs';
import { pageHero, picture, miniSteps, projectCard, contactBand, allMissions, referenceItem } from '../components.mjs';

export const copy = {
  fr: {
    pole: 'Pôle',
    offerEyebrow: 'Notre offre',
    offerTitle: 'Ce que nous faisons',
    deliverEyebrow: 'Livrables types',
    deliverTitle: 'Ce que vous recevez',
    deliverNote: 'Chaque livrable est adapté aux exigences du commanditaire et validé avec vos équipes.',
    stepsEyebrow: 'Notre démarche',
    stepsTitle: 'Quatre étapes, <span class="accent">de la donnée à l’action.</span>',
    sectorsEyebrow: 'Domaines d’application',
    sectorsTitle: 'Là où ce pôle intervient',
    allSectors: 'Voir les 13 domaines',
    caseEyebrow: 'Réalisations',
    caseTitle: 'Ce pôle <span class="accent">en action.</span>',
    caseAll: 'Toutes nos réalisations',
    refsEyebrow: 'Références',
    refsTitle: 'D’autres missions <span class="accent">de ce pôle.</span>',
    refsAll: (n) => `Voir les ${n} missions du pôle`,
    spotSteps: 'Le principe',
    spotConviction: 'Notre conviction',
    spotCta: 'Concevoir votre dispositif',
    digitalLabels: ['Collecte mobile', 'Cloud sécurisé', 'Tableau de bord', 'Décision'],
    digitalCaption: 'De la collecte mobile à la décision : un flux de données continu et sécurisé.',
  },
  en: {
    pole: 'Practice',
    offerEyebrow: 'Our offer',
    offerTitle: 'What we do',
    deliverEyebrow: 'Typical deliverables',
    deliverTitle: 'What you receive',
    deliverNote: 'Every deliverable is adapted to the commissioning party’s requirements and validated with your teams.',
    stepsEyebrow: 'Our approach',
    stepsTitle: 'Four steps, <span class="accent">from data to action.</span>',
    sectorsEyebrow: 'Fields of application',
    sectorsTitle: 'Where this practice works',
    allSectors: 'See all 13 sectors',
    caseEyebrow: 'Projects',
    caseTitle: 'This practice <span class="accent">in action.</span>',
    caseAll: 'All our projects',
    refsEyebrow: 'Track record',
    refsTitle: 'More assignments <span class="accent">in this practice.</span>',
    refsAll: (n) => `See the ${n} assignments in this practice`,
    spotSteps: 'How it works',
    spotConviction: 'Our conviction',
    spotCta: 'Design your mechanism',
    digitalLabels: ['Mobile collection', 'Secure cloud', 'Dashboard', 'Decision'],
    digitalCaption: 'From mobile collection to decision-making: a continuous, secure data flow.',
  },
};

// Met en valeur la fin du titre (« … et Apprentissage ») en italique d'accent
const accentTitle = (title, lang) => {
  const sep = lang === 'en' ? ' and ' : ' et ';
  const i = title.lastIndexOf(sep);
  return i > 0 ? `${title.slice(0, i)} <span class="accent">${title.slice(i + 1)}</span>` : title;
};

function digitalIllustration(c) {
  const [l1, l2, l3, l4] = c.digitalLabels;
  return `
<svg class="illus-digital" viewBox="0 0 640 440" role="img" aria-label="${c.digitalCaption}">
  <defs>
    <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F2E47"/><stop offset="1" stop-color="#0B2538"/></linearGradient>
  </defs>
  <rect width="640" height="440" rx="32" fill="url(#dg)"/>
  <g fill="none" stroke="#45C3CD" stroke-width="2" stroke-dasharray="4 8" stroke-linecap="round" opacity=".7">
    <path d="M168 210h60"/><path d="M372 210h56"/>
  </g>
  <g>
    <rect x="70" y="110" width="98" height="190" rx="18" fill="#173F5F" stroke="#45C3CD" stroke-width="2"/>
    <rect x="86" y="140" width="66" height="10" rx="5" fill="#45C3CD" opacity=".9"/>
    <rect x="86" y="162" width="52" height="8" rx="4" fill="#fff" opacity=".35"/>
    <rect x="86" y="182" width="66" height="22" rx="6" fill="#fff" opacity=".12"/>
    <rect x="86" y="214" width="66" height="22" rx="6" fill="#fff" opacity=".12"/>
    <circle cx="119" cy="266" r="14" fill="#22B3BF"/>
    <path d="m112 266 5 5 9-10" fill="none" stroke="#071A29" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g>
    <path d="M262 236h82a30 30 0 0 0 2-60 40 40 0 0 0-76-6 28 28 0 0 0-8 66Z" fill="#173F5F" stroke="#45C3CD" stroke-width="2"/>
    <rect x="290" y="196" width="24" height="20" rx="4" fill="none" stroke="#fff" stroke-width="2.4"/>
    <path d="M294 196v-6a8 8 0 0 1 16 0v6" fill="none" stroke="#fff" stroke-width="2.4"/>
  </g>
  <g>
    <rect x="428" y="96" width="150" height="214" rx="18" fill="#173F5F" stroke="#45C3CD" stroke-width="2"/>
    <rect x="448" y="118" width="70" height="9" rx="4.5" fill="#fff" opacity=".4"/>
    <circle cx="474" cy="172" r="26" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="10"/>
    <path d="M474 146a26 26 0 1 1-24.7 34" fill="none" stroke="#22B3BF" stroke-width="10" stroke-linecap="round"/>
    <rect x="514" y="152" width="44" height="8" rx="4" fill="#fff" opacity=".3"/>
    <rect x="514" y="168" width="32" height="8" rx="4" fill="#fff" opacity=".3"/>
    <rect x="452" y="262" width="16" height="28" rx="4" fill="#45C3CD" opacity=".5"/>
    <rect x="476" y="248" width="16" height="42" rx="4" fill="#45C3CD" opacity=".7"/>
    <rect x="500" y="236" width="16" height="54" rx="4" fill="#45C3CD" opacity=".85"/>
    <rect x="524" y="220" width="16" height="70" rx="4" fill="#22B3BF"/>
  </g>
  <path d="M40 392C200 386 420 340 560 74" fill="none" stroke="#22B3BF" stroke-width="7" stroke-linecap="round" opacity=".9"/>
  <path d="M575 46 548 64l27 15Z" fill="#22B3BF"/>
  <g font-family="Manrope, sans-serif" font-size="15" font-weight="700" fill="#fff" text-anchor="middle">
    <text x="119" y="332">${l1}</text>
    <text x="304" y="270">${l2}</text>
    <text x="503" y="338">${l3}</text>
    <text x="596" y="40" text-anchor="end" fill="#8FDBE1">${l4}</text>
  </g>
</svg>`;
}

export default function service(ctx, page) {
  const c = copy[ctx.lang];
  const s = page.service;
  const i = ctx.services.indexOf(s);
  const prev = ctx.services[(i + ctx.services.length - 1) % ctx.services.length];
  const next = ctx.services[(i + 1) % ctx.services.length];
  const title = ctx.L(s.title);
  const sectorItems = s.sectors.map((id) => ctx.sectors.find((x) => x.id === id)).filter(Boolean);

  const media = s.photo
    ? `<figure class="figure-plain" data-reveal>${picture(ctx, s.photo, { alt: ctx.L(s.photoAlt), sizes: '(min-width: 980px) 600px, 100vw' })}<figcaption>${ctx.L(s.photoAlt)}</figcaption></figure>`
    : `<figure class="figure-plain" data-reveal>${digitalIllustration(c)}<figcaption>${c.digitalCaption}</figcaption></figure>`;

  // Offre dédiée mise en avant (ex. A-Z Contact Center pour le pôle SERA)
  const sp = s.spotlight;
  const spotlight = sp ? `
<section class="section spotlight" id="${sp.id}" aria-labelledby="${sp.id}-title">
  <div class="container spotlight__grid">
    <div data-reveal>
      <p class="eyebrow">${ctx.L(sp.eyebrow)}</p>
      <h2 class="h2" id="${sp.id}-title">${ctx.L(sp.title)}</h2>
      <p class="lead" style="margin-top:20px">${ctx.L(sp.text)}</p>
      <ul class="spotlight__benefits">${ctx.L(sp.benefits).map((b) => `<li>${icon('check')}<span>${b}</span></li>`).join('')}</ul>
      <figure class="spotlight__quote"><figcaption>${c.spotConviction}</figcaption><blockquote><p>« ${ctx.L(sp.quote)} »</p></blockquote></figure>
      <a class="btn" href="${ctx.href('contact')}">${c.spotCta} ${icon('arrow', 'icon--arrow')}</a>
    </div>
    <div class="spotlight__card on-dark" data-reveal style="--d:.1s">
      <p class="spotlight__brand"><span class="spotlight__icon">${icon('phone')}</span><span>${sp.name}<small>${sp.sub}</small></span></p>
      <p class="spotlight__label">${c.spotSteps}</p>
      <ol class="spotlight__steps">${ctx.L(sp.steps).map((st, k) => `<li><span class="spotlight__num">0${k + 1}</span><span>${st}</span></li>`).join('')}</ol>
    </div>
  </div>
</section>` : '';

  const related = (s.projects || []).map((id) => ctx.projects.find((p) => p.id === id)).filter(Boolean);
  const caseBlock = ctx.wp ? ctx.wp('serviceCases', { service: s.id }) : related.length ? `
<section class="section section--white" aria-labelledby="case-title">
  <div class="container">
    <div class="section-head section-head--split" data-reveal>
      <div><p class="eyebrow">${c.caseEyebrow}</p><h2 class="h2" id="case-title">${c.caseTitle}</h2></div>
      <p><a class="link-arrow" href="${ctx.href('projects')}">${c.caseAll} ${icon('arrow')}</a></p>
    </div>
    <div class="proj-grid${related.length === 1 ? ' proj-grid--one' : ''}${related.length === 2 || related.length === 4 ? ' proj-grid--two' : ''}">${related.map((p, k) => projectCard(ctx, p, { delay: k * 0.06 })).join('')}</div>
  </div>
</section>` : '';

  // Références sans étude de cas rattachées à ce pôle (les réalisations illustrées sont présentées au-dessus)
  const all = allMissions(ctx);
  const refs = all.filter((m) => !m.caseHref && m.services.includes(s.id)).slice(0, 6);
  const refsBlock = ctx.wp ? ctx.wp('serviceRefs', { service: s.id }) : refs.length ? `
<section class="section" aria-labelledby="refs-title">
  <div class="container">
    <div class="section-head section-head--split" data-reveal>
      <div><p class="eyebrow">${c.refsEyebrow}</p><h2 class="h2" id="refs-title">${c.refsTitle}</h2></div>
      <p><a class="link-arrow" href="${ctx.href('projects')}?pole=${s.id}#references">${c.refsAll(all.filter((m) => m.services.includes(s.id)).length)} ${icon('arrow')}</a></p>
    </div>
    <ol class="refs refs--compact" data-reveal>${refs.map((m) => referenceItem(ctx, m, { compact: true })).join('')}</ol>
  </div>
</section>` : '';

  const body = `
${pageHero(ctx, {
    eyebrow: `${c.pole} ${s.num} · ${ctx.L(s.tag)}`,
    title: accentTitle(title, ctx.lang),
    lead: ctx.L(s.lead),
    crumbs: [{ label: ctx.t.nav.expertises, href: ctx.href('expertises') }, { label: ctx.L(s.short) }],
    aside: `<span class="badge-big" aria-hidden="true">${icon(s.icon)}</span>`,
  })}

<section class="section" aria-labelledby="offer-title">
  <div class="container split">
    <div class="sticky-col" data-reveal>
      <p class="eyebrow">${c.offerEyebrow}</p>
      <h2 class="h2" id="offer-title">${c.offerTitle}</h2>
      <p class="lead" style="margin-top:20px">${ctx.L(s.summary)}</p>
      <ul class="chip-list" style="margin-top:24px">${ctx.L(s.keys).map((k) => `<li class="chip chip--teal">${k}</li>`).join('')}</ul>
    </div>
    <ul class="offer">${s.offer.map((o, k) => `<li data-reveal style="--d:${(k % 2) * 0.06}s"><span class="offer__check">${icon('check')}</span><span>${ctx.L(o)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="section section--white" aria-labelledby="deliver-title">
  <div class="container split split--rev">
    ${media}
    <div data-reveal style="--d:.1s">
      <p class="eyebrow">${c.deliverEyebrow}</p>
      <h2 class="h2" id="deliver-title">${c.deliverTitle}</h2>
      <ul class="deliverables" style="margin-top:28px">${s.deliverables.map((d) => `<li>${icon('doc')}<span>${ctx.L(d)}</span></li>`).join('')}</ul>
      <p class="muted" style="margin-top:18px;font-size:.92rem">${c.deliverNote}</p>
    </div>
  </div>
</section>
${spotlight}

<section class="section section--navy pattern" aria-labelledby="steps-title">
  <div class="container">
    <div class="section-head" data-reveal><p class="eyebrow">${c.stepsEyebrow}</p><h2 class="h2" id="steps-title">${c.stepsTitle}</h2></div>
    ${miniSteps(ctx, s.steps)}
  </div>
</section>

${caseBlock}

${refsBlock}

<section class="section${refsBlock ? ' section--white' : ''}" aria-labelledby="apply-title">
  <div class="container">
    <div class="section-head section-head--split" data-reveal>
      <div><p class="eyebrow">${c.sectorsEyebrow}</p><h2 class="h2" id="apply-title">${c.sectorsTitle}</h2></div>
      <p><a class="link-arrow" href="${ctx.href('expertises')}#${sectorItems[0] ? `domaine-${sectorItems[0].id}` : ''}">${c.allSectors} ${icon('arrow')}</a></p>
    </div>
    <ul class="families" style="list-style:none">${sectorItems.map((x, k) => `
      <li class="family" data-reveal style="--d:${k * 0.06}s"><div class="sector" style="padding:0"><span class="sector__icon">${icon(x.icon)}</span><span><b>${ctx.L(x.title)}</b>${ctx.L(x.detail)}</span></div></li>`).join('')}
    </ul>
    <nav class="pager" style="margin-top:56px" aria-label="${ctx.lang === 'en' ? 'Other practice areas' : 'Autres pôles'}">
      <a href="${ctx.href(`service:${prev.id}`)}"><small>← ${ctx.t.prev}</small><strong>${ctx.L(prev.title)}</strong></a>
      <a href="${ctx.href(`service:${next.id}`)}"><small>${ctx.t.next} →</small><strong>${ctx.L(next.title)}</strong></a>
    </nav>
  </div>
</section>

${contactBand(ctx)}
`;
  return { title, description: ctx.L(s.seo), body };
}
