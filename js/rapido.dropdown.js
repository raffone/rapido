(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Dropdown = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Dropdown', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Dropdown.defaultOptions, options);

      if (base.options.event == 'hover') {
        toggleHover();
      } else {
        toggleClick();
      }

      close();
    };

    // Event: Click
    var toggleClick = function() {

      base.$el.on(base.options.event, function(e) {

        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $(base.options.wrapperClass).removeClass('open');
          $(this).addClass('open');
        }
      });

      base.$el.on(base.options.event, base.options.togglerClass, function(e) {
        e.preventDefault();
      });

    };

    // Event: Hover
    var toggleHover = function() {

      base.options.event = 'mouseenter mouseleave';

      base.$el.on(base.options.event, function() {
        $(this).toggleClass('open');
      });

    };

    // Close dropdown when mouse click outside of element
    var close = function() {

      $('html').click(function() {
        base.$el.removeClass('open');
      });

      base.$el.click(function(e) {
        e.stopPropagation();
      });

    };

    base.init();
  };

  $.Rapido.Dropdown.defaultOptions = {
    event: 'click',
    wrapperClass: '.dropdown',
    togglerClass: '.dropdown__toggle'
  };

  $.fn.rapido_Dropdown = function(options) {
    return this.each(function() {
      (new $.Rapido.Dropdown(this, options));
    });
  };

})(jQuery, window, document);
