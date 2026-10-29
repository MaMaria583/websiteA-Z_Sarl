// Page « Le Bureau »
import { icon } from '../icons.mjs';
import { pageHero, sectionHead, sectorFamilies, maliMap, mapLegend, contactBand } from '../components.mjs';

const copy = {
  fr: {
    title: 'Le Bureau',
    description: 'A-Z Sarl, bureau d’études et de conseil basé à Hamdallaye ACI 2000, Bamako : mission, modèle d’intervention, domaines d’expertise et direction technique.',
    eyebrow: 'Le Bureau',
    h1: 'Un bureau d’études malien, <span class="accent">de la donnée à l’action.</span>',
    lead: 'A-Z Sarl offre des prestations dans les domaines du développement économique, social et culturel d’une manière générale, et en particulier en suivi-évaluation des projets, études socio-économiques, transformation digitale et formation professionnelle.',
    whoEyebrow: 'Qui sommes-nous',
    whoTitle: 'Une équipe pluridisciplinaire <span class="accent">au service des projets de développement.</span>',
    whoText: [
      'Basé à Hamdallaye ACI 2000, à Bamako, A-Z Sarl accompagne les institutions publiques, les partenaires techniques et financiers, les ONG, les associations et les entreprises.',
      'Les consultants du bureau réunissent les compétences et l’expertise nécessaires dans treize domaines, du suivi-évaluation des projets et programmes à l’appui-conseil aux groupements paysans.',
      'Notre conviction : une décision utile repose sur une donnée fiable. C’est pourquoi nous combinons rigueur méthodologique, présence sur le terrain et outils numériques.',
    ],
    quote: 'De la donnée à l’action, l’innovation au service du développement.',
    quoteBy: 'La signature d’A-Z Sarl',
    modelEyebrow: 'Notre modèle d’intervention',
    modelTitle: 'Des équipes composées <span class="accent">sur mesure, mandat par mandat.</span>',
    modelLead: 'A-Z Sarl dispose d’une large banque de CV d’experts, présentés selon leur expertise lors des appels d’offres.',
    model: [
      { title: 'Une banque de CV d’experts', text: 'Consultants, experts sectoriels, formateurs et praticiens d’entreprise, mobilisables selon les besoins.' },
      { title: 'Une équipe sur mesure', text: 'Pour chaque appel d’offres, nous présentons les profils qui correspondent exactement au mandat.' },
      { title: 'Un mandat exécuté', text: 'L’équipe intervient sous la coordination de la direction technique, de la collecte de données jusqu’au rapport final.' },
    ],
    valuesEyebrow: 'Nos engagements',
    valuesTitle: 'Ce qui guide <span class="accent">chacune de nos missions.</span>',
    values: [
      { icon: 'target', title: 'Rigueur', text: 'Des méthodes éprouvées, des données vérifiées, des résultats traçables.' },
      { icon: 'pin', title: 'Proximité', text: 'Une connaissance fine du terrain malien et des communautés.' },
      { icon: 'digital', title: 'Innovation', text: 'Le numérique et l’IA au service de la qualité des données.' },
      { icon: 'shield', title: 'Redevabilité', text: 'Transparence envers nos clients, nos partenaires et les populations.' },
    ],
    sectorsEyebrow: 'Orientations stratégiques',
    sectorsTitle: '13 domaines <span class="accent">d’expertise.</span>',
    mapTitle: 'Ancrés à Bamako, <span class="accent">tournés vers les régions.</span>',
    mapText: 'Notre siège se trouve à Hamdallaye ACI 2000. Nos partenaires associatifs, coopératifs et paysans sont implantés dans les régions de Koulikoro, Ségou et Sikasso.',
    teamEyebrow: 'Direction',
    teamTitle: 'Votre interlocuteur <span class="accent">technique.</span>',
    teamText: 'La direction technique coordonne les équipes d’experts et garantit la qualité des livrables, de la réponse aux appels d’offres jusqu’à la restitution des résultats.',
    write: 'Écrire au Directeur Technique',
  },
  en: {
    title: 'About us',
    description: 'A-Z Sarl, consulting and research firm based in Hamdallaye ACI 2000, Bamako, Mali: mission, delivery model, areas of expertise and technical management.',
    eyebrow: 'About us',
    h1: 'A Malian consulting firm, <span class="accent">from data to action.</span>',
    lead: 'A-Z Sarl provides services in economic, social and cultural development in general, and in particular in project monitoring and evaluation, socio-economic studies, digital transformation and vocational training.',
    whoEyebrow: 'Who we are',
    whoTitle: 'A multidisciplinary team <span class="accent">serving development projects.</span>',
    whoText: [
      'Based in Hamdallaye ACI 2000, Bamako, A-Z Sarl supports public institutions, development partners, NGOs, associations and companies.',
      'The firm’s consultants bring the skills and expertise required in thirteen sectors, from monitoring and evaluation of projects and programmes to advisory support for farmer groups.',
      'Our conviction: a useful decision rests on reliable data. That is why we combine methodological rigour, field presence and digital tools.',
    ],
    quote: 'From data to action: innovation in the service of development.',
    quoteBy: 'The A-Z Sarl signature',
    modelEyebrow: 'Our delivery model',
    modelTitle: 'Teams built <span class="accent">for each assignment.</span>',
    modelLead: 'A-Z Sarl maintains a large pool of expert CVs, proposed according to their expertise in response to tenders.',
    model: [
      { title: 'A pool of expert CVs', text: 'Consultants, sector experts, trainers and business practitioners, available as needed.' },
      { title: 'A tailored team', text: 'For each tender, we put forward the profiles that precisely match the assignment.' },
      { title: 'An assignment delivered', text: 'The team works under the coordination of the technical management, from data collection to the final report.' },
    ],
    valuesEyebrow: 'Our commitments',
    valuesTitle: 'What guides <span class="accent">every assignment.</span>',
    values: [
      { icon: 'target', title: 'Rigour', text: 'Proven methods, verified data, traceable results.' },
      { icon: 'pin', title: 'Proximity', text: 'In-depth knowledge of the Malian field and its communities.' },
      { icon: 'digital', title: 'Innovation', text: 'Digital tools and AI serving data quality.' },
      { icon: 'shield', title: 'Accountability', text: 'Transparency towards our clients, partners and communities.' },
    ],
    sectorsEyebrow: 'Strategic focus',
    sectorsTitle: '13 areas <span class="accent">of expertise.</span>',
    mapTitle: 'Rooted in Bamako, <span class="accent">active in the regions.</span>',
    mapText: 'Our head office is in Hamdallaye ACI 2000. Our community, cooperative and farmers’ partners are based in the Koulikoro, Ségou and Sikasso regions.',
    teamEyebrow: 'Management',
    teamTitle: 'Your technical <span class="accent">contact.</span>',
    teamText: 'The technical management coordinates the expert teams and guarantees the quality of deliverables, from tender response to the presentation of results.',
    write: 'Email the Technical Director',
  },
};

