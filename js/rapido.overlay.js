(function($, window, document){
  'use strict';
  var pluginName, defaults, Overlay;
  pluginName = "Overlay";
  defaults = {
    delay: 500,
    closeClass: '.overlay-close',
    backgroundClass: '.overlay-background',
    offsetClass: '.offcanvas__content',
    closeButtonHtml: '<span>Close</span>',
    addSidebarBorder: true
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
      x$.isOffset = !!$(this.options.offsetClass).length;
      x$.isOldIE = $("html").hasClass("no-csstransitions");
      this.init();
    }
    prototype.init = function(){
      if (this.options.isOldIE) {
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
      var backgroundTarget;
      if ($(this.options.backgroundClass).length === 0) {
        backgroundTarget = this.options.isOffset ? this.options.offsetClass : 'body';
        $('<div />').addClass(this.options.backgroundClass.slice(1)).appendTo(backgroundTarget);
      }
    };
    prototype.addClose = function(){
      $(this.options.closeButtonHtml).addClass(this.options.closeClass.slice(1)).prependTo(this.options.selector);
    };
    prototype.openOverlay = function(){
      var this$ = this;
      $(this.el).on('click', function(it){
        $('html').css({
          overflow: 'hidden',
          height: '100%'
        });
        if (this$.options.addSidebarBorder) {
          $('html.no-touch').css({
            'border-right': '15px solid #f2f2f2'
          });
        }
        $(this$.options.selector).css({
          top: '0',
          height: this$.getHeight()
        }).fadeIn();
        $(this$.options.backgroundClass).css({
          top: '0',
          height: this$.getHeight()
        }).fadeIn();
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
        $(this$.options.selector).fadeOut();
        $(this$.options.backgroundClass).fadeOut();
        $('html, body').removeAttr('style');
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