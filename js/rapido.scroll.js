(function($, window, document){
  'use strict';
  var pluginName, defaults, Scroll;
  pluginName = "Scroll";
  defaults = {
    duration: 1600,
    offset: 20,
    offsetClass: '.offcanvas__content'
  };
  Scroll = (function(){
    Scroll.displayName = 'Scroll';
    var prototype = Scroll.prototype, constructor = Scroll;
    function Scroll(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.target = $(this.el).attr('href');
      x$.isOffset = !!$(this.options.offsetClass).length;
      this.init();
    }
    prototype.init = function(){
      if (this.options.isOffset) {
        this.options.container = this.options.offsetClass;
      } else {
        this.options.container = 'html, body';
      }
      this.clickEvent();
    };
    prototype.getOffset = function(){
      return $(this.options.target).offset().top - this.options.offset;
    };
    prototype.clickEvent = function(){
      var this$ = this;
      $(this.el).click(function(it){
        $(this$.options.container).animate({
          scrollTop: this$.getOffset()
        }, this$.options.duration);
        return it.preventDefault();
      });
    };
    return Scroll;
  }());
  $.fn.rapido_Scroll = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Scroll(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));