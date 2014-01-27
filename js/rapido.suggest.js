(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Suggest = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Suggest', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Suggest.defaultOptions, options);

      var className = $.rapido_Utilities.elemClass(el);
      var suggestElem = className + ' ' + base.options.suggestClass;
      var linkElem = suggestElem + ' a';

      setSize(suggestElem);

      $(window).resize(function() {
        setSize(suggestElem);
      });

      compileInput(linkElem);

    };

    var setSize = function(suggestElem) {
      $(suggestElem).each(function() {

        var $suggest = $(this);
        var $input = $(this).parents(base.options.containerClass).children('input[type = "text"]');

        // Get position of the input and position the suggest accordingly
        $suggest.css({
          'top': ($input.position().top + $input.height()) + 'px',
          'left': $input.position().left + 'px',
          'width': $input.outerWidth() + 'px'
        });

        // Toggle class on :focus and :blur
        $input.focus(function() {
          $(suggestElem).removeClass('open');
          $suggest.addClass('open');
        });

        $input.blur(function() {
          $suggest.removeClass('open');
        });

      });
    };

    var compileInput = function(linkElem) {
      $(linkElem).on('click', function(e) {

        var value = $(this).text();
        var $input = $(this).parents(base.options.containerClass).children('input[type = "text"]');

        $input.val(value);

        e.preventDefault();
      });
    };

    base.init();
  };

  $.Rapido.Suggest.defaultOptions = {
    containerClass: '.form__controls',
    suggestClass: '.form__suggest'
  };

  $.fn.rapido_Suggest = function(options) {
    return this.each(function() {
      (new $.Rapido.Suggest(this, options));
    });
  };

})(jQuery, window, document);

