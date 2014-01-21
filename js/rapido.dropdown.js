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

      var wrapperClass, togglerClass, str;

      // Grab and convert class name of container
      wrapperClass = '.' + base.$el.attr('class').split(' ')[0];

      // Grab and convert class of the toggler button
      str = base.$el.children()[0];
      str = '.' + str.className.replace(/ /g, '.');
      str = str.substring(0, str.length - 1);

      togglerClass = str;

      if (base.options.event == 'hover') {
        toggleHover();
      } else {
        toggleClick(wrapperClass, togglerClass);
      }

      close();
    };

    // Event: Click
    var toggleClick = function(wrapperClass, togglerClass) {

      base.$el.on(base.options.event, function(e) {

        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $(wrapperClass).removeClass('open');
          $(this).addClass('open');
        }
      });

      base.$el.on(base.options.event, togglerClass, function(e) {
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
    event: 'click'
  };

  $.fn.rapido_Dropdown = function(options) {
    return this.each(function() {
      (new $.Rapido.Dropdown(this, options));
    });
  };

})(jQuery, window, document);
