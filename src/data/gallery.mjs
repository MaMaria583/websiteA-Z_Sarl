// Photos du client (fichier « PRESENTATION DU BUREAU »). Les légendes décrivent ce que montre l'image.
// `credit` : les photos de formation portant le filigrane du photographe MansaPic.

export const galleries = [
  {
    id: 'terrain',
    title: { fr: 'Missions de collecte de données pour les évaluations de projet', en: 'Data collection missions for project evaluations' },
    items: [
      { photo: 'terrain-entretien-meres', alt: { fr: 'Entretien avec des mères et leurs bébés lors d’une collecte de données', en: 'Interview with mothers and their babies during data collection' } },
      { photo: 'terrain-focus-group', tall: true, alt: { fr: 'Discussion de groupe avec des producteurs, sous un hangar', en: 'Group discussion with farmers under a shelter' } },
      { photo: 'terrain-enquete-commerce', tall: true, alt: { fr: 'Enquête auprès d’un commerçant dans une boutique', en: 'Survey with a shopkeeper in a shop' } },
      { photo: 'terrain-enfants', alt: { fr: 'Rencontre avec des enfants et leurs encadrantes dans une salle de classe', en: 'Meeting with children and their caregivers in a classroom' } },
    ],
  },
  {
    id: 'formations',
    title: { fr: 'Nos formations', en: 'Our training sessions' },
    items: [
      { photo: 'formation-gpec-canam', alt: { fr: 'Photo de groupe de la formation en GPEC organisée avec la CANAM, Bamako 2026', en: 'Group photo of the GPEC training organised with CANAM, Bamako 2026' } },
      { photo: 'formation-salle', alt: { fr: 'Session de formation en salle, un formateur devant une projection', en: 'Classroom training session, a trainer in front of a projection' } },
      { photo: 'formation-attestation-4', alt: { fr: 'Remise d’une attestation de formation', en: 'Presentation of a training certificate' } },
      { photo: 'formation-attestation-2', credit: 'MansaPic', alt: { fr: 'Remise d’une attestation de participation', en: 'Presentation of a certificate of participation' } },
      { photo: 'formation-attestation-3', credit: 'MansaPic', alt: { fr: 'Une participante reçoit son attestation de participation', en: 'A participant receives a certificate of participation' } },
      { photo: 'formation-attestation-1', credit: 'MansaPic', alt: { fr: 'Remise d’une attestation à un participant', en: 'Presentation of a certificate to a participant' } },
    ],
  },
];
