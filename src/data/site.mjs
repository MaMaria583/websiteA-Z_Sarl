// Informations générales sur A-Z Sarl — source : « PRESENTATION DU BUREAU » (fichier du client).
// Modifier ce fichier puis relancer `node build.mjs`.

export const site = {
  name: 'A-Z Sarl',
  brandLine: { fr: "Bureau d'études & de conseil", en: 'Consulting & research' },
  tagline: {
    fr: "De la donnée à l'action, l'innovation au service du développement.",
    en: 'From data to action: innovation in the service of development.',
  },

  // Adresse publique du site, SANS barre finale (ex. 'https://www.az-sarl.com').
  // Tant qu'elle est vide, les balises canoniques, hreflang, og:url et le sitemap ne sont pas générés.
  siteUrl: '',

  // Version de test (validation par le client) : le site demande aux moteurs de recherche de ne pas
  // l'indexer. Passer à false pour la mise en ligne définitive.
  testMode: true,

  address: {
    street: 'Hamdallaye ACI 2000',
    city: 'Bamako',
    country: 'Mali',
    geo: { lat: 12.63781, lon: -8.02488 }, // centre du quartier ACI 2000 — remplacer par le point GPS exact du bureau
  },
  phones: [
    { display: '+223 79 27 73 60', tel: '+22379277360' },
    { display: '+223 77 88 93 35', tel: '+22377889335' },
  ],
  whatsapp: '22379277360', // numéro au format international, sans « + » ni espaces
  email: 'prestations.az@gmail.com',
  director: {
    name: 'Mohamed Lamine KABA',
    initials: 'MLK',
    role: { fr: 'Directeur Technique', en: 'Technical Director' },
    email: 'kabamalamine11@gmail.com',
  },

  // Formulaires : service gratuit FormSubmit (https://formsubmit.co). Le premier envoi déclenche
  // un e-mail d'activation à valider dans la boîte prestations.az@gmail.com.
  formEndpoint: 'https://formsubmit.co/prestations.az@gmail.com',

  // Réseaux sociaux (laisser vide tant que les pages n'existent pas)
  social: [
    // { name: 'LinkedIn', url: 'https://www.linkedin.com/company/...' },
  ],

  // Mentions légales — à compléter par le client avant la mise en ligne
  legal: {
    rccm: '',
    nif: '',
    capital: '',
    publisher: '',
    host: '',
  },
};
