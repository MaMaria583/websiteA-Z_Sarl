/*
 * Constructeur des pages en blocs Gutenberg — à exécuter dans l'administration WordPress (éditeur de blocs ouvert),
 * par un administrateur. Il lit les descriptions produites par build-pages.mjs, fabrique les blocs avec l'API de
 * l'éditeur (createBlock + serialize : blocs toujours valides) et enregistre compositions et pages par l'API REST.
 *
 *   await azBuild({ base: '/wp-content/uploads/az-import/' })
 *
 * maps.json (produit sur le serveur) : { media: {nom: {id, url}}, pdf: {fr, en}, pages: {'home@fr': id, …} }
 */
window.azBuild = async function azBuild({ base, only = null, patternsOnly = false } = {}) {
  const get = (f) => fetch(base + f + '?v=' + Date.now(), { credentials: 'same-origin' }).then((r) => r.json());
  const [pages, patterns, maps] = await Promise.all([get('pages.json'), get('patterns.json'), get('maps.json')]);
  const api = wp.apiFetch;
  const log = [];

  // Catégorie des compositions « A-Z Sarl »
  let cats = await api({ path: '/wp/v2/wp_pattern_category?per_page=100&search=A-Z' });
  let cat = cats.find((c) => c.name === 'A-Z Sarl');
  if (!cat) cat = await api({ path: '/wp/v2/wp_pattern_category', method: 'POST', data: { name: 'A-Z Sarl', slug: 'az-sarl' } });

  const refs = {};
  const existing = await api({ path: '/wp/v2/blocks?per_page=100&context=edit' });

  function toBlocks(node) {
    const [name, attrs = {}, inner = []] = node;
    if (name === 'raw') return wp.blocks.rawHandler({ HTML: attrs.html });
    const a = JSON.parse(JSON.stringify(attrs));
    if (name === 'core/image') {
      const m = maps.media[a.img];
      if (!m) throw new Error('Photo inconnue : ' + a.img);
      delete a.img;
      a.id = m.id; a.url = m.url;
    }
    if (name === 'core/block') {
      const id = refs[a.patternRef];
      if (!id) throw new Error('Composition inconnue : ' + a.patternRef);
      return [wp.blocks.createBlock('core/block', { ref: id })];
    }
    if (typeof a.url === 'string') a.url = a.url.replace(/^\{pdf:(fr|en)\}$/, (_, l) => maps.pdf[l]);
    if (!wp.blocks.getBlockType(name)) throw new Error('Bloc inconnu : ' + name);
    return [wp.blocks.createBlock(name, a, inner.filter(Boolean).flatMap(toBlocks))];
  }
  const serialize = (nodes) => wp.blocks.serialize(nodes.filter(Boolean).flatMap(toBlocks));

  // 1. Compositions (les synchronisées servent aux pages : bandeau de contact, banque d'experts)
  for (const p of patterns) {
    const content = serialize(p.blocks);
    const data = { title: p.title, content, status: 'publish', wp_pattern_sync_status: p.synced ? '' : 'unsynced', wp_pattern_category: [cat.id] };
    const found = existing.find((e) => (e.title.raw || e.title.rendered) === p.title);
    const saved = await api({ path: '/wp/v2/blocks' + (found ? '/' + found.id : ''), method: 'POST', data });
    refs[p.key] = saved.id;
    log.push(['composition', p.title, saved.id]);
  }
  if (patternsOnly) return log;

  // 2. Pages
  for (const [key, p] of Object.entries(pages)) {
    if (only && !only.includes(key)) continue;
    const id = maps.pages[key];
    if (!id) { log.push(['page absente', key]); continue; }
    const content = serialize(p.blocks);
    await api({ path: '/wp/v2/pages/' + id, method: 'POST', data: { content, title: p.title, excerpt: p.seo } });
    log.push(['page', key, id, content.length]);
  }
  return log;
};
