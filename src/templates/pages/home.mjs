// Page d'accueil
import { icon } from '../icons.mjs';
import { picture, sectionHead, serviceCard, sectorFamilies, maliMap, mapLegend, marquee, expertsCta, contactBand } from '../components.mjs';

const copy = {
  fr: {
    title: 'Bureau d’études et de conseil à Bamako, Mali',
    description: 'A-Z Sarl, bureau d’études et de conseil à Bamako : suivi-évaluation (SERA/MEAL), études socio-économiques, transformation digitale, formation et conseil.',
    eyebrow: 'Bureau d’études & de conseil · Bamako, Mali',
    h1: 'De la donnée <span class="accent">à l’action.</span>',
    lead: 'A-Z Sarl accompagne les institutions, les ONG et les partenaires techniques et financiers avec des études rigoureuses, un suivi-évaluation fiable, des solutions digitales et des formations pratiques. L’innovation au service du développement.',
    cta1: 'Nous confier une mission',
    cta2: 'Découvrir nos expertises',
    call: 'Ou appelez-nous :',
    badge: 'Missions de terrain au Mali',
    card: { label: 'SERA / MEAL', live: 'Données terrain', title: 'Suivi des indicateurs', steps: ['Collecte', 'Analyse', 'Décision'] },
    altMain: 'Discussion de groupe avec des producteurs lors d’une mission de collecte de données',
    altSecond: 'Entretien avec des mères lors d’une évaluation de projet',
    introEyebrow: 'Le Bureau',
    introTitle: 'Un bureau d’études malien au service du développement <span class="accent">économique, social et culturel.</span>',
    introLead: 'A-Z Sarl offre des prestations dans les domaines du développement économique, social et culturel, en particulier le suivi-évaluation des projets, les études socio-économiques, la transformation digitale et la formation professionnelle.',
    introText: 'Pour chaque mandat, nous composons une équipe sur mesure, consultants, experts, formateurs et praticiens d’entreprise, à partir de notre large banque de CV d’experts.',
    introLink: 'Découvrir le bureau',
    stats: [
      { value: 5, label: 'Pôles d’expertise', desc: 'Du suivi-évaluation au conseil en politiques publiques.' },
      { value: 13, label: 'Domaines d’intervention', desc: 'Santé, éducation, gouvernance, environnement, monde rural…' },
      { icon: 'network', label: 'Banque d’experts', desc: 'Des équipes composées selon les profils de chaque mandat.' },
      { icon: 'pin', label: 'Ancrage terrain', desc: 'Des missions et des partenaires à Bamako et en région.' },
    ],
    servicesEyebrow: 'Nos expertises',
    servicesTitle: 'Cinq pôles pour passer <span class="accent">de la donnée à l’action.</span>',
    servicesLead: 'Des études qui éclairent, des systèmes de suivi qui mesurent, des outils digitaux qui accélèrent et des formations qui renforcent.',
    processEyebrow: 'Notre démarche',
    processTitle: 'Une méthode en quatre temps, <span class="accent">un même fil conducteur.</span>',
    processLead: 'Chaque mission suit la même trajectoire : comprendre le contexte, produire des données fiables, les analyser avec rigueur et les transformer en décisions utiles.',
    steps: [
      { icon: 'target', title: 'Comprendre', text: 'Cadrage de la mission, analyse des termes de référence, revue documentaire et choix des indicateurs.', tags: ['Termes de référence', 'Revue documentaire', 'Indicateurs'] },
      { icon: 'pin', title: 'Collecter', text: 'Enquêtes quantitatives et qualitatives sur le terrain : entretiens, discussions de groupe, collecte digitale sur smartphones et tablettes.', tags: ['Enquêtes', 'Focus groups', 'Collecte mobile'] },
      { icon: 'trend', title: 'Analyser', text: 'Traitement statistique, analyse qualitative et tableaux de bord : des résultats fiables, lisibles et vérifiables.', tags: ['Statistiques', 'Analyse qualitative', 'Tableaux de bord'] },
      { icon: 'spark', title: 'Agir', text: 'Restitution, recommandations opérationnelles, formation des équipes et capitalisation des apprentissages.', tags: ['Recommandations', 'Formation', 'Capitalisation'] },
    ],
    processQuote: '« De la donnée à l’action, l’innovation au service du développement. »',
    processBtn: 'Découvrir le bureau',
    sectorsEyebrow: 'Domaines d’intervention',
    sectorsTitle: '13 domaines d’intervention, <span class="accent">une même exigence.</span>',
    sectorsLead: 'Les consultants du bureau réunissent les compétences et l’expertise nécessaires dans chacun de ces domaines.',
    mapEyebrow: 'Ancrage',
    mapTitle: 'Basés à Bamako, <span class="accent">présents sur le terrain.</span>',
    mapText: 'Notre siège est à Hamdallaye ACI 2000, à Bamako. Nos partenaires associatifs, coopératifs et paysans sont implantés à Barouéli, Dioïla, Koutiala et dans la zone de l’Office du Niger.',
    fieldEyebrow: 'Sur le terrain',
    fieldTitle: 'Des données collectées <span class="accent">au plus près des populations.</span>',
    fieldText: 'Entretiens individuels, discussions de groupe, enquêtes auprès des commerçants : nos équipes vont chercher l’information là où elle se trouve, pour des évaluations de projet fiables.',
    caseTag: 'Formation · 2026',
    caseTitle: 'Formation en GPEC organisée avec la CANAM',
    caseDates: '30 mars – 3 avril 2026',
    casePlace: 'Bamako',
    caseLink: 'Voir nos réalisations',
    mosaic: [
      ['terrain-entretien-meres', 'Entretien avec des mères et leurs bébés'],
      ['terrain-focus-group', 'Discussion de groupe avec des producteurs'],
      ['terrain-enfants', 'Rencontre avec des enfants et leurs encadrantes'],
      ['terrain-enquete-commerce', 'Enquête auprès d’un commerçant'],
    ],
  },
  en: {
    title: 'Consulting and research firm in Bamako, Mali',
    description: 'A-Z Sarl, consulting and research firm in Bamako, Mali: monitoring and evaluation (MEAL), socio-economic studies, digital transformation, training and policy advice.',
    eyebrow: 'Consulting & research · Bamako, Mali',
    h1: 'From data <span class="accent">to action.</span>',
    lead: 'A-Z Sarl supports institutions, NGOs and development partners with rigorous studies, reliable monitoring and evaluation, digital solutions and practical training. Innovation in the service of development.',
    cta1: 'Commission an assignment',
    cta2: 'Explore our expertise',
    call: 'Or call us:',
    badge: 'Field missions in Mali',
    card: { label: 'MEAL', live: 'Field data', title: 'Indicator tracking', steps: ['Collect', 'Analyse', 'Decide'] },
    altMain: 'Group discussion with farmers during a data collection mission',
    altSecond: 'Interview with mothers during a project evaluation',
    introEyebrow: 'The firm',
    introTitle: 'A Malian consulting firm serving <span class="accent">economic, social and cultural development.</span>',
    introLead: 'A-Z Sarl provides services in economic, social and cultural development, in particular project monitoring and evaluation, socio-economic studies, digital transformation and vocational training.',
    introText: 'For each assignment we build a tailored team of consultants, experts, trainers and business practitioners, drawn from our large pool of expert CVs.',
    introLink: 'About the firm',
    stats: [
      { value: 5, label: 'Practice areas', desc: 'From monitoring and evaluation to public policy advisory.' },
      { value: 13, label: 'Sectors', desc: 'Health, education, governance, environment, rural development…' },
      { icon: 'network', label: 'Expert pool', desc: 'Teams built around the profiles each assignment requires.' },
      { icon: 'pin', label: 'Field presence', desc: 'Missions and partners in Bamako and across the regions.' },
    ],
    servicesEyebrow: 'Our expertise',
    servicesTitle: 'Five practice areas to move <span class="accent">from data to action.</span>',
    servicesLead: 'Studies that inform, monitoring systems that measure, digital tools that accelerate and training that strengthens.',
    processEyebrow: 'Our approach',
    processTitle: 'A four-step method, <span class="accent">one common thread.</span>',
    processLead: 'Every assignment follows the same path: understand the context, produce reliable data, analyse it rigorously and turn it into useful decisions.',
    steps: [
      { icon: 'target', title: 'Understand', text: 'Scoping, analysis of the terms of reference, desk review and choice of indicators.', tags: ['Terms of reference', 'Desk review', 'Indicators'] },
      { icon: 'pin', title: 'Collect', text: 'Quantitative and qualitative field surveys: interviews, focus groups, digital collection on smartphones and tablets.', tags: ['Surveys', 'Focus groups', 'Mobile collection'] },
      { icon: 'trend', title: 'Analyse', text: 'Statistical processing, qualitative analysis and dashboards: reliable, readable and verifiable results.', tags: ['Statistics', 'Qualitative analysis', 'Dashboards'] },
      { icon: 'spark', title: 'Act', text: 'Feedback sessions, operational recommendations, team training and knowledge capitalisation.', tags: ['Recommendations', 'Training', 'Learning'] },
    ],
    processQuote: '“From data to action: innovation in the service of development.”',
    processBtn: 'About the firm',
    sectorsEyebrow: 'Sectors',
    sectorsTitle: '13 sectors, <span class="accent">one standard of rigour.</span>',
    sectorsLead: 'The firm’s consultants bring the skills and expertise required in each of these sectors.',
    mapEyebrow: 'Presence',
    mapTitle: 'Based in Bamako, <span class="accent">present in the field.</span>',
    mapText: 'Our head office is in Hamdallaye ACI 2000, Bamako. Our community, cooperative and farmers’ partners are based in Barouéli, Dioïla, Koutiala and the Office du Niger area.',
    fieldEyebrow: 'In the field',
    fieldTitle: 'Data collected <span class="accent">close to communities.</span>',
    fieldText: 'Individual interviews, focus groups, surveys with traders: our teams go where the information is, to deliver reliable project evaluations.',
    caseTag: 'Training · 2026',
    caseTitle: 'GPEC training organised with CANAM',
    caseDates: '30 March – 3 April 2026',
    casePlace: 'Bamako',
    caseLink: 'See our projects',
    mosaic: [
      ['terrain-entretien-meres', 'Interview with mothers and their babies'],
      ['terrain-focus-group', 'Group discussion with farmers'],
      ['terrain-enfants', 'Meeting with children and their caregivers'],
      ['terrain-enquete-commerce', 'Survey with a trader'],
    ],
  },
};

