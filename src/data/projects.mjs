// Réalisations d'A-Z Sarl (page « Réalisations », accueil, pages pôles, plaquette).
// Sources : dossiers photos du client (02/11/2026), affiche du camp, banderole GPEC, et pour FRES le
// rapport public « Atelier national sur l'augmentation de l'utilisation de l'énergie propre dans les
// zones rurales au Mali » (août 2021) : https://fres.nl/app/uploads/2022/01/Rapport-Atelier-Yeelen-Kura-FRES-Mali.pdf
// `photos` : identifiants de src/data/photos.json ; la première sert de visuel principal.

export const projects = [
  {
    id: 'camp-digital-ia-2026',
    year: '2026',
    services: ['digital', 'formation'],
    tag: { fr: 'Formation · Digital & IA', en: 'Training · Digital & AI' },
    title: { fr: 'Camp de vacances Digital & IA 2026', en: 'Digital & AI Holiday Camp 2026' },
    quote: { fr: 'Des vacances utiles aujourd’hui, des compétences pour toute la vie.', en: 'Useful holidays today, skills for life.' },
    text: [
      {
        fr: 'A-Z Sarl a organisé à Bamako un camp de vacances consacré au numérique et à l’intelligence artificielle, pour les enfants et adolescents de 9 à 16 ans. Objectif : apprendre, créer, innover et se protéger dans le monde numérique, à travers des ateliers pratiques sur ordinateur.',
        en: 'A-Z Sarl organised a holiday camp in Bamako dedicated to digital skills and artificial intelligence, for children and teenagers aged 9 to 16. The goal: learn, create, innovate and stay safe in the digital world, through hands-on computer workshops.',
      },
    ],
    modules: {
      fr: ['Intelligence artificielle', 'Cybersécurité', 'Internet', 'Design graphique', 'Scratch', 'Vidéo digitale'],
      en: ['Artificial intelligence', 'Cybersecurity', 'Internet', 'Graphic design', 'Scratch', 'Digital video'],
    },
    facts: [
      { k: { fr: 'Organisateur', en: 'Organiser' }, v: { fr: 'A-Z Sarl', en: 'A-Z Sarl' } },
      { k: { fr: 'Dates', en: 'Dates' }, v: { fr: 'À partir du 15 juillet 2026, de 9 h à 13 h', en: 'From 15 July 2026, 9 am to 1 pm' } },
      { k: { fr: 'Lieu', en: 'Location' }, v: { fr: 'Hamdallaye ACI 2000, Bamako', en: 'Hamdallaye ACI 2000, Bamako' } },
      { k: { fr: 'Public', en: 'Participants' }, v: { fr: 'Enfants et adolescents de 9 à 16 ans', en: 'Children and teenagers aged 9 to 16' } },
    ],
    photos: [
      { id: 'camp-groupe-banniere', alt: { fr: 'Les participants du camp réunis autour de la banderole « Camp de vacances Digital & IA »', en: 'Camp participants gathered around the “Digital & AI Holiday Camp” banner' } },
      { id: 'camp-ouverture', alt: { fr: 'Visuel d’ouverture du camp : IA, cybersécurité, internet, design graphique, Scratch et vidéo digitale', en: 'Camp opening visual: AI, cybersecurity, internet, graphic design, Scratch and digital video' } },
      { id: 'camp-trio-ordinateur', alt: { fr: 'Trois participants travaillent ensemble sur un ordinateur portable', en: 'Three participants working together on a laptop' } },
      { id: 'camp-atelier', alt: { fr: 'Atelier en petits groupes autour des ordinateurs', en: 'Small-group workshop around the computers' } },
      { id: 'camp-binome', alt: { fr: 'Deux participants concentrés sur un exercice à l’ordinateur', en: 'Two participants focused on a computer exercise' } },
      { id: 'camp-concentration', alt: { fr: 'Un participant suit un exercice sur son ordinateur', en: 'A participant working through an exercise on a laptop' } },
      { id: 'camp-tablette', alt: { fr: 'Deux participants découvrent un outil numérique', en: 'Two participants discovering a digital tool' } },
      { id: 'camp-salle', alt: { fr: 'La salle du camp pendant un atelier pratique', en: 'The camp room during a hands-on workshop' } },
      { id: 'camp-equipes', alt: { fr: 'Travail en équipes, encadré par l’équipe pédagogique', en: 'Team work supervised by the teaching team' } },
      { id: 'camp-pratique', alt: { fr: 'Séance pratique sur ordinateurs', en: 'Hands-on computer session' } },
      { id: 'camp-groupe', alt: { fr: 'Photo de groupe des participants et de l’équipe du camp', en: 'Group photo of the participants and the camp team' } },
    ],
  },
  {
    id: 'gpec-canam-2026',
    year: '2026',
    services: ['formation'],
    tag: { fr: 'Formation · Ressources humaines', en: 'Training · Human resources' },
    title: { fr: 'Formation en GPEC avec la CANAM', en: 'GPEC training with CANAM' },
    text: [
      {
        fr: 'A-Z Sarl a organisé, en partenariat avec la Caisse Nationale d’Assurance Maladie (CANAM), une formation en gestion prévisionnelle des emplois et des compétences. À l’issue de la session, chaque participant a reçu une attestation de formation.',
        en: 'A-Z Sarl organised, in partnership with Mali’s National Health Insurance Fund (CANAM), a training course on strategic workforce and skills planning (GPEC). At the end of the session, each participant received a training certificate.',
      },
    ],
    partner: 'canam',
    facts: [
      { k: { fr: 'Thème', en: 'Topic' }, v: { fr: 'Gestion prévisionnelle des emplois et des compétences (GPEC)', en: 'Strategic workforce and skills planning (GPEC)' } },
      { k: { fr: 'Partenaire', en: 'Partner' }, v: { fr: 'Caisse Nationale d’Assurance Maladie (CANAM)', en: 'National Health Insurance Fund (CANAM)' } },
      { k: { fr: 'Dates', en: 'Dates' }, v: { fr: 'Du 30 mars au 3 avril 2026', en: '30 March to 3 April 2026' } },
      { k: { fr: 'Lieu', en: 'Location' }, v: { fr: 'Bamako', en: 'Bamako, Mali' } },
      { k: { fr: 'Livrable', en: 'Output' }, v: { fr: 'Attestations de formation', en: 'Training certificates' } },
    ],
    photos: [
      { id: 'formation-gpec-canam', alt: { fr: 'Photo de groupe des participants à la formation en GPEC, avec la banderole de la formation', en: 'Group photo of the GPEC training participants with the training banner' } },
      { id: 'formation-attestation-4', alt: { fr: 'Remise d’une attestation de formation en GPEC', en: 'Presentation of a GPEC training certificate' } },
    ],
  },
  {
    id: 'evaluation-modele-fres-2021',
    year: '2021',
    services: ['etudes', 'sera', 'conseil'],
    tag: { fr: 'Étude & évaluation · Énergie', en: 'Study & evaluation · Energy' },
    title: { fr: 'Analyse rapide de l’environnement propice et évaluation du modèle FRES', en: 'Rapid enabling-environment analysis and evaluation of the FRES model' },
    text: [
      {
        fr: 'Pour la SSD Yeelen Kura-FRES Mali, opérateur d’électrification rurale solaire, l’équipe d’A-Z conduite par M. Mohamed Lamine Kaba a mené une analyse rapide de l’environnement propice et une évaluation du modèle FRES à Koumantou et Béléko. Quatre enquêteurs, formés pour l’occasion, ont conduit des entretiens semi-structurés avec les acteurs clés et des focus groups avec les abonnés des mini-réseaux et des kits solaires.',
        en: 'For SSD Yeelen Kura-FRES Mali, a solar rural electrification operator, the A-Z team led by Mr Mohamed Lamine Kaba carried out a rapid enabling-environment analysis and an evaluation of the FRES model in Koumantou and Béléko. Four trained enumerators conducted semi-structured interviews with key stakeholders and focus groups with mini-grid and solar home system customers.',
      },
      {
        fr: 'Les résultats ont été restitués lors de l’atelier national sur l’augmentation de l’utilisation de l’énergie propre dans les zones rurales au Mali, le 8 juillet 2021 à Bamako, sous la présidence du ministre des Mines, de l’Énergie et de l’Eau, en présence des représentants de l’Union européenne et de l’ambassade des Pays-Bas. L’équipe du consultant a rédigé le rapport de l’atelier.',
        en: 'The findings were presented at the national workshop on increasing the use of clean energy in rural areas of Mali, held on 8 July 2021 in Bamako under the chairmanship of the Minister of Mines, Energy and Water, with representatives of the European Union and the Embassy of the Netherlands in attendance. The consultant’s team wrote the workshop report.',
      },
    ],
    partner: 'fres',
    facts: [
      { k: { fr: 'Commanditaire', en: 'Client' }, v: { fr: 'SSD Yeelen Kura-FRES Mali', en: 'SSD Yeelen Kura-FRES Mali' } },
      { k: { fr: 'Zone d’étude', en: 'Study area' }, v: { fr: 'Koumantou et Béléko', en: 'Koumantou and Béléko' } },
      { k: { fr: 'Méthodes', en: 'Methods' }, v: { fr: 'Entretiens semi-structurés, focus groups', en: 'Semi-structured interviews, focus groups' } },
      { k: { fr: 'Restitution', en: 'Presentation' }, v: { fr: 'Atelier national, 8 juillet 2021, Bamako', en: 'National workshop, 8 July 2021, Bamako' } },
      { k: { fr: 'Livrables', en: 'Outputs' }, v: { fr: 'Analyse et recommandations, rapport d’atelier (août 2021)', en: 'Analysis and recommendations, workshop report (August 2021)' } },
    ],
    link: {
      label: { fr: 'Lire le rapport de l’atelier (PDF, site de FRES)', en: 'Read the workshop report (PDF, FRES website)' },
      url: 'https://fres.nl/app/uploads/2022/01/Rapport-Atelier-Yeelen-Kura-FRES-Mali.pdf',
    },
    photos: [
      { id: 'fres-presentation-1', alt: { fr: 'Restitution des résultats de l’analyse lors de l’atelier national, Bamako, juillet 2021', en: 'Presentation of the analysis findings at the national workshop, Bamako, July 2021' } },
      { id: 'fres-officiels', alt: { fr: 'Officiels et organisateurs réunis lors de l’atelier national sur l’énergie propre en zones rurales', en: 'Officials and organisers at the national workshop on clean energy in rural areas' } },
      { id: 'fres-partenaires', alt: { fr: 'Représentants des partenaires devant la banderole de la SSD Yeelen Kura-FRES Mali', en: 'Partner representatives in front of the SSD Yeelen Kura-FRES Mali banner' } },
      { id: 'fres-presentation-2', alt: { fr: 'Intervention au pupitre pendant la session de présentation', en: 'Speaking at the lectern during the presentation session' } },
      { id: 'fres-intervention', alt: { fr: 'Intervention d’un participant pendant les échanges', en: 'A participant speaking during the discussions' } },
      { id: 'fres-expose', alt: { fr: 'Exposé thématique lors de l’atelier', en: 'Thematic presentation during the workshop' } },
      { id: 'fres-participants', alt: { fr: 'Participants à l’atelier national', en: 'Participants at the national workshop' } },
    ],
  },
  {
    id: 'formation-luxdev',
    year: null,
    services: ['formation'],
    tag: { fr: 'Formation', en: 'Training' },
    title: { fr: 'Formation en partenariat avec LuxDev', en: 'Training in partnership with LuxDev' },
    text: [
      {
        fr: 'Session de formation en salle réalisée en partenariat avec LuxDev, l’Agence luxembourgeoise pour la coopération au développement : présentations projetées, travaux sur ordinateur et échanges entre participants.',
        en: 'Classroom training session delivered in partnership with LuxDev, the Luxembourg Development Cooperation Agency: projected presentations, computer-based work and peer exchange.',
      },
    ],
    partner: 'luxdev',
    photos: [
      { id: 'luxdev-1', alt: { fr: 'Participants à la formation LuxDev à leur poste de travail', en: 'LuxDev training participants at their workstations' } },
      { id: 'luxdev-2', alt: { fr: 'Vue de la salle pendant la formation LuxDev', en: 'View of the room during the LuxDev training' } },
      { id: 'luxdev-3', alt: { fr: 'Participants travaillant sur ordinateur pendant la formation', en: 'Participants working on computers during the training' } },
      { id: 'luxdev-4', alt: { fr: 'Présentation projetée devant les participants', en: 'Projected presentation in front of the participants' } },
      { id: 'luxdev-5', alt: { fr: 'Échanges entre participants pendant la formation', en: 'Participants exchanging during the training' } },
    ],
  },
  {
    id: 'formation-world-renew',
    year: null,
    services: ['formation'],
    tag: { fr: 'Formation', en: 'Training' },
    title: { fr: 'Formation en partenariat avec World Renew', en: 'Training in partnership with World Renew' },
    text: [
      {
        fr: 'Session de formation réalisée en partenariat avec World Renew, ONG internationale de secours et de développement : présentations projetées, travaux sur ordinateur et échanges en plénière.',
        en: 'Training session delivered in partnership with World Renew, an international relief and development NGO: projected presentations, computer-based work and plenary discussion.',
      },
    ],
    partner: 'world-renew',
    photos: [
      { id: 'worldrenew-2', alt: { fr: 'Vue d’ensemble de la salle pendant la formation World Renew', en: 'Overview of the room during the World Renew training' } },
      { id: 'worldrenew-1', alt: { fr: 'Participants à la formation World Renew devant une présentation projetée', en: 'World Renew training participants in front of a projected presentation' } },
      { id: 'worldrenew-3', alt: { fr: 'Une participante travaille sur ordinateur pendant la formation', en: 'A participant working on a laptop during the training' } },
    ],
  },
];
