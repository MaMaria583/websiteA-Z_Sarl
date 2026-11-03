// Partenaires — source : fichier « Partenaires » du client, complété le 02/11/2026 (Save the Children,
// FRES – Yeelen Kura). Recherche et vérification des sites : 29/10/2026 et 02/11/2026.
// Logo cliquable : renseigner `url`. Sans `url`, la fiche s'affiche sans lien.
// Logos (accord d'usage à obtenir avant mise en ligne) : fichiers officiels des sites des partenaires ;
// CAD-Mali, SEXAGON, AFPB et ABIC-D transmis par le client (02/11/2026, fond blanc rendu transparent) ;
// Yeelen Kura (fiche membre sur renewelec.org) associé au logo FRES, comme sur les supports de l'atelier national ;
// FAWE Mali (ajouté le 03/11/2026) : logo officiel de fawe.org.
// `desc` : présentation du partenaire ; `work` : ce qu'A-Z Sarl a réalisé avec lui (fichier client
// « Quelques réalisations dans le temps », 03/11/2026). Le nombre de missions est calculé à partir de
// src/data/references.mjs et src/data/projects.mjs.

export const categories = [
  { id: 'international', title: { fr: 'Partenaires internationaux', en: 'International partners' } },
  { id: 'public', title: { fr: 'Institution publique', en: 'Public institution' } },
  { id: 'civil', title: { fr: 'Société civile', en: 'Civil society' } },
  { id: 'rural', title: { fr: 'Organisations paysannes & coopératives', en: 'Farmers’ organisations & cooperatives' } },
];

