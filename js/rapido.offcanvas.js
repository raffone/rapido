(function($, window, document){
  'use strict';
  var pluginName, defaults, Offcanvas;
  pluginName = "Offcanvas";
  defaults = {
    toggleClass: '.offcanvas__menu--open',
    containerClass: '.offcanvas__container',
    menuClass: '.offcanvas__menu'
  };
  Offcanvas = (function(){
    Offcanvas.displayName = 'Offcanvas';
    var prototype = Offcanvas.prototype, constructor = Offcanvas;
    function Offcanvas(el, options){
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      this.options = $.extend({}, defaults, options);
      this.init();
    }
    prototype.init = function(){
      this.openEvent();
      this.closeEvent();
    };
    prototype.openEvent = function(){
      var this$ = this;
      $(this.el).click(function(){
        return $(this$.options.containerClass).addClass(this$.options.toggleClass.slice(1));
      });
    };
    prototype.closeEvent = function(){
      var this$ = this;
      $('html').click(function(){
        return $(this$.options.containerClass).removeClass(this$.options.toggleClass.slice(1));
      });
      $(this.el).click(function(it){
        return it.stopPropagation();
      });
      $(this.options.menuClass).click(function(it){
        return it.stopPropagation();
      });
    };
    return Offcanvas;
  }());
  $.fn.rapido_Offcanvas = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Offcanvas(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));