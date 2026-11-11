#!/usr/bin/env node
// Générateur du thème WordPress « A-Z Sarl » — sans dépendance (Node.js 18 ou plus récent).
// Usage : node build-wp.mjs   →   thème complet dans dist-wp/az-sarl/ et archive livrables/az-sarl-theme.zip
//
// Principe : les gabarits du site (src/templates) produisent le corps de chaque page, à l'identique du site
// statique. Tout ce qui se gère dans l'administration WordPress (réalisations, références, partenaires,
// coordonnées) est remplacé par des repères [[az:…]] que le thème remplit à l'affichage (wp-theme/inc/).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { site } from './src/data/site.mjs';
import { services } from './src/data/services.mjs';
import { sectors, families } from './src/data/sectors.mjs';
import { partners, categories, places } from './src/data/partners.mjs';
import { galleries } from './src/data/gallery.mjs';
import { projects } from './src/data/projects.mjs';
import { references, kinds, kindGroups } from './src/data/references.mjs';
import { languages, routes, ui } from './src/i18n.mjs';
import { paths as iconPaths, filled as iconFilled } from './src/templates/icons.mjs';
import { common } from './src/templates/components.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const THEME_SRC = path.join(ROOT, 'wp-theme');
const OUT = path.join(ROOT, 'dist-wp', 'az-sarl');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(SRC, p), 'utf8'));
const photos = readJson('data/photos.json');
const map = readJson('data/mali-map.json');

// ---------- Repères remplis par le thème ----------
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const component = (name, args = {}) => `[[az:c:${name}:${b64(args)}]]`;
const opt = (key) => `[[az:opt:${key}]]`;

// Coordonnées : gérées dans WordPress (menu « Coordonnées »)
const wpSite = {
  ...site,
  siteUrl: '',
  testMode: false,
  address: { street: opt('street'), city: opt('city'), country: opt('country'), geo: site.address.geo },
  phones: [{ display: opt('phone1'), tel: opt('phone1_tel') }, { display: opt('phone2'), tel: opt('phone2_tel') }],
  whatsapp: opt('whatsapp'),
  email: opt('email'),
  director: { name: opt('director_name'), initials: opt('director_initials'), role: opt('director_role'), email: opt('director_email') },
  formEndpoint: opt('form_endpoint'),
  legal: { rccm: '', nif: '', capital: '', publisher: '', host: opt('legal_host') },
};

// ---------- Pages ----------
const pages = [
  { id: 'home', module: 'home', section: 'home' },
  { id: 'about', module: 'about', section: 'about' },
  { id: 'expertises', module: 'expertises', section: 'expertises' },
  ...services.map((s) => ({ id: `service:${s.id}`, module: 'service', section: 'expertises', service: s })),
  { id: 'projects', module: 'projects', section: 'projects' },
  { id: 'partners', module: 'partners', section: 'partners' },
  { id: 'join', module: 'join', section: 'join' },
  { id: 'contact', module: 'contact', section: 'contact' },
  { id: 'legal', module: 'legal', section: 'legal' },
  { id: 'thanks', module: 'thanks', section: 'contact', noindex: true },
];

const slugOf = (id, lang) => {
  const file = id.startsWith('service:') ? services.find((s) => `service:${s.id}` === id).slug[lang] : routes[id][lang];
  return file === 'index.html' ? '' : file.replace(/\.html$/, '');
};

function makeCtx(page, lang) {
  return {
    wp: component,
    lang,
    page: page.id,
    section: page.section,
    noindex: Boolean(page.noindex),
    t: ui[lang],
    L: (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.fr)),
    root: '',
    asset: (p) => `[[az:asset:${p}]]`,
    href: (id, toLang = lang) => `[[az:url:${id}${toLang === lang ? '' : `@${toLang}`}]]`,
    abs: () => null,
    alternate: '',
    site: wpSite, services, sectors, families, partners, categories, places, galleries, projects, references, kinds, kindGroups, photos, map, version: '',
  };
}

