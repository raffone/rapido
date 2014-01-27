(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Overlay = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Overlay', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Overlay.defaultOptions, options);

      // Remove delay if browser doesn't support css animations
      if ($('html').hasClass('no-csstransitions')) {
        base.options.delay = 0;
      }


      var id = base.$el.data('overlay-ref');

      // Methods
      addOverlay();
      addClose(id);
      openOverlay(id);
      closeOverlay(id);

    };

    // Remove dot for option classes
    var dotless = function(text) {
      return text.slice(1);
    };

    var addOverlay = function() {
      var present = $(base.options.backgroundClass).length;

      // If there isn't a .overlay-background element, add it
      if (present === 0) {
        // Add overlay element
        $('<div />')
          .addClass(dotless(base.options.backgroundClass))
          .appendTo('body');
      }
    };

    var addClose = function(id) {
      // Add close button to overlay
      $('<span>Close</span>')
        .addClass(dotless(base.options.closeClass))
        .prependTo('[data-overlay-content="' + id + '"]');
    };

    var openOverlay = function(id) {

      base.$el.on('click', function(e) {
        var offset, height;

        height = $(window).height();

        $(window).resize(function() {
          height = $(window).height();
        });

        // Set ovewrflow:hidden to backgroudn page
        $('html').css({
          'overflow': 'hidden',
          'height': 'auto'
        });

        // Add scrollbar offset only if desktop browser
        $('html.no-touch').css({
          'border-right': '15px solid #f2f2f2'
        });

        // Set class to open and add offset
        $('[data-overlay-content="' + id + '"], ' + base.options.backgroundClass)
          .removeClass('close')
          .addClass('open')
          .css({'top': '0', 'height': height});

        // If window is resized update offset
        $(window).resize(function() {
          $('[data-overlay-content="' + id + '"].open, ' + base.options.backgroundClass + '.open')
            .css({'top': '0', 'height': height});
        });

        e.preventDefault();
      });
    };

    var closeOverlay = function(id) {
      $(base.options.closeClass).on('click', function(e) {

        // Remove overflow:hidden
        $('html, body')
          .delay(base.options.delay)
          .queue(function(next) {
              $(this).removeAttr('style');
              next();
            });

        // Set overlay class to close
        $('[data-overlay-content="' + id + '"], ' + base.options.backgroundClass)
          .addClass('close')
          .delay(base.options.delay)
          .queue(function(next) {
              $(this)
              .removeClass('open close')
              .removeAttr('style');
              next();
            });

      });
    };

    base.init();
  };

  $.Rapido.Overlay.defaultOptions = {
    delay: 500,
    closeClass: '.overlay-close',
    backgroundClass: '.overlay-background'
  };

  $.fn.rapido_Overlay = function(options) {
    return this.each(function() {
      (new $.Rapido.Overlay(this, options));
    });
  };

})(jQuery, window, document);

