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

## Plaquette PDF

`node plaquette.mjs` régénère la plaquette A4 de 2 pages (français et anglais) à partir des mêmes données que le site, dans `src/assets/docs/`. Elle est téléchargeable depuis le pied de page et la page « Le Bureau ». Nécessite Google Chrome ou Microsoft Edge. Relancer ensuite `node build.mjs`.

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

## Retours du client (2 novembre 2026)

Intégrés :

- Nom « A-Z Sarl » avec la signature officielle « Innovation & Impact » ; logo redessiné en vectoriel d'après « Logo rectangle A Z.png ».
- Mentions légales : RCCM, NIF, capital et directeur de la publication jugés non nécessaires (non affichés).
- Point GPS du bureau, pages LinkedIn et Facebook, WhatsApp et e-mail des formulaires confirmés.
- Nouveaux partenaires : Save the Children, FRES – Yeelen Kura (LuxDev figurait déjà).
- Réalisations (`src/data/projects.mjs`) : camp de vacances Digital & IA 2026, évaluation du modèle FRES (2021), formations LuxDev et World Renew ; photo « Remise d'une attestation à un participant » remplacée par une photo World Renew.

Encore en attente :

- Accord écrit des partenaires pour l'usage de leur logo (aucune case « accord obtenu » cochée).
- Logos de CAD-Mali, SEXAGON, AFPB, ABIC-D et SCOOPS-K.T.P.A.N (annoncés mais non reçus).
- Témoignages, photo et biographie du Directeur Technique (annoncés mais non reçus).
- Site de CAD-Mali toujours hors service (lien désactivé).
- Nom de domaine : azsarl.com est libre ; azimpact.com est déjà pris. Adresse e-mail professionnelle souhaitée.

Les dossiers bruts du client (`Site web/`, `Fres/`) restent en local : les photos optimisées pour le site sont dans `src/assets/img/photos/`.

## Technique

- HTML / CSS / JavaScript natifs, sans framework. Polices Manrope et Instrument Serif auto-hébergées (licence SIL Open Font).
- Images en WebP + JPEG, plusieurs tailles (`srcset`), métadonnées (dont GPS) supprimées.
- Accessibilité visée : WCAG 2.2 AA (contrastes vérifiés, navigation clavier, lien d'évitement, animations désactivées si « réduire les animations » est activé).
- Typographie française automatique (espaces insécables avant « : ; ! ? »).
- Aucun cookie de suivi : pas de bandeau cookies nécessaire. Mesure d'audience conseillée : Cloudflare Web Analytics ou GoatCounter.
- Fond de carte : Natural Earth (domaine public) ; plan de la page Contact : OpenStreetMap.
