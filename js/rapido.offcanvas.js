(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Offcanvas = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Offcanvas', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Offcanvas.defaultOptions, options);

      toggleClick();
      close();
    };

    var toggleClick = function() {

      base.$el.on('click', function() {
        $(base.options.containerClass).addClass(base.options.toggleClass);
      });

    };

    var close = function() {

      $('html').on('click', function(e) {
        $(base.options.containerClass).removeClass(base.options.toggleClass);
      });

      base.$el.on('click', function(e) {
        e.stopPropagation();
      });

      $(base.options.menuClass).on('click', function(e) {
        e.stopPropagation();
      });

    };

    base.init();
  };

  $.Rapido.Offcanvas.defaultOptions = {
    toggleClass: 'offcanvas__menu--open',
    containerClass: '.offcanvas__container',
    menuClass: '.offcanvas__menu'
  };

  $.fn.rapido_Offcanvas = function(options) {
    return this.each(function() {
      (new $.Rapido.Offcanvas(this, options));
    });
  };

})(jQuery, window, document);

$('.offcanvas__menu--toggle').rapido_Offcanvas();
