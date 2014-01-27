(function($, window, document, undefined) {

  $.rapido_Utilities = {

    elemClass: function(el) {
      return '.' + $(el).attr('class').split(' ').join('.');
    }

  };

})(jQuery, window, document);

