/* Administration A-Z Sarl : remplacement des photos du site (menu « Photos du site »). */
jQuery(function ($) {
  $('[data-az-photo]').each(function () {
    var card = $(this);
    var input = card.find('input[type=hidden]');
    var img = card.find('img');
    var state = card.find('.az-photo-card__state');
    var reset = card.find('[data-az-photo-reset]');
    card.on('click', '[data-az-photo-pick]', function () {
      var frame = wp.media({ title: 'Choisir une photo', library: { type: 'image' }, multiple: false, button: { text: 'Utiliser cette photo' } });
      frame.on('select', function () {
        var a = frame.state().get('selection').first().toJSON();
        input.val(a.id);
        img.attr('src', a.sizes && a.sizes.medium ? a.sizes.medium.url : a.url);
        state.text('Remplacée (à enregistrer)');
        card.addClass('is-replaced');
        reset.prop('hidden', false);
      });
      frame.open();
    });
    reset.on('click', function () {
      input.val('');
      img.attr('src', card.data('original'));
      state.text('Photo d’origine (à enregistrer)');
      card.removeClass('is-replaced');
      reset.prop('hidden', true);
    });
  });
});
