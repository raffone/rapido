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
      var animation, offset, scrollbar, container, added = false;

      animation = base.$el.data('animation');


      if (base.options.offsetMenu) {
        container = '.offcanvas__content';
        offset = base.$el.position();
      } else {
        container = window;
        offset = base.$el.offset();
      }

      offset = offset.top - base.options.offset;
      offset = parseInt(offset);

      //console.log(offset);

      $(container).scroll(function(e) {

        if (base.options.offsetMenu) {
          scrollbar = $('.offcanvas__content').scrollTop();
        } else {
          scrollbar = $(document).scrollTop();
        }

        //console.log(scrollbar);

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
    offsetMenu: false
  };

  $.fn.rapido_Animation = function(options) {
    return this.each(function() {
      (new $.Rapido.Animation(this, options));
    });
  };

})(jQuery, window, document);
