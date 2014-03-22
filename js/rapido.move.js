(function($, window, document){
  'use strict';
  var pluginName, defaults, Move;
  pluginName = "Move";
  defaults = {
    destination: null,
    maxWidth: null,
    minWidth: null
  };
  Move = (function(){
    Move.displayName = 'Move';
    var prototype = Move.prototype, constructor = Move;
    function Move(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.origin = '.' + this.el.parentNode.className;
      this.min = this.options.minWidth;
      this.max = this.options.maxWidth;
      this.init();
    }
    prototype.init = function(){
      $.rapido.onResize(this, this.moveElement);
    };
    prototype.getWidth = function(){
      return $(window).width();
    };
    prototype.moveElement = function(){
      var w;
      w = this.getWidth();
      if (this.max && this.min && w <= this.max && w >= this.min || this.max && !this.min && w <= this.max || this.min && !this.max && w >= this.min) {
        $(this.options.destination).append(this.el);
      } else {
        $(this.options.origin).append(this.el);
      }
    };
    return Move;
  }());
  $.fn.rapido_Move = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Move(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));