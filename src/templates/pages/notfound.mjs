// Page 404 (bilingue, chemins absolus)
import { icon } from '../icons.mjs';
import { tx } from '../components.mjs';

export default function notfound(ctx) {
  const body = `
<section class="center-page pattern">
  <div class="container">
    <img class="big-mark" src="${ctx.asset('img/brand/az-mark.svg')}" width="195" height="101" alt="">
    <p class="eyebrow" style="justify-content:center">${tx(ctx, 'page404.surtitre')}</p>
    <h1 class="h1">${tx(ctx, 'page404.titre')}</h1>
    <p class="lead">${tx(ctx, 'page404.texte')}</p>
    <div class="btn-row">
      <a class="btn" href="${ctx.href('home')}">${tx(ctx, 'page404.boutonAccueil')} ${icon('arrow', 'icon--arrow')}</a>
      <a class="btn btn--ghost" href="${ctx.href('home', 'en')}" lang="en">${tx(ctx, 'page404.boutonAnglais')}</a>
    </div>
  </div>
</section>`;
  return { title: 'Page introuvable', description: 'Page introuvable.', body };
}
