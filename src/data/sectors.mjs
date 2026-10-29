// Les 13 domaines d'intervention (« orientations stratégiques » du fichier du client),
// regroupés en 4 familles pour la lecture.

export const families = [
  { id: 'social', title: { fr: 'Santé, éducation & social', en: 'Health, education & social' } },
  { id: 'territoires', title: { fr: 'Territoires & gouvernance', en: 'Territories & governance' } },
  { id: 'rural', title: { fr: 'Environnement & monde rural', en: 'Environment & rural development' } },
  { id: 'methodes', title: { fr: 'Études & évaluation', en: 'Studies & evaluation' } },
];

export const sectors = [
  { id: 'sante', family: 'social', icon: 'sante', title: { fr: 'Santé', en: 'Health' }, detail: { fr: 'Santé maternelle et infantile, nutrition, santé sexuelle et reproductive', en: 'Maternal and child health, nutrition, sexual and reproductive health' } },
  { id: 'education', family: 'social', icon: 'education', title: { fr: 'Éducation', en: 'Education' }, detail: { fr: 'Éducation et politiques d’éducation', en: 'Education and education policy' } },
  { id: 'securite-alimentaire', family: 'social', icon: 'grain', title: { fr: 'Sécurité alimentaire', en: 'Food security' }, detail: { fr: 'Sécurité alimentaire et nutritionnelle', en: 'Food and nutrition security' } },
  { id: 'ingenierie-formation', family: 'social', icon: 'book', title: { fr: 'Ingénierie de formation', en: 'Training engineering' }, detail: { fr: 'Ingénierie de la formation et de l’éducation', en: 'Training and education engineering' } },
  { id: 'planification', family: 'territoires', icon: 'map', title: { fr: 'Planification', en: 'Planning' }, detail: { fr: 'Planification du développement local et planification urbaine', en: 'Local development planning and urban planning' } },
  { id: 'decentralisation', family: 'territoires', icon: 'hierarchy', title: { fr: 'Décentralisation', en: 'Decentralisation' }, detail: { fr: 'Décentralisation et aménagement du territoire', en: 'Decentralisation and territorial development' } },
  { id: 'gouvernance', family: 'territoires', icon: 'scales', title: { fr: 'Gouvernance', en: 'Governance' }, detail: { fr: 'Gouvernance démocratique', en: 'Democratic governance' } },
  { id: 'amenagements', family: 'rural', icon: 'tree', title: { fr: 'Aménagements', en: 'Land development' }, detail: { fr: 'Études d’aménagement forestier et hydro-agricole', en: 'Forest and hydro-agricultural development studies' } },
  { id: 'environnement', family: 'rural', icon: 'leaf', title: { fr: 'Environnement & climat', en: 'Environment & climate' }, detail: { fr: 'Études d’impact environnemental et social, changement climatique', en: 'Environmental and social impact assessments, climate change' } },
  { id: 'socio-economiques', family: 'rural', icon: 'people-chart', title: { fr: 'Études socio-économiques', en: 'Socio-economic studies' }, detail: { fr: 'Études socio-économiques et agro-sylvo-pastorales', en: 'Socio-economic and agro-sylvo-pastoral studies' } },
  { id: 'groupements', family: 'rural', icon: 'group', title: { fr: 'Groupements', en: 'Producer groups' }, detail: { fr: 'Appui-conseil aux groupements paysans et socio-professionnels', en: 'Advisory support to farmer and professional groups' } },
  { id: 'suivi-evaluation', family: 'methodes', icon: 'trend', title: { fr: 'Suivi-évaluation', en: 'Monitoring & evaluation' }, detail: { fr: 'Suivi-évaluation des projets et programmes', en: 'Monitoring and evaluation of projects and programmes' } },
  { id: 'etudes-diagnostiques', family: 'methodes', icon: 'clipboard', title: { fr: 'Études diagnostiques', en: 'Diagnostic studies' }, detail: { fr: 'Études diagnostiques, de base et de faisabilité', en: 'Diagnostic, baseline and feasibility studies' } },
];
