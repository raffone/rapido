(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Toggle = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Toggle', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Toggle.defaultOptions, options);

      var baseClass = '.' + base.el.className + ' ';
      var loop = baseClass + base.options.titleClass;

      $(loop).each(function(i, el) {
        toggle(el, baseClass);
      });

    };

    var toggle = function(el, baseClass) {

      $(el).click(function() {

        var titleClass = base.options.titleClass.replace(/(\[|\])/gi, '');
        var contentClass = base.options.contentClass.replace(/(\[|\])/gi, '');

        var id = $(this).attr(titleClass);
        var description = '[' + contentClass + '="' + id + '"]';

        // Se il pannello e' gia aperto > chiudilo
        if ($(description).hasClass('open')) {
          $(description).removeClass('open');
          $(this).removeClass('open');
          return false;

        // Se nessun pannello e' aperto > aprilo
        } else if (!$(baseClass + '*').hasClass('open')) {
          $(description).addClass('open');
          $(this).addClass('open');
          return false;

        // Se c'e un altro pannello perto > chiudilo, aspetta, e apri
        } else {
          $(baseClass + base.options.titleClass).removeClass('open');
          $(baseClass + base.options.contentClass).removeClass('open');

          $(description)
            .delay(base.options.delay)
            .queue(function(next) {
                $(this).addClass('open');
                next();
              });

          $(this).addClass('open');
          return false;
        }
      });


    };

    base.init();
  };

  $.Rapido.Toggle.defaultOptions = {
    titleClass: '[data-toggle-name]',
    contentClass: '[data-toggle-content]',
    delay: 500
  };

  $.fn.rapido_Toggle = function(options) {
    return this.each(function() {
      (new $.Rapido.Toggle(this, options));
    });
  };

})(jQuery, window, document);
