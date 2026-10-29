#!/usr/bin/env node
// Générateur du site A-Z Sarl — sans dépendance (Node.js 18 ou plus récent).
// Usage : node build.mjs   →   le site prêt à publier est écrit dans le dossier dist/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { site } from './src/data/site.mjs';
import { services } from './src/data/services.mjs';
import { sectors, families } from './src/data/sectors.mjs';
import { partners, categories, places } from './src/data/partners.mjs';
import { galleries } from './src/data/gallery.mjs';
import { languages, routes, ui } from './src/i18n.mjs';
import { layout } from './src/templates/layout.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(SRC, p), 'utf8'));
const photos = readJson('data/photos.json');
const map = readJson('data/mali-map.json');
const version = Date.now().toString(36);

// Pages : identifiant → module de gabarit
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

const fileOf = (id, lang) => {
  if (id.startsWith('service:')) return services.find((s) => `service:${s.id}` === id).slug[lang];
  const r = routes[id];
  if (!r) throw new Error(`Page inconnue : ${id}`);
  return r[lang];
};

function makeCtx(page, lang, { absolute = false } = {}) {
  const depth = lang === 'en' ? '../' : '';
  const root = absolute ? '/' : depth;
  const ctx = {
    lang,
    page: page.id,
    section: page.section,
    noindex: Boolean(page.noindex),
    t: ui[lang],
    L: (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.fr)),
    root,
    asset: (p) => `${root}assets/${p}`,
    href: (id, toLang = lang) => {
      const file = fileOf(id, toLang);
      if (absolute) return `/${toLang === 'en' ? 'en/' : ''}${file}`;
      if (toLang === lang) return file;
      return toLang === 'en' ? `en/${file}` : `../${file}`;
    },
    abs: (id, toLang) => {
      if (!site.siteUrl) return null;
      const file = fileOf(id, toLang);
      return `${site.siteUrl}/${toLang === 'en' ? 'en/' : ''}${file === 'index.html' ? '' : file}`;
    },
    site, services, sectors, families, partners, categories, places, galleries, photos, map, version,
  };
  ctx.alternate = ctx.href(page.id, lang === 'fr' ? 'en' : 'fr');
  return ctx;
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

// Finitions typographiques, appliquées au texte seulement (jamais aux balises, scripts ou styles) :
// - adresses e-mail sécables après « @ » sur petits écrans ;
// - en français, espace insécable avant « : ; ! ? » et à l'intérieur des guillemets « ».
function typography(html, lang) {
  let raw = false;
  return html.split(/(<[^>]+>)/).map((tok) => {
    if (tok.startsWith('<')) {
      if (/^<(script|style|title)\b/i.test(tok)) raw = true;
      else if (/^<\/(script|style|title)>/i.test(tok)) raw = false;
      return tok;
    }
    if (raw || !tok.trim()) return tok;
    let out = tok.replace(/([\w.+-])@([\w-]+\.[\w.]+)/g, '$1@<wbr>$2');
    if (lang === 'fr') out = out.replace(/ ([:;!?»])/g, ' $1').replace(/« /g, '« ');
    return out;
  }).join('');
}

async function render(page, lang, opts) {
  const modPath = path.join(SRC, 'templates', 'pages', `${page.module}.mjs`);
  if (!fs.existsSync(modPath)) return null;
  const mod = await import(pathToFileURL(modPath).href);
  const ctx = makeCtx(page, lang, opts);
  return typography(layout(ctx, mod.default(ctx, page)), lang);
}

async function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIST, 'en'), { recursive: true });
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

  let count = 0;
  for (const lang of languages) {
    for (const page of pages) {
      const html = await render(page, lang);
      if (html === null) { console.warn(`  (gabarit manquant : ${page.module})`); continue; }
      const file = path.join(DIST, lang === 'en' ? 'en' : '', fileOf(page.id, lang));
      fs.writeFileSync(file, html);
      count++;
    }
  }

  // Page 404 (chemins absolus : elle peut être servie à n'importe quelle adresse)
  const notFound = await render({ id: 'home', module: 'notfound', section: '', noindex: true }, 'fr', { absolute: true });
  if (notFound) { fs.writeFileSync(path.join(DIST, '404.html'), notFound); count++; }

  // Manifeste d'application (icône sur l'écran d'accueil des téléphones)
  fs.writeFileSync(path.join(DIST, 'site.webmanifest'), JSON.stringify({
    name: site.name,
    short_name: site.name,
    start_url: './',
    display: 'browser',
    background_color: '#FAF8F4',
    theme_color: '#0F2E47',
    icons: [
      { src: 'assets/img/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'assets/img/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2));

  // robots.txt et sitemap.xml (le sitemap exige l'adresse publique du site)
  const robots = ['User-agent: *', site.testMode ? 'Disallow: /' : 'Allow: /'];
  if (site.testMode) console.warn('ℹ  Version de test (site.testMode) : pages non indexables par les moteurs de recherche.');
  if (site.siteUrl && !site.testMode) {
    const urls = pages.filter((p) => !p.noindex).flatMap((p) => languages.map((lang) => {
      const alt = languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${makeCtx(p, l).abs(p.id, l)}"/>`).join('\n');
      return `  <url>\n    <loc>${makeCtx(p, lang).abs(p.id, lang)}</loc>\n${alt}\n  </url>`;
    }));
    fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
    robots.push(`Sitemap: ${site.siteUrl}/sitemap.xml`);
  } else if (!site.siteUrl) {
    console.warn('⚠  site.siteUrl est vide (src/data/site.mjs) : sitemap.xml, balises canoniques et hreflang non générés.');
  }
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robots.join('\n') + '\n');

  console.log(`✓ ${count} pages générées dans dist/`);
}

build().catch((err) => { console.error(err); process.exit(1); });