// ---------- Textes modifiables (menu « Textes des pages ») ----------
// Chaque texte des gabarits (objets copy des pages) et des données (pôles, domaines) est remplacé par un repère
// [[az:t:clé]] ; le texte d'origine part dans data/texts.json et le thème affiche la version de l'administration.
const texts = {};
const SKIP = new Set(['locale', 'id', 'slug', 'icon', 'photo', 'projects', 'sectors', 'num', 'family', 'file', 'href', 'url']);
const FIG = { missions: '{missions}', partners: '{partenaires}', clients: '{commanditaires}', regions: '{regions}', since: '{depuis}' };
const textToken = (key) => `[[az:t:${key}]]`;
function register(key, lang, value, group) {
  texts[key] = texts[key] || { group, fr: '', en: '' };
  texts[key][lang] = value;
}
// Gabarit d'une page : copy[lang] (chaînes, tableaux, objets, fonctions (k) => … qui reçoivent les chiffres clés)
function tokenizeCopy(node, path, lang, group) {
  if (typeof node === 'string') {
    // Noms de photos et d'icônes : identifiants, pas des textes
    if (photos[node] || iconPaths[node] || iconFilled[node]) return node;
    register(path, lang, node, group);
    return textToken(path);
  }
  if (typeof node === 'function') {
    if (!/^\(?k\)?\s*=>/.test(node.toString())) return node; // libellés à nombre (n) : gérés par le thème
    const value = tokenizeCopy(node(FIG), path, lang, group);
    return () => value;
  }
  if (Array.isArray(node)) return node.map((x, i) => tokenizeCopy(x, `${path}.${i + 1}`, lang, group));
  if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) if (!SKIP.has(k)) node[k] = tokenizeCopy(node[k], `${path}.${k}`, lang, group);
    return node;
  }
  return node;
}
// Données bilingues ({ fr, en }) : pôles et domaines
const isPair = (o) => o && typeof o === 'object' && !Array.isArray(o) && Object.keys(o).length && Object.keys(o).every((k) => k === 'fr' || k === 'en');
function tokenizeData(node, path, group) {
  if (isPair(node)) {
    if (Array.isArray(node.fr) || Array.isArray(node.en)) {
      const n = Math.max((node.fr || []).length, (node.en || []).length);
      const keys = Array.from({ length: n }, (_, i) => `${path}.${i + 1}`);
      keys.forEach((k, i) => { register(k, 'fr', (node.fr || [])[i] ?? '', group); register(k, 'en', (node.en || [])[i] ?? (node.fr || [])[i] ?? '', group); });
      return { fr: keys.map(textToken), en: keys.map(textToken) };
    }
    register(path, 'fr', node.fr ?? '', group); register(path, 'en', node.en ?? node.fr ?? '', group);
    return textToken(path);
  }
  if (Array.isArray(node)) return node.map((x, i) => tokenizeData(x, `${path}.${i + 1}`, group));
  if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) if (!SKIP.has(k)) node[k] = tokenizeData(node[k], `${path}.${k}`, group);
    return node;
  }
  return node;
}

