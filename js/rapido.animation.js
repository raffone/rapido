(function($, window, document){
  'use strict';
  var pluginName, defaults, Animation;
  pluginName = "Animation";
  defaults = {
    offset: 500,
    offsetClass: '.offcanvas__content'
  };
  Animation = (function(){
    Animation.displayName = 'Animation';
    var prototype = Animation.prototype, constructor = Animation;
    function Animation(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.animationName = $(this.el).data('animation');
      x$.isOffset = !!$(this.options.offsetClass).length;
      x$.added = false;
      this.init();
    }
    prototype.init = function(){
      if (this.options.isOffset) {
        this.options.container = this.options.offsetClass;
      } else {
        this.options.container = window;
      }
      this.scrollEvent();
    };
    prototype.getOffset = function(){
      return $(this.el).position().top - this.options.offset;
    };
    prototype.scrollEvent = function(){
      var this$ = this;
      $(this.options.container).scroll(function(){
        if (this$.getOffset() < 0 && !this$.options.added) {
          $(this$.el).addClass(this$.options.animationName);
          this$.options.added = true;
        }
      });
    };
    return Animation;
  }());
  $.fn.rapido_Animation = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Animation(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));