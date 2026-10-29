#!/usr/bin/env node
// Génère la plaquette de présentation A4 (2 pages, FR et EN) à partir des mêmes données que le site.
// Usage : node plaquette.mjs   →   src/assets/docs/plaquette-a-z-sarl-fr.pdf et -en.pdf
// Nécessite Google Chrome ou Microsoft Edge installé (impression PDF sans interface).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { site } from './src/data/site.mjs';
import { services } from './src/data/services.mjs';
import { sectors, families } from './src/data/sectors.mjs';
import { partners } from './src/data/partners.mjs';
import { icon } from './src/templates/icons.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(ROOT, 'src', 'assets');
const OUT = path.join(ASSETS, 'docs');
const TMP = path.join(ROOT, '.plaquette-tmp');
const url = (p) => pathToFileURL(path.join(ASSETS, p)).href;

const T = {
  fr: {
    line: 'Bureau d’études & de conseil · Bamako, Mali',
    areas: 'Suivi-évaluation · Études socio-économiques · Transformation digitale · Formation · Conseil en politiques publiques',
    h1: 'De la donnée <em>à l’action.</em>',
    who: 'Qui sommes-nous',
    whoText: 'A-Z Sarl offre des prestations dans les domaines du développement économique, social et culturel, en particulier le suivi-évaluation des projets, les études socio-économiques, la transformation digitale et la formation professionnelle. Pour chaque mandat, nous composons une équipe sur mesure — consultants, experts, formateurs et praticiens d’entreprise — à partir de notre large banque de CV d’experts.',
    facts: [['5', 'pôles d’expertise'], ['13', 'domaines d’intervention'], ['CV', 'banque d’experts pluridisciplinaires']],
    poles: 'Nos 5 pôles d’expertise',
    domains: '13 domaines d’intervention',
    method: 'Notre démarche',
    steps: [['Comprendre', 'Cadrage, termes de référence, indicateurs'], ['Collecter', 'Enquêtes terrain et collecte digitale'], ['Analyser', 'Statistiques, analyse qualitative, tableaux de bord'], ['Agir', 'Recommandations, formation, capitalisation']],
    ref: 'Référence',
    refTitle: 'Formation en GPEC avec la CANAM',
    refText: 'Gestion prévisionnelle des emplois et des compétences — du 30 mars au 3 avril 2026, Bamako. Attestations de formation délivrées aux participants.',
    partners: 'Ils nous font confiance',
    contact: 'Contact',
    director: 'Directeur Technique',
    web: 'Site web',
  },
  en: {
    line: 'Consulting & research · Bamako, Mali',
    areas: 'Monitoring & evaluation · Socio-economic studies · Digital transformation · Training · Public policy advisory',
    h1: 'From data <em>to action.</em>',
    who: 'Who we are',
    whoText: 'A-Z Sarl provides services in economic, social and cultural development, in particular project monitoring and evaluation, socio-economic studies, digital transformation and vocational training. For each assignment we build a tailored team of consultants, experts, trainers and business practitioners, drawn from our large pool of expert CVs.',
    facts: [['5', 'practice areas'], ['13', 'sectors'], ['CV', 'multidisciplinary expert pool']],
    poles: 'Our 5 practice areas',
    domains: '13 sectors',
    method: 'Our approach',
    steps: [['Understand', 'Scoping, terms of reference, indicators'], ['Collect', 'Field surveys and digital data collection'], ['Analyse', 'Statistics, qualitative analysis, dashboards'], ['Act', 'Recommendations, training, learning']],
    ref: 'Reference',
    refTitle: 'GPEC training with CANAM',
    refText: 'Strategic workforce and skills planning — 30 March to 3 April 2026, Bamako. Training certificates awarded to participants.',
    partners: 'They trust us',
    contact: 'Contact',
    director: 'Technical Director',
    web: 'Website',
  },
};

