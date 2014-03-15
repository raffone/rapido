(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Scroll = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Scroll', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Scroll.defaultOptions, options);

      scroll();
    };

    var scroll = function() {
      var container, offset, target, isOffsetLayout;

      // Get id of target
      target = base.$el.attr('href');

      // Check if is using the offset layout
      isOffsetLayout = $.rapido_Utilities.elemExist(base.options.offsetClass);

      // Set corrent container of the content
      if (isOffsetLayout) {
        container = '.offcanvas__content';
      } else {
        container = 'html, body';
      }

      // Add offset to taget position
      offset = $(target).offset().top - base.options.offset;

      // On click go to taget
      base.$el.on('click', function(e) {

        $(container).animate({
          scrollTop: offset
        }, base.options.duration);

        e.preventDefault();

      });

    };

    base.init();
  };

  $.Rapido.Scroll.defaultOptions = {
    duration: 1600,
    offset: 20,
    offsetClass: '.offcanvas__content'
  };

  $.fn.rapido_Scroll = function(options) {
    return this.each(function() {
      (new $.Rapido.Scroll(this, options));
    });
  };

})(jQuery, window, document);
