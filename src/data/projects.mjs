// Réalisations d'A-Z Sarl (page « Réalisations », accueil, pages pôles, plaquette).
// Sources : dossiers photos du client (02/11/2026), affiche du camp, banderole GPEC, retour final du client
// (intitulés exacts, années, lieux et participants, 02/11/2026), publications de la page LinkedIn d'A-Z Impact
// (camp : 16 séances, jours, lieu, clôture) et, pour FRES, le rapport public « Atelier national
// sur l'augmentation de l'utilisation de l'énergie propre dans les zones rurales au Mali » (août 2021) :
// https://fres.nl/app/uploads/2022/01/Rapport-Atelier-Yeelen-Kura-FRES-Mali.pdf
// `title` : intitulé complet (page Réalisations) ; `short` : version courte (cartes, sommaire, plaquette).
// `photos` : identifiants de src/data/photos.json ; la première sert de visuel principal.
// `zones` : sans photo, la réalisation est illustrée par la carte de ses zones (points de src/data/mali-map.json).
// `missions` : volets d'une même réalisation, dans les termes du client.
// `kind` et `zone` : type de mission et lieu, repris dans la liste des références (src/data/references.mjs).

export const projects = [
  {
    id: 'camp-digital-ia-2026',
    year: '2026',
    services: ['digital', 'formation'],
    kind: 'formation',
    zone: { fr: 'Bamako', en: 'Bamako' },
    tag: { fr: 'Formation · Digital & IA', en: 'Training · Digital & AI' },
    title: { fr: 'Camp de vacances Digital & IA 2026', en: 'Digital & AI Holiday Camp 2026' },
    quote: { fr: 'Des vacances utiles aujourd’hui, des compétences pour toute la vie.', en: 'Useful holidays today, skills for life.' },
    text: [
      {
        fr: 'Pour sa première édition, du 16 juillet au 15 septembre 2026, le camp de vacances Digital & IA organisé par A-Z Sarl a réuni à Bamako 20 enfants et adolescents de 9 à 16 ans. En 16 séances d’ateliers pratiques, ils ont appris à créer, innover et se protéger dans le monde numérique, jusqu’à réaliser un projet numérique en équipe.',
        en: 'For its first edition, from 16 July to 15 September 2026, the Digital & AI holiday camp organised by A-Z Sarl brought together 20 children and teenagers aged 9 to 16 in Bamako. Over 16 hands-on sessions, they learned to create, innovate and stay safe in the digital world, up to building a team digital project.',
      },
      {
        fr: 'La cérémonie de clôture a été marquée par de nombreux témoignages de satisfaction : les participants, comme leurs parents, ont salué la qualité de l’initiative et souhaité la voir se poursuivre.',
        en: 'The closing ceremony was marked by many expressions of satisfaction: participants and their parents alike praised the quality of the initiative and hoped to see it continue.',
      },
    ],
    modules: {
      fr: ['Informatique & internet', 'Intelligence artificielle', 'Scratch & codage créatif', 'Canva & design graphique', 'Photo, vidéo & création de contenu', 'Cybersécurité', 'Projet numérique en équipe'],
      en: ['Computing & internet', 'Artificial intelligence', 'Scratch & creative coding', 'Canva & graphic design', 'Photo, video & content creation', 'Cybersecurity', 'Team digital project'],
    },
    facts: [
      { k: { fr: 'Organisateur', en: 'Organiser' }, v: { fr: 'A-Z Sarl', en: 'A-Z Sarl' } },
      { k: { fr: 'Dates', en: 'Dates' }, v: { fr: 'Du 16 juillet au 15 septembre 2026 : 16 séances, les mardis et jeudis, de 9 h à 13 h', en: '16 July to 15 September 2026: 16 sessions, Tuesdays and Thursdays, 9 am to 1 pm' } },
      { k: { fr: 'Lieu', en: 'Location' }, v: { fr: 'École privée Princes & Princesses, Hamdallaye ACI 2000, Bamako', en: 'Princes & Princesses private school, Hamdallaye ACI 2000, Bamako' } },
      { k: { fr: 'Participants', en: 'Participants' }, v: { fr: '20 enfants et adolescents de 9 à 16 ans', en: '20 children and teenagers aged 9 to 16' } },
      { k: { fr: 'Validation', en: 'Certificate' }, v: { fr: 'Attestation de participation', en: 'Certificate of participation' } },
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
    id: 'evaluation-modele-fres-2021',
    year: '2021',
    services: ['etudes', 'sera', 'conseil'],
    kind: 'etude',
    zone: { fr: 'Koumantou, Béléko et Bamako', en: 'Koumantou, Béléko and Bamako' },
    tag: { fr: 'Étude, évaluation & atelier · Énergie', en: 'Study, evaluation & workshop · Energy' },
    title: { fr: 'Évaluation du modèle économique de FRES et atelier national sur l’énergie propre', en: 'FRES business model evaluation and national clean energy workshop' },
    missions: {
      fr: [
        'Analyse rapide de l’environnement propice à l’utilisation de l’énergie propre et évaluation du modèle économique de FRES',
        'Organisation de l’atelier national, en ligne et en présentiel, sur l’augmentation de l’utilisation de l’énergie propre',
      ],
      en: [
        'Rapid analysis of the enabling environment for clean energy use and evaluation of the FRES business model',
        'Organisation of the national workshop, online and in person, on increasing the use of clean energy',
      ],
    },
    text: [
      {
        fr: 'Pour la SSD Yeelen Kura-FRES Mali, opérateur d’électrification rurale solaire, l’équipe d’A-Z conduite par M. Mohamed Lamine Kaba a mené l’analyse et l’évaluation à Koumantou et Béléko. Quatre enquêteurs, formés pour l’occasion, ont conduit des entretiens semi-structurés avec les acteurs clés et des focus groups avec les abonnés des mini-réseaux et des kits solaires.',
        en: 'For SSD Yeelen Kura-FRES Mali, a solar rural electrification operator, the A-Z team led by Mr Mohamed Lamine Kaba carried out the analysis and evaluation in Koumantou and Béléko. Four trained enumerators conducted semi-structured interviews with key stakeholders and focus groups with mini-grid and solar home system customers.',
      },
      {
        fr: 'A-Z Sarl a ensuite organisé l’atelier national, le 8 juillet 2021 à Bamako, en présentiel et en ligne, avec une traduction simultanée français-anglais pour les partenaires de FRES. Présidé par le ministre des Mines, de l’Énergie et de l’Eau, en présence des représentants de l’Union européenne et de l’ambassade des Pays-Bas, il a permis de restituer les résultats de l’analyse. L’équipe du consultant a rédigé le rapport de l’atelier.',
        en: 'A-Z Sarl then organised the national workshop, held on 8 July 2021 in Bamako both in person and online, with simultaneous French-English interpretation for FRES partners. Chaired by the Minister of Mines, Energy and Water, with representatives of the European Union and the Embassy of the Netherlands in attendance, it presented the findings of the analysis. The consultant’s team wrote the workshop report.',
      },
    ],
    partner: 'fres',
    facts: [
      { k: { fr: 'Commanditaire', en: 'Client' }, v: { fr: 'SSD Yeelen Kura-FRES Mali', en: 'SSD Yeelen Kura-FRES Mali' } },
      { k: { fr: 'Zone d’étude', en: 'Study area' }, v: { fr: 'Koumantou et Béléko', en: 'Koumantou and Béléko' } },
      { k: { fr: 'Méthodes', en: 'Methods' }, v: { fr: 'Entretiens semi-structurés, focus groups', en: 'Semi-structured interviews, focus groups' } },
      { k: { fr: 'Atelier national', en: 'National workshop' }, v: { fr: '8 juillet 2021, Bamako, en présentiel et en ligne', en: '8 July 2021, Bamako, in person and online' } },
      { k: { fr: 'Livrables', en: 'Outputs' }, v: { fr: 'Analyse et recommandations, atelier national et son rapport (août 2021)', en: 'Analysis and recommendations, national workshop and its report (August 2021)' } },
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
    id: 'etude-base-world-renew-2026',
    year: '2026',
    services: ['sera', 'etudes'],
    kind: 'etude',
    zone: { fr: 'Koulikoro, Sikasso et Ségou', en: 'Koulikoro, Sikasso and Ségou' },
    tag: { fr: 'Étude de base · World Renew', en: 'Baseline study · World Renew' },
    title: {
      fr: 'Étude de base sur les connaissances des communautés relatives aux objectifs du projet CRWRF et World Renew Mali, phase 7',
      en: 'Baseline study on community knowledge of the objectives of the CRWRF and World Renew Mali project, phase 7',
    },
    short: { fr: 'Étude de base du projet CRWRF et World Renew Mali, phase 7', en: 'Baseline study for the CRWRF and World Renew Mali project, phase 7' },
    text: [
      {
        fr: 'Pour World Renew Mali, A-Z Sarl a réalisé l’étude de base de la phase 7 du projet CRWRF et World Renew Mali : une mesure des connaissances des communautés relatives aux objectifs du projet, à Koulikoro, Sikasso et Ségou. Elle fixe la situation de départ à partir de laquelle les résultats du projet pourront être suivis et évalués.',
        en: 'For World Renew Mali, A-Z Sarl conducted the baseline study for phase 7 of the CRWRF and World Renew Mali project, measuring community knowledge of the project’s objectives in Koulikoro, Sikasso and Ségou. It sets the starting point against which the project’s results can be monitored and evaluated.',
      },
    ],
    partner: 'world-renew',
    facts: [
      { k: { fr: 'Commanditaire', en: 'Client' }, v: { fr: 'World Renew Mali', en: 'World Renew Mali' } },
      { k: { fr: 'Projet', en: 'Project' }, v: { fr: 'CRWRF et World Renew Mali, phase 7', en: 'CRWRF and World Renew Mali, phase 7' } },
      { k: { fr: 'Zones', en: 'Areas' }, v: { fr: 'Koulikoro, Sikasso et Ségou', en: 'Koulikoro, Sikasso and Ségou' } },
      { k: { fr: 'Année', en: 'Year' }, v: { fr: '2026', en: '2026' } },
    ],
    zones: ['koulikoro', 'sikasso', 'segou'],
    photos: [],
  },
  {
    id: 'gpec-canam-2026',
    year: '2026',
    services: ['formation'],
    kind: 'formation',
    zone: { fr: 'Bamako', en: 'Bamako' },
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
    id: 'formation-luxdev',
    year: '2025',
    services: ['formation', 'conseil', 'sera'],
    kind: 'formation',
    zone: { fr: 'Bamako', en: 'Bamako' },
    tag: { fr: 'Formation · LuxDev', en: 'Training · LuxDev' },
    title: { fr: 'Renforcement de compétences du personnel des centres de formation professionnelle partenaires', en: 'Capacity building for staff of partner vocational training centres' },
    short: { fr: 'Renforcement de compétences des centres de formation professionnelle', en: 'Capacity building for vocational training centres' },
    text: [
      {
        fr: 'Formation réalisée avec LuxDev, l’Agence luxembourgeoise pour la coopération au développement, pour renforcer les compétences du personnel des centres de formation professionnelle partenaires, avec des travaux pratiques sur ordinateur et des échanges entre participants.',
        en: 'Training delivered with LuxDev, the Luxembourg Development Cooperation Agency, to build the skills of staff from partner vocational training centres, with hands-on computer work and peer exchange.',
      },
    ],
    modulesLabel: { fr: 'Thèmes', en: 'Topics' },
    modules: {
      fr: ['Planification', 'Gestion axée sur les résultats', 'Suivi-évaluation', 'Thèmes transversaux'],
      en: ['Planning', 'Results-based management', 'Monitoring and evaluation', 'Cross-cutting themes'],
    },
    facts: [
      { k: { fr: 'Public', en: 'Participants' }, v: { fr: 'Personnel des centres de formation professionnelle partenaires', en: 'Staff of partner vocational training centres' } },
      { k: { fr: 'Lieu', en: 'Location' }, v: { fr: 'Bamako', en: 'Bamako' } },
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
    year: '2026',
    services: ['formation', 'sera', 'digital'],
    kind: 'formation',
    zone: { fr: 'Bamako', en: 'Bamako' },
    tag: { fr: 'Formation · World Renew', en: 'Training · World Renew' },
    title: {
      fr: 'Formation de l’équipe de World Renew et de ses partenaires sur la collecte mobile des données dans des zones d’accès limité',
      en: 'Training for World Renew staff and partners on mobile data collection in limited-access areas',
    },
    short: { fr: 'Collecte mobile des données dans des zones d’accès limité', en: 'Mobile data collection in limited-access areas' },
    text: [
      {
        fr: 'Formation de l’équipe de World Renew Mali et de ses partenaires à la collecte de données sur appareils mobiles, pour enquêter dans des zones d’accès limité : prise en main des questionnaires (identification des répondants, localisation par région, cercle et village), exercices pratiques et échanges en plénière.',
        en: 'Training for World Renew Mali staff and partners on collecting data with mobile devices to survey limited-access areas: working with the questionnaires (respondent identification, location by region, district and village), hands-on exercises and plenary discussion.',
      },
    ],
    facts: [
      { k: { fr: 'Public', en: 'Participants' }, v: { fr: 'Équipe de World Renew et partenaires', en: 'World Renew staff and partners' } },
      { k: { fr: 'Lieu', en: 'Location' }, v: { fr: 'Bamako', en: 'Bamako' } },
    ],
    partner: 'world-renew',
    photos: [
      { id: 'worldrenew-2', alt: { fr: 'Vue d’ensemble de la salle pendant la formation World Renew', en: 'Overview of the room during the World Renew training' } },
      { id: 'worldrenew-1', alt: { fr: 'Participants à la formation World Renew devant une présentation projetée', en: 'World Renew training participants in front of a projected presentation' } },
      { id: 'worldrenew-3', alt: { fr: 'Une participante travaille sur ordinateur pendant la formation', en: 'A participant working on a laptop during the training' } },
    ],
  },
];
