#!/usr/bin/env node
// Pages du site en blocs Gutenberg (version Astra) — décrites ici à partir des textes et données du site.
// Usage : node build-pages.mjs   →   dist-pages/pages.json et dist-pages/patterns.json
//
// Chaque bloc est décrit par [nom, attributs, blocs intérieurs]. Les blocs sont ensuite fabriqués par l'éditeur
// WordPress lui-même (wp.blocks.createBlock + serialize : wp-plugin/tools/builder.js), ce qui garantit des blocs
// valides. Repères : {img:nom} = photo de la médiathèque, {missions}… = chiffres clés (remplacés à l'affichage).
// Couleurs : palette globale d'Astra (ast-global-color-0 marque … 8 accent). Aucune classe CSS sur mesure.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { site } from './src/data/site.mjs';
import { services } from './src/data/services.mjs';
import { sectors, families } from './src/data/sectors.mjs';
import { galleries } from './src/data/gallery.mjs';
import { ui } from './src/i18n.mjs';
import { common } from './src/templates/components.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'dist-pages');
const copyOf = async (m) => (await import(pathToFileURL(path.join(ROOT, 'src', 'templates', 'pages', `${m}.mjs`)).href)).copy;
const FIG = { missions: '{missions}', partners: '{partenaires}', clients: '{commanditaires}', regions: '{regions}', since: '{depuis}' };

// ---------- Adresses des pages (relatives : valables sur le site de test comme sur azsarl.com) ----------
const SLUGS = {
  home: ['', ''], about: ['a-propos', 'about'], expertises: ['expertises', 'expertise'], projects: ['realisations', 'projects'],
  partners: ['partenaires', 'partners'], join: ['rejoindre', 'join'], contact: ['contact', 'contact-us'], legal: ['mentions-legales', 'legal-notice'], thanks: ['merci', 'thank-you'],
  ...Object.fromEntries(services.map((s) => [`service:${s.id}`, [s.slug.fr.replace('.html', ''), s.slug.en.replace('.html', '')]])),
};
const url = (id, lang) => { const s = SLUGS[id][lang === 'en' ? 1 : 0]; return `/${lang === 'en' ? 'en/' : ''}${s ? `${s}/` : ''}`; };

