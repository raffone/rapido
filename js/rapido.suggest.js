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
      var container = className + ' ' + base.options.suggestClass;
      var link = container + ' a';

      setSize(container);

      $(window).resize(function() {
        setSize(container);
      });

      compileInput(link);

    };

    var setSize = function(container) {
      $(container).each(function() {

        var $suggest = $(this);
        var $input = $(this)
                        .parents(base.options.containerClass)
                        .children('input[type = "text"]');

        $suggest.css({
          'top': ($input.position().top + $input.height()) + 'px',
          'left': $input.position().left + 'px',
          'width': $input.outerWidth() + 'px'
        });

      });
    };

    var compileInput = function(link) {
      $(link).on('click', function(e) {

        var value = $(this).text();
        var $input = $(this)
                        .parents(base.options.containerClass)
                        .children('input[type = "text"]');

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