export default function about(ctx) {
  const c = copy[ctx.lang];
  const d = ctx.site.director;
  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }] })}

<section class="section" aria-labelledby="who-title">
  <div class="container split">
    <div data-reveal>
      <p class="eyebrow">${c.whoEyebrow}</p>
      <h2 class="h2" id="who-title">${c.whoTitle}</h2>
    </div>
    <div class="prose" data-reveal style="--d:.1s">
      ${c.whoText.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}
      <figure class="about-quote" style="margin-top:36px">
        <blockquote>« ${c.quote} »</blockquote>
        <figcaption>${c.quoteBy}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="model-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.modelEyebrow, title: c.modelTitle, lead: c.modelLead, split: true, id: 'model-title' })}
    <ol class="model">${c.model.map((m, i) => `<li data-reveal style="--d:${i * 0.08}s"><h3 class="h3">${m.title}</h3><p>${m.text}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section section--navy pattern" aria-labelledby="values-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.valuesEyebrow, title: c.valuesTitle, id: 'values-title' })}
    <div class="values">${c.values.map((v, i) => `<div class="value" data-reveal style="--d:${i * 0.08}s">${icon(v.icon)}<h3>${v.title}</h3><p>${v.text}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="sectors-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.sectorsEyebrow, title: c.sectorsTitle, id: 'sectors-title' })}
    ${sectorFamilies(ctx)}
  </div>
</section>

<section class="section section--white" aria-labelledby="map-title" data-map>
  <div class="container map-block">
    <div data-reveal>
      <p class="eyebrow">${ctx.lang === 'en' ? 'Presence' : 'Ancrage'}</p>
      <h2 class="h2" id="map-title">${c.mapTitle}</h2>
      <p class="lead" style="margin-top:20px">${c.mapText}</p>
      ${mapLegend(ctx)}
    </div>
    <div data-reveal style="--d:.1s">${maliMap(ctx, { headingId: 'carte-bureau' })}</div>
  </div>
</section>

<section class="section" aria-labelledby="team-title">
  <div class="container split">
    <div data-reveal>
      <p class="eyebrow">${c.teamEyebrow}</p>
      <h2 class="h2" id="team-title">${c.teamTitle}</h2>
      <p class="lead" style="margin-top:20px">${c.teamText}</p>
    </div>
    <div class="person" data-reveal style="--d:.1s">
      <span class="person__avatar" aria-hidden="true">${d.initials}</span>
      <div>
        <p class="person__role">${ctx.L(d.role)}</p>
        <h3 class="person__name">${d.name}</h3>
        <a class="link-arrow" href="mailto:${d.email}">${icon('mail')} ${d.email}</a>
      </div>
    </div>
  </div>
</section>

${contactBand(ctx)}
`;
  return { title: c.title, description: c.description, body };
}
