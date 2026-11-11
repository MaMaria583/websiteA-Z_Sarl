/* Administration A-Z Sarl : choix du logo d'un partenaire et gestion des photos d'une réalisation. */
jQuery(function ($) {
  // ----- Logo d'un partenaire -----
  $('[data-az-logo]').each(function () {
    var box = $(this);
    var input = box.find('input[type=hidden]');
    var preview = box.find('.az-logo__preview');
    box.on('click', '[data-az-logo-pick]', function () {
      var frame = wp.media({ title: 'Choisir un logo', library: { type: 'image' }, multiple: false, button: { text: 'Utiliser ce logo' } });
      frame.on('select', function () {
        var a = frame.state().get('selection').first().toJSON();
        input.val(JSON.stringify({ att: a.id }));
        preview.html($('<img alt="">').attr('src', (a.sizes && a.sizes.medium ? a.sizes.medium.url : a.url)));
      });
      frame.open();
    });
    box.on('click', '[data-az-logo-clear]', function () {
      input.val('null');
      preview.html('<em>Aucun logo</em>');
    });
  });

  // ----- Photos d'une réalisation -----
  $('[data-az-photos]').each(function () {
    var box = $(this);
    var input = box.find('input[type=hidden]');
    var list = box.find('.az-photos__list');
    var items = [];
    try { items = JSON.parse(input.val()) || []; } catch (e) { items = []; }

    function row(item) {
      var li = $('<li class="az-photo"></li>').data('item', item);
      li.append('<span class="az-photo__handle dashicons dashicons-move" title="Glisser pour déplacer"></span>');
      li.append($('<img alt="">').attr('src', item.thumb || ''));
      var fields = $('<div class="az-photo__fields"></div>');
      fields.append($('<input type="text" placeholder="Description de la photo (français)">').attr('data-alt', 'fr').val((item.alt && item.alt.fr) || ''));
      fields.append($('<input type="text" placeholder="Photo description (English)">').attr('data-alt', 'en').val((item.alt && item.alt.en) || ''));
      li.append(fields);
      li.append('<button type="button" class="button-link az-remove" data-az-photo-remove>Retirer</button>');
      return li;
    }

    function sync() {
      var out = [];
      list.children().each(function () {
        var li = $(this);
        var item = li.data('item');
        var entry = item.att ? { att: item.att } : { id: item.id };
        entry.alt = { fr: li.find('[data-alt=fr]').val(), en: li.find('[data-alt=en]').val() };
        entry.thumb = item.thumb;
        out.push(entry);
      });
      input.val(JSON.stringify(out));
    }

    items.forEach(function (item) { list.append(row(item)); });
    list.sortable({ handle: '.az-photo__handle', axis: 'y', update: sync });
    list.on('input', 'input', sync);
    list.on('click', '[data-az-photo-remove]', function () { $(this).closest('li').remove(); sync(); });

    box.on('click', '[data-az-photos-add]', function () {
      var frame = wp.media({ title: 'Ajouter des photos', library: { type: 'image' }, multiple: true, button: { text: 'Ajouter à la réalisation' } });
      frame.on('select', function () {
        frame.state().get('selection').each(function (model) {
          var a = model.toJSON();
          var text = a.alt || a.caption || '';
          list.append(row({ att: a.id, thumb: (a.sizes && a.sizes.thumbnail ? a.sizes.thumbnail.url : a.url), alt: { fr: text, en: '' } }));
        });
        sync();
      });
      frame.open();
    });

    $('#post').on('submit', sync);
  });
});
