(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Toggle = function(el, options) {
    var base = this,
        titleClass,
        contentClass,
        id,
        description,
        baseClass,
        titles_loop,
        contents_loop,
        height = [];

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Toggle', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Toggle.defaultOptions, options);

      baseClass = $.rapido_Utilities.getClass(base.el) + ' ';
      titles_loop = baseClass + base.options.titleClass;
      contents_loop = baseClass + base.options.contentClass;

      // For each titleClass attach click event
      $(titles_loop).each(function(i, el) {
        toggle(el, baseClass);
      });

      if (base.options.addMaxHeight) {
        $(contents_loop).each(function(i, el) {
          height.push($(el).height());
          base.$el.css(base.options.addMaxHeight_position, Math.max.apply(null, height) + 'px');
        });
      }


    };

    var toggle = function(el, baseClass) {

      $(el).click(function() {

        titleClass = base.options.titleClass.replace(/(\[|\])/gi, '');
        contentClass = base.options.contentClass.replace(/(\[|\])/gi, '');

        id = $(this).attr(titleClass);
        description = '[' + contentClass + '="' + id + '"]';

        // If target panel is already open and is closable then close it
        if ($(description).hasClass('open')) {
          if (base.options.closable) {
            $(description).removeClass('open');
            $(this).removeClass('open');
          }

        // If no panel is open then open it
        } else if (!$(baseClass + '*').hasClass('open')) {
          $(description).addClass('open');
          $(this).addClass('open');

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
        }

        return false;
      });


    };

    base.init();
  };

  $.Rapido.Toggle.defaultOptions = {
    titleClass: '[data-toggle-name]',
    contentClass: '[data-toggle-content]',
    delay: 500,
    closable: true,
    addMaxHeight: false,
    addMaxHeight_position: 'padding-top',
  };

  $.fn.rapido_Toggle = function(options) {
    return this.each(function() {
      (new $.Rapido.Toggle(this, options));
    });
  };

})(jQuery, window, document);
