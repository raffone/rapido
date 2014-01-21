(function($){

  if(!$.Rapido){
    $.Rapido = new Object();
  }

  $.Rapido.Move = function(el, options){
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data("Rapido.Move", base);

    base.init = function(){
      base.options = $.extend({},$.Rapido.Move.defaultOptions, options);
      base.options.origin = '.' + base.el.parentNode.className;

      var w = $(window).width();

      var max = base.options.maxWidth;
      var min = base.options.minWidth;

      move(w, max, min);

      $(window).resize(function(){
        var w = $(window).width();
        move(w, max, min);
      });

    };

    var move = function (w, max, min) {

      if (max && min && w <= max && w >= min) {
        $(base.options.destination).append(base.el);

      } else if (max && !min && w <= max) {
        $(base.options.destination).append(base.el);

      } else if (min && !max && w >= min) {
        $(base.options.destination).append(base.el);

      } else {
        $(base.options.origin).append(base.el);

      }

    };

    base.init();
  };

  $.Rapido.Move.defaultOptions = {
    destination: null,
    maxWidth: null,
    minWidth: null
  };

  $.fn.rapido_Move = function(options){
    return this.each(function(){
      (new $.Rapido.Move(this, options));
    });
  };

})(jQuery);
