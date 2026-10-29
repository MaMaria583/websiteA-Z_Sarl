// Page de confirmation après l'envoi d'un formulaire
import { icon } from '../icons.mjs';

export default function thanks(ctx) {
  const fr = ctx.lang === 'fr';
  const body = `
<section class="center-page pattern">
  <div class="container">
    <img class="big-mark" src="${ctx.asset('img/brand/az-mark.svg')}" width="137" height="88" alt="">
    <p class="eyebrow" style="justify-content:center">${fr ? 'Message envoyé' : 'Message sent'}</p>
    <h1 class="h1">${fr ? 'Merci, <span class="accent">bien reçu.</span>' : 'Thank you, <span class="accent">message received.</span>'}</h1>
    <p class="lead">${fr ? 'Votre message a bien été transmis à l’équipe d’A-Z Sarl. Nous revenons vers vous dans les meilleurs délais.' : 'Your message has been sent to the A-Z Sarl team. We will get back to you as soon as possible.'}</p>
    <div class="btn-row">
      <a class="btn" href="${ctx.href('home')}">${fr ? 'Retour à l’accueil' : 'Back to home'} ${icon('arrow', 'icon--arrow')}</a>
      <a class="btn btn--ghost" href="${ctx.href('expertises')}">${fr ? 'Voir nos expertises' : 'See our expertise'}</a>
    </div>
  </div>
</section>`;
  return { title: fr ? 'Merci' : 'Thank you', description: fr ? 'Confirmation d’envoi du formulaire.' : 'Form submission confirmation.', body };
}
