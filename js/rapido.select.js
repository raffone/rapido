(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Select = function(options) {
    var base = this;

    base.init = function() {
      base.options = $.extend({},$.Rapido.Select.defaultOptions, options);

      var selectClass = $.rapido_Utilities.dotlessClass(base.options.selectClass);


      // Find all select
      $('select').each(function(i, el) {

        var $this = $(el);
        var $select = $this.parent();
        var is_added = $select[0].className === selectClass ? true : false;

        // Check if the select has already the wrapper class
        if (!is_added) {
          $(this).wrap('<span class="' + selectClass + '" />');
          $select = $(this).parent();
        }

        // Open select (only work with webkit)
        $select.on('click', function() {
          var e = document.createEvent('MouseEvents');
          e.initMouseEvent('mousedown');
          $this[0].dispatchEvent(e);
        });

      });

      // Refresh all event binded to window resize
      $(window).trigger('resize');

    };

    base.init();
  };

  $.Rapido.Select.defaultOptions = {
    selectClass: '.form__select'
  };

  $.rapido_Select = function(options) {
    new $.Rapido.Select(options);
  };

})(jQuery, window, document);

