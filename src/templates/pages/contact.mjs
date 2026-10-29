// Page « Contact »
import { icon } from '../icons.mjs';
import { pageHero, esc } from '../components.mjs';

const copy = {
  fr: {
    title: 'Contact',
    description: 'Contactez A-Z Sarl, Hamdallaye ACI 2000, Bamako : +223 79 27 73 60, prestations.az@gmail.com. Demande de proposition, formation, partenariat.',
    eyebrow: 'Contact',
    h1: 'Parlons de <span class="accent">votre projet.</span>',
    lead: 'Termes de référence, appel d’offres, besoin de formation ou de partenariat : écrivez-nous ou appelez-nous, nous revenons vers vous rapidement.',
    office: 'Siège social',
    phones: 'Téléphones',
    mail: 'E-mail',
    director: 'Direction technique',
    wa: 'Écrire sur WhatsApp',
    formTitle: 'Envoyez-nous un message',
    f: {
      name: 'Prénom et nom', org: 'Organisation', email: 'E-mail', phone: 'Téléphone',
      subject: 'Objet de votre demande', choose: 'Choisir…',
      subjects: ['Demande de proposition / appel d’offres', 'Suivi-évaluation', 'Étude socio-économique', 'Transformation digitale', 'Formation', 'Partenariat', 'Autre'],
      msg: 'Votre message', msgHint: 'Contexte, objectifs, délais, lieu d’intervention…',
      file: 'Pièce jointe (facultatif)', fileTitle: 'Ajoutez vos termes de référence', fileHint: 'PDF ou Word, 5 Mo maximum',
      submit: 'Envoyer le message', subjectMail: 'Nouveau message — site A-Z Sarl',
    },
    mapTitle: 'Hamdallaye ACI 2000, Bamako',
    route: 'Ouvrir l’itinéraire',
    expertNote: 'Vous êtes consultant ou expert ?',
    expertLink: 'Déposez votre CV',
  },
  en: {
    title: 'Contact',
    description: 'Contact A-Z Sarl, Hamdallaye ACI 2000, Bamako, Mali: +223 79 27 73 60, prestations.az@gmail.com. Requests for proposals, training, partnerships.',
    eyebrow: 'Contact',
    h1: 'Let’s talk about <span class="accent">your project.</span>',
    lead: 'Terms of reference, a tender, a training or partnership need: write to us or call us and we will get back to you promptly.',
    office: 'Head office',
    phones: 'Phone',
    mail: 'Email',
    director: 'Technical management',
    wa: 'Message us on WhatsApp',
    formTitle: 'Send us a message',
    f: {
      name: 'Full name', org: 'Organisation', email: 'Email', phone: 'Phone',
      subject: 'Subject of your request', choose: 'Choose…',
      subjects: ['Request for proposal / tender', 'Monitoring & evaluation', 'Socio-economic study', 'Digital transformation', 'Training', 'Partnership', 'Other'],
      msg: 'Your message', msgHint: 'Context, objectives, timeline, location…',
      file: 'Attachment (optional)', fileTitle: 'Attach your terms of reference', fileHint: 'PDF or Word, 5 MB maximum',
      submit: 'Send message', subjectMail: 'New message — A-Z Sarl website (EN)',
    },
    mapTitle: 'Hamdallaye ACI 2000, Bamako',
    route: 'Get directions',
    expertNote: 'Are you a consultant or an expert?',
    expertLink: 'Submit your CV',
  },
};

