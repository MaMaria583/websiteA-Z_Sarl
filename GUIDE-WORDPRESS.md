# A-Z Sarl sous WordPress — guide

Le site **https://www.azsarl.com** est servi par WordPress depuis le 11 novembre 2026 : même design, mêmes
pages, adresses sans `.html` (les anciennes adresses sont redirigées). L'ancien sous-domaine de test
wp.azsarl.com redirige vers www.azsarl.com.

## 1. Se connecter

- **https://www.azsarl.com/wp/wp-admin/** : identifiant `modena-admin`, puis « Mot de passe oublié ? » pour choisir
  votre mot de passe (le lien arrive sur l'adresse e-mail Modena du compte).
- hPanel → WordPress : l'installation y figure encore sous le nom wp.azsarl.com ; le bouton d'accès à
  l'administration peut donc ouvrir l'ancienne adresse, qui redirige vers la bonne.

Pour le client : Comptes → Ajouter, rôle **Éditeur**. Un éditeur gère les contenus ci-dessous sans pouvoir
toucher au thème ni aux extensions.

## 2. Ce qui se modifie dans l'administration

| Menu | Ce que c'est | Où cela s'affiche |
| --- | --- | --- |
| **Réalisations** | Études de cas illustrées (textes, fiche technique, photos) | Page Réalisations, accueil, pages pôles, liste des références |
| **Références** | Missions sans étude de cas (année, commanditaire, type, lieu) | Liste « Toutes nos missions », pages pôles, chiffres clés |
| **Partenaires** | Logo, présentation, site web, « Avec A-Z Sarl » | Page Partenaires, bandeau de logos de l'accueil, références |
| **Coordonnées** | Téléphones, WhatsApp, e-mails, adresse, direction, réseaux sociaux | Toutes les pages |

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

## 3. Ce qui reste dans le thème

La mise en page et les textes de fond (accueil, Le Bureau, pôles d'expertise, Banque d'experts, Contact, mentions
légales), la carte des zones d'intervention, les deux galeries photo du bas de la page Réalisations et la plaquette
PDF. Dans Pages, les 28 pages du site existent (FR à la racine, EN sous « EN — Home ») : ne pas les supprimer ni
changer leur adresse ; leur contenu vient du thème.

Pour les modifier (côté agence) : éditer `src/` comme avant, puis

```bash
node build-wp.mjs
```

et téléverser `livrables/az-sarl-theme.zip` dans Apparence → Thèmes → Ajouter → Téléverser → « Remplacer l'actif
par le téléversé ». Les contenus saisis dans l'administration ne sont pas touchés par une mise à jour du thème.

Une page créée librement dans WordPress (Pages → Ajouter) s'affiche avec l'en-tête et le pied de page du site.

## 4. Installation sur le serveur

- WordPress est installé dans `public_html/wp` (Réglages → Général : adresse WordPress `https://www.azsarl.com/wp`,
  adresse du site `https://www.azsarl.com`). Ne pas modifier ces deux adresses.
- `public_html/index.php` charge WordPress ; `public_html/.htaccess` envoie toutes les adresses vers WordPress (HTTPS,
  redirection vers www, en-têtes de sécurité, cache).
- Les fichiers de l'ancien site statique (`*.html`, `en/`, `assets/`, `site-azsarl.zip`) sont encore dans
  `public_html` mais ne sont plus servis (WordPress répond à leur place). Ils peuvent être supprimés depuis le
  gestionnaire de fichiers de hPanel, en gardant `index.php`, `.htaccess` et le dossier `wp`.
- Revenir au site statique en cas de besoin : remettre le `.htaccess` du site statique (`HOSTING=hostinger node build.mjs`)
  et supprimer `public_html/index.php`.
- Plan du site pour Google Search Console : `https://www.azsarl.com/wp-sitemap.xml` (l'ancien `/sitemap.xml` y redirige).
- Après une modification importante : hPanel → Performance → vider le cache (le CDN de Hostinger est actif).

## 5. Entretien

- Mises à jour mineures de WordPress : automatiques. Faire les mises à jour majeures et celles des extensions
  une fois par mois (Tableau de bord → Mises à jour).
- Extensions : n'ajouter que le strict nécessaire. « Hostinger Reach » a été désactivée (elle ajoutait un script
  inutile aux pages publiques).
- Formulaires : toujours acheminés par FormSubmit vers l'adresse du menu Coordonnées.
