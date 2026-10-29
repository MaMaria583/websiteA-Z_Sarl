// Page « Banque d'experts » : dépôt de CV
import { icon } from '../icons.mjs';
import { pageHero, sectionHead, esc } from '../components.mjs';

const copy = {
  fr: {
    title: 'Banque d’experts',
    description: 'Consultants, experts, formateurs et praticiens d’entreprise : déposez votre CV dans la banque d’experts d’A-Z Sarl pour être mobilisé sur nos mandats au Mali.',
    eyebrow: 'Banque d’experts',
    h1: 'Rejoignez notre <span class="accent">réseau d’experts.</span>',
    lead: 'A-Z Sarl dispose d’une large banque de CV d’experts, présentés selon leur expertise lors des appels d’offres. À tout moment, nous faisons appel à des consultants, experts, formateurs et praticiens d’entreprise pour composer nos équipes d’intervention.',
    profilesEyebrow: 'Profils recherchés',
    profilesTitle: 'Quatre familles de profils, <span class="accent">13 domaines.</span>',
    profiles: [
      { icon: 'briefcase', title: 'Consultants', text: 'Conduite de missions d’études, d’évaluation et d’appui-conseil.' },
      { icon: 'target', title: 'Experts sectoriels', text: 'Santé, éducation, gouvernance, environnement, monde rural et autres domaines.' },
      { icon: 'formation', title: 'Formateurs', text: 'Conception et animation de formations pratiques pour adultes.' },
      { icon: 'building', title: 'Praticiens d’entreprise', text: 'Professionnels qui transmettent une expérience opérationnelle concrète.' },
    ],
    howEyebrow: 'Comment ça marche',
    howTitle: 'Trois étapes <span class="accent">vers une mission.</span>',
    how: [
      { title: 'Vous déposez votre CV', text: 'Avec votre domaine principal et vos années d’expérience.' },
      { title: 'Nous qualifions votre profil', text: 'Votre CV rejoint notre banque d’experts, classé par domaine.' },
      { title: 'Nous vous mobilisons', text: 'Dès qu’un appel d’offres correspond à votre expertise, nous vous contactons.' },
    ],
    formEyebrow: 'Dépôt de CV',
    formTitle: 'Déposez votre CV',
    whyTitle: 'Pourquoi rejoindre A-Z Sarl ?',
    why: [
      'Être proposé sur des mandats qui correspondent à votre expertise.',
      'Intervenir aux côtés de partenaires nationaux et internationaux.',
      'Contribuer à des projets de développement au Mali.',
    ],
    f: {
      name: 'Prénom et nom', email: 'E-mail', phone: 'Téléphone / WhatsApp', city: 'Ville et pays de résidence',
      domain: 'Domaine d’expertise principal', choose: 'Choisir…', other: 'Autre domaine',
      exp: 'Années d’expérience', expOpts: ['Moins de 5 ans', '5 à 10 ans', '10 à 15 ans', 'Plus de 15 ans'],
      profile: 'Profil principal', profileOpts: ['Consultance', 'Expertise sectorielle', 'Formation', 'Pratique d’entreprise'],
      langs: 'Langues de travail', langsHint: 'Exemple : français, anglais, bambara',
      linkedin: 'Profil LinkedIn (facultatif)',
      cv: 'Votre CV', cvTitle: 'Glissez votre CV ici ou cliquez pour choisir un fichier', cvHint: 'PDF ou Word, 5 Mo maximum',
      msg: 'Message (facultatif)', msgHint: 'Disponibilités, références récentes…',
      submit: 'Envoyer ma candidature', subject: 'Nouveau CV — banque d’experts A-Z Sarl',
    },
  },
  en: {
    title: 'Expert pool',
    description: 'Consultants, experts, trainers and business practitioners: submit your CV to the A-Z Sarl expert pool to be mobilised on our assignments in Mali.',
    eyebrow: 'Expert pool',
    h1: 'Join our <span class="accent">network of experts.</span>',
    lead: 'A-Z Sarl maintains a large pool of expert CVs, proposed according to their expertise in response to tenders. We regularly call on consultants, experts, trainers and business practitioners to build our delivery teams.',
    profilesEyebrow: 'Profiles we look for',
    profilesTitle: 'Four types of profiles, <span class="accent">13 sectors.</span>',
    profiles: [
      { icon: 'briefcase', title: 'Consultants', text: 'Leading studies, evaluations and advisory assignments.' },
      { icon: 'target', title: 'Sector experts', text: 'Health, education, governance, environment, rural development and more.' },
      { icon: 'formation', title: 'Trainers', text: 'Designing and delivering practical adult training.' },
      { icon: 'building', title: 'Business practitioners', text: 'Professionals who share hands-on operational experience.' },
    ],
    howEyebrow: 'How it works',
    howTitle: 'Three steps <span class="accent">to an assignment.</span>',
    how: [
      { title: 'You submit your CV', text: 'With your main field and years of experience.' },
      { title: 'We review your profile', text: 'Your CV joins our expert pool, filed by sector.' },
      { title: 'We mobilise you', text: 'As soon as a tender matches your expertise, we get in touch.' },
    ],
    formEyebrow: 'CV submission',
    formTitle: 'Submit your CV',
    whyTitle: 'Why join A-Z Sarl?',
    why: [
      'Be put forward for assignments that match your expertise.',
      'Work alongside national and international partners.',
      'Contribute to development projects in Mali.',
    ],
    f: {
      name: 'Full name', email: 'Email', phone: 'Phone / WhatsApp', city: 'City and country of residence',
      domain: 'Main field of expertise', choose: 'Choose…', other: 'Other field',
      exp: 'Years of experience', expOpts: ['Less than 5 years', '5 to 10 years', '10 to 15 years', 'More than 15 years'],
      profile: 'Main profile', profileOpts: ['Consulting', 'Sector expertise', 'Training', 'Business practice'],
      langs: 'Working languages', langsHint: 'For example: French, English, Bambara',
      linkedin: 'LinkedIn profile (optional)',
      cv: 'Your CV', cvTitle: 'Drop your CV here or click to choose a file', cvHint: 'PDF or Word, 5 MB maximum',
      msg: 'Message (optional)', msgHint: 'Availability, recent references…',
      submit: 'Submit my application', subject: 'New CV — A-Z Sarl expert pool (EN)',
    },
  },
};