// ---------- Aides : blocs du cœur de WordPress ----------
const C = (n) => `ast-global-color-${n}`; // 0 marque, 2 titres, 3 texte, 4 fond, 5 blanc, 6 bordure, 7 fond alterné, 8 accent
const em = (s) => String(s ?? '').replace(/<span class="accent">([\s\S]*?)<\/span>/g, '<em>$1</em>');
const PAD = 'clamp(72px,8vw,128px)';
const GUT = 'clamp(16px,4vw,40px)';
const P = (html, a = {}) => ['core/paragraph', { content: em(html), ...a }];
const H = (level, html, a = {}) => ['core/heading', { level, content: em(html), ...a }];
const lead = (html, a = {}) => P(html, { style: { typography: { fontSize: '1.25rem', lineHeight: '1.6' } }, ...a });
const small = (html, a = {}) => P(html, { style: { typography: { fontSize: '0.92rem' } }, textColor: C(3), ...a });
const eyebrow = (t, a = {}) => P(t, { className: 'az-surtitre', textColor: C(8), style: { typography: { fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.16em', textTransform: 'uppercase' } }, ...a });
const arrow = (text, href) => P(`<a href="${href}">${text} →</a>`, { style: { typography: { fontWeight: '700' } } });
const btns = (list, a = {}) => ['core/buttons', { style: { spacing: { margin: { top: '28px' } } }, ...a }, list.map(([text, href, variant, extra = {}]) => ['core/button', { text, url: href, ...(variant === 'outline' ? { className: 'is-style-outline' } : {}), ...extra }])];
const list = (items, a = {}) => ['core/list', { ...a }, items.map((t) => ['core/list-item', { content: em(t) }])];
const img = (name, alt, a = {}) => ['core/image', { img: name, alt, sizeSlug: 'large', linkDestination: 'none', lightbox: { enabled: true }, style: { border: { radius: '24px' } }, ...a }];
const spacer = (h) => ['core/spacer', { height: h }];
const section = (children, { bg = C(4), text, pad = PAD, id, className } = {}) => ['core/group', {
  tagName: 'section', align: 'full', backgroundColor: bg, ...(text ? { textColor: text } : {}), ...(id ? { anchor: id } : {}), ...(className ? { className } : {}),
  style: { spacing: { padding: { top: pad, bottom: pad, left: GUT, right: GUT }, blockGap: '24px' } }, layout: { type: 'constrained', contentSize: '1240px' },
}, children];
const cols = (columns, a = {}) => ['core/columns', { style: { spacing: { blockGap: { left: 'clamp(32px,5vw,72px)', top: '32px' } } }, ...a }, columns.map((c) => ['core/column', c.a || {}, c.children || c])];
const grid = (children, min = '280px', gap = '24px') => ['core/group', { layout: { type: 'grid', minimumColumnWidth: min }, style: { spacing: { blockGap: gap } } }, children];
const card = (children, { bg = C(5), border = true, radius = '24px', pad = '32px', text } = {}) => ['core/group', {
  backgroundColor: bg, ...(text ? { textColor: text } : {}), ...(border ? { borderColor: C(6) } : {}),
  style: { border: { radius, ...(border ? { width: '1px' } : {}) }, spacing: { padding: { top: pad, right: pad, bottom: pad, left: pad }, blockGap: '14px' } },
  layout: { type: 'flex', orientation: 'vertical', justifyContent: 'stretch' },
}, children];
const icon = (nom) => ['az/icone', { nom }];
const az = (name, a = {}) => [`az/${name}`, { align: 'wide', ...a }];
const onDark = (head) => head; // titres sur fond sombre : couleur réglée sur le bloc
const h2 = (html, a = {}) => H(2, html, a);
const head = ({ eb, title, text, split = false, dark = false, center = false }) => {
  const tc = dark ? { textColor: C(5) } : {};
  const ebBlock = eb ? eyebrow(eb, dark ? { textColor: 'ast-global-color-8' } : {}) : null;
  const t = h2(title, { ...tc, ...(center ? { textAlign: 'center' } : {}) });
  if (split && text) return cols([{ a: { verticalAlignment: 'bottom' }, children: [ebBlock, t].filter(Boolean) }, { a: { verticalAlignment: 'bottom' }, children: [lead(text, { ...tc })] }], { verticalAlignment: 'bottom' });
  return ['core/group', { layout: { type: 'constrained', contentSize: center ? '820px' : '860px', justifyContent: center ? 'center' : 'left' }, style: { spacing: { blockGap: '16px' } } }, [ebBlock, t, text ? lead(text, { ...tc, ...(center ? { align: 'center' } : {}) }) : null].filter(Boolean)];
};
const hero = ({ eb, title, text, aside = [] }) => section([
  cols([{ a: { width: aside.length ? '66.66%' : '100%' }, children: [eyebrow(eb), H(1, title), text ? lead(text) : null].filter(Boolean) }, ...(aside.length ? [{ a: { width: '33.33%', verticalAlignment: 'center' }, children: aside }] : [])], { verticalAlignment: 'center' }),
], { bg: C(7), pad: 'clamp(56px,7vw,104px)' });
const ref = (name) => ['core/block', { patternRef: name }]; // composition synchronisée (créée avant les pages)

// ---------- Compositions (patterns) ----------
function contactBandBlocks(lang) {
  const t = (k) => common[k][lang];
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(ui[lang].whatsappMsg)}`;
  return section([
    cols([
      { a: { width: '60%' }, children: [eyebrow(t('commun.contactSurtitre')), h2(t('commun.contactTitre')), btns([[t('commun.contactBouton') + ' →', url('contact', lang)], ['WhatsApp', wa, 'outline', { linkTarget: '_blank', rel: 'noopener noreferrer' }]])] },
      { a: { width: '40%', verticalAlignment: 'center' }, children: [az('coordonnees', { variante: 'lignes', align: undefined })] },
    ], { verticalAlignment: 'center' }),
  ], { bg: C(7) });
}
function expertsBlocks(lang) {
  const t = (k) => common[k][lang];
  return section([
    card([eyebrow(t('commun.expertsSurtitre')), h2(t('commun.expertsTitre'), { textColor: C(5) }), lead(t('commun.expertsTexte'), { textColor: C(5) }), btns([[t('commun.expertsBouton') + ' →', url('join', lang), null, { backgroundColor: C(8) }]])],
      { bg: C(0), border: false, radius: '32px', pad: 'clamp(32px,5vw,72px)', text: C(5) }),
  ], { bg: C(4), pad: 'clamp(40px,5vw,72px)' });
}
const sample = {
  pageHero: hero({ eb: 'Surtitre', title: 'Un titre de page <span class="accent">avec sa fin en couleur.</span>', text: 'Une phrase d’introduction qui présente la page en quelques mots.' }),
  split: section([cols([{ children: [eyebrow('Surtitre'), h2('Un titre de section <span class="accent">sur deux lignes.</span>')] }, { children: [lead('Un paragraphe d’introduction mis en valeur.'), P('Un paragraphe de texte courant, à remplacer.'), arrow('Un lien vers une autre page', '/')] }])]),
  cards: section([head({ eb: 'Surtitre', title: 'Une grille de <span class="accent">cartes.</span>', text: 'Chaque carte : une icône, un titre, un texte. Dupliquer une carte pour en ajouter.', split: true }), grid([1, 2, 3].map((i) => card([icon(['target', 'chart', 'users'][i - 1]), H(3, `Titre de la carte ${i}`), P('Texte court de la carte.')])))], { bg: C(5) }),
  stats: section([grid([['{missions}', 'Missions de référence'], ['{commanditaires}', 'Commanditaires'], ['{regions}', 'Régions d’intervention'], ['5', 'Pôles d’expertise']].map(([v, l]) => card([P(v, { textColor: C(0), style: { typography: { fontSize: 'clamp(2.4rem,4vw,3.4rem)', fontWeight: '800', lineHeight: '1' } } }), P(`<strong>${l}</strong>`)], { bg: C(5) })), '200px')]),
  steps: section([head({ eb: 'Notre démarche', title: 'Quatre étapes, <span class="accent">de la donnée à l’action.</span>', dark: true }), grid(['Comprendre', 'Collecter', 'Analyser', 'Recommander'].map((s, i) => card([P(`0${i + 1}`, { textColor: C(8), style: { typography: { fontWeight: '800', fontSize: '1.4rem' } } }), H(3, s, { textColor: C(5) }), P('Texte de l’étape.', { textColor: C(5) })], { bg: C(1), border: false, text: C(5) })), '220px')], { bg: C(0), text: C(5) }),
  textImage: section([cols([{ a: { verticalAlignment: 'center' }, children: [img('terrain-focus-group', 'Description de la photo')] }, { a: { verticalAlignment: 'center' }, children: [eyebrow('Surtitre'), h2('Texte et <span class="accent">photo.</span>'), lead('Un paragraphe d’introduction.'), list(['Premier point', 'Deuxième point', 'Troisième point'])] }], { verticalAlignment: 'center' })], { bg: C(5) }),
};

// ---------- Pages ----------
async function pagesFor(lang) {
  const L = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.fr));
  const t = ui[lang];
  const tc = (k) => common[k][lang];
  const [home, about, exp, svc, proj, part, join, contact] = await Promise.all(['home', 'about', 'expertises', 'service', 'projects', 'partners', 'join', 'contact'].map(async (m) => (await copyOf(m))[lang]));
  const pages = {};
  const band = ref(`bandeau-contact-${lang}`);
  const experts = ref(`banque-experts-${lang}`);
  const familyBlocks = (only) => grid(families.map((f) => {
    const items = sectors.filter((s) => s.family === f.id && (!only || only.includes(s.id)));
    if (!items.length) return null;
    return card([P(`<strong>${items.length}</strong>`, { textColor: C(8), style: { typography: { fontSize: '1.6rem', fontWeight: '800', lineHeight: '1' } } }), H(3, L(f.title)),
      ...items.map((s) => ['core/group', { layout: { type: 'flex', flexWrap: 'nowrap', verticalAlignment: 'top' }, style: { spacing: { blockGap: '12px' } } }, [icon(s.icon), P(`<strong>${L(s.title)}</strong><br>${L(s.detail)}`, { style: { typography: { fontSize: '0.95rem' } } })]])]);
  }).filter(Boolean), '320px');

  // Accueil
  pages.home = { title: home.title, seo: home.description, blocks: [
    section([cols([
      { a: { width: '55%', verticalAlignment: 'center' }, children: [eyebrow(home.eyebrow), H(1, home.h1, { style: { typography: { fontSize: 'clamp(2.65rem,1.35rem + 4.6vw,5.6rem)', lineHeight: '1' } } }), lead(home.lead),
        btns([[home.cta1 + ' →', url('contact', lang)], [home.cta2, url('expertises', lang), 'outline']]),
        small(`${home.call} <a href="tel:${site.phones[0].tel}">{telephone1}</a>`.replace('{telephone1}', site.phones[0].display))] },
      { a: { width: '45%', verticalAlignment: 'center' }, children: [img('terrain-focus-group', home.altMain, { style: { border: { radius: '32px' } } }), P(`📍 ${home.badge}`, { style: { typography: { fontSize: '0.9rem', fontWeight: '700' } }, textColor: C(0) })] },
    ], { verticalAlignment: 'center' })], { bg: C(4), pad: 'clamp(48px,6vw,96px)' }),
    section([az('logos', { align: 'full' })], { bg: C(5), pad: '28px' }),
    section([
      cols([{ children: [eyebrow(home.introEyebrow), h2(home.introTitle)] }, { children: [lead(home.introLead), P(home.introText), arrow(home.introLink, url('about', lang))] }]),
      spacer('24px'),
      grid(home.stats(FIG).map((s) => card([P(String(s.value ?? ''), { textColor: C(0), style: { typography: { fontSize: 'clamp(2.4rem,4vw,3.4rem)', fontWeight: '800', lineHeight: '1' } } }), P(`<strong>${s.label}</strong>`), small(s.desc)])), '220px'),
    ]),
    section([head({ eb: home.servicesEyebrow, title: home.servicesTitle, text: home.servicesLead, split: true }),
      grid(services.map((s) => card([['core/group', { layout: { type: 'flex', justifyContent: 'space-between' } }, [icon(s.icon), P(s.num, { textColor: C(6), style: { typography: { fontSize: '1.6rem', fontWeight: '800' } } })]],
        H(3, `<a href="${url(`service:${s.id}`, lang)}">${L(s.title)}</a>`), P(L(s.summary)), small(L(s.keys).join(' · ')), arrow(t.learnMore, url(`service:${s.id}`, lang))])), '320px'),
    ], { bg: C(5) }),
    section([head({ eb: home.processEyebrow, title: home.processTitle, text: home.processLead, dark: true }),
      grid(home.steps.map((s, i) => card([icon(s.icon), H(3, `${String(i + 1).padStart(2, '0')} · ${s.title}`, { textColor: C(5) }), P(s.text, { textColor: C(5) }), small(s.tags.join(' · '), { textColor: C(6) })], { bg: C(1), border: false, text: C(5) })), '240px'),
      cols([{ a: { width: '70%', verticalAlignment: 'center' }, children: [lead(home.processQuote, { textColor: C(5) })] }, { a: { width: '30%', verticalAlignment: 'center' }, children: [btns([[home.processBtn + ' →', url('about', lang), 'outline', { textColor: C(5) }]], { layout: { type: 'flex', justifyContent: 'right' } })] }], { verticalAlignment: 'center' }),
    ], { bg: C(0), text: C(5) }),
    section([head({ eb: home.sectorsEyebrow, title: home.sectorsTitle, text: home.sectorsLead, split: true }), familyBlocks()]),
    section([head({ eb: home.mapEyebrow, title: home.mapTitle, text: home.mapText, split: true }), az('carte')], { bg: C(5) }),
    section([cols([
      { a: { width: '40%' }, children: [eyebrow(home.fieldEyebrow), h2(home.fieldTitle), lead(home.fieldText), arrow(home.caseLink, url('projects', lang))] },
      { a: { width: '60%' }, children: [['core/gallery', { columns: 2, linkTo: 'none', sizeSlug: 'large', imageCrop: true, style: { spacing: { blockGap: { top: '16px', left: '16px' } } } }, home.mosaic.map(([p, cap]) => img(p, cap, { caption: cap, style: { border: { radius: '18px' } } }))]] },
    ])]),
    section([head({ eb: home.projectsEyebrow, title: home.projectsTitle, text: home.projectsLead(FIG), split: true }), az('realisations', { source: 'home' }),
      ['core/group', { layout: { type: 'flex', flexWrap: 'wrap' }, style: { spacing: { blockGap: '28px' } } }, [arrow(home.refsLink(FIG), `${url('projects', lang)}#references`), arrow(home.caseLink, url('projects', lang))]]], { bg: C(5) }),
    experts, band,
  ] };

  // Le Bureau
  pages.about = { title: about.title, seo: about.description, blocks: [
    hero({ eb: about.eyebrow, title: about.h1, text: about.lead }),
    section([cols([{ children: [eyebrow(about.whoEyebrow), h2(about.whoTitle)] }, { children: [...about.whoText.map((p, i) => (i === 0 ? lead(p) : P(p))), ['core/quote', { citation: about.quoteBy, style: { spacing: { margin: { top: '32px' } } } }, [P(`« ${about.quote} »`, { style: { typography: { fontSize: '1.3rem' } } })]]] }])]),
    section([head({ eb: about.modelEyebrow, title: about.modelTitle, text: about.modelLead, split: true }), grid(about.model.map((m, i) => card([P(`0${i + 1}`, { textColor: C(8), style: { typography: { fontWeight: '800', fontSize: '1.4rem' } } }), H(3, m.title), P(m.text)], { bg: C(4) })), '240px')], { bg: C(5) }),
    section([head({ eb: about.valuesEyebrow, title: about.valuesTitle, dark: true }), grid(about.values.map((v) => card([icon(v.icon), H(3, v.title, { textColor: C(5) }), P(v.text, { textColor: C(5) })], { bg: C(1), border: false, text: C(5) })), '220px')], { bg: C(0), text: C(5) }),
    section([head({ eb: about.sectorsEyebrow, title: about.sectorsTitle }), familyBlocks()]),
    section([head({ eb: tc('about.zonesSurtitre'), title: about.mapTitle, text: about.mapText, split: true }), az('carte')], { bg: C(5) }),
    section([cols([
      { children: [eyebrow(about.teamEyebrow), h2(about.teamTitle), lead(about.teamText), btns([[`⬇ ${t.brochure}`, `{pdf:${lang}}`, 'outline']])] },
      { a: { verticalAlignment: 'center' }, children: [card([P(L(site.director.role), { textColor: C(8), style: { typography: { fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.8rem' } } }), H(3, '[az cle="directeur"]'), P(`<a href="mailto:${site.director.email}">✉ ${site.director.email}</a>`)])] },
    ], { verticalAlignment: 'center' })]),
    band,
  ] };

  // Expertises
  pages.expertises = { title: exp.title, seo: exp.description, blocks: [
    hero({ eb: exp.eyebrow, title: exp.h1, text: exp.lead }),
    section(services.map((s) => card([cols([
      { a: { width: '12%' }, children: [P(s.num, { textColor: C(6), style: { typography: { fontSize: '2rem', fontWeight: '800', lineHeight: '1' } } }), icon(s.icon)] },
      { a: { width: '48%' }, children: [h2(`<a href="${url(`service:${s.id}`, lang)}">${L(s.title)}</a>`, { style: { typography: { fontSize: 'clamp(1.5rem,1.2rem + 1vw,2rem)' } } }), P(L(s.lead)), arrow(exp.see, url(`service:${s.id}`, lang))] },
      { a: { width: '40%' }, children: [eyebrow(exp.offer), list(s.offer.slice(0, 4).map(L))] },
    ])], { anchor: s.id })), { pad: 'clamp(56px,6vw,96px)' }),
    section([head({ eb: exp.sectorsEyebrow, title: exp.sectorsTitle }), familyBlocks()], { bg: C(5) }),
    band,
  ] };

  // Pôles d'expertise
  for (const [i, s] of services.entries()) {
    const prev = services[(i + services.length - 1) % services.length], next = services[(i + 1) % services.length];
    const accent = (txt) => { const sep = lang === 'en' ? ' and ' : ' et '; const k = txt.lastIndexOf(sep); return k > 0 ? `${txt.slice(0, k)} <em>${txt.slice(k + 1)}</em>` : txt; };
    const sp = s.spotlight;
    const media = s.photo ? img(s.photo, L(s.photoAlt), { caption: L(s.photoAlt) }) : az('illustration', { align: undefined });
    pages[`service:${s.id}`] = { title: L(s.title), seo: L(s.seo), blocks: [
      hero({ eb: `${svc.pole} ${s.num} · ${L(s.tag)}`, title: accent(L(s.title)), text: L(s.lead), aside: [['core/group', { layout: { type: 'flex', justifyContent: 'right' } }, [['az/icone', { nom: s.icon, style: { spacing: { padding: { top: '0' } } } }]]]] }),
      section([cols([
        { children: [eyebrow(svc.offerEyebrow), h2(svc.offerTitle), lead(L(s.summary)), small(L(s.keys).join(' · '), { textColor: C(8) })] },
        { children: [list(s.offer.map(L), { style: { typography: { fontSize: '1.05rem' }, spacing: { blockGap: '12px' } } })] },
      ])]),
      section([cols([
        { a: { verticalAlignment: 'center' }, children: [media] },
        { a: { verticalAlignment: 'center' }, children: [eyebrow(svc.deliverEyebrow), h2(svc.deliverTitle), list(s.deliverables.map(L)), small(svc.deliverNote)] },
      ], { verticalAlignment: 'center' })], { bg: C(5) }),
      ...(sp ? [section([cols([
        { children: [eyebrow(L(sp.eyebrow)), h2(L(sp.title)), lead(L(sp.text)), list(L(sp.benefits)), ['core/quote', { citation: svc.spotConviction }, [P(`« ${L(sp.quote)} »`)]], btns([[svc.spotCta + ' →', url('contact', lang)]])] },
        { a: { verticalAlignment: 'center' }, children: [card([P(`<strong>${sp.name}</strong><br>${sp.sub}`, { textColor: C(5), style: { typography: { fontSize: '1.2rem' } } }), eyebrow(svc.spotSteps), list(L(sp.steps), { ordered: true, textColor: C(5) })], { bg: C(0), border: false, text: C(5), radius: '28px' })] },
      ])], { id: sp.id })] : []),
      section([head({ eb: svc.stepsEyebrow, title: svc.stepsTitle, dark: true }), grid(s.steps.map((st, k) => card([P(`0${k + 1}`, { textColor: C(8), style: { typography: { fontWeight: '800', fontSize: '1.4rem' } } }), H(3, L(st.title), { textColor: C(5) }), P(L(st.text), { textColor: C(5) })], { bg: C(1), border: false, text: C(5) })), '220px')], { bg: C(0), text: C(5) }),
      section([head({ eb: svc.caseEyebrow, title: svc.caseTitle, text: `<a href="${url('projects', lang)}">${svc.caseAll} →</a>`, split: true }), az('realisations', { source: s.id })], { bg: C(5) }),
      section([head({ eb: svc.refsEyebrow, title: svc.refsTitle }), az('references-pole', { pole: s.id })]),
      section([head({ eb: svc.sectorsEyebrow, title: svc.sectorsTitle, text: `<a href="${url('expertises', lang)}">${svc.allSectors} →</a>`, split: true }), familyBlocks(s.sectors),
        cols([{ children: [card([small(`← ${t.prev}`), H(3, `<a href="${url(`service:${prev.id}`, lang)}">${L(prev.title)}</a>`)], { bg: C(4) })] }, { children: [card([small(`${t.next} →`, { align: 'right' }), H(3, `<a href="${url(`service:${next.id}`, lang)}">${L(next.title)}</a>`, { textAlign: 'right' })], { bg: C(4) })] }])], { bg: C(5) }),
      band,
    ] };
  }

  // Réalisations
  pages.projects = { title: proj.title, seo: proj.description, blocks: [
    section([cols([
      { a: { width: '62%' }, children: [eyebrow(proj.eyebrow), H(1, proj.h1), lead(proj.lead(FIG))] },
      { a: { width: '38%', verticalAlignment: 'center' }, children: [card(proj.figures(FIG).map(([n, l]) => P(`<strong style="font-size:2.2rem">${n}</strong>  ${l}`)).concat([arrow(proj.allRefs, '#references')]))] },
    ], { verticalAlignment: 'center' })], { bg: C(7), pad: 'clamp(56px,7vw,104px)' }),
    section([az('sommaire-realisations')], { bg: C(5), pad: '24px' }),
    az('etudes-de-cas', { align: 'full' }),
    section([head({ eb: proj.duoEyebrow, title: proj.duoTitle }), az('formations')]),
    section([head({ eb: proj.refsEyebrow, title: proj.refsTitle, text: proj.refsLead, split: true }), az('references')], { bg: C(5), id: 'references' }),
    ...galleries.map((g, i) => section([head({ eb: tc(g.id === 'terrain' ? 'projects.galerieTerrain' : 'projects.galerieFormations'), title: L(g.title), text: proj.galleryNote }),
      ['core/gallery', { columns: 3, linkTo: 'none', sizeSlug: 'large', imageCrop: true }, g.items.map((it) => img(it.photo, L(it.alt), { caption: L(it.alt), style: { border: { radius: '18px' } } }))],
      ...(g.id === 'formations' ? [small(proj.credit)] : [])], { bg: i % 2 ? C(5) : C(4), id: `g-${g.id}` })),
    band,
  ] };

  // Partenaires
  pages.partners = { title: part.title, seo: part.description, blocks: [
    hero({ eb: part.eyebrow, title: part.h1, text: part.lead }),
    section([az('partenaires'), small(part.note)]),
    section([head({ eb: part.mapEyebrow, title: part.mapTitle, text: part.mapText, split: true }), az('carte')], { bg: C(5) }),
    band,
  ] };

  // Banque d'experts
  pages.join = { title: join.title, seo: join.description, blocks: [
    hero({ eb: join.eyebrow, title: join.h1, text: join.lead, aside: [['core/group', { layout: { type: 'flex', justifyContent: 'right' } }, [icon('network')]]] }),
    section([head({ eb: join.profilesEyebrow, title: join.profilesTitle }), grid(join.profiles.map((p) => card([icon(p.icon), H(3, p.title), P(p.text)])), '220px')]),
    section([head({ eb: join.howEyebrow, title: join.howTitle }), grid(join.how.map((m, i) => card([P(`0${i + 1}`, { textColor: C(8), style: { typography: { fontWeight: '800', fontSize: '1.4rem' } } }), H(3, m.title), P(m.text)], { bg: C(4) })), '220px')], { bg: C(5) }),
    section([cols([
      { a: { width: '40%' }, children: [eyebrow(join.formEyebrow), h2(join.formTitle), H(3, join.whyTitle), list(join.why), small(`${tc('join.formulaireSouci')} [az cle="email"].`)] },
      { a: { width: '60%' }, children: [az('formulaire', { type: 'cv', align: undefined })] },
    ])], { id: 'formulaire' }),
  ] };

  // Contact
  pages.contact = { title: contact.title, seo: contact.description, blocks: [
    hero({ eb: contact.eyebrow, title: contact.h1, text: contact.lead }),
    section([cols([
      { a: { width: '42%' }, children: [az('coordonnees', { variante: 'cartes', align: undefined })] },
      { a: { width: '58%' }, children: [az('formulaire', { type: 'contact', align: undefined })] },
    ])]),
    section([az('plan')], { pad: '0 0 clamp(56px,6vw,96px)' }),
  ] };

  // Mentions légales, Merci
  const legalMod = await import(pathToFileURL(path.join(ROOT, 'src', 'templates', 'pages', 'legal.mjs')).href);
  const legalCtx = { lang, t: ui[lang], L, site: { ...site, legal: { ...site.legal, host: 'Hostinger International Ltd — hostinger.com' } }, href: (id) => url(id, lang), asset: (p) => p, services, sectors };
  const legalBody = legalMod.default(legalCtx).body;
  const legal = legalBody.match(/<div class="prose">([\s\S]*)<\/div><\/div>/)[1].replace(/<br>\n?/g, '<br>');
  pages.legal = { title: tc('legal.titre'), seo: tc('legal.description'), blocks: [
    hero({ eb: tc('legal.surtitre'), title: tc('legal.titre') }),
    section([['core/group', { layout: { type: 'constrained', contentSize: '820px', justifyContent: 'left' } }, [['raw', { html: legal }]]]]),
  ] };
  pages.thanks = { title: tc('merci.nomPage'), seo: tc('merci.description'), noindex: true, blocks: [
    section([['core/group', { layout: { type: 'constrained', contentSize: '760px' } }, [eyebrow(tc('merci.surtitre'), { align: 'center' }), H(1, tc('merci.titre'), { textAlign: 'center' }), lead(tc('merci.texte'), { align: 'center' }),
      btns([[tc('merci.boutonAccueil') + ' →', url('home', lang)], [tc('merci.boutonExpertises'), url('expertises', lang), 'outline']], { layout: { type: 'flex', justifyContent: 'center' } })]]], { bg: C(7), pad: 'clamp(96px,12vw,180px)' }),
  ] };
  return pages;
}

async function build() {
  fs.mkdirSync(OUT, { recursive: true });
  const out = {};
  for (const lang of ['fr', 'en']) for (const [id, p] of Object.entries(await pagesFor(lang))) out[`${id}@${lang}`] = p;
  fs.writeFileSync(path.join(OUT, 'pages.json'), JSON.stringify(out));
  const patterns = [
    ...['fr', 'en'].flatMap((lang) => [
      { key: `bandeau-contact-${lang}`, title: lang === 'fr' ? 'Bandeau de contact (FR)' : 'Contact band (EN)', synced: true, category: 'az-sarl', blocks: [contactBandBlocks(lang)] },
      { key: `banque-experts-${lang}`, title: lang === 'fr' ? 'Appel « Banque d’experts » (FR)' : 'Expert pool call (EN)', synced: true, category: 'az-sarl', blocks: [expertsBlocks(lang)] },
    ]),
    { key: 'section-en-tete', title: 'Section : en-tête de page', synced: false, category: 'az-sarl', blocks: [sample.pageHero] },
    { key: 'section-titre-texte', title: 'Section : titre et texte sur deux colonnes', synced: false, category: 'az-sarl', blocks: [sample.split] },
    { key: 'section-cartes', title: 'Section : grille de cartes avec icône', synced: false, category: 'az-sarl', blocks: [sample.cards] },
    { key: 'section-chiffres', title: 'Section : chiffres clés', synced: false, category: 'az-sarl', blocks: [sample.stats] },
    { key: 'section-etapes', title: 'Section sombre : étapes numérotées', synced: false, category: 'az-sarl', blocks: [sample.steps] },
    { key: 'section-texte-photo', title: 'Section : texte et photo', synced: false, category: 'az-sarl', blocks: [sample.textImage] },
  ];
  fs.writeFileSync(path.join(OUT, 'patterns.json'), JSON.stringify(patterns));
  console.log(`✓ ${Object.keys(out).length} pages et ${patterns.length} compositions dans dist-pages/`);
}

build().catch((err) => { console.error(err); process.exit(1); });
