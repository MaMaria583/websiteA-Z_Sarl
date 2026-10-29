# Site web A-Z Sarl

Site vitrine bilingue (français / anglais) d'**A-Z Sarl**, bureau d'études et de conseil à Bamako.
Site statique sur mesure : aucun abonnement, aucune base de données, hébergement gratuit possible.

- 13 pages en français (racine) + 13 pages en anglais (`/en/`) + page 404
- Aucune dépendance : seul [Node.js](https://nodejs.org) 18 ou plus récent est nécessaire pour régénérer le site

## Démarrage rapide

```bash
node build.mjs
```

```bash
node serve.mjs
```

Puis ouvrir http://localhost:8080 dans le navigateur.

Raccourcis équivalents : `npm run build` et `npm start`.

## Structure

| Dossier / fichier | Rôle |
| --- | --- |
| `src/data/site.mjs` | Coordonnées, adresse du site, réglages des formulaires, mentions légales |
| `src/data/services.mjs` | Les 5 pôles d'expertise (textes FR / EN, offre, livrables, démarche) |
| `src/data/sectors.mjs` | Les 13 domaines d'intervention et leurs 4 familles |
| `src/data/partners.mjs` | Les 9 partenaires (logos, liens, descriptions) et les repères de la carte |
| `src/data/gallery.mjs` | Galeries photos et légendes |
| `src/data/photos.json` | Dimensions des photos optimisées (généré, ne pas modifier à la main) |
| `src/data/mali-map.json` | Tracé de la carte du Mali (Natural Earth, domaine public) |
| `src/i18n.mjs` | Libellés d'interface et noms des fichiers de chaque page, par langue |
| `src/templates/` | Gabarits : mise en page commune, composants, une page par fichier |
| `src/assets/` | CSS, JavaScript, polices, images, logos |
| `build.mjs` | Générateur : écrit le site complet dans `dist/` |
| `serve.mjs` | Serveur local de prévisualisation |
| `dist/` | **Le site prêt à publier** (régénéré à chaque `node build.mjs`) |
| `sources-client/` | Images d'origine extraites des fichiers Word du client |

## Modifier un contenu

1. Ouvrir le fichier de données concerné dans `src/data/` (ou le gabarit de la page dans `src/templates/pages/`).
2. Modifier le texte entre guillemets, en français (`fr`) et en anglais (`en`).
3. Lancer `node build.mjs`, vérifier avec `node serve.mjs`, puis republier le dossier `dist/`.

Exemples courants :

- **Rendre le logo de CAD-Mali cliquable** : dans `src/data/partners.mjs`, remplacer `url: null` par `url: { fr: 'http://www.cadmali.org', en: 'http://www.cadmali.org' }` (site hors service le 29/10/2026, à revérifier).
- **Ajouter le logo d'un partenaire** : déposer le fichier dans `src/assets/img/partners/` puis renseigner `logo: { file: 'nom.svg', width: …, height: … }` (pour un PNG : `raster: true`, fournir `nom.png` et `nom.webp`).
- **Ajouter un réseau social** : compléter la liste `social` dans `src/data/site.mjs`.
- **Compléter les mentions légales** : RCCM, NIF, capital, directeur de la publication et hébergeur dans `src/data/site.mjs` (`legal`).

## Version de test sur Vercel

Le dépôt Git est relié à Vercel : chaque `git push` sur la branche `main` reconstruit et republie le site automatiquement (réglages dans `vercel.json` : commande `node build.mjs`, dossier publié `dist/`).

Tant que `testMode: true` dans `src/data/site.mjs`, toutes les pages portent la balise `noindex` et `robots.txt` bloque les moteurs de recherche : la version de test ne sera pas référencée sur Google. Passer `testMode` à `false` le jour de la mise en ligne définitive.

Le dossier `dist/`, les fichiers Word du client et `sources-client/` ne sont pas versionnés (voir `.gitignore`).

## Mise en ligne

1. Acheter le nom de domaine.
2. Renseigner son adresse dans `src/data/site.mjs` → `siteUrl: 'https://www.exemple.com'` (sans barre finale), puis `node build.mjs`. Le sitemap, les balises canoniques, hreflang et les aperçus de partage se génèrent alors automatiquement.
3. Publier le dossier `dist/` :
   - **Cloudflare Pages** (recommandé, gratuit) : « Upload assets », glisser le contenu de `dist/` ;
   - **Netlify** : glisser le dossier `dist/` sur https://app.netlify.com/drop ;
   - **Hébergeur cPanel** : copier le contenu de `dist/` dans `public_html/`.
4. **Activer les formulaires** : envoyer un premier message test depuis la page Contact, puis cliquer sur le lien d'activation FormSubmit reçu dans `prestations.az@gmail.com`. Sans cette étape, aucun message n'est transmis.
5. Déclarer le site dans Google Search Console et créer la fiche Google Business Profile « A-Z Sarl » à Bamako.

## Points à valider avant la mise en ligne

- Nom affiché « A-Z Sarl » (le flyer récent utilise « A-Z IMPACT ») : à confirmer par le client.
- Logo : vectorisé à partir du flyer (`src/assets/img/brand/`) ; à remplacer par le fichier source officiel s'il existe.
- Accord écrit des partenaires pour l'usage de leur logo (GIZ en priorité).
- Photos HD sans filigrane et autorisation du photographe (MansaPic).
- Point GPS exact du bureau (`site.address.geo`) et numéro WhatsApp officiel (`site.whatsapp`).
- Textes ajoutés par l'agence (démarche, engagements) et traduction anglaise à relire.

## Technique

- HTML / CSS / JavaScript natifs, sans framework. Polices Manrope et Instrument Serif auto-hébergées (licence SIL Open Font).
- Images en WebP + JPEG, plusieurs tailles (`srcset`), métadonnées (dont GPS) supprimées.
- Accessibilité visée : WCAG 2.2 AA (contrastes vérifiés, navigation clavier, lien d'évitement, animations désactivées si « réduire les animations » est activé).
- Typographie française automatique (espaces insécables avant « : ; ! ? »).
- Aucun cookie de suivi : pas de bandeau cookies nécessaire. Mesure d'audience conseillée : Cloudflare Web Analytics ou GoatCounter.
- Fond de carte : Natural Earth (domaine public) ; plan de la page Contact : OpenStreetMap.
