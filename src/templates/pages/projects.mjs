// Page « Réalisations » : cas GPEC + galeries photos
import { icon } from '../icons.mjs';
import { pageHero, picture, largest, partnerLogo, sectionHead, contactBand, esc } from '../components.mjs';

const copy = {
  fr: {
    title: 'Réalisations',
    description: 'Réalisations d’A-Z Sarl : formation en GPEC avec la CANAM (Bamako, 2026), missions de collecte de données pour des évaluations de projet et sessions de formation.',
    eyebrow: 'Réalisations',
    h1: 'Sur le terrain <span class="accent">et en salle de formation.</span>',
    lead: 'Collecte de données pour les évaluations de projet, formations pratiques, ateliers : quelques images de nos missions.',
    caseEyebrow: 'Réalisation à la une',
    caseTitle: 'Formation en GPEC : gestion prévisionnelle des emplois et des compétences',
    caseText: 'A-Z Sarl a organisé, en partenariat avec la Caisse Nationale d’Assurance Maladie (CANAM), une formation en gestion prévisionnelle des emplois et des compétences. À l’issue de la session, chaque participant a reçu une attestation de formation.',
    facts: { theme: 'Thème', partner: 'Partenaire', dates: 'Dates', place: 'Lieu', output: 'Livrable' },
    factValues: { theme: 'Gestion prévisionnelle des emplois et des compétences (GPEC)', dates: 'Du 30 mars au 3 avril 2026', place: 'Bamako', output: 'Attestations de formation' },
    galleryNote: 'Cliquez sur une photo pour l’agrandir.',
    credit: 'Photos de remise d’attestations : MansaPic.',
    moreTitle: 'Votre projet sera <span class="accent">notre prochaine réalisation.</span>',
  },
  en: {
    title: 'Projects',
    description: 'A-Z Sarl projects: GPEC training with CANAM (Bamako, 2026), data collection missions for project evaluations and training sessions.',
    eyebrow: 'Projects',
    h1: 'In the field <span class="accent">and in the training room.</span>',
    lead: 'Data collection for project evaluations, practical training, workshops: a glimpse of our missions.',
    caseEyebrow: 'Featured project',
    caseTitle: 'GPEC training: strategic workforce and skills planning',
    caseText: 'A-Z Sarl organised, in partnership with Mali’s National Health Insurance Fund (CANAM), a training course on strategic workforce and skills planning (GPEC). At the end of the session, each participant received a training certificate.',
    facts: { theme: 'Topic', partner: 'Partner', dates: 'Dates', place: 'Location', output: 'Output' },
    factValues: { theme: 'Strategic workforce and skills planning (GPEC)', dates: '30 March to 3 April 2026', place: 'Bamako, Mali', output: 'Training certificates' },
    galleryNote: 'Click a photo to enlarge it.',
    credit: 'Certificate ceremony photos: MansaPic.',
    moreTitle: 'Your project could be <span class="accent">our next success story.</span>',
  },
};

export default function projects(ctx) {
  const c = copy[ctx.lang];
  const canam = ctx.partners.find((p) => p.id === 'canam');
  const gallery = (g) => `
<section class="section${g.id === 'formations' ? ' section--white' : ''}" aria-labelledby="g-${g.id}">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: g.id === 'terrain' ? (ctx.lang === 'en' ? 'Field missions' : 'Missions de terrain') : (ctx.lang === 'en' ? 'Training' : 'Formations'), title: ctx.L(g.title), lead: c.galleryNote, id: `g-${g.id}` })}
    <div class="gallery${g.items.length % 3 === 0 ? ' gallery--3' : ''}">
      ${g.items.map((it, i) => {
        const alt = ctx.L(it.alt);
        return `<figure class="figure-plain" data-reveal style="--d:${(i % 4) * 0.06}s">
        <a class="gallery__item${it.tall ? ' gallery__item--tall' : ''}" href="${largest(ctx, it.photo)}" data-lightbox="${g.id}" data-caption="${esc(alt)}">
          ${picture(ctx, it.photo, { alt, sizes: '(min-width: 900px) 33vw, 50vw' })}
          <span class="gallery__zoom" aria-hidden="true">${icon('zoom')}</span>
        </a>
        <figcaption class="gallery__cap">${alt}</figcaption>
      </figure>`;
      }).join('')}
    </div>
    ${g.id === 'formations' ? `<p class="credit" style="margin-top:20px">${c.credit}</p>` : ''}
  </div>
</section>`;

  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }] })}

<section class="section" aria-labelledby="case-title">
  <div class="container case">
    <div class="case__media" data-reveal>${picture(ctx, 'formation-gpec-canam', { alt: ctx.lang === 'en' ? 'Group photo of the GPEC training participants with the training banner' : 'Photo de groupe des participants à la formation en GPEC, avec la banderole de la formation', sizes: '(min-width: 980px) 700px, 100vw', priority: true })}</div>
    <div data-reveal style="--d:.1s">
      <p class="eyebrow">${c.caseEyebrow}</p>
      <h2 class="h2" id="case-title" style="font-size:clamp(1.7rem,1.3rem + 1.4vw,2.5rem)">${c.caseTitle}</h2>
      <p style="margin-top:18px">${c.caseText}</p>
      <dl class="facts">
        <div><dt>${c.facts.theme}</dt><dd>${c.factValues.theme}</dd></div>
        <div><dt>${c.facts.partner}</dt><dd style="display:flex;align-items:center;gap:12px">${partnerLogo(ctx, canam)}<span>CANAM</span></dd></div>
        <div><dt>${c.facts.dates}</dt><dd>${c.factValues.dates}</dd></div>
        <div><dt>${c.facts.place}</dt><dd>${c.factValues.place}</dd></div>
        <div><dt>${c.facts.output}</dt><dd>${c.factValues.output}</dd></div>
      </dl>
    </div>
  </div>
</section>

${ctx.galleries.map(gallery).join('')}

${contactBand(ctx, { title: c.moreTitle })}
`;
  return { title: c.title, description: c.description, body };
}
