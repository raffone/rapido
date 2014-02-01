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

        // If target panel is already open then close it
        if ($(description).hasClass('open')) {
          $(description).removeClass('open');
          $(this).removeClass('open');
          return false;

        // If no panel is open then open it
        } else if (!$(baseClass + '*').hasClass('open')) {
          $(description).addClass('open');
          $(this).addClass('open');
          return false;

        // If there is already an open panel then close it and open the target panel
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
