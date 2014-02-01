(function($, window, document, undefined) {

  $.rapido_Utilities = {

    // Get class of element object
    getClass: function(el) {
      el = $(el).attr('class').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      return '.' + el.split(' ').join('.');
    },

    // Remove dot from class
    dotlessClass: function(string) {
      return string.slice(1);
    },

    // Check if an element exist
    elemExist: function(string) {
      return $(string).length !== 0;
    }

  };

})(jQuery, window, document);

