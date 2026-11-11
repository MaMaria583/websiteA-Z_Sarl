# A-Z Sarl sous WordPress — guide

Le site **https://azsarl.com** est servi par WordPress depuis le 11 novembre 2026 : même design, mêmes
pages, adresses sans `.html` (les anciennes adresses sont redirigées).

## 1. Se connecter

- **https://azsarl.com/wp-admin/** avec le compte administrateur créé dans hPanel (identifiant `AZ`),
- ou hPanel → Sites web → azsarl.com → bouton WordPress.

Pour le client : Comptes → Ajouter, rôle **Éditeur**. Un éditeur gère les contenus ci-dessous sans pouvoir
toucher au thème ni aux extensions.

## 2. Ce qui se modifie dans l'administration

| Menu | Ce que c'est | Où cela s'affiche |
| --- | --- | --- |
| **Réalisations** | Études de cas illustrées (textes, fiche technique, photos) | Page Réalisations, accueil, pages pôles, liste des références |
| **Références** | Missions sans étude de cas (année, commanditaire, type, lieu) | Liste « Toutes nos missions », pages pôles, chiffres clés |
| **Partenaires** | Logo, présentation, site web, « Avec A-Z Sarl » | Page Partenaires, bandeau de logos de l'accueil, références |
| **Coordonnées** | Téléphones, WhatsApp, e-mails, adresse, direction, réseaux sociaux | Toutes les pages |
| **Textes des pages** | Tous les textes de chaque page, en français et en anglais : titres, paragraphes, listes, boutons, menus et pied de page, bandeaux communs, pôles d'expertise, domaines, mentions légales, pages Merci et 404, légendes des galeries, carte | Toutes les pages |
| **Photos du site** | Remplacement des photos fournies avec le site par des images de la médiathèque (et retour à l'original) | Accueil, Le Bureau, pôles, galeries, réalisations |

Principes :

- Chaque champ à deux colonnes se remplit en **français** et en **anglais** (anglais vide = texte français repris).
- **Publier** rend la fiche visible ; **Brouillon** la masque ; la corbeille la retire (récupérable 30 jours).
- **Ordre** (encadré « Attributs ») : le plus petit nombre passe en premier ; une nouvelle fiche (ordre 0) arrive en
  tête. Les références sont en plus triées par année.
- Les **chiffres clés** (nombre de missions, de commanditaires, de partenaires) se recalculent tout seuls.
- Réalisation : « Étude de cas » = grand bloc pleine largeur ; « Carte » = rubrique Formations. « Mettre en avant
  sur » choisit l'accueil (3 au plus) et les pages pôles. Sans photo, cocher des zones : une carte illustre la fiche.
- Photos : JPEG de 1 600 px de large environ, moins de 500 Ko. La première est le visuel principal.
- Logo de partenaire : PNG ou WebP sur fond transparent.

## 3. Textes et photos des pages

- **Textes des pages** : un onglet par page (Accueil, Le Bureau, chaque pôle, Réalisations…) et des onglets communs
  (menus et pied de page, bandeaux présents sur toutes les pages, galeries, carte). Chaque ligne a sa version
  française et anglaise. Un texte modifié est signalé en jaune ; « rétablir l'original » le remet tel qu'à la livraison.
  Depuis une page de la liste Pages, le bouton « Modifier les textes de cette page » ouvre directement le bon onglet.
- Mise en forme : `<span class="accent">…</span>` met la fin d'un titre en couleur et en italique ; `<strong>`, `<br>`,
  et dans les mentions légales `<h2>`, `<p>`, `<ul><li>`.
- Repères remplacés automatiquement : `{missions}`, `{commanditaires}`, `{partenaires}`, `{regions}`, `{depuis}` (chiffres
  clés) et, dans les mentions légales, `{rue}`, `{ville}`, `{pays}`, `{email}`, `{telephones}`, `{hebergeur}` (menu Coordonnées).
- **Photos du site** : « Remplacer » ouvre la médiathèque ; « Rétablir » revient à la photo d'origine. La description
  (texte alternatif) d'une photo se modifie dans « Textes des pages ».
- Restent fixes : la mise en page, les couleurs et polices, le logo, la carte du Mali elle-même et la plaquette PDF.
  Les 28 pages du site existent dans Pages (FR à la racine, EN sous « EN — Home ») : ne pas les supprimer ni changer
  leur adresse.
- Après un enregistrement, si l'ancienne version s'affiche encore : hPanel → Performance → Vider le cache.

Pour faire évoluer la mise en page (côté agence) : modifier `src/`, lancer `node build-wp.mjs` et téléverser
`livrables/az-sarl-theme.zip` (Apparence → Thèmes → Ajouter → Téléverser → « Remplacer l'actif par le téléversé »).
Les textes, photos et contenus saisis dans l'administration sont conservés.

## 4. Installation sur le serveur

- Site WordPress « azsarl.com » créé dans hPanel le 11 novembre 2026 (adresse `https://azsarl.com`, www redirige
  vers cette adresse), avec le thème A-Z Sarl activé : pages et contenus importés automatiquement à l'activation.
- L'ancienne installation de test existe encore sous l'adresse provisoire de Hostinger
  `lawngreen-goshawk-737773.hostingersite.com` (avec sa propre base de données). Elle ne sert plus ; la supprimer depuis
  hPanel quand le nouveau site est validé (vérifier alors que la base supprimée n'est pas celle d'azsarl.com).
- Plan du site pour Google Search Console : `https://azsarl.com/wp-sitemap.xml`.
- Après une modification importante : hPanel → Performance → vider le cache.

## 5. Entretien

- Mises à jour mineures de WordPress : automatiques. Faire les mises à jour majeures et celles des extensions
  une fois par mois (Tableau de bord → Mises à jour).
- Extensions : n'ajouter que le strict nécessaire. « Hostinger Reach » a été désactivée (elle ajoutait un script
  inutile aux pages publiques).
- Formulaires : toujours acheminés par FormSubmit vers l'adresse du menu Coordonnées.
