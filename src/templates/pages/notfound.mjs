// Page 404 (bilingue, chemins absolus)
import { icon } from '../icons.mjs';

export default function notfound(ctx) {
  const body = `
<section class="center-page pattern">
  <div class="container">
    <img class="big-mark" src="${ctx.asset('img/brand/az-mark.svg')}" width="137" height="88" alt="">
    <p class="eyebrow" style="justify-content:center">Erreur 404 · Page not found</p>
    <h1 class="h1">Cette page <span class="accent">n’existe pas.</span></h1>
    <p class="lead">La page demandée a peut-être été déplacée. Revenez à l’accueil ou consultez nos expertises.<br><span lang="en">The page you requested may have moved. Go back to the home page or explore our expertise.</span></p>
    <div class="btn-row">
      <a class="btn" href="${ctx.href('home')}">Accueil ${icon('arrow', 'icon--arrow')}</a>
      <a class="btn btn--ghost" href="${ctx.href('home', 'en')}" lang="en">English home</a>
    </div>
  </div>
</section>`;
  return { title: 'Page introuvable', description: 'Page introuvable.', body };
}
