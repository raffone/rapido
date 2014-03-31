(function($, window, document){
  'use strict';
  var pluginName, defaults, Suggest;
  pluginName = "Suggest";
  defaults = {
    containerClass: '.form__controls',
    suggestClass: '.form__suggest',
    suggestAttr: 'title'
  };
  Suggest = (function(){
    Suggest.displayName = 'Suggest';
    var prototype = Suggest.prototype, constructor = Suggest;
    function Suggest(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.input = $(this.el).parents(this.options.containerClass).children('input[type="text"]');
      this.init();
    }
    prototype.init = function(){
      $.rapido.onResize(this, this.setSize);
      this.focusEvent();
      this.clickEvent();
    };
    prototype.setSize = function(){
      $(this.el).css({
        top: this.options.input.position().top + this.options.input.height() + 'px',
        left: this.options.input.position().left + 'px',
        width: this.options.input.outerWidth() + 'px'
      });
    };
    prototype.focusEvent = function(){
      var this$ = this;
      this.options.input.focus(function(){
        $(this$.options.suggestClass).removeClass('open');
        $(this$.el).addClass('open');
      });
    };
    prototype.clickEvent = function(){
      var this$ = this;
      $(this.el).on('click', 'a', function(it){
        this$.options.input.val($(it.currentTarget).attr(this$.options.suggestAttr));
        $(this$.el).removeClass('open');
        return it.preventDefault();
      });
      $('html, body').click(function(){
        return $(this$.options.suggestClass).removeClass('open');
      });
      $('input').click(function(e){
        return e.stopPropagation();
      });
    };
    return Suggest;
  }());
  $.rapido_Suggest = function(options){
    return $(defaults.suggestClass).each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Suggest(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));