async function renderPage(page, lang, extra = {}) {
  const mod = await import(pathToFileURL(path.join(SRC, 'templates', 'pages', `${page.module}.mjs`)).href);
  return mod.default({ ...makeCtx(page, lang), ...extra }, page);
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

// Libellés des gabarits repris par les composants PHP. Les libellés à nombre (n) => … deviennent { one, many }.
function strings(copy, keys) {
  const out = {};
  for (const lang of languages) {
    out[lang] = {};
    for (const k of keys) {
      const v = copy[lang][k];
      out[lang][k] = typeof v === 'function' ? { one: v(1), many: v(98765).replace('98765', '{n}') } : v;
    }
  }
  return out;
}

async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // 1. Fichiers PHP du thème (écrits à la main : wp-theme/) et ressources du site
  copyDir(THEME_SRC, OUT);
  copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
  fs.copyFileSync(path.join(SRC, 'assets', 'img', 'brand', 'og-image.jpg'), path.join(OUT, 'screenshot.jpg'));

  // 2. Textes modifiables : repères à la place des textes des gabarits et des données
  const pageCopy = async (m) => (await import(pathToFileURL(path.join(SRC, `templates/pages/${m}.mjs`)).href)).copy;
  const textGroups = [['home', 'Accueil'], ['about', 'Le Bureau'], ['expertises', 'Expertises'], ['service', 'Pages pôles : titres communs'],
    ['projects', 'Réalisations'], ['partners', 'Partenaires'], ['join', 'Banque d’experts'], ['contact', 'Contact']];
  const groupLabels = {};
  for (const [m, label] of textGroups) {
    const copy = await pageCopy(m);
    groupLabels[m] = label;
    for (const lang of languages) copy[lang] = tokenizeCopy(copy[lang], m, lang, m);
  }
  // Titre d'en-tête des pages pôles : fin en couleur après le dernier « et » / « and » (comme accentTitle du gabarit)
  const accent = (t, lang) => { const sep = lang === 'en' ? ' and ' : ' et '; const i = t.lastIndexOf(sep); return i > 0 ? `${t.slice(0, i)} <span class="accent">${t.slice(i + 1)}</span>` : t; };
  // Libellés repris par les composants PHP : lus après le remplacement, donc modifiables eux aussi
  const phpStrings = {
    projects: strings(await pageCopy('projects'), ['tocRefs', 'refsEyebrow', 'refsTitle', 'refsLead', 'all', 'refsStatus', 'refsFilter', 'partnerOnly', 'poleOnly', 'showAll', 'featured', 'partner', 'photos', 'photo', 'enlarge', 'modules', 'missions']),
    partners: strings(await pageCopy('partners'), ['all', 'withAz', 'missions']),
    service: strings(await pageCopy('service'), ['caseEyebrow', 'caseTitle', 'caseAll', 'refsEyebrow', 'refsTitle', 'refsAll']),
  };
  for (const sv of services) sv.heroTitle = { fr: accent(sv.title.fr, 'fr'), en: accent(sv.title.en, 'en') };
  for (const sv of services) { groupLabels[`pole:${sv.id}`] = `Pôle : ${sv.short.fr}`; tokenizeData(sv, `pole.${sv.id}`, `pole:${sv.id}`); }
  groupLabels.domaines = 'Domaines d’intervention';
  for (const fa of families) tokenizeData(fa, `domaines.famille.${fa.id}`, 'domaines');
  for (const se of sectors) tokenizeData(se, `domaines.${se.id}`, 'domaines');

  // Textes écrits dans les gabarits (bandeaux communs, Merci, 404, mentions légales) : dictionnaire common
  for (const [key, v] of Object.entries(common)) { const g = key.split('.')[0]; register(key, 'fr', v.fr, g); register(key, 'en', v.en, g); }
  // Mentions légales : contenu en un seul bloc ; coordonnées remplacées par des repères lisibles
  const legalPlaceholders = (html) => html
    .split('[[az:opt:street]]').join('{rue}').split('[[az:opt:city]]').join('{ville}').split('[[az:opt:country]]').join('{pays}')
    .split('[[az:opt:email]]').join('{email}').split('[[az:opt:legal_host]]').join('{hebergeur}')
    .replace(/\[\[az:c:phonesInline:[^\]]*\]\]/g, '{telephones}');
  for (const lang of languages) {
    const body = (await renderPage({ id: 'legal', module: 'legal', section: 'legal' }, lang, { legalRaw: true })).body;
    const m = body.match(/<div class="prose">([\s\S]*)<\/div><\/div>/);
    if (!m) throw new Error('Mentions légales : contenu introuvable');
    register('legal.contenu', lang, legalPlaceholders(m[1]).trim(), 'legal');
  }
  // Interface (menus, pied de page, boutons), signature et slogan
  for (const lang of languages) ui[lang] = tokenizeCopy(ui[lang], 'interface', lang, 'interface');
  const brand = tokenizeData({ slogan: site.tagline, signature: site.brandLine }, 'interface', 'interface');
  site.tagline = wpSite.tagline = brand.slogan;
  site.brandLine = wpSite.brandLine = brand.signature;
  // Galeries photo (titres, légendes) et carte des zones (partenaires et missions par zone)
  tokenizeData(galleries, 'galeries', 'galeries');
  for (const p of places) if (p.who) p.who = tokenizeData(p.who, `carte.${p.id}`, 'carte');
  Object.assign(groupLabels, {
    legal: 'Mentions légales', merci: 'Page « Merci »', page404: 'Page 404', commun: 'Éléments communs (toutes les pages)',
    interface: 'Menus, pied de page et boutons', galeries: 'Galeries photo (Réalisations)', carte: 'Carte des zones d’intervention',
  });

  // 3. Corps des pages, par langue
  const meta = [];
  let count = 0;
  for (const page of pages) {
    const entry = { id: page.id, section: page.section, noindex: Boolean(page.noindex), slug: {}, title: {}, description: {}, bodyClass: '' };
    for (const lang of languages) {
      const r = await renderPage(page, lang);
      const dir = path.join(OUT, 'pages', lang);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${page.id.replace(':', '-')}.html`), r.body);
      entry.slug[lang] = slugOf(page.id, lang);
      entry.title[lang] = r.title;
      entry.description[lang] = r.description;
      entry.bodyClass = r.bodyClass || '';
      count++;
    }
    meta.push(entry);
  }
  const notFound = await renderPage({ id: 'home', module: 'notfound', section: '', noindex: true }, 'fr');
  fs.writeFileSync(path.join(OUT, 'pages', 'fr', 'notfound.html'), notFound.body);

  // 4. Données fixes du thème (libellés, pôles, carte, icônes)
  const data = path.join(OUT, 'data');
  fs.mkdirSync(data, { recursive: true });
  fs.writeFileSync(path.join(data, 'site.json'), JSON.stringify({
    name: site.name,
    brandLine: site.brandLine,
    tagline: site.tagline,
    geo: site.address.geo,
    ui,
    pages: meta,
    services: services.map((s) => ({ id: s.id, icon: s.icon, title: s.title, summary: s.summary, short: s.short, projects: s.projects || [] })),
    places,
    kinds,
    kindGroups,
    categories,
    galleries: galleries.map((g) => ({ id: g.id, title: g.title })),
    icons: { paths: iconPaths, filled: iconFilled },
    strings: phpStrings,
  }));
  fs.writeFileSync(path.join(data, 'photos.json'), JSON.stringify(photos));
  fs.writeFileSync(path.join(data, 'texts.json'), JSON.stringify({ groups: groupLabels, texts }));
  fs.writeFileSync(path.join(data, 'mali-map.json'), JSON.stringify(map));

  // 4. Contenus de départ, importés dans WordPress à l'activation du thème (puis gérés dans l'administration)
  const big = ['camp-digital-ia-2026', 'evaluation-modele-fres-2021', 'etude-base-world-renew-2026', 'gpec-canam-2026'];
  const onHome = ['camp-digital-ia-2026', 'evaluation-modele-fres-2021', 'gpec-canam-2026'];
  fs.writeFileSync(path.join(data, 'seed.json'), JSON.stringify({
    options: {
      phones: site.phones.map((p) => p.display).join('\n'),
      whatsapp: site.whatsapp,
      email: site.email,
      form_email: site.formEndpoint.replace('https://formsubmit.co/', ''),
      street: site.address.street,
      city: site.address.city,
      country: site.address.country,
      director_name: site.director.name,
      director_initials: site.director.initials,
      director_role_fr: site.director.role.fr,
      director_role_en: site.director.role.en,
      director_email: site.director.email,
      linkedin: site.social.find((s) => s.icon === 'linkedin')?.url || '',
      facebook: site.social.find((s) => s.icon === 'facebook')?.url || '',
      legal_host: 'Hostinger International Ltd — hostinger.com',
    },
    partners,
    projects: projects.map((p) => ({
      ...p,
      layout: big.includes(p.id) ? 'case' : 'duo',
      show_on: [...(onHome.includes(p.id) ? ['home'] : []), ...services.filter((s) => (s.projects || []).includes(p.id)).map((s) => s.id)],
    })),
    references,
  }));

  // 5. Manifeste d'application
  fs.writeFileSync(path.join(OUT, 'site.webmanifest'), JSON.stringify({
    name: site.name,
    short_name: site.name,
    start_url: '/',
    display: 'browser',
    background_color: '#FAF8F4',
    theme_color: '#0F2E47',
    icons: [
      { src: 'assets/img/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'assets/img/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2));

  console.log(`✓ Thème WordPress généré dans dist-wp/az-sarl/ (${count} pages)`);

  // 6. Archive à téléverser dans WordPress (Apparence → Thèmes → Ajouter → Téléverser)
  if (!process.argv.includes('--no-zip')) {
    const zip = path.join(ROOT, 'livrables', 'az-sarl-theme.zip');
    fs.mkdirSync(path.dirname(zip), { recursive: true });
    fs.rmSync(zip, { force: true });
    try {
      // tar.exe (Windows 10+) écrit des chemins avec « / », exigés par WordPress ; ailleurs : zip
      if (process.platform === 'win32') execFileSync(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe'), ['-a', '-c', '-f', zip, '-C', path.dirname(OUT), 'az-sarl']);
      else execFileSync('zip', ['-qr', zip, 'az-sarl'], { cwd: path.dirname(OUT) });
      console.log(`✓ Archive : livrables/az-sarl-theme.zip (${(fs.statSync(zip).size / 1e6).toFixed(1)} Mo)`);
    } catch (e) {
      console.warn(`⚠  Archive non créée (${e.message}). Compresser à la main le dossier dist-wp/az-sarl.`);
    }
  }
}

build().catch((err) => { console.error(err); process.exit(1); });
