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
| `src/data/partners.mjs` | Les 12 partenaires (logos, liens, descriptions, missions avec A-Z) et les 12 zones d'intervention de la carte |
| `src/data/projects.mjs` | Les réalisations illustrées (intitulés, textes, chiffres clés, photos) |
| `src/data/references.mjs` | Les autres références (année, commanditaire, type de mission, pôles, lieu) : liste de la page Réalisations, pages pôles, plaquette |
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

- **Rendre le logo de CAD-Mali cliquable** : dans `src/data/partners.mjs`, remplacer `url: null` par `url: { fr: 'http://www.cadmali.org', en: 'http://www.cadmali.org' }` (site hors service les 29/10 et 02/11/2026, à revérifier).
- **Ajouter une référence** (mission sans photos) : ajouter une entrée dans `src/data/references.mjs` (`year`, `partner`, `kind`, `services`, `title`, `zone`). Elle apparaît automatiquement dans la liste de la page Réalisations, sur les pages des pôles concernés, dans la plaquette et dans les chiffres clés (nombre de missions et de commanditaires).
- **Ajouter une réalisation illustrée** : compléter `src/data/projects.mjs` (`title` complet, `short` pour les cartes, `kind`, `zone`, `photos` ou, à défaut, `zones` pour l'illustrer par une carte), puis l'ajouter aux pôles concernés (`projects` dans `src/data/services.mjs`) et à la page Réalisations (`src/templates/pages/projects.mjs`).
- **Liens filtrés vers les références** : `realisations.html?partner=afpb#references` (missions d'un partenaire) ou `realisations.html?pole=sera#references` (missions d'un pôle).
- **Ajouter le logo d'un partenaire** : déposer le fichier dans `src/assets/img/partners/` puis renseigner `logo: { file: 'nom.svg', width: …, height: … }` (pour un PNG : `raster: true`, fournir `nom.png` et `nom.webp`).
- **Ajouter un réseau social** : compléter la liste `social` dans `src/data/site.mjs`.
- **Compléter les mentions légales** : RCCM, NIF, capital, directeur de la publication et hébergeur dans `src/data/site.mjs` (`legal`).

## Plaquette PDF

`node plaquette.mjs` régénère la plaquette A4 de 3 pages (français et anglais) à partir des mêmes données que le site, dans `src/assets/docs/` : présentation et pôles, domaines, démarche, réalisations récentes et partenaires, puis la liste complète des références et des zones d'intervention. Elle est téléchargeable depuis le pied de page et la page « Le Bureau ». Nécessite Google Chrome ou Microsoft Edge. Relancer ensuite `node build.mjs`.

## Version de test sur Vercel

Le dépôt Git est relié à Vercel : chaque `git push` sur la branche `main` reconstruit et republie le site automatiquement (réglages dans `vercel.json` : commande `node build.mjs`, dossier publié `dist/`).

Tant que `testMode: true` dans `src/data/site.mjs`, toutes les pages portent la balise `noindex` et `robots.txt` bloque les moteurs de recherche : la version de test ne sera pas référencée sur Google. Passer `testMode` à `false` le jour de la mise en ligne définitive.

Le dossier `dist/`, les fichiers Word du client et `sources-client/` ne sont pas versionnés (voir `.gitignore`).

## Mise en ligne

1. Acheter le nom de domaine **azsarl.com** (validé par le client le 2 novembre 2026, encore disponible ce jour-là) et le relier au projet Vercel (Settings → Domains).
2. Renseigner son adresse dans `src/data/site.mjs` → `siteUrl: 'https://www.azsarl.com'` (sans barre finale) et `testMode: false`, puis `node build.mjs`. Le sitemap, les balises canoniques, hreflang et les aperçus de partage se génèrent alors automatiquement.
3. Publier le dossier `dist/` :
   - **Cloudflare Pages** (recommandé, gratuit) : « Upload assets », glisser le contenu de `dist/` ;
   - **Netlify** : glisser le dossier `dist/` sur https://app.netlify.com/drop ;
   - **Hébergeur cPanel** : copier le contenu de `dist/` dans `public_html/`.
4. **Activer les formulaires** : envoyer un premier message test depuis la page Contact, puis cliquer sur le lien d'activation FormSubmit reçu dans `prestations.az@gmail.com`. Sans cette étape, aucun message n'est transmis.
5. Déclarer le site dans Google Search Console et créer la fiche Google Business Profile « A-Z Sarl » à Bamako.

## Retours du client (2 novembre 2026)

Premier retour, intégré :

- Nom « A-Z Sarl » avec la signature officielle « Innovation & Impact » ; logo redessiné en vectoriel d'après « Logo rectangle A Z.png ».
- Mentions légales : RCCM, NIF, capital et directeur de la publication jugés non nécessaires (non affichés).
- Point GPS du bureau, pages LinkedIn et Facebook, WhatsApp et e-mail des formulaires confirmés.
- Nouveaux partenaires : Save the Children, FRES – Yeelen Kura (LuxDev figurait déjà).
- Réalisations (`src/data/projects.mjs`) : camp de vacances Digital & IA 2026, évaluation du modèle FRES (2021), formations LuxDev et World Renew ; photo « Remise d'une attestation à un participant » remplacée par une photo World Renew.

Retour final (dossier « les point de correction retour final »), intégré :

- Intitulés exacts : formation LuxDev (2025, Bamako) ; formation World Renew sur la collecte mobile des données (2026, Bamako) ; nouvelle réalisation « Étude de base » du projet CRWRF et World Renew Mali, phase 7 (2026 ; Koulikoro, Sikasso, Ségou), illustrée par une carte des zones ; mission FRES présentée en deux volets (analyse et évaluation du modèle économique, organisation de l'atelier national en ligne et en présentiel).
- Camp Digital & IA : 20 participants, du 16 juillet au 15 septembre 2026 (16 séances, d'après la page LinkedIn).
- Save the Children : missions en 2022, 2023 et 2024, dans le fil chronologique de la page Réalisations et la fiche partenaire.
- Logos reçus de CAD-Mali, SEXAGON, AFPB et ABIC-D ; logos FRES et Yeelen Kura affichés ensemble ; SCOOPS-K.T.P.A.N n'a pas de logo.
- Coordonnées : celles du site sont conservées (le 83 89 99 50 et groupeazmedia@gmail.com, barrés par le client, ne sont pas repris).
- Page LinkedIn publique : https://www.linkedin.com/company/az-impact/ ; son offre « A-Z Contact Center & Data Intelligence » est présentée sur la page Suivi-évaluation.
- Nom de domaine azsarl.com validé.

« Quelques réalisations dans le temps » (3 novembre 2026), intégré :

- 17 références de 2022 à 2024 (Save the Children, AFPB, CAD-Mali, SCOOPS-K.T.P.A.N, FAWE Mali, SEXAGON) et l'étude de base de la GIZ (projet WE4R/GMV, Kayes et Nioro) dans `src/data/references.mjs` : liste filtrable de la page Réalisations, références des pages pôles, page 3 de la plaquette, chiffres clés de l'accueil.
- Nouveau partenaire FAWE Mali (logo officiel de fawe.org ; fawemali.org en erreur 500 le 3 novembre 2026).
- Carte des zones d'intervention, de Kayes à Gao (11 régions et le district de Bamako), avec le texte du client, sur l'accueil, Le Bureau et Partenaires.
- Ligne en double dans le fichier du client (formation AFPB « transformation/conservation du lait local », 2023) : reprise une seule fois.

Encore en attente :

- Année de l'étude de base GIZ (non précisée : le site affiche la période du projet au Mali, 2024 – 2028).
- Accord écrit des partenaires pour l'usage de leur logo (aucune case « accord obtenu » cochée).
- Témoignages et mot du Directeur Technique (le client les enverra plus tard).
- Achat du domaine azsarl.com, adresse e-mail professionnelle sur ce domaine, puis mise en ligne définitive.
- Site de CAD-Mali toujours hors service (lien désactivé).

Les dossiers bruts du client (`Site web/`, `Fres/`, `les point de correction retour final/`) restent en local : les photos et logos optimisés pour le site sont dans `src/assets/img/`.

## Technique

- HTML / CSS / JavaScript natifs, sans framework. Polices Manrope et Instrument Serif auto-hébergées (licence SIL Open Font).
- Images en WebP + JPEG, plusieurs tailles (`srcset`), métadonnées (dont GPS) supprimées.
- Accessibilité visée : WCAG 2.2 AA (contrastes vérifiés, navigation clavier, lien d'évitement, animations désactivées si « réduire les animations » est activé).
- Typographie française automatique (espaces insécables avant « : ; ! ? »).
- Aucun cookie de suivi : pas de bandeau cookies nécessaire. Mesure d'audience conseillée : Cloudflare Web Analytics ou GoatCounter.
- Fond de carte : Natural Earth (domaine public) ; plan de la page Contact : OpenStreetMap.
