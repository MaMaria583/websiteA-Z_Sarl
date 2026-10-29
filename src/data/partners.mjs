// Partenaires — source : fichier « Partenaires » du client. Recherche et vérification des sites : 29/10/2026.
// Logo cliquable : renseigner `url`. Sans `url`, la fiche s'affiche sans lien.
// Logos : fichiers officiels récupérés sur les sites des partenaires (accord d'usage à obtenir avant mise en ligne).

export const categories = [
  { id: 'international', title: { fr: 'Coopération internationale', en: 'International cooperation' } },
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
    place: 'bamako',
    logo: { file: 'giz.svg', width: 207, height: 170 },
    url: { fr: 'https://www.giz.de/en/regions/africa/mali', en: 'https://www.giz.de/en/regions/africa/mali' },
    desc: {
      fr: 'Agence de la coopération internationale allemande, présente au Mali depuis 1960 : gouvernance et paix, agriculture, environnement et énergie.',
      en: 'Germany’s international cooperation agency, active in Mali since 1960: governance and peace, agriculture, environment and energy.',
    },
  },
  {
    id: 'luxdev',
    acronym: 'LuxDev',
    name: { fr: 'Agence luxembourgeoise pour la coopération au développement', en: 'Luxembourg Development Cooperation Agency' },
    category: 'international',
    where: { fr: 'Luxembourg · bureau à Bamako', en: 'Luxembourg · office in Bamako' },
    place: 'bamako',
    logo: { file: 'luxdev.svg', width: 134, height: 71 },
    url: { fr: 'https://luxdev.lu/fr/mali', en: 'https://luxdev.lu/en/mali' },
    desc: {
      fr: 'Agence de la coopération luxembourgeoise, active au Mali depuis 1998 : formation professionnelle et insertion, développement rural, gouvernance.',
      en: 'Luxembourg’s development cooperation agency, active in Mali since 1998: vocational training and employment, rural development, governance.',
    },
  },
  {
    id: 'world-renew',
    acronym: 'World Renew',
    name: { fr: 'World Renew', en: 'World Renew' },
    category: 'international',
    where: { fr: 'Canada & États-Unis · Afrique de l’Ouest', en: 'Canada & United States · West Africa' },
    place: null,
    logo: { file: 'world-renew', raster: true, width: 640, height: 114 },
    url: { fr: 'https://worldrenew.org/', en: 'https://worldrenew.org/' },
    desc: {
      fr: 'ONG internationale de secours et de développement, présente en Afrique de l’Ouest depuis 1985 : sécurité alimentaire, alphabétisation, groupes d’épargne, santé communautaire.',
      en: 'International relief and development NGO, working in West Africa since 1985: food security, literacy, savings groups, community health.',
    },
  },
  {
    id: 'canam',
    acronym: 'CANAM',
    name: { fr: 'Caisse Nationale d’Assurance Maladie', en: 'Caisse Nationale d’Assurance Maladie (National Health Insurance Fund)' },
    category: 'public',
    where: { fr: 'Mali · Bamako', en: 'Mali · Bamako' },
    place: 'bamako',
    logo: { file: 'canam', raster: true, width: 243, height: 240 },
    url: { fr: 'https://www.canam.ml/', en: 'https://www.canam.ml/' },
    desc: {
      fr: 'Établissement public qui gère l’Assurance Maladie Obligatoire (AMO) au Mali. Partenaire de notre formation en GPEC de 2026.',
      en: 'Public body managing Mali’s compulsory health insurance scheme (AMO). Partner of our 2026 GPEC training.',
    },
  },
  {
    id: 'cad-mali',
    acronym: 'CAD-Mali',
    name: { fr: 'Coalition des Alternatives Africaines Dette et Développement', en: 'Coalition des Alternatives Africaines Dette et Développement' },
    category: 'civil',
    where: { fr: 'Mali · Bamako', en: 'Mali · Bamako' },
    place: 'bamako',
    logo: null,
    // Site officiel : http://www.cadmali.org — hors service (erreur 503) le 29/10/2026.
    // Remettre { fr: 'http://www.cadmali.org', en: 'http://www.cadmali.org' } dès qu'il répond.
    url: null,
    desc: {
      fr: 'Réseau de la société civile malienne (syndicats, associations, ONG) engagé sur la dette et le développement ; organisateur du Forum des peuples.',
      en: 'Network of Malian civil society organisations (unions, associations, NGOs) working on debt and development; organiser of the Forum des peuples.',
    },
  },
  {
    id: 'sexagon',
    acronym: 'SEXAGON',
    name: { fr: 'Syndicat des Exploitants Agricoles de l’Office du Niger', en: 'Syndicat des Exploitants Agricoles de l’Office du Niger (farmers’ union)' },
    category: 'rural',
    where: { fr: 'Mali · Niono, zone Office du Niger', en: 'Mali · Niono, Office du Niger area' },
    place: 'niono',
    logo: null,
    url: null, // Aucun site officiel. Attention : sexagon.org n'a aucun rapport avec ce syndicat.
    desc: {
      fr: 'Principal syndicat paysan de la zone irriguée de l’Office du Niger, créé en 1997.',
      en: 'Main farmers’ union of the Office du Niger irrigated area, founded in 1997.',
    },
  },
  {
    id: 'afpb',
    acronym: 'AFPB',
    name: { fr: 'Association des Femmes Pasteures de Barouéli', en: 'Association des Femmes Pasteures de Barouéli' },
    category: 'civil',
    where: { fr: 'Mali · Barouéli, région de Ségou', en: 'Mali · Barouéli, Ségou region' },
    place: 'baroueli',
    logo: null,
    url: null,
    desc: {
      fr: 'Association de femmes du cercle de Barouéli, dans la région de Ségou.',
      en: 'Women’s association based in the Barouéli district, Ségou region.',
    },
  },
  {
    id: 'abic-d',
    acronym: 'ABIC-D',
    name: { fr: 'Association Boosteuse d’Intelligence De Dioïla', en: 'Association Boosteuse d’Intelligence De Dioïla' },
    category: 'civil',
    where: { fr: 'Mali · Dioïla', en: 'Mali · Dioïla' },
    place: 'dioila',
    logo: null,
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
    place: 'koutiala',
    logo: null,
    url: null,
    desc: {
      fr: 'Coopérative de femmes transformatrices de produits agroalimentaires : soumbala, couscous, farines nutritives, soja.',
      en: 'Women’s cooperative processing agri-food products: soumbala, couscous, nutritious flours, soy.',
    },
  },
];

// Repères de la carte du Mali (coordonnées : OpenStreetMap)
export const places = [
  { id: 'bamako', name: 'Bamako', who: { fr: 'Siège d’A-Z Sarl (Hamdallaye ACI 2000) · CANAM · CAD-Mali · bureaux de la GIZ et de LuxDev', en: 'A-Z Sarl head office (Hamdallaye ACI 2000) · CANAM · CAD-Mali · GIZ and LuxDev offices' }, hq: true },
  { id: 'baroueli', name: 'Barouéli', who: { fr: 'AFPB · région de Ségou', en: 'AFPB · Ségou region' } },
  { id: 'dioila', name: 'Dioïla', who: { fr: 'ABIC-D', en: 'ABIC-D' } },
  { id: 'koutiala', name: 'Koutiala', who: { fr: 'SCOOPS-K.T.P.A.N, à N’Togonasso', en: 'SCOOPS-K.T.P.A.N, in N’Togonasso' } },
  { id: 'niono', name: 'Niono', who: { fr: 'SEXAGON · zone de l’Office du Niger', en: 'SEXAGON · Office du Niger area' } },
];
