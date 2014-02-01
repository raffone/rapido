(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Animation = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Animation', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Animation.defaultOptions, options);

      addClass();
    };

    function addClass() {
      var animation, offset, scrollbar, container, isOffsetLayout, added = false;

      // Get the animation to apply
      animation = base.$el.data('animation');

      // Check if is using the offset layout
      isOffsetLayout = $.rapido_Utilities.elemExist(base.options.offsetClass);

      // Set corrent container of the content
      if (isOffsetLayout) {
        container = base.options.offsetClass;
      } else {
        container = window;
      }

      // Get offset of element to animate
      offset = base.$el.position();
      offset = offset.top - base.options.offset;

      $(container).scroll(function(e) {

        // On scroll udate scroll value fro comparison
        if (isOffsetLayout) {
          scrollbar = $(base.options.offsetClass).scrollTop();
        } else {
          scrollbar = $(document).scrollTop();
        }

        // Check if current container offset is less or equal the
        // element's offset and it's not animated already
        if (offset <= scrollbar && !added) {
          base.$el.addClass(animation);
          added = true;
        }

      });
    }

    base.init();
  };

  $.Rapido.Animation.defaultOptions = {
    offset: 500,
    offsetClass: '.offcanvas__content'
  };

  $.fn.rapido_Animation = function(options) {
    return this.each(function() {
      (new $.Rapido.Animation(this, options));
    });
  };

})(jQuery, window, document);