export const partners = [
  {
    id: 'giz',
    acronym: 'GIZ',
    name: { fr: 'Deutsche Gesellschaft für Internationale Zusammenarbeit', en: 'Deutsche Gesellschaft für Internationale Zusammenarbeit' },
    category: 'international',
    where: { fr: 'Allemagne · bureau à Bamako', en: 'Germany · office in Bamako' },
    logo: { file: 'giz.svg', width: 207, height: 170 },
    url: { fr: 'https://www.giz.de/en/regions/africa/mali', en: 'https://www.giz.de/en/regions/africa/mali' },
    desc: {
      fr: 'Agence de la coopération internationale allemande, présente au Mali depuis 1960 : gouvernance et paix, agriculture, environnement et énergie.',
      en: 'Germany’s international cooperation agency, active in Mali since 1960: governance and peace, agriculture, environment and energy.',
    },
    work: {
      fr: 'Étude de base du projet mondial WE4R dans les régions de Kayes et de Nioro.',
      en: 'Baseline study for the global WE4R project in the Kayes and Nioro regions.',
    },
  },
  {
    id: 'luxdev',
    acronym: 'LuxDev',
    name: { fr: 'Agence luxembourgeoise pour la coopération au développement', en: 'Luxembourg Development Cooperation Agency' },
    category: 'international',
    where: { fr: 'Luxembourg · bureau à Bamako', en: 'Luxembourg · office in Bamako' },
    logo: { file: 'luxdev.svg', width: 134, height: 71 },
    url: { fr: 'https://luxdev.lu/fr/mali', en: 'https://luxdev.lu/en/mali' },
    desc: {
      fr: 'Agence de la coopération luxembourgeoise, active au Mali depuis 1998 : formation professionnelle et insertion, développement rural, gouvernance.',
      en: 'Luxembourg’s development cooperation agency, active in Mali since 1998: vocational training and employment, rural development, governance.',
    },
    work: {
      fr: 'Renforcement de compétences du personnel des centres de formation professionnelle partenaires (2025).',
      en: 'Capacity building for staff of partner vocational training centres (2025).',
    },
  },
  {
    id: 'world-renew',
    acronym: 'World Renew',
    name: { fr: 'World Renew', en: 'World Renew' },
    category: 'international',
    where: { fr: 'Canada & États-Unis · Afrique de l’Ouest', en: 'Canada & United States · West Africa' },
    logo: { file: 'world-renew', raster: true, width: 640, height: 114 },
    url: { fr: 'https://worldrenew.org/', en: 'https://worldrenew.org/' },
    desc: {
      fr: 'ONG internationale de secours et de développement, présente en Afrique de l’Ouest depuis 1985 : sécurité alimentaire, alphabétisation, groupes d’épargne, santé communautaire.',
      en: 'International relief and development NGO, working in West Africa since 1985: food security, literacy, savings groups, community health.',
    },
    work: {
      fr: 'Étude de base de la phase 7 du projet CRWRF et World Renew Mali, et formation à la collecte mobile des données (2026).',
      en: 'Baseline study for phase 7 of the CRWRF and World Renew Mali project, and mobile data collection training (2026).',
    },
  },
  {
    id: 'save-the-children',
    acronym: 'Save the Children',
    name: { fr: 'Save the Children International', en: 'Save the Children International' },
    category: 'international',
    where: { fr: 'ONG internationale · bureau à Bamako', en: 'International NGO · office in Bamako' },
    logo: { file: 'save-the-children.svg', width: 228, height: 48 },
    url: { fr: 'https://www.savethechildren.net/mali', en: 'https://www.savethechildren.net/mali' },
    desc: {
      fr: 'ONG internationale de défense des droits de l’enfant, présente au Mali depuis 1987 : éducation, santé et nutrition, protection de l’enfance, réponse humanitaire.',
      en: 'International children’s rights NGO, working in Mali since 1987: education, health and nutrition, child protection, humanitarian response.',
    },
    work: {
      fr: 'Évaluations de projets, étude des vulnérabilités et formation des équipes MEAL, de 2022 à 2024.',
      en: 'Project evaluations, a vulnerability study and MEAL team training, from 2022 to 2024.',
    },
  },
  {
    id: 'fres',
    acronym: 'FRES – Yeelen Kura',
    name: { fr: 'Foundation Rural Energy Services · SSD Yeelen Kura-FRES Mali', en: 'Foundation Rural Energy Services · SSD Yeelen Kura-FRES Mali' },
    category: 'international',
    where: { fr: 'Pays-Bas · Mali (régions de Sikasso et Ségou)', en: 'Netherlands · Mali (Sikasso and Ségou regions)' },
    // Les deux logos vont ensemble (demande du client) : composition de fres.svg et du logo Yeelen Kura
    // (https://renewelec.org/wp-content/uploads/2024/06/logo_yeelen_kura.png), à hauteur égale
    logo: { file: 'fres-yeelen-kura', raster: true, width: 440, height: 240, alt: { fr: 'Logos Yeelen Kura et FRES', en: 'Yeelen Kura and FRES logos' } },
    url: { fr: 'https://fres.nl/', en: 'https://fres.nl/' },
    desc: {
      fr: 'Fondation néerlandaise pionnière de l’électrification rurale solaire. Au Mali, la société SSD Yeelen Kura, créée avec FRES, fournit depuis 2001 de l’électricité solaire (mini-réseaux, kits domestiques).',
      en: 'Dutch foundation pioneering solar rural electrification. In Mali, SSD Yeelen Kura, set up with FRES, has supplied solar electricity (mini-grids, home systems) since 2001.',
    },
    work: {
      fr: 'Évaluation du modèle économique de FRES et organisation de l’atelier national sur l’énergie propre (2021).',
      en: 'Evaluation of the FRES business model and organisation of the national clean energy workshop (2021).',
    },
  },
  {
    id: 'canam',
    acronym: 'CANAM',
    name: { fr: 'Caisse Nationale d’Assurance Maladie', en: 'Caisse Nationale d’Assurance Maladie (National Health Insurance Fund)' },
    category: 'public',
    where: { fr: 'Mali · Bamako', en: 'Mali · Bamako' },
    logo: { file: 'canam', raster: true, width: 243, height: 240 },
    url: { fr: 'https://www.canam.ml/', en: 'https://www.canam.ml/' },
    desc: {
      fr: 'Établissement public qui gère l’Assurance Maladie Obligatoire (AMO) au Mali.',
      en: 'Public body managing Mali’s compulsory health insurance scheme (AMO).',
    },
    work: {
      fr: 'Formation en gestion prévisionnelle des emplois et des compétences (2026).',
      en: 'Training in strategic workforce and skills planning (2026).',
    },
  },
  {
    id: 'cad-mali',
    acronym: 'CAD-Mali',
    name: { fr: 'Coalition des Alternatives Africaines Dette et Développement', en: 'Coalition des Alternatives Africaines Dette et Développement' },
    category: 'civil',
    where: { fr: 'Mali · Bamako', en: 'Mali · Bamako' },
    logo: { file: 'cad-mali', raster: true, width: 224, height: 225 },
    // Site officiel : http://www.cadmali.org — hors service (erreur 503) les 29/10 et 02/11/2026.
    // Remettre { fr: 'http://www.cadmali.org', en: 'http://www.cadmali.org' } dès qu'il répond.
    url: null,
    desc: {
      fr: 'Réseau de la société civile malienne (syndicats, associations, ONG) engagé sur la dette et le développement ; organisateur du Forum des peuples.',
      en: 'Network of Malian civil society organisations (unions, associations, NGOs) working on debt and development; organiser of the Forum des peuples.',
    },
    work: {
      fr: 'Formation des formatrices militantes (2023), puis des femmes rurales à l’accès au marché et au marketing digital (2024).',
      en: 'Training for activist trainers (2023), then for rural women on market access and digital marketing (2024).',
    },
  },
  {
    id: 'fawe-mali',
    acronym: 'FAWE Mali',
    name: { fr: 'Forum des éducatrices africaines, antenne nationale du Mali', en: 'Forum for African Women Educationalists, Mali chapter' },
    category: 'civil',
    where: { fr: 'Mali · Bamako', en: 'Mali · Bamako' },
    logo: { file: 'fawe-mali', raster: true, width: 569, height: 220 },
    // Site de l'antenne (fawemali.org) en erreur 500 le 03/11/2026 : lien vers le site officiel du FAWE.
    url: { fr: 'https://fawe.org/fr/', en: 'https://fawe.org/en/' },
    desc: {
      fr: 'Antenne malienne du FAWE, ONG panafricaine engagée pour l’éducation des filles et des femmes en Afrique.',
      en: 'Mali chapter of FAWE, the pan-African NGO working for the education of girls and women in Africa.',
    },
    work: {
      fr: 'Manuel de suivi-évaluation et de redevabilité, et formation de ses membres (2024).',
      en: 'Monitoring, evaluation and accountability manual, and training for its members (2024).',
    },
  },
  {
    id: 'sexagon',
    acronym: 'SEXAGON',
    name: { fr: 'Syndicat des Exploitants Agricoles de l’Office du Niger', en: 'Syndicat des Exploitants Agricoles de l’Office du Niger (farmers’ union)' },
    category: 'rural',
    where: { fr: 'Mali · Niono, zone Office du Niger', en: 'Mali · Niono, Office du Niger area' },
    logo: { file: 'sexagon', raster: true, width: 376, height: 330 },
    url: null, // Aucun site officiel. Attention : sexagon.org n'a aucun rapport avec ce syndicat.
    desc: {
      fr: 'Principal syndicat paysan de la zone irriguée de l’Office du Niger, créé en 1997.',
      en: 'Main farmers’ union of the Office du Niger irrigated area, founded in 1997.',
    },
    work: {
      fr: 'Plan d’affaires de l’union de coopératives FASSO-KANOU de Niono et formation sur le genre et le développement local (2024).',
      en: 'Business plan for the FASSO-KANOU cooperative union in Niono and training on gender and local development (2024).',
    },
  },
  {
    id: 'afpb',
    acronym: 'AFPB',
    name: { fr: 'Association des Femmes Pasteures de Barouéli', en: 'Association des Femmes Pasteures de Barouéli' },
    category: 'civil',
    where: { fr: 'Mali · Barouéli, région de Ségou', en: 'Mali · Barouéli, Ségou region' },
    logo: { file: 'afpb', raster: true, width: 189, height: 111 },
    url: null,
    desc: {
      fr: 'Association de femmes du cercle de Barouéli, dans la région de Ségou.',
      en: 'Women’s association based in the Barouéli district, Ségou region.',
    },
    work: {
      fr: 'Étude de la chaîne de valeur lait local (2022), puis formations et mobilisation des femmes et filles pasteures (2023).',
      en: 'Local milk value chain study (2022), then training and mobilisation of women and girl herders (2023).',
    },
  },
  {
    id: 'abic-d',
    acronym: 'ABIC-D',
    name: { fr: 'Association Boosteuse d’Intelligence De Dioïla', en: 'Association Boosteuse d’Intelligence De Dioïla' },
    category: 'civil',
    where: { fr: 'Mali · Dioïla', en: 'Mali · Dioïla' },
    logo: { file: 'abic-d', raster: true, width: 207, height: 123 },
    url: null,
    desc: {
      fr: 'Association de développement basée à Dioïla.',
      en: 'Development association based in Dioïla.',
    },
  },
  {
    id: 'scoops-ktpan',
    acronym: 'SCOOPS-K.T.P.A.N',
    name: {
      fr: 'Société Coopérative Simplifiée Kotognongotala des Transformatrices de Produits Agro-alimentaires de N’Togonasso',
      en: 'Société Coopérative Simplifiée Kotognongotala des Transformatrices de Produits Agro-alimentaires de N’Togonasso',
    },
    category: 'rural',
    where: { fr: 'Mali · N’Togonasso, cercle de Koutiala', en: 'Mali · N’Togonasso, Koutiala district' },
    logo: null, // Pas de logo (confirmé par le client le 02/11/2026) : plaque typographique
    url: null,
    desc: {
      fr: 'Coopérative de femmes transformatrices de produits agroalimentaires : soumbala, couscous, farines nutritives, soja.',
      en: 'Women’s cooperative processing agri-food products: soumbala, couscous, nutritious flours, soy.',
    },
    work: {
      fr: 'Formation sur la Politique nationale de lutte contre les changements climatiques et les textes associés (2023).',
      en: 'Training on the National Climate Change Policy and related frameworks (2023).',
    },
  },
];