export default function join(ctx) {
  const c = copy[ctx.lang];
  const f = c.f;
  const req = `<span class="req" aria-hidden="true">*</span><span class="sr-only"> (${ctx.t.required})</span>`;
  const err = (id) => `<p class="field__error" id="${id}-err" aria-live="polite"></p>`;
  const sectorOpts = ctx.sectors.map((s) => `<option>${esc(ctx.L(s.title))}</option>`).join('');
  const form = `
<form class="form-card" action="${ctx.site.formEndpoint}" method="POST" enctype="multipart/form-data" data-form novalidate>
  <input type="hidden" name="_subject" value="${esc(f.subject)}">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_next" value="" data-page="${ctx.href('thanks')}">
  <input type="hidden" name="Formulaire" value="Banque d’experts (${ctx.lang.toUpperCase()})">
  <div class="honey" aria-hidden="true"><label>Ne pas remplir <input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>
  <div class="form-grid">
    <div class="field"><label for="j-name">${f.name} ${req}</label><input class="input" id="j-name" name="Nom complet" type="text" autocomplete="name" required aria-describedby="j-name-err">${err('j-name')}</div>
    <div class="field"><label for="j-email">${f.email} ${req}</label><input class="input" id="j-email" name="email" type="email" autocomplete="email" required aria-describedby="j-email-err">${err('j-email')}</div>
    <div class="field"><label for="j-phone">${f.phone} ${req}</label><input class="input" id="j-phone" name="Téléphone" type="tel" autocomplete="tel" required aria-describedby="j-phone-err" placeholder="+223 …">${err('j-phone')}</div>
    <div class="field"><label for="j-city">${f.city}</label><input class="input" id="j-city" name="Ville et pays" type="text" autocomplete="address-level2"></div>
    <div class="field"><label for="j-domain">${f.domain} ${req}</label><select class="select" id="j-domain" name="Domaine principal" required aria-describedby="j-domain-err"><option value="">${f.choose}</option>${sectorOpts}<option>${f.other}</option></select>${err('j-domain')}</div>
    <div class="field"><label for="j-exp">${f.exp} ${req}</label><select class="select" id="j-exp" name="Expérience" required aria-describedby="j-exp-err"><option value="">${f.choose}</option>${f.expOpts.map((o) => `<option>${o}</option>`).join('')}</select>${err('j-exp')}</div>
    <fieldset class="field field--full checks"><legend>${f.profile}</legend>${f.profileOpts.map((o, i) => `<label class="check-pill"><input type="radio" name="Profil" value="${esc(o)}"${i === 0 ? ' checked' : ''}><span>${o}</span></label>`).join('')}</fieldset>
    <div class="field"><label for="j-langs">${f.langs}</label><input class="input" id="j-langs" name="Langues" type="text" placeholder="${esc(f.langsHint)}"></div>
    <div class="field"><label for="j-linkedin">${f.linkedin}</label><input class="input" id="j-linkedin" name="LinkedIn" type="url" inputmode="url" placeholder="https://www.linkedin.com/in/…"></div>
    <div class="field field--full">
      <span class="field__label" id="j-cv-label" style="color:var(--navy-800);font-size:.92rem;font-weight:750">${f.cv} ${req}</span>
      <div class="dropzone">
        <input id="j-cv" name="attachment" type="file" accept=".pdf,.doc,.docx,.odt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required aria-labelledby="j-cv-label" aria-describedby="j-cv-hint j-cv-err">
        <div class="dropzone__ui">${icon('upload')}<p class="dropzone__title">${f.cvTitle}</p><p class="hint" id="j-cv-hint">${f.cvHint}</p><p class="dropzone__name" aria-live="polite"></p></div>
      </div>
      ${err('j-cv')}
    </div>
    <div class="field field--full"><label for="j-msg">${f.msg}</label><textarea class="textarea" id="j-msg" name="Message" placeholder="${esc(f.msgHint)}"></textarea></div>
    <div class="field field--full"><label class="consent"><input type="checkbox" name="Consentement" value="oui" required aria-describedby="j-consent-err"><span>${ctx.t.privacyConsent} <a href="${ctx.href('legal')}#donnees">${ctx.t.privacyLink}</a>. ${req}</span></label>${err('j-consent')}</div>
  </div>
  <div class="form-foot">
    <p class="muted">${ctx.t.formNote}</p>
    <button class="btn" type="submit">${f.submit} ${icon('arrow', 'icon--arrow')}</button>
  </div>
</form>`;

  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }], aside: `<span class="badge-big" aria-hidden="true">${icon('network')}</span>` })}