export default function contact(ctx) {
  const c = copy[ctx.lang];
  const f = c.f;
  const { site } = ctx;
  const { lat, lon } = site.address.geo;
  const bbox = [lon - 0.012, lat - 0.007, lon + 0.012, lat + 0.007].map((n) => n.toFixed(5)).join('%2C');
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&amp;layer=mapnik&amp;marker=${lat}%2C${lon}`;
  const route = `https://www.openstreetmap.org/?mlat=${lat}&amp;mlon=${lon}#map=16/${lat}/${lon}`;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(ctx.t.whatsappMsg)}`;
  const req = `<span class="req" aria-hidden="true">*</span><span class="sr-only"> (${ctx.t.required})</span>`;
  const err = (id) => `<p class="field__error" id="${id}-err" aria-live="polite"></p>`;

  const body = `
${pageHero(ctx, { eyebrow: c.eyebrow, title: c.h1, lead: c.lead, crumbs: [{ label: c.title }] })}

<section class="section" aria-labelledby="form-title">
  <div class="container contact-grid">
    <div class="info-cards" data-reveal>
      <div class="info-card"><span class="info-card__icon">${icon('pin')}</span><div><h2>${c.office}</h2><p>${site.address.street}<br>${site.address.city}, ${site.address.country}</p></div></div>
      <div class="info-card"><span class="info-card__icon">${icon('phone')}</span><div><h2>${c.phones}</h2>${site.phones.map((p) => `<a href="tel:${p.tel}" style="display:block">${p.display}</a>`).join('')}</div></div>
      <div class="info-card"><span class="info-card__icon">${icon('mail')}</span><div><h2>${c.mail}</h2><a href="mailto:${site.email}">${site.email}</a></div></div>
      <div class="info-card"><span class="info-card__icon">${icon('user')}</span><div><h2>${c.director}</h2><p>${site.director.name}<br><span class="muted">${ctx.L(site.director.role)}</span></p><a href="mailto:${site.director.email}">${site.director.email}</a></div></div>
      <a class="btn btn--whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer" style="justify-self:start">${icon('whatsapp')} ${c.wa}</a>
      <p class="muted" style="font-size:.92rem">${c.expertNote} <a class="link-arrow" href="${ctx.href('join')}">${c.expertLink} ${icon('arrow')}</a></p>
    </div>

    <div data-reveal style="--d:.1s">
      <form class="form-card" action="${site.formEndpoint}" method="POST" enctype="multipart/form-data" data-form novalidate>
        <h2 class="h3" id="form-title" style="margin-bottom:24px">${c.formTitle}</h2>
        <input type="hidden" name="_subject" value="${esc(f.subjectMail)}">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_next" value="" data-page="${ctx.href('thanks')}">
        <input type="hidden" name="Formulaire" value="Contact (${ctx.lang.toUpperCase()})">
        <div class="honey" aria-hidden="true"><label>Ne pas remplir <input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>
        <div class="form-grid">
          <div class="field"><label for="c-name">${f.name} ${req}</label><input class="input" id="c-name" name="Nom complet" type="text" autocomplete="name" required aria-describedby="c-name-err">${err('c-name')}</div>
          <div class="field"><label for="c-org">${f.org}</label><input class="input" id="c-org" name="Organisation" type="text" autocomplete="organization"></div>
          <div class="field"><label for="c-email">${f.email} ${req}</label><input class="input" id="c-email" name="email" type="email" autocomplete="email" required aria-describedby="c-email-err">${err('c-email')}</div>
          <div class="field"><label for="c-phone">${f.phone}</label><input class="input" id="c-phone" name="Téléphone" type="tel" autocomplete="tel" placeholder="+223 …"></div>
          <div class="field field--full"><label for="c-subject">${f.subject} ${req}</label><select class="select" id="c-subject" name="Objet" required aria-describedby="c-subject-err"><option value="">${f.choose}</option>${f.subjects.map((s) => `<option>${s}</option>`).join('')}</select>${err('c-subject')}</div>
          <div class="field field--full"><label for="c-msg">${f.msg} ${req}</label><textarea class="textarea" id="c-msg" name="Message" required placeholder="${esc(f.msgHint)}" aria-describedby="c-msg-err"></textarea>${err('c-msg')}</div>
          <div class="field field--full">
            <span id="c-file-label" style="color:var(--navy-800);font-size:.92rem;font-weight:750">${f.file}</span>
            <div class="dropzone">
              <input id="c-file" name="attachment" type="file" accept=".pdf,.doc,.docx,.odt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" aria-labelledby="c-file-label" aria-describedby="c-file-hint c-file-err">
              <div class="dropzone__ui">${icon('upload')}<p class="dropzone__title">${f.fileTitle}</p><p class="hint" id="c-file-hint">${f.fileHint}</p><p class="dropzone__name" aria-live="polite"></p></div>
            </div>
            ${err('c-file')}
          </div>
          <div class="field field--full"><label class="consent"><input type="checkbox" name="Consentement" value="oui" required aria-describedby="c-consent-err"><span>${ctx.t.privacyConsent} <a href="${ctx.href('legal')}#donnees">${ctx.t.privacyLink}</a>. ${req}</span></label>${err('c-consent')}</div>
        </div>
        <div class="form-foot">
          <p class="muted">${ctx.t.formNote}</p>
          <button class="btn" type="submit">${f.submit} ${icon('arrow', 'icon--arrow')}</button>
        </div>
      </form>
    </div>
  </div>
</section>

<section class="section section--tight" aria-label="${c.mapTitle}" style="padding-top:0">
  <div class="container">
    <div class="map-embed">
      <iframe title="${ctx.lang === 'en' ? 'Map: Hamdallaye ACI 2000, Bamako' : 'Plan : Hamdallaye ACI 2000, Bamako'}" src="${osm}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div class="map-embed__card">
        <strong>${site.name}</strong>
        <span>${c.mapTitle}</span>
        <a class="link-arrow" href="${route}" target="_blank" rel="noopener noreferrer">${c.route} ${icon('external')}</a>
      </div>
    </div>
  </div>
</section>
`;
  return { title: c.title, description: c.description, body };
}
