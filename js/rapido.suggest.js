(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Suggest = function(options) {
    var base = this;

    base.init = function() {
      base.options = $.extend({},$.Rapido.Suggest.defaultOptions, options);

      $(window).on('ready resize', function() {
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

        // Toggle class on :focus
        $input.focus(function() {
          $(base.options.suggestClass).removeClass('open');
          $suggest.addClass('open');
        });
      });
    };

    var compileInput = function() {
      $(base.options.suggestClass).on('click', 'a', function(e) {

        var value = $(this).attr(base.options.suggestAttr);
        var $input = $(this).parents(base.options.containerClass).children('input[type = "text"]');
        var $parent = $(this).parents(base.options.suggestClass);

        $input.val(value);
        $parent.removeClass('open');

        e.preventDefault();
      });

      $('html, body').on('click', function() {
        $(base.options.suggestClass).removeClass('open');
      });

      $('input').on('click', function(e) {
        e.stopPropagation();
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

