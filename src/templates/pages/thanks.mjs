// Page de confirmation après l'envoi d'un formulaire
import { icon } from '../icons.mjs';
import { tx } from '../components.mjs';

export default function thanks(ctx) {
  const fr = ctx.lang === 'fr';
  const body = `
<section class="center-page pattern">
  <div class="container">
    <img class="big-mark" src="${ctx.asset('img/brand/az-mark.svg')}" width="195" height="101" alt="">
    <p class="eyebrow" style="justify-content:center">${tx(ctx, 'merci.surtitre')}</p>
    <h1 class="h1">${tx(ctx, 'merci.titre')}</h1>
    <p class="lead">${tx(ctx, 'merci.texte')}</p>
    <div class="btn-row">
      <a class="btn" href="${ctx.href('home')}">${tx(ctx, 'merci.boutonAccueil')} ${icon('arrow', 'icon--arrow')}</a>
      <a class="btn btn--ghost" href="${ctx.href('expertises')}">${tx(ctx, 'merci.boutonExpertises')}</a>
    </div>
  </div>
</section>`;
  return { title: tx(ctx, 'merci.nomPage'), description: tx(ctx, 'merci.description'), body };
}
