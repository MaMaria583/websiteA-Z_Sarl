# A-Z Sarl — version Astra + Gutenberg

Nouvelle version du site, entièrement modifiable dans WordPress : thème **Astra** (gratuit), pages en **blocs Gutenberg**,
**Polylang** pour le français et l'anglais, extension **A-Z Sarl — Contenus et blocs** pour les fiches et les blocs dynamiques.

Site de test (non indexé) : https://lawngreen-goshawk-737773.hostingersite.com — administration : hPanel → Sites web →
lawngreen-goshawk-737773.hostingersite.com → WordPress (ou `/wp-admin/`). Le site public azsarl.com reste sur l'ancienne
version jusqu'à la bascule.

## Où modifier quoi

| Quoi | Où |
| --- | --- |
| Textes, images, boutons, sections d'une page | Pages → la page → éditeur de blocs (cliquer et taper) |
| Version anglaise d'une page | Pages → colonne du drapeau anglais (chaque page FR a sa traduction liée) |
| Sections réutilisables | Insérer (+) → Compositions → « A-Z Sarl » ; Apparence → Compositions pour les modifier |
| Bandeau de contact, appel « Banque d'experts » | Compositions synchronisées (FR et EN) : une modification s'applique à toutes les pages |
| Couleurs, polices, tailles des titres, boutons | Apparence → Personnaliser → Global (palette, typographie, boutons) |
| Logo, nom, slogan | Apparence → Personnaliser → En-tête → Logo et identité du site |
| Menu principal (FR et EN) | Apparence → Menus (« Menu principal (FR) » et « Main menu (EN) ») |
| Bouton « Nous consulter », pied de page | Apparence → Personnaliser → En-tête / Pied de page ; traductions : Langues → Traductions |
| Réalisations, Références, Partenaires | Menus du même nom (fiches bilingues) |
| Téléphones, e-mails, adresse, réseaux sociaux | Menu Coordonnées (repris partout, y compris dans les blocs et le pied de page) |
| Photos | Médiathèque ; dans une page, cliquer l'image → Remplacer |

## Blocs « A-Z Sarl » (catégorie du même nom dans l'inserteur)

Carte des zones d'intervention, Références (liste complète ou d'un pôle), Cartes des réalisations, Études de cas,
Cartes « Formations », Sommaire des réalisations, Partenaires (fiches et filtres), Bandeau des logos, Coordonnées,
Formulaire (contact ou CV), Plan d'accès, Icône A-Z, Illustration « Transformation digitale ». Leur contenu vient des
fiches et du menu Coordonnées ; leurs réglages sont dans la colonne de droite.

Repères utilisables dans n'importe quel texte : `{missions}`, `{commanditaires}`, `{partenaires}`, `{regions}`, `{depuis}`
(chiffres calculés à partir des fiches) ; codes courts `[az cle="email"]`, `[az cle="telephones"]`, `[az cle="adresse"]`,
`[az_lien page="contact"]`, `[az_reseaux]`.

## CSS sur mesure (le strict nécessaire)

Tout le reste passe par les réglages d'Astra et des blocs. L'extension ne fournit que : les styles de ses blocs
dynamiques (repris du site d'origine), la police Instrument Serif et la règle « fin de titre en italique = Instrument
Serif turquoise » (mettre un mot en *italique* dans un titre pour obtenir l'effet).

## Côté agence

```bash
node build-plugin.mjs
```

Extension → `livrables/az-sarl-extension.zip` (Extensions → Ajouter → Téléverser). `node build-pages.mjs` décrit les
pages ; `tools/builder.js`, exécuté dans l'éditeur WordPress, les reconstruit (écrase le contenu des pages : à
n'utiliser que pour une installation neuve).

## Bascule sur azsarl.com (à faire après validation)

Copier la base et les fichiers du site de test vers azsarl.com (outil de migration ou export/import), remplacer
l'adresse `https://lawngreen-goshawk-737773.hostingersite.com` par `https://azsarl.com` dans la base, puis vérifier :
blog public (Réglages → Lecture), Polylang, menus, redirections des anciennes adresses `.html`.
