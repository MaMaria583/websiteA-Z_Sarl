# A-Z Sarl sous WordPress — guide

Version WordPress du site azsarl.com : même design, mêmes pages, mêmes adresses de pages (sans `.html`).
Site de test : **https://wp.azsarl.com** (non indexé par Google). Le site officiel www.azsarl.com reste le site
statique tant que la bascule n'est pas faite.

## 1. Se connecter

- hPanel → Sites web → **wp.azsarl.com** → bouton **Admin WordPress** (connexion sans mot de passe),
- ou https://wp.azsarl.com/wp-admin/ : identifiant `modena-admin`, puis « Mot de passe oublié ? » pour choisir
  votre mot de passe (le lien arrive sur l'adresse e-mail Modena du compte).

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

## 4. Bascule sur www.azsarl.com (après validation)

1. Sauvegarder `public_html` (site statique actuel) depuis le gestionnaire de fichiers de hPanel.
2. hPanel → WordPress → wp.azsarl.com → déplacer / copier l'installation vers azsarl.com (ou réinstaller
   WordPress sur azsarl.com, y téléverser le thème, puis recopier les contenus modifiés entre-temps).
3. Vérifier Réglages → Général : adresse `https://www.azsarl.com`. Le thème rend alors le site indexable
   automatiquement (toute autre adresse reste en `noindex`).
4. Les anciennes adresses (`/a-propos.html`, `/en/about.html`…) sont redirigées vers les nouvelles par le thème.
5. Purger le cache de Hostinger, puis déclarer `https://www.azsarl.com/wp-sitemap.xml` dans Google Search Console.

## 5. Entretien

- Mises à jour mineures de WordPress : automatiques. Faire les mises à jour majeures et celles des extensions
  une fois par mois (Tableau de bord → Mises à jour).
- Extensions : n'ajouter que le strict nécessaire. « Hostinger Reach » a été désactivée (elle ajoutait un script
  inutile aux pages publiques).
- Formulaires : toujours acheminés par FormSubmit vers l'adresse du menu Coordonnées.
