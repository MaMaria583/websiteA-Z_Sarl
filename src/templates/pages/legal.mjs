// Mentions légales et politique de confidentialité
import { pageHero } from '../components.mjs';

export default function legal(ctx) {
  const fr = ctx.lang === 'fr';
  const { site } = ctx;
  const v = (val) => val || `<span class="todo">${fr ? 'à compléter' : 'to be completed'}</span>`;
  const title = fr ? 'Mentions légales & confidentialité' : 'Legal notice & privacy';

  const content = fr ? `
<h2>Éditeur du site</h2>
<p><strong>${site.name}</strong>, société à responsabilité limitée (SARL).<br>
Siège social : ${site.address.street}, ${site.address.city}, ${site.address.country}.<br>
Téléphone : ${site.phones.map((p) => p.display).join(' / ')} · E-mail : <a href="mailto:${site.email}">${site.email}</a><br>
RCCM : ${v(site.legal.rccm)} · NIF : ${v(site.legal.nif)} · Capital social : ${v(site.legal.capital)}</p>
<p>Directeur de la publication : ${v(site.legal.publisher)}</p>

<h2>Hébergement</h2>
<p>${v(site.legal.host)}</p>

<h2>Propriété intellectuelle</h2>
<p>L’ensemble des contenus de ce site (textes, logo, illustrations, photographies) est la propriété d’${site.name}, sauf mention contraire. Toute reproduction sans autorisation écrite est interdite.</p>
<p>Les logos des partenaires appartiennent à leurs titulaires respectifs. Photographies des remises d’attestations : MansaPic. Fond de carte : Natural Earth (domaine public) et OpenStreetMap.</p>

<h2>Liens vers d’autres sites</h2>
<p>Les liens vers les sites de nos partenaires s’ouvrent dans un nouvel onglet. ${site.name} n’est pas responsable du contenu de ces sites.</p>

<h2 id="donnees">Protection des données personnelles</h2>
<p>Les informations transmises par les formulaires du site (contact et dépôt de CV) sont utilisées uniquement pour répondre à votre demande et, pour les CV, pour vous proposer des missions correspondant à votre profil. Elles ne sont ni vendues ni cédées à des tiers.</p>
<ul>
  <li><strong>Responsable du traitement :</strong> ${site.name}, ${site.address.street}, ${site.address.city}.</li>
  <li><strong>Transmission :</strong> les messages sont acheminés par le service FormSubmit jusqu’à la boîte ${site.email}.</li>
  <li><strong>Durée de conservation :</strong> les messages sont conservés le temps du traitement de la demande ; les CV, deux ans au plus, sauf demande de suppression.</li>
  <li><strong>Vos droits :</strong> vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à <a href="mailto:${site.email}">${site.email}</a>.</li>
</ul>
<p>Ce traitement s’inscrit dans le cadre de la loi n° 2013-015 du 21 mai 2013 portant protection des données à caractère personnel en République du Mali.</p>

<h2>Cookies et mesure d’audience</h2>
<p>Ce site n’utilise aucun cookie publicitaire ni de suivi. La mesure d’audience éventuelle est réalisée sans cookie et de façon anonyme.</p>

<h2>Crédits</h2>
<p>Conception et développement du site : site sur mesure, statique et sans base de données.</p>
` : `
<h2>Publisher</h2>
<p><strong>${site.name}</strong>, limited liability company (SARL) under Malian law.<br>
Head office: ${site.address.street}, ${site.address.city}, ${site.address.country}.<br>
Phone: ${site.phones.map((p) => p.display).join(' / ')} · Email: <a href="mailto:${site.email}">${site.email}</a><br>
Trade register (RCCM): ${v(site.legal.rccm)} · Tax ID (NIF): ${v(site.legal.nif)} · Share capital: ${v(site.legal.capital)}</p>
<p>Publication director: ${v(site.legal.publisher)}</p>

<h2>Hosting</h2>
<p>${v(site.legal.host)}</p>

<h2>Intellectual property</h2>
<p>All content on this website (text, logo, illustrations, photographs) is the property of ${site.name} unless otherwise stated. Reproduction without written permission is prohibited.</p>
<p>Partner logos belong to their respective owners. Certificate ceremony photographs: MansaPic. Base map: Natural Earth (public domain) and OpenStreetMap.</p>

<h2>Links to other websites</h2>
<p>Links to our partners’ websites open in a new tab. ${site.name} is not responsible for the content of those websites.</p>

<h2 id="donnees">Personal data protection</h2>
<p>Information sent through the website forms (contact and CV submission) is used only to answer your request and, for CVs, to offer you assignments that match your profile. It is never sold or passed on to third parties.</p>
<ul>
  <li><strong>Data controller:</strong> ${site.name}, ${site.address.street}, ${site.address.city}.</li>
  <li><strong>Transmission:</strong> messages are delivered by the FormSubmit service to the ${site.email} mailbox.</li>
  <li><strong>Retention:</strong> messages are kept for as long as needed to handle the request; CVs for no more than two years, unless you ask for deletion.</li>
  <li><strong>Your rights:</strong> you may request access to, correction or deletion of your data by writing to <a href="mailto:${site.email}">${site.email}</a>.</li>
</ul>
<p>This processing is carried out under Mali’s Law No. 2013-015 of 21 May 2013 on the protection of personal data.</p>

<h2>Cookies and analytics</h2>
<p>This website uses no advertising or tracking cookies. Any audience measurement is anonymous and cookie-free.</p>

<h2>Credits</h2>
<p>Website design and development: custom-built static website, no database.</p>
`;

  const body = `
${pageHero(ctx, { eyebrow: fr ? 'Informations légales' : 'Legal information', title, crumbs: [{ label: title }] })}
<section class="section">
  <div class="container"><div class="prose">${content}</div></div>
</section>
`;
  return {
    title,
    description: fr ? 'Mentions légales et politique de confidentialité du site d’A-Z Sarl, bureau d’études et de conseil à Bamako.' : 'Legal notice and privacy policy of the A-Z Sarl website, consulting firm in Bamako, Mali.',
    body,
  };
}
