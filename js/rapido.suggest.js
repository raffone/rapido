(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Suggest = function(options) {
    var base = this;

    base.init = function() {
      base.options = $.extend({},$.Rapido.Suggest.defaultOptions, options);

      setSize();

      $(window).resize(function() {
        setSize();
      });

      compileInput();

    };

    var setSize = function() {
      $(base.options.suggestClass).each(function() {

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
          $(base.options.suggestClass).removeClass('open');
          $suggest.addClass('open');
        });

        $input.blur(function() {
          $suggest.removeClass('open');
        });

      });
    };


    var compileInput = function() {
      $(base.options.suggestClass + ' a').on('click', function(e) {

        var value = $(this).attr(base.options.suggestAttr);
        var $input = $(this).parents(base.options.containerClass).children('input[type = "text"]');

        $input.val(value);

        e.preventDefault();
      });
    };

    base.init();
  };

  $.Rapido.Suggest.defaultOptions = {
    containerClass: '.form__controls',
    suggestClass: '.form__suggest',
    suggestAttr: 'title'
  };

  $.rapido_Suggest = function(options) {
    new $.Rapido.Suggest(options);
  };

})(jQuery, window, document);

