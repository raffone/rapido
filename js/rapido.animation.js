(function($){

  if(!$.Rapido){
    $.Rapido = new Object();
  }

  $.Rapido.Animation = function(el, options){
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data("Rapido.Animation", base);

    base.init = function(){
      base.options = $.extend({},$.Rapido.Animation.defaultOptions, options);


      addClass();
    };

    function addClass() {
      var animation, offset, scrollbar, added = false;

      animation = base.$el.data('animation-scroll');

      offset = base.$el.offset();
      offset = offset.top - base.options.offset;
      offset = parseInt(offset);

      $(window).scroll(function(e){

        scrollbar = $('body').scrollTop();
        scrollbar = scrollbar - 100;

        if(offset <= scrollbar && !added) {
          base.$el.attr('class', animation )
          added = true;
        }

      });
    }

    base.init();
  };

  $.Rapido.Animation.defaultOptions = {
    offset: 500,
  };

  $.fn.rapido_Animation = function(options){
    return this.each(function(){
      (new $.Rapido.Animation(this, options));
    });
  };

})(jQuery);