export default function home(ctx) {
  const c = copy[ctx.lang];
  const tel = ctx.site.phones[0];
  const swoosh = `
      <svg class="hero-visual__swoosh" viewBox="0 0 600 612" aria-hidden="true" focusable="false">
        <path class="swoosh-path" d="M-30 345C160 330 420 230 578 32"/>
        <path class="swoosh-head" d="M596.7 8.5 566.3 22.6 589.7 41.4Z"/>
        <circle class="swoosh-node" cx="29" cy="338" r="9" style="animation-delay:.7s"/>
        <circle class="swoosh-node" cx="91" cy="326" r="9" style="animation-delay:.95s"/>
        <circle class="swoosh-node" cx="142" cy="312" r="9" style="animation-delay:1.2s"/>
      </svg>`;
  const dataCard = `
      <div class="data-card" aria-hidden="true">
        <div class="data-card__head"><span class="data-card__label">${c.card.label}</span><span class="data-card__live">${c.card.live}</span></div>
        <p class="data-card__title">${c.card.title}</p>
        <svg viewBox="0 0 240 92">
          <path class="grid-line" d="M0 30h240M0 58h240M0 86h240"/>
          <rect class="bar" x="10" y="58" width="22" height="28" rx="4" style="animation-delay:.7s"/>
          <rect class="bar" x="50" y="46" width="22" height="40" rx="4" style="animation-delay:.78s"/>
          <rect class="bar" x="90" y="50" width="22" height="36" rx="4" style="animation-delay:.86s"/>
          <rect class="bar" x="130" y="34" width="22" height="52" rx="4" style="animation-delay:.94s"/>
          <rect class="bar" x="170" y="26" width="22" height="60" rx="4" style="animation-delay:1.02s"/>
          <rect class="bar bar--hi" x="210" y="14" width="22" height="72" rx="4" style="animation-delay:1.1s"/>
          <path class="trend" d="M21 50 61 38 101 42 141 26 181 18 221 6"/>
          <circle class="trend-dot" cx="221" cy="6" r="4.5"/>
        </svg>
        <div class="data-card__steps"><span>${c.card.steps[0]}</span><span>→</span><span>${c.card.steps[1]}</span><span>→</span><span>${c.card.steps[2]}</span></div>
      </div>`;

  const body = `
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">${c.eyebrow}</p>
      <h1 class="display hero__title">${c.h1}</h1>
      <p class="lead hero__lead">${c.lead}</p>
      <div class="btn-row hero__actions">
        <a class="btn" href="${ctx.href('contact')}">${c.cta1} ${icon('arrow', 'icon--arrow')}</a>
        <a class="btn btn--ghost" href="${ctx.href('expertises')}">${c.cta2}</a>
      </div>
      <p class="hero__call">${icon('phone')} ${c.call} <a href="tel:${tel.tel}">${tel.display}</a></p>
    </div>
    <div class="hero-visual">${swoosh}
      <figure class="hero-photo hero-photo--main">${picture(ctx, 'terrain-focus-group', { alt: c.altMain, sizes: '(min-width: 960px) 400px, 66vw', priority: true })}</figure>
      <figure class="hero-photo hero-photo--second">${picture(ctx, 'terrain-entretien-meres', { alt: c.altSecond, sizes: '(min-width: 960px) 320px, 52vw', priority: true })}</figure>
      ${dataCard}
      <p class="hero-badge">${icon('pin')} ${c.badge}</p>
    </div>
  </div>
</section>

${marquee(ctx)}

<section class="section" aria-labelledby="intro-title">
  <div class="container">
    <div class="intro__grid">
      <div data-reveal>
        <p class="eyebrow">${c.introEyebrow}</p>
        <h2 class="h2" id="intro-title">${c.introTitle}</h2>
      </div>
      <div class="intro__text" data-reveal style="--d:.1s">
        <p class="lead">${c.introLead}</p>
        <p>${c.introText}</p>
        <a class="link-arrow" href="${ctx.href('about')}">${c.introLink} ${icon('arrow')}</a>
      </div>
    </div>
    <div class="stats">
      ${c.stats.map((s, i) => `
      <div class="stat" data-reveal style="--d:${i * 0.08}s">
        <p class="stat__value">${s.value ? `<span data-count="${s.value}">${s.value}</span>` : icon(s.icon)}</p>
        <p class="stat__label">${s.label}</p>
        <p class="stat__desc">${s.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="services-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.servicesEyebrow, title: c.servicesTitle, lead: c.servicesLead, split: true, id: 'services-title' })}
    <div class="services">
      ${ctx.services.map((s, i) => serviceCard(ctx, s, { feature: i === 0 })).join('')}
    </div>
  </div>
</section>

<section class="section section--navy process pattern" aria-labelledby="process-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.processEyebrow, title: c.processTitle, lead: c.processLead, id: 'process-title' })}
    <div class="process__wrap" data-process>
    <div class="process__track" aria-hidden="true"><span></span><svg class="process__arrow" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M5 3.5 21 12 5 20.5 9 12Z"/></svg></div>
    <ol class="process__steps">
      ${c.steps.map((s, i) => `
      <li class="step">
        <span class="step__node">${icon(s.icon)}</span>
        <h3 class="step__title">${String(i + 1).padStart(2, '0')} · ${s.title}</h3>
        <p class="step__text">${s.text}</p>
        <ul class="step__tags">${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      </li>`).join('')}
    </ol>
    </div>
    <div class="process__quote" data-reveal>
      <p>${c.processQuote}</p>
      <a class="btn btn--outline-light" href="${ctx.href('about')}">${c.processBtn} ${icon('arrow', 'icon--arrow')}</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="sectors-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.sectorsEyebrow, title: c.sectorsTitle, lead: c.sectorsLead, split: true, id: 'sectors-title' })}
    ${sectorFamilies(ctx)}
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
    <div data-reveal style="--d:.1s">${maliMap(ctx, { headingId: 'carte-accueil' })}</div>
  </div>
</section>

<section class="section" aria-labelledby="field-title">
  <div class="container field__grid">
    <div data-reveal>
      <p class="eyebrow">${c.fieldEyebrow}</p>
      <h2 class="h2" id="field-title">${c.fieldTitle}</h2>
      <p class="lead" style="margin-top:20px">${c.fieldText}</p>
      <a class="case-card" href="${ctx.href('projects')}">
        <div class="case-card__media">${picture(ctx, 'formation-gpec-canam', { alt: '', sizes: '(min-width: 1000px) 520px, 100vw' })}</div>
        <div class="case-card__body">
          <span class="case-card__tag">${icon('award')} ${c.caseTag}</span>
          <h3 class="case-card__title">${c.caseTitle}</h3>
          <p class="case-card__meta"><span>${icon('calendar')} ${c.caseDates}</span><span>${icon('pin')} ${c.casePlace}</span></p>
          <span class="link-arrow">${c.caseLink} ${icon('arrow')}</span>
        </div>
      </a>
    </div>
    <div class="mosaic" data-reveal style="--d:.1s">
      ${c.mosaic.map(([p, cap], i) => `<figure class="mosaic__item">${picture(ctx, p, { alt: cap, sizes: i === 0 ? '(min-width: 1000px) 460px, 66vw' : '(min-width: 1000px) 300px, 50vw', style: p === 'terrain-enquete-commerce' ? 'object-position:50% 78%' : (p === 'terrain-focus-group' ? 'object-position:30% 50%' : '') })}<figcaption>${cap}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

${expertsCta(ctx)}

${contactBand(ctx)}
`;
  return { title: c.title, description: c.description, body, bodyClass: 'page-home' };
}
