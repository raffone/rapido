(function($, window, document, undefined) {

  $.rapido_Utilities = {

    getClass: function(el) {
      return '.' + $(el).attr('class').split(' ').join('.');
    },

    dotlessClass: function(string) {
      return string.slice(1);
    }

  };

})(jQuery, window, document);

