(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Move = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Move', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Move.defaultOptions, options);
      base.options.origin = '.' + base.el.parentNode.className;

      // Assign width options to aliases
      var max = base.options.maxWidth;
      var min = base.options.minWidth;

      // On ready and resize call function
      $(window).on('ready resize', function() {

        // Get current window width
        var w = $(window).width();

        // Call move function
        move(w, max, min);

      });

    };

    var move = function(w, max, min) {

      // If max-width and min-height are set and match window
      if (max && min && w <= max && w >= min) {
        $(base.options.destination).append(base.el);

      // If only max-width is set and match window
      } else if (max && !min && w <= max) {
        $(base.options.destination).append(base.el);

      // If only min-width is set and match window
      } else if (min && !max && w >= min) {
        $(base.options.destination).append(base.el);

      // If none match window
      } else {
        $(base.options.origin).append(base.el);

      }

    };

    base.init();
  };

  $.Rapido.Move.defaultOptions = {
    destination: null,
    maxWidth: null,
    minWidth: null
  };

  $.fn.rapido_Move = function(options) {
    return this.each(function() {
      (new $.Rapido.Move(this, options));
    });
  };

})(jQuery, window, document);
