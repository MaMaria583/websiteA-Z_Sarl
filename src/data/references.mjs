// Références d'A-Z Sarl sans étude de cas détaillée — source : fichier du client « Quelques réalisations
// dans le temps » (03/11/2026). Intitulés repris du client (orthographe et typographie harmonisées).
// Les réalisations illustrées (src/data/projects.mjs) complètent cette liste sur la page Réalisations.
// `kind` : evaluation | etude | formation | appui ; `services` : pôles concernés (src/data/services.mjs) ;
// `zone` : lieu précisé par le client.

export const kinds = {
  evaluation: { fr: 'Évaluation', en: 'Evaluation', group: 'etudes' },
  etude: { fr: 'Étude', en: 'Study', group: 'etudes' },
  formation: { fr: 'Formation', en: 'Training', group: 'formation' },
  appui: { fr: 'Appui-conseil', en: 'Advisory support', group: 'appui' },
};

// Filtres de la liste des références
export const kindGroups = [
  { id: 'etudes', title: { fr: 'Évaluations et études', en: 'Evaluations and studies' } },
  { id: 'formation', title: { fr: 'Formations', en: 'Training' } },
  { id: 'appui', title: { fr: 'Appui-conseil', en: 'Advisory support' } },
];

export const references = [
  {
    id: 'stc-evaluation-smni-yorosso',
    year: 2022,
    partner: 'save-the-children',
    kind: 'evaluation',
    services: ['sera'],
    title: {
      fr: 'Évaluation finale du projet intégré de la santé maternelle, néonatale et infantile dans le district sanitaire de Yorosso',
      en: 'Final evaluation of the integrated maternal, newborn and child health project in the Yorosso health district',
    },
    zone: { fr: 'District sanitaire de Yorosso', en: 'Yorosso health district' },
  },
  {
    id: 'afpb-etude-lait-local',
    year: 2022,
    partner: 'afpb',
    kind: 'etude',
    services: ['etudes'],
    title: { fr: 'Étude sur la chaîne de valeur lait local dans le cercle de Barouéli', en: 'Study of the local milk value chain in the Barouéli district' },
    zone: { fr: 'Cercle de Barouéli', en: 'Barouéli district' },
  },
  {
    id: 'stc-etude-vulnerabilites',
    year: 2022,
    partner: 'save-the-children',
    kind: 'etude',
    services: ['etudes', 'conseil'],
    title: {
      fr: 'Étude analytique sur l’impact du contexte régional et international sur les vulnérabilités au Mali',
      en: 'Analytical study of the impact of the regional and international context on vulnerabilities in Mali',
    },
    zone: { fr: 'Sikasso, Mopti et Gao', en: 'Sikasso, Mopti and Gao' },
  },
  {
    id: 'stc-formation-meal-qgis',
    year: 2022,
    partner: 'save-the-children',
    kind: 'formation',
    services: ['formation', 'digital', 'sera'],
    title: {
      fr: 'Formation du personnel MEAL (suivi-évaluation, redevabilité et apprentissage) de Save the Children International sur la cartographie avec QGIS et l’infographie',
      en: 'Training for Save the Children International MEAL staff (monitoring, evaluation, accountability and learning) on mapping with QGIS and infographics',
    },
  },
  {
    id: 'cad-formation-formatrices',
    year: 2023,
    partner: 'cad-mali',
    kind: 'formation',
    services: ['formation'],
    title: {
      fr: 'Formation des formatrices militantes de la CAD-Mali et des mouvements féministes sur les approches chaînes de valeur et interprofession',
      en: 'Training for CAD-Mali activist trainers and feminist movements on value chain and inter-professional approaches',
    },
  },
  {
    id: 'afpb-formation-transformation',
    year: 2023,
    partner: 'afpb',
    kind: 'formation',
    services: ['formation'],
    title: {
      fr: 'Formation des femmes et filles pasteures de l’AFPB et de leurs alliées sur les techniques modernes de transformation et de conservation du lait local',
      en: 'Training for AFPB women and girl herders and their allies on modern techniques for processing and preserving local milk',
    },
  },
  {
    id: 'stc-evaluation-parrainage',
    year: 2023,
    partner: 'save-the-children',
    kind: 'evaluation',
    services: ['sera'],
    title: {
      fr: 'Évaluation d’impact des approches utilisées par le Parrainage : code de conduite, LaLeMaPe, groupes d’épargne axés sur les moyens de subsistance et approche grand-mère avec les adolescentes',
      en: 'Impact evaluation of the approaches used by the Sponsorship programme: code of conduct, LaLeMaPe, savings groups focused on livelihoods and the grandmother approach with adolescent girls',
    },
    zone: { fr: 'Cercles de Sikasso et Yorosso', en: 'Sikasso and Yorosso districts' },
  },
  {
    id: 'afpb-formation-normes',
    year: 2023,
    partner: 'afpb',
    kind: 'formation',
    services: ['formation'],
    title: {
      fr: 'Formation des femmes rurales productrices de lait local de l’AFPB aux normes de qualité du lait local et de ses produits dérivés',
      en: 'Training for AFPB rural women milk producers on quality standards for local milk and dairy products',
    },
  },
  {
    id: 'afpb-formation-strategie',
    year: 2023,
    partner: 'afpb',
    kind: 'formation',
    services: ['formation', 'conseil'],
    title: {
      fr: 'Formation sur la stratégie nationale de valorisation du lait local et le développement de la chaîne de valeur lait local, au profit des femmes et filles pasteures de l’AFPB et de leurs alliées',
      en: 'Training on the national strategy for promoting local milk and developing the local milk value chain, for AFPB women and girl herders and their allies',
    },
    zone: { fr: 'Unions communales de Konobougou et de Barouéli', en: 'Konobougou and Barouéli municipal unions' },
  },
  {
    id: 'scoops-formation-climat',
    year: 2023,
    partner: 'scoops-ktpan',
    kind: 'formation',
    services: ['formation'],
    title: {
      fr: 'Formation des femmes, des filles et des diplômées sur les liens entre LFA et LDF, FNAA, PANA et la Politique nationale de lutte contre les changements climatiques',
      en: 'Training for women, girls and graduates on the links between the LFA and LDF, FNAA, PANA and the National Climate Change Policy',
    },
  },
  {
    id: 'afpb-formation-ecoulement',
    year: 2023,
    partner: 'afpb',
    kind: 'formation',
    services: ['formation'],
    title: { fr: 'Formation des femmes et filles de l’AFPB aux techniques d’écoulement du lait local', en: 'Training for AFPB women and girls on local milk marketing techniques' },
  },
  {
    id: 'afpb-mobilisation-baroueli',
    year: 2023,
    partner: 'afpb',
    kind: 'appui',
    services: ['conseil'],
    title: {
      fr: 'Facilitation de la sensibilisation et de la mobilisation des femmes et filles pasteures de l’AFPB et de l’Union régionale des femmes et filles pasteures de Ségou, en faveur du soutien des autorités de Barouéli aux activités de chaîne de valeur au profit des femmes',
      en: 'Facilitating awareness-raising and mobilisation of AFPB women and girl herders and the Ségou Regional Union of Women and Girl Herders, to secure the support of the Barouéli authorities for value chain activities benefiting women',
    },
    zone: { fr: 'Barouéli et Ségou', en: 'Barouéli and Ségou' },
  },
  {
    id: 'fawe-manuel-suivi-evaluation',
    year: 2024,
    partner: 'fawe-mali',
    kind: 'appui',
    services: ['sera', 'formation'],
    title: {
      fr: 'Élaboration d’un manuel de suivi-évaluation et de redevabilité, et formation des membres de FAWE Mali',
      en: 'Development of a monitoring, evaluation and accountability manual, and training for FAWE Mali members',
    },
  },
  {
    id: 'cad-formation-acces-marche',
    year: 2024,
    partner: 'cad-mali',
    kind: 'formation',
    services: ['formation', 'digital'],
    title: {
      fr: 'Formation des femmes sur l’accès au marché des produits des femmes et filles rurales, les techniques de commercialisation et le marketing digital',
      en: 'Training for women on market access for products made by rural women and girls, sales techniques and digital marketing',
    },
  },
  {
    id: 'sexagon-plan-affaires-fasso-kanou',
    year: 2024,
    partner: 'sexagon',
    kind: 'appui',
    services: ['conseil'],
    title: {
      fr: 'Appui à l’élaboration du plan d’affaires de l’Union des sociétés coopératives des exploitantes agricoles « FASSO-KANOU » de Niono',
      en: 'Support in drafting the business plan of the “FASSO-KANOU” union of women farmers’ cooperatives in Niono',
    },
    zone: { fr: 'Niono', en: 'Niono' },
  },
  {
    id: 'sexagon-formation-genre',
    year: 2024,
    partner: 'sexagon',
    kind: 'formation',
    services: ['formation'],
    title: {
      fr: 'Formation des facilitateurs en genre, des agents de changement en genre et des médias partenaires du programme sur le genre et le développement local',
      en: 'Training for gender facilitators, gender change agents and the programme’s partner media on gender and local development',
    },
  },
  {
    // Année précisée par le client le 03/11/2026.
    id: 'giz-etude-base-we4r',
    year: 2026,
    partner: 'giz',
    kind: 'etude',
    services: ['sera', 'etudes'],
    title: {
      fr: 'Étude de base du projet mondial « Renforcement des femmes pour des zones rurales résilientes » (Women’s Empowerment for Resilient Rural Areas, WE4R/GMV)',
      en: 'Baseline study for the global project “Women’s Empowerment for Resilient Rural Areas” (WE4R/GMV)',
    },
    note: {
      fr: 'Au Mali, le projet est cofinancé par le BMZ et l’Union européenne dans le cadre de l’action de la Grande Muraille Verte (GMV).',
      en: 'In Mali, the project is co-financed by BMZ and the European Union as part of the Great Green Wall (GMV) action.',
    },
    zone: { fr: 'Régions de Kayes et de Nioro', en: 'Kayes and Nioro regions' },
  },
];
