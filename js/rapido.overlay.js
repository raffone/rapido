(function($, window, document){
  'use strict';
  var pluginName, defaults, Overlay;
  pluginName = "Overlay";
  defaults = {
    delay: 500,
    closeClass: '.overlay-close',
    backgroundClass: '.overlay-background'
  };
  Overlay = (function(){
    Overlay.displayName = 'Overlay';
    var prototype = Overlay.prototype, constructor = Overlay;
    function Overlay(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.id = $(this.el).data("overlay-ref");
      x$.selector = '[data-overlay-content="' + this.options.id + '"]';
      this.init();
    }
    prototype.init = function(){
      if ($("html").hasClass("no-csstransitions")) {
        this.options.delay = 0;
      }
      this.addOverlay();
      this.addClose();
      this.openOverlay();
      this.closeOverlay();
    };
    prototype.getHeight = function(){
      return $(window).height();
    };
    prototype.addOverlay = function(){
      if ($(this.options.backgroundClass).length === 0) {
        $('<div />').addClass(this.options.backgroundClass.slice(1)).appendTo('body');
      }
    };
    prototype.addClose = function(){
      $('<span>Close</span>').addClass(this.options.closeClass.slice(1)).prependTo(this.options.selector);
    };
    prototype.openOverlay = function(){
      var this$ = this;
      $(this.el).on('click', function(it){
        $('html').css({
          overflow: 'hidden',
          height: 'auto'
        });
        $('html.no-touch').css({
          'border-right': '15px solid #f2f2f2'
        });
        $(this$.options.selector + ', ' + this$.options.backgroundClass).removeClass('close').addClass('open').css({
          top: '0',
          height: this$.getHeight()
        });
        $(window).resize(function(){
          $(this$.options.selector + '.open, ' + this$.options.backgroundClass + '.open').css({
            height: this$.getHeight()
          });
        });
        return it.preventDefault();
      });
    };
    prototype.closeOverlay = function(){
      var this$ = this;
      $(this.options.closeClass).on('click', function(){
        $(this$.options.selector + ', ' + this$.options.backgroundClass).addClass('close').delay(this$.options.delay).queue(function(next){
          $(this).removeClass('open close').removeAttr("style");
          next();
        });
        $('html, body').delay(this$.options.delay).queue(function(next){
          $(this).removeAttr('style');
          next();
        });
      });
    };
    return Overlay;
  }());
  $.fn.rapido_Overlay = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Overlay(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));