function partnerMark(p, lang) {
  if (!p.logo) return `<span class="plate">${p.acronym}</span>`;
  const file = p.logo.raster ? `img/partners/${p.logo.file}.png` : `img/partners/${p.logo.file}`;
  return `<img class="lg lg-${p.id}" src="${url(file)}" alt="${p.acronym}">`;
}

function html(lang) {
  const t = T[lang];
  const L = (o) => (typeof o === 'string' ? o : o[lang]);
  const photo = (n, w) => url(`img/photos/${n}-${w}.jpg`);
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:Manrope;font-weight:200 800;src:url("${url('fonts/manrope-latin.woff2')}") format("woff2")}
@font-face{font-family:Manrope;font-weight:200 800;src:url("${url('fonts/manrope-latin-ext.woff2')}") format("woff2");unicode-range:U+0100-02BA}
@font-face{font-family:'Instrument Serif';font-style:italic;src:url("${url('fonts/instrument-serif-italic-latin.woff2')}") format("woff2")}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Manrope,sans-serif;color:#3a4955;font-size:9.6pt;line-height:1.5}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#FAF8F4}
.page:last-child{page-break-after:auto}
.icon{width:1.2em;height:1.2em;flex:none}.icon-stroke{fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
h2{font-size:13pt;color:#0F2E47;font-weight:800;letter-spacing:-.02em;margin-bottom:4mm;display:flex;align-items:center;gap:3mm}
h2::before{content:"";width:7mm;height:.6mm;background:#0B7C87;border-radius:1mm}
.hero{background:#0B2538;color:#fff;padding:12mm 16mm 10mm;position:relative;height:104mm}
.hero .glow{position:absolute;right:-40mm;top:-50mm;width:150mm;height:150mm;border-radius:50%;background:radial-gradient(circle,rgba(34,179,191,.32),transparent 62%)}
.brand{display:flex;align-items:center;gap:4mm;position:relative}.brand img{width:26mm}
.brand b{font-size:19pt;letter-spacing:-.03em}.brand small{display:block;font-size:7.5pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.62)}
.hero h1{position:relative;margin-top:11mm;font-size:34pt;line-height:1;letter-spacing:-.045em;font-weight:800;width:100mm}
.hero h1 em{display:block;font-family:'Instrument Serif',serif;font-weight:400;color:#45C3CD;font-size:38pt;letter-spacing:-.01em}
.hero .tag{position:relative;margin-top:6mm;width:100mm;color:rgba(255,255,255,.8);font-size:10pt}
.hero .ph{position:absolute;right:16mm;top:14mm;width:66mm;height:78mm;border-radius:7mm;overflow:hidden;box-shadow:0 8mm 20mm -6mm rgba(0,0,0,.55)}
.hero .ph img{width:100%;height:100%;object-fit:cover;object-position:35% 50%}
.hero svg.sw{position:absolute;right:6mm;top:8mm;width:110mm;height:100mm;overflow:visible}
.body{padding:10mm 16mm 0}
.intro{display:grid;grid-template-columns:1.45fr 1fr;gap:8mm;align-items:start}
.facts{display:grid;gap:2.5mm}.fact{display:flex;align-items:center;gap:3mm;background:#fff;border:.3mm solid #e6dfd3;border-radius:3mm;padding:2.6mm 3.5mm}
.fact b{font-size:17pt;color:#0F2E47;font-weight:800;letter-spacing:-.04em;min-width:13mm}.fact span{font-weight:700;color:#0F2E47;font-size:9pt;line-height:1.3}
.poles{display:grid;grid-template-columns:1fr 1fr;gap:3mm;margin-top:8mm}
.strip{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:3mm;margin-top:4mm;height:25mm}
.strip img{width:100%;height:25mm;object-fit:cover;border-radius:3.5mm}
.brand>div{max-width:70mm}
.fam li{padding:.8mm 0;font-size:7.8pt}.fam div{padding:3mm}
.steps{padding:4.5mm 5mm !important}
.ref img{height:20mm !important}.row2{margin-top:4mm !important}.contact{margin-top:4mm !important;padding:4.5mm 6mm !important}
.page:nth-child(2) .body{padding-top:10mm !important}
.page:nth-child(2) h2{margin-bottom:3mm}
.pole{background:#fff;border:.3mm solid #e6dfd3;border-radius:3.5mm;padding:3.5mm 4mm;display:grid;grid-template-columns:10mm 1fr;gap:3mm}
.pole:first-child{grid-column:span 2;background:#0F2E47;border-color:#0F2E47;color:rgba(255,255,255,.8)}
.pole:first-child h3{color:#fff}.pole:first-child .ic{background:rgba(69,195,205,.16);color:#45C3CD}
.ic{width:10mm;height:10mm;border-radius:2.6mm;background:#ebf8f9;color:#0B7C87;display:grid;place-items:center}.ic .icon{width:5.6mm;height:5.6mm}
.pole h3{font-size:10pt;color:#0F2E47;font-weight:800;line-height:1.25;letter-spacing:-.01em}.pole p{font-size:8.6pt;margin-top:1mm}
.num{font-family:'Instrument Serif',serif;font-style:italic;color:#129AA6;font-size:11pt;margin-right:1.5mm}
.foot{position:absolute;left:16mm;right:16mm;bottom:9mm;display:flex;justify-content:space-between;font-size:7.6pt;color:#5f6d78;border-top:.3mm solid #e6dfd3;padding-top:3mm}
.fam{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.fam div{background:#fff;border:.3mm solid #e6dfd3;border-radius:3.5mm;padding:3.5mm}
.fam h3{font-size:8.8pt;color:#0F2E47;font-weight:800;margin-bottom:2mm;line-height:1.25}
.fam li{list-style:none;font-size:8.2pt;line-height:1.35;padding:1.4mm 0;border-top:.25mm dashed #e6dfd3}.fam li:first-of-type{border-top:0}
.fam li b{display:block;color:#0F2E47}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;background:#0B2538;border-radius:4mm;padding:6mm 5mm;color:rgba(255,255,255,.75)}
.steps div{position:relative}.steps b{display:block;color:#fff;font-size:10.5pt;margin:1mm 0}.steps i{font-family:'Instrument Serif',serif;color:#45C3CD;font-size:15pt}
.steps p{font-size:8.2pt}
.row2{display:grid;grid-template-columns:1.15fr 1fr;gap:6mm;margin-top:7mm}
.ref{background:#fff;border:.3mm solid #e6dfd3;border-radius:3.5mm;overflow:hidden}
.ref img{width:100%;height:30mm;object-fit:cover}.ref div{padding:3.5mm 4mm}.ref small{color:#d9962b;font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:7pt}
.ref b{display:block;color:#0F2E47;font-size:10.5pt;margin:1mm 0}
.logos{display:flex;flex-wrap:wrap;align-items:center;gap:4mm 6mm}
.lg{height:11mm;width:auto}.lg-world-renew{height:6.5mm}.lg-luxdev{height:10mm}.lg-canam{height:12mm}
.plate{font-weight:800;color:#0F2E47;font-size:9pt;border:.3mm solid #d6cdbe;border-radius:2mm;padding:1.2mm 2.4mm}
.contact{margin-top:7mm;background:#0F2E47;color:rgba(255,255,255,.82);border-radius:4mm;padding:6mm 7mm;display:grid;grid-template-columns:1fr 1fr 1fr;gap:5mm;font-size:8.8pt}
.contact h3{color:#45C3CD;font-size:7.4pt;letter-spacing:.14em;text-transform:uppercase;margin-bottom:1.5mm}
.contact b{color:#fff}
</style></head><body>
<section class="page">
  <div class="hero"><div class="glow"></div>
    <div class="ph"><img src="${photo('terrain-focus-group', 800)}"></div>
    <svg class="sw" viewBox="0 0 440 400"><path d="M-30 360C110 345 300 270 395 50" fill="none" stroke="#22B3BF" stroke-width="9" stroke-linecap="round"/><path d="M406 18 380 48l31 9Z" fill="#22B3BF"/><circle cx="20" cy="352" r="8" fill="#0B2538" stroke="#22B3BF" stroke-width="4"/><circle cx="80" cy="343" r="8" fill="#0B2538" stroke="#22B3BF" stroke-width="4"/></svg>
    <div class="brand"><img src="${url('img/brand/az-mark-white.svg')}"><div><b>${site.name}</b><small>${t.line}</small></div></div>
    <h1>${t.h1}</h1>
    <p class="tag">${t.areas}</p>
  </div>
  <div class="body">
    <div class="intro">
      <div><h2>${t.who}</h2><p>${t.whoText}</p></div>
      <div class="facts">${t.facts.map(([n, s]) => `<div class="fact"><b>${n}</b><span>${s}</span></div>`).join('')}</div>
    </div>
    <div class="poles">${services.map((s) => `<div class="pole"><span class="ic">${icon(s.icon)}</span><div><h3><span class="num">${s.num}</span>${L(s.title)}</h3><p>${L(s.summary)}</p></div></div>`).join('')}</div>
    <div class="strip"><img src="${photo('terrain-entretien-meres', 800)}"><img src="${photo('terrain-enfants', 672)}"><img src="${photo('formation-salle', 800)}"></div>
  </div>
  <div class="foot"><span>${site.name} · ${site.address.street}, ${site.address.city}</span><span>1 / 2</span></div>
</section>
<section class="page">
  <div class="body" style="padding-top:14mm">
    <h2>${t.domains}</h2>
    <div class="fam">${families.map((f) => `<div><h3>${L(f.title)}</h3><ul>${sectors.filter((s) => s.family === f.id).map((s) => `<li><b>${L(s.title)}</b>${L(s.detail)}</li>`).join('')}</ul></div>`).join('')}</div>
    <h2 style="margin-top:7mm">${t.method}</h2>
    <div class="steps">${t.steps.map(([a, b], i) => `<div><i>0${i + 1}</i><b>${a}</b><p>${b}</p></div>`).join('')}</div>
    <div class="row2">
      <div><h2>${t.ref}</h2><div class="ref"><img src="${photo('formation-gpec-canam', 800)}"><div><small>2026</small><b>${t.refTitle}</b><p>${t.refText}</p></div></div></div>
      <div><h2>${t.partners}</h2><div class="logos">${partners.map((p) => partnerMark(p, lang)).join('')}</div></div>
    </div>
    <div class="contact">
      <div><h3>${t.contact}</h3><b>${site.address.street}</b><br>${site.address.city}, ${site.address.country}</div>
      <div><h3>Tél. · E-mail</h3>${site.phones.map((p) => `<b>${p.display}</b>`).join('<br>')}<br>${site.email}</div>
      <div><h3>${t.director}</h3><b>${site.director.name}</b><br>${site.director.email}</div>
    </div>
  </div>
  <div class="foot"><span>${L(site.tagline)}</span><span>2 / 2</span></div>
</section>
</body></html>`;
}

const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];
const browser = browsers.find((b) => fs.existsSync(b));
if (!browser) { console.error('Chrome ou Edge introuvable.'); process.exit(1); }

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
for (const lang of ['fr', 'en']) {
  const src = path.join(TMP, `plaquette-${lang}.html`);
  const pdf = path.join(OUT, `plaquette-a-z-sarl-${lang}.pdf`);
  fs.writeFileSync(src, html(lang));
  execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=4000',
    `--print-to-pdf=${pdf}`, pathToFileURL(src).href], { stdio: 'ignore' });
  console.log(`✓ ${path.relative(ROOT, pdf)} (${Math.round(fs.statSync(pdf).size / 1024)} Ko)`);
}
if (!process.env.KEEP_HTML) fs.rmSync(TMP, { recursive: true, force: true });
