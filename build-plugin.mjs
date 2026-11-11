#!/usr/bin/env node
// Générateur de l'extension WordPress « A-Z Sarl » (version Astra + Gutenberg) — sans dépendance.
// Usage : node build-plugin.mjs   →   dist-plugin/az-sarl/ et livrables/az-sarl-extension.zip
//
// L'extension porte ce qui ne dépend pas du thème : fiches (réalisations, références, partenaires), coordonnées,
// blocs dynamiques (carte, références, partenaires, formulaires…) et leurs styles. La mise en page des pages est
// faite en blocs Gutenberg avec les réglages d'Astra.
// Le code PHP des fiches et des composants est repris du thème (wp-theme/inc), le reste est dans wp-plugin/.
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
import { common, maliMap, mapLegend, contactBand } from './src/templates/components.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'dist-plugin', 'az-sarl');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(SRC, p), 'utf8'));
const photos = readJson('data/photos.json');
const map = readJson('data/mali-map.json');

// ---------- Rendu des gabarits en mode WordPress (repères [[az:…]] remplis par l'extension) ----------
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const component = (name, args = {}) => `[[az:c:${name}:${b64(args)}]]`;
const opt = (key) => `[[az:opt:${key}]]`;
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
function makeCtx(lang, pageId = 'home') {
  return {
    wp: component, lang, page: pageId, section: '', noindex: false, t: ui[lang],
    L: (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.fr)),
    root: '', asset: (p) => `[[az:asset:${p}]]`,
    href: (id, toLang = lang) => `[[az:url:${id}${toLang === lang ? '' : `@${toLang}`}]]`,
    abs: () => null, alternate: '',
    site: wpSite, services, sectors, families, partners, categories, places, galleries, projects, references, kinds, kindGroups, photos, map, version: '',
  };
}
async function renderPage(module, lang, page = {}) {
  const mod = await import(pathToFileURL(path.join(SRC, 'templates', 'pages', `${module}.mjs`)).href);
  return mod.default(makeCtx(lang), page).body;
}
/** Élément HTML complet qui commence à `marker` (balises de même nom comptées). */
function extractElement(html, marker) {
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`Fragment introuvable : ${marker}`);
  const tag = marker.match(/^<([a-z0-9]+)/)[1];
  const re = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'g');
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    if (m[0][1] === '/') depth--; else if (!m[0].endsWith('/>')) depth++;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  throw new Error(`Fragment non fermé : ${marker}`);
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name), b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b);
  }
}

