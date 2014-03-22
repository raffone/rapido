(function($, window, document){
  'use strict';
  var pluginName, defaults, Dropdown;
  pluginName = "Dropdown";
  defaults = {
    event: 'click',
    wrapperClass: '.dropdown',
    togglerClass: '.dropdown__toggle'
  };
  Dropdown = (function(){
    Dropdown.displayName = 'Dropdown';
    var prototype = Dropdown.prototype, constructor = Dropdown;
    function Dropdown(el, options){
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      this.options = $.extend({}, defaults, options);
      this.init();
    }
    prototype.init = function(){
      if (this.options.event === 'hover') {
        this.toggleHover();
      } else {
        this.toggleClick();
      }
      this.closeEvent();
    };
    prototype.toggleClick = function(){
      var options;
      options = this.options;
      $(this.el).on(this.options.event, function(e){
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $(options.wrapperClass).removeClass('open');
          $(this).addClass('open');
        }
      });
      $(this.el).on(this.options.event, this.options.togglerClass, function(it){
        return it.preventDefault();
      });
    };
    prototype.toggleHover = function(){
      this.options.event = 'mouseenter mouseleave';
      $(this.el).on(this.options.event, function(){
        $(this).toggleClass('open');
      });
    };
    prototype.closeEvent = function(){
      var this$ = this;
      $('html').click(function(){
        $(this$.el).removeClass('open');
      });
      $(this.el).click(function(it){
        return it.stopPropagation();
      });
    };
    return Dropdown;
  }());
  $.fn.rapido_Dropdown = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Dropdown(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));