<section class="section" aria-labelledby="profiles-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.profilesEyebrow, title: c.profilesTitle, id: 'profiles-title' })}
    <div class="profiles">${c.profiles.map((p, i) => `<div class="profile" data-reveal style="--d:${i * 0.07}s"><span class="service-card__icon">${icon(p.icon)}</span><h3 class="h4">${p.title}</h3><p>${p.text}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section section--white" aria-labelledby="how-title">
  <div class="container">
    ${sectionHead(ctx, { eyebrow: c.howEyebrow, title: c.howTitle, id: 'how-title' })}
    <ol class="model">${c.how.map((m, i) => `<li data-reveal style="--d:${i * 0.08}s"><h3 class="h3">${m.title}</h3><p>${m.text}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section pattern" id="formulaire" aria-labelledby="form-title">
  <div class="container join-grid">
    <div data-reveal>
      <p class="eyebrow">${c.formEyebrow}</p>
      <h2 class="h2" id="form-title">${c.formTitle}</h2>
      <h3 class="h4" style="margin-top:32px">${c.whyTitle}</h3>
      <ul class="why">${c.why.map((w) => `<li>${icon('check')}<span>${w}</span></li>`).join('')}</ul>
      <p class="muted" style="margin-top:28px;font-size:.92rem">${ctx.lang === 'en' ? 'Problem with the form? Email your CV to' : 'Un souci avec le formulaire ? Envoyez votre CV à'} <a href="mailto:${ctx.site.email}">${ctx.site.email}</a>.</p>
    </div>
    <div data-reveal style="--d:.1s">${form}</div>
  </div>
</section>
`;
  return { title: c.title, description: c.description, body };
}