// ---------- Feuille de style des blocs : règles du site qui ne concernent que les composants des blocs ----------
function parseCss(css) {
  // Découpe de premier niveau : [{ sel, body }] et [{ at, rules }] pour les @media
  const out = [];
  let i = 0;
  const skipComment = () => { if (css.startsWith('/*', i)) { const e = css.indexOf('*/', i + 2); i = e + 2; return true; } return false; };
  while (i < css.length) {
    if (skipComment()) continue;
    if (/\s/.test(css[i])) { i++; continue; }
    const open = css.indexOf('{', i);
    if (open < 0) break;
    const head = css.slice(i, open).trim();
    let depth = 1, j = open + 1;
    while (depth && j < css.length) { if (css.startsWith('/*', j)) { j = css.indexOf('*/', j + 2) + 2; continue; } if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
    const body = css.slice(open + 1, j - 1);
    if (head.startsWith('@media') || head.startsWith('@supports')) out.push({ at: head, rules: parseCss(body) });
    else out.push({ sel: head, body });
    i = j;
  }
  return out;
}
function filterCss(rules, keep) {
  const parts = [];
  for (const r of rules) {
    if (r.at) { const inner = filterCss(r.rules, keep); if (inner) parts.push(`${r.at} {\n${inner}\n}`); continue; }
    if (r.sel.startsWith('@font-face')) continue;
    // Virgules de premier niveau seulement (pas celles de :where(a, b), :is(…), :not(…))
    const selParts = []; let depth = 0, cur = '';
    for (const ch of r.sel) { if (ch === '(') depth++; if (ch === ')') depth--; if (ch === ',' && depth === 0) { selParts.push(cur); cur = ''; } else cur += ch; }
    selParts.push(cur);
    const sels = selParts.map((s) => s.trim()).filter((s) => keep(s));
    if (sels.length) parts.push(`${sels.join(', ')} {${r.body}}`);
  }
  return parts.join('\n');
}

async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // 1. Code PHP : fichiers propres à l'extension + fiches et composants repris du thème
  copyDir(path.join(ROOT, 'wp-plugin'), OUT);
  fs.mkdirSync(path.join(OUT, 'inc'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'wp-theme', 'inc', 'data.php'), path.join(OUT, 'inc', 'data.php'));
  fs.copyFileSync(path.join(ROOT, 'wp-theme', 'inc', 'components.php'), path.join(OUT, 'inc', 'components.php'));
  const admin = fs.readFileSync(path.join(ROOT, 'wp-theme', 'inc', 'admin.php'), 'utf8');
  const cut = admin.indexOf('// ---------- Pages du site');
  fs.writeFileSync(path.join(OUT, 'inc', 'types.php'), cut > 0 ? admin.slice(0, cut) : admin);
  copyDir(path.join(ROOT, 'wp-theme', 'admin'), path.join(OUT, 'admin'));

  // 2. Ressources : marque, logos partenaires (import), police Instrument Serif, script des composants
  copyDir(path.join(SRC, 'assets', 'img', 'brand'), path.join(OUT, 'assets', 'img', 'brand'));
  copyDir(path.join(SRC, 'assets', 'img', 'partners'), path.join(OUT, 'assets', 'img', 'partners'));
  fs.mkdirSync(path.join(OUT, 'assets', 'fonts'), { recursive: true });
  for (const f of fs.readdirSync(path.join(SRC, 'assets', 'fonts'))) if (f.startsWith('instrument-serif')) fs.copyFileSync(path.join(SRC, 'assets', 'fonts', f), path.join(OUT, 'assets', 'fonts', f));
  const js = fs.readFileSync(path.join(SRC, 'assets', 'js', 'main.js'), 'utf8');
  const a = js.indexOf('  /* ---------- En-tête au défilement'), b = js.indexOf('  /* ---------- Apparitions au défilement');
  if (a < 0 || b < 0) throw new Error('main.js : sections introuvables');
  fs.writeFileSync(path.join(OUT, 'assets', 'front.js'), js.slice(0, a) + '  // (en-tête et menus : gérés par le thème Astra)\n\n' + js.slice(b));

  // 3. Styles des composants des blocs, repris du site (les styles de page sont réglés dans Astra et les blocs)
  const css = fs.readFileSync(path.join(SRC, 'assets', 'css', 'main.css'), 'utf8');
  const rules = parseCss(css);
  const COMPONENTS = ['refs', 'ref', 'filters', 'filter-btn', 'partner-card', 'partner-grid', 'logo-plate', 'monogram', 'proj-card', 'proj-grid', 'project', 'thumbs',
    'facts', 'chip', 'chip-list', 'missions', 'duo', 'duo-card', 'trust', 'marquee', 'logo-item', 'map-', 'pin', 'zones', 'zone-map', 'river', 'land', 'inset', 'ref-dot', 'ref-label',
    'arc', 'halo', 'core', 'form-card', 'form-grid', 'field', 'input', 'select', 'textarea', 'dropzone', 'honey', 'req', 'consent', 'checkbox', 'info-card', 'contact-line', 'contact-band__links',
    'lightbox', 'link-arrow', 'icon', 'icon-stroke', 'sr-only', 'toc', 'btn', 'social', 'refs-', 'gallery', 'figure-plain', 'credit', 'muted', 'hero-figures', 'az-'];
  const cls = (s) => (s.match(/\.([a-zA-Z0-9_-]+)/g) || []).map((x) => x.slice(1));
  const keep = (s) => {
    if (s.includes('[data-reveal]') || s.startsWith('html') || s.startsWith('body')) return false;
    if (s === ':root') return true;
    const c = cls(s);
    return c.length > 0 && c.some((k) => COMPONENTS.some((p) => (p.endsWith('-') ? k.startsWith(p) : k === p || k.startsWith(`${p}__`) || k.startsWith(`${p}--`))));
  };
  const fontFaces = (css.match(/@font-face\s*{[^}]*Instrument Serif[^}]*}/g) || []).map((f) => f.replace(/url\(['"]?\.\.\/fonts\//g, "url('fonts/").replace(/\.woff2['"]?\)/g, ".woff2')"));
  fs.writeFileSync(path.join(OUT, 'assets', 'blocks.css'), `/* A-Z Sarl — styles des blocs dynamiques (repris du site d'origine). Les styles des pages sont dans Astra et les réglages des blocs. */\n${fontFaces.join('\n')}\n${filterCss(rules, keep)}\n${fs.readFileSync(path.join(ROOT, 'wp-plugin', 'assets', 'az-extra.css'), 'utf8')}`);

  // 4. Fragments : éléments rendus par les gabarits du site, par langue (repères remplis par l'extension)
  const fragments = { fr: {}, en: {} };
  for (const lang of languages) {
    const ctx = makeCtx(lang);
    const contact = await renderPage('contact', lang);
    const join = await renderPage('join', lang);
    const digital = await renderPage('service', lang, { service: services.find((s) => s.id === 'digital') });
    fragments[lang]['contact-infos'] = extractElement(contact, '<div class="info-cards"');
    fragments[lang]['formulaire-contact'] = extractElement(contact, '<form class="form-card"');
    fragments[lang]['plan-contact'] = extractElement(contact, '<div class="map-embed">');
    fragments[lang]['formulaire-cv'] = extractElement(join, '<form class="form-card"');
    fragments[lang]['carte'] = `<div class="zones" data-map><div class="zones__map">${maliMap(ctx, { headingId: `carte-${lang}` })}</div>${mapLegend(ctx).replace('class="map-legend"', 'class="map-legend map-legend--grid"')}</div>`;
    fragments[lang]['contact-lignes'] = extractElement(contactBand(ctx), '<div class="contact-band__links"');
    try { fragments[lang]['illustration-digital'] = extractElement(digital, '<figure class="figure-plain"'); } catch { /* pas d'illustration */ }
  }

  // 5. Données : pôles, zones, types, icônes, libellés ; textes communs ; contenus de départ
  const data = path.join(OUT, 'data');
  fs.mkdirSync(data, { recursive: true });
  const strings = (copy, keys) => Object.fromEntries(languages.map((lang) => [lang, Object.fromEntries(keys.map((k) => {
    const v = copy[lang][k];
    return [k, typeof v === 'function' ? { one: v(1), many: v(98765).replace('98765', '{n}') } : v];
  }))]));
  const pageCopy = async (m) => (await import(pathToFileURL(path.join(SRC, `templates/pages/${m}.mjs`)).href)).copy;
  const pagesMeta = Object.entries(routes).map(([id, r]) => ({ id, slug: { fr: r.fr.replace(/\.html$/, '').replace(/^index$/, ''), en: r.en.replace(/\.html$/, '').replace(/^index$/, '') } }))
    .concat(services.map((s) => ({ id: `service:${s.id}`, slug: { fr: s.slug.fr.replace(/\.html$/, ''), en: s.slug.en.replace(/\.html$/, '') } })));
  fs.writeFileSync(path.join(data, 'site.json'), JSON.stringify({
    name: site.name, brandLine: site.brandLine, tagline: site.tagline, geo: site.address.geo, ui, pages: pagesMeta,
    services: services.map((s) => ({ id: s.id, icon: s.icon, title: s.title, summary: s.summary, short: s.short, projects: s.projects || [] })),
    places, kinds, kindGroups, categories, galleries: galleries.map((g) => ({ id: g.id, title: g.title })),
    icons: { paths: iconPaths, filled: iconFilled },
    strings: {
      projects: strings(await pageCopy('projects'), ['tocRefs', 'refsEyebrow', 'refsTitle', 'refsLead', 'all', 'refsStatus', 'refsFilter', 'partnerOnly', 'poleOnly', 'showAll', 'featured', 'partner', 'photos', 'photo', 'enlarge', 'modules', 'missions']),
      partners: strings(await pageCopy('partners'), ['all', 'withAz', 'missions', 'status']),
      service: strings(await pageCopy('service'), ['caseEyebrow', 'caseTitle', 'caseAll', 'refsEyebrow', 'refsTitle', 'refsAll']),
    },
  }));
  fs.writeFileSync(path.join(data, 'texts.json'), JSON.stringify({ groups: {}, texts: Object.fromEntries(Object.entries(common).map(([k, v]) => [k, { group: k.split('.')[0], ...v }])) }));
  fs.writeFileSync(path.join(data, 'photos.json'), JSON.stringify(photos));
  fs.writeFileSync(path.join(data, 'mali-map.json'), JSON.stringify(map));
  fs.writeFileSync(path.join(data, 'fragments.json'), JSON.stringify(fragments));
  const big = ['camp-digital-ia-2026', 'evaluation-modele-fres-2021', 'etude-base-world-renew-2026', 'gpec-canam-2026'];
  const onHome = ['camp-digital-ia-2026', 'evaluation-modele-fres-2021', 'gpec-canam-2026'];
  fs.writeFileSync(path.join(data, 'seed.json'), JSON.stringify({
    options: {
      phones: site.phones.map((p) => p.display).join('\n'), whatsapp: site.whatsapp, email: site.email,
      form_email: site.formEndpoint.replace('https://formsubmit.co/', ''),
      street: site.address.street, city: site.address.city, country: site.address.country,
      director_name: site.director.name, director_initials: site.director.initials,
      director_role_fr: site.director.role.fr, director_role_en: site.director.role.en, director_email: site.director.email,
      linkedin: site.social.find((s) => s.icon === 'linkedin')?.url || '', facebook: site.social.find((s) => s.icon === 'facebook')?.url || '',
      legal_host: 'Hostinger International Ltd — hostinger.com',
    },
    partners,
    projects: projects.map((p) => ({ ...p, layout: big.includes(p.id) ? 'case' : 'duo', show_on: [...(onHome.includes(p.id) ? ['home'] : []), ...services.filter((s) => (s.projects || []).includes(p.id)).map((s) => s.id)] })),
    references,
  }));

  console.log('✓ Extension générée dans dist-plugin/az-sarl/');
  if (!process.argv.includes('--no-zip')) {
    const zip = path.join(ROOT, 'livrables', 'az-sarl-extension.zip');
    fs.mkdirSync(path.dirname(zip), { recursive: true });
    fs.rmSync(zip, { force: true });
    if (process.platform === 'win32') execFileSync(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe'), ['-a', '-c', '-f', zip, '-C', path.dirname(OUT), 'az-sarl']);
    else execFileSync('zip', ['-qr', zip, 'az-sarl'], { cwd: path.dirname(OUT) });
    console.log(`✓ Archive : livrables/az-sarl-extension.zip (${(fs.statSync(zip).size / 1e6).toFixed(1)} Mo)`);
  }
}

build().catch((err) => { console.error(err); process.exit(1); });
