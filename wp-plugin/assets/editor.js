/* Blocs dynamiques A-Z Sarl dans l'éditeur : aperçu rendu par le serveur et réglages dans la colonne de droite. */
(function (wp, cfg) {
  if (!wp || !cfg) return;
  var el = wp.element.createElement;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var Inspector = wp.blockEditor.InspectorControls;
  var PanelBody = wp.components.PanelBody;
  var SelectControl = wp.components.SelectControl;
  var Notice = wp.components.Notice;
  var ServerSideRender = wp.serverSideRender;

  var labels = {
    pole: 'Pôle d’expertise',
    source: 'Réalisations affichées',
    variante: 'Présentation',
    type: 'Formulaire',
    nom: 'Icône',
  };
  function options(name, attr) {
    if (name === 'pole') return cfg.poles;
    if (name === 'source') return [{ value: 'home', label: 'Mises en avant sur l’accueil' }].concat(cfg.poles.map(function (p) { return { value: p.value, label: 'Pôle : ' + p.label }; }));
    if (name === 'variante') return [{ value: 'cartes', label: 'Cartes (page Contact)' }, { value: 'lignes', label: 'Lignes (bandeau de contact)' }];
    if (name === 'type') return [{ value: 'contact', label: 'Contact' }, { value: 'cv', label: 'Dépôt de CV (banque d’experts)' }];
    if (name === 'nom') return cfg.icons.map(function (i) { return { value: i, label: i }; });
    return (attr.enum || []).map(function (v) { return { value: v, label: v }; });
  }

  cfg.blocks.forEach(function (b) {
    wp.blocks.registerBlockType(b.name, {
      apiVersion: 3,
      title: b.title,
      description: b.description,
      category: 'az-sarl',
      icon: b.icon,
      attributes: Object.assign({ className: { type: 'string' }, align: { type: 'string' } }, b.attributes),
      supports: { align: ['wide', 'full'], html: false, spacing: { margin: true, padding: true }, color: { background: true, text: true } },
      edit: function (props) {
        var controls = Object.keys(b.attributes).map(function (name) {
          return el(SelectControl, {
            key: name,
            label: labels[name] || name,
            value: props.attributes[name],
            options: options(name, b.attributes[name]),
            onChange: function (v) { var o = {}; o[name] = v; props.setAttributes(o); },
          });
        });
        return el('div', useBlockProps(),
          el(Inspector, null,
            el(PanelBody, { title: 'Réglages', initialOpen: true },
              controls.length ? controls : null,
              el(Notice, { status: 'info', isDismissible: false }, 'Contenu géré dans les menus Réalisations, Références, Partenaires et Coordonnées.'))),
          el(ServerSideRender, { block: b.name, attributes: props.attributes, httpMethod: 'POST' }));
      },
      save: function () { return null; },
    });
  });
})(window.wp, window.azBlocks);
