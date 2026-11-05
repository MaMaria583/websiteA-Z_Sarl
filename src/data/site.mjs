// Informations générales sur A-Z Sarl — sources : « PRESENTATION DU BUREAU » et formulaire
// « Informations à fournir » validé par le client le 2 novembre 2026.
// Modifier ce fichier puis relancer `node build.mjs`.

export const site = {
  name: 'A-Z Sarl',
  // Signature du logo officiel (« A-Z Innovation & Impact »)
  brandLine: { fr: 'Innovation & Impact', en: 'Innovation & Impact' },
  tagline: {
    fr: "De la donnée à l'action, l'innovation au service du développement.",
    en: 'From data to action: innovation in the service of development.',
  },

  // Adresse publique du site, SANS barre finale (ex. 'https://www.azsarl.com').
  // Tant qu'elle est vide, les balises canoniques, hreflang, og:url et le sitemap ne sont pas générés.
  // Vide pour la version de test Vercel ; la publication Hostinger la fournit (SITE_URL, voir .github/workflows/hostinger.yml).
  siteUrl: process.env.SITE_URL || '',

  // Version de test (validation par le client) : le site demande aux moteurs de recherche de ne pas
  // l'indexer. Pour la mise en ligne définitive sur Hostinger : SITE_TEST_MODE: 'false' dans le workflow.
  testMode: process.env.SITE_TEST_MODE !== 'false',

  address: {
    street: 'Hamdallaye ACI 2000',
    city: 'Bamako',
    country: 'Mali',
    geo: { lat: 12.620174, lon: -8.042252 }, // point GPS du bureau fourni par le client
  },
  phones: [
    { display: '+223 79 27 73 60', tel: '+22379277360' },
    { display: '+223 77 88 93 35', tel: '+22377889335' },
  ],
  whatsapp: '22379277360', // numéro au format international, sans « + » ni espaces (confirmé par le client)
  email: 'prestations.az@gmail.com', // reçoit aussi les formulaires du site (confirmé par le client)
  director: {
    name: 'Mohamed Lamine KABA',
    initials: 'MLK',
    role: { fr: 'Directeur Technique', en: 'Technical Director' },
    email: 'kabamalamine11@gmail.com',
  },

  // Formulaires : service gratuit FormSubmit (https://formsubmit.co). Le premier envoi déclenche
  // un e-mail d'activation à valider dans la boîte prestations.az@gmail.com.
  formEndpoint: 'https://formsubmit.co/prestations.az@gmail.com',

  // Réseaux sociaux (icône : linkedin | facebook)
  social: [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/az-impact/' }, // adresse publique transmise le 02/11/2026
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/profile.php?id=100093816653668' },
  ],

  // Mentions légales : le client a indiqué que RCCM, NIF, capital et directeur de la publication
  // ne sont pas nécessaires. Un champ laissé vide n'est pas affiché.
  legal: {
    rccm: '',
    nif: '',
    capital: '',
    publisher: '',
    host: 'Vercel Inc. — vercel.com',
  },
};