// Zones d'intervention (carte « de Kayes à Gao ») — fichier client « Quelques réalisations dans le temps »
// (03/11/2026). Points : chefs-lieux (OpenStreetMap), dans src/data/mali-map.json. `who` : partenaires et
// missions connus dans la zone ; Yorosso et N'Togonasso sont rattachés à Sikasso comme dans le fichier du client.
export const places = [
  { id: 'bamako', name: 'Bamako', hq: true, who: { fr: 'Siège d’A-Z Sarl (Hamdallaye ACI 2000) · CANAM, CAD-Mali, FAWE Mali · bureaux de la GIZ, de LuxDev et de Save the Children', en: 'A-Z Sarl head office (Hamdallaye ACI 2000) · CANAM, CAD-Mali, FAWE Mali · GIZ, LuxDev and Save the Children offices' } },
  { id: 'kayes', name: 'Kayes', who: { fr: 'GIZ · étude de base WE4R', en: 'GIZ · WE4R baseline study' } },
  { id: 'nioro', name: 'Nioro', who: { fr: 'GIZ · étude de base WE4R', en: 'GIZ · WE4R baseline study' } },
  { id: 'koulikoro', name: 'Koulikoro', who: { fr: 'FRES – Yeelen Kura · World Renew', en: 'FRES – Yeelen Kura · World Renew' } },
  { id: 'dioila', name: 'Dioïla', who: { fr: 'ABIC-D', en: 'ABIC-D' } },
  { id: 'bougouni', name: 'Bougouni', who: null },
  { id: 'sikasso', name: 'Sikasso', who: { fr: 'Save the Children (Sikasso, Yorosso) · FRES – Yeelen Kura · World Renew · SCOOPS-K.T.P.A.N (N’Togonasso)', en: 'Save the Children (Sikasso, Yorosso) · FRES – Yeelen Kura · World Renew · SCOOPS-K.T.P.A.N (N’Togonasso)' } },
  { id: 'segou', name: 'Ségou', who: { fr: 'AFPB (Barouéli, Konobougou) · SEXAGON (Niono) · World Renew', en: 'AFPB (Barouéli, Konobougou) · SEXAGON (Niono) · World Renew' } },
  { id: 'mopti', name: 'Mopti', who: { fr: 'Save the Children', en: 'Save the Children' } },
  { id: 'bandiagara', name: 'Bandiagara', who: null },
  { id: 'douentza', name: 'Douentza', who: null },
  { id: 'gao', name: 'Gao', who: { fr: 'Save the Children', en: 'Save the Children' } },
];
