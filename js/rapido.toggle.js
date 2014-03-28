(function($, window, document){
  'use strict';
  var pluginName, defaults, Toggle;
  pluginName = "Toggle";
  defaults = {
    titleClass: '[data-toggle-name]',
    contentClass: '[data-toggle-content]',
    delay: 500,
    closable: true,
    addHeight: false,
    addMaxHeight: false,
    positionMaxHeight: 'padding-top',
    defaultOpen: 0
  };
  Toggle = (function(){
    Toggle.displayName = 'Toggle';
    var prototype = Toggle.prototype, constructor = Toggle;
    function Toggle(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.selector = $.rapido.getClass(this.el) + ' ';
      x$.titles = this.options.selector + this.options.titleClass;
      x$.contents = this.options.selector + this.options.contentClass;
      x$.contentsHeight = {};
      this.init();
    }
    prototype.init = function(){
      var this$ = this;
      if (this.options.addMaxHeight) {
        $.rapido.onResize(this, this.setMaxHeight);
      }
      if (this.options.addHeight) {
        $.rapido.onResize(this, this.setHeight);
      }
      if (this.options.defaultOpen !== false) {
        $.rapido.onResize(this, this.setOpenPanel);
      }
      $(this.options.titles).each(function(i, el){
        return this$.clickEvent(el);
      });
    };
    prototype.setMaxHeight = function(){
      var height;
      height = [];
      $(this.options.contents).each(function(i, el){
        height.push($(el).height());
      });
      $(this.el).css(this.options.positionMaxHeight, Math.max.apply(null, height) + 'px');
    };
    prototype.setHeight = function(){
      var this$ = this;
      $(this.options.contents).each(function(i, el){
        var height, id;
        height = 0;
        id = $(el).data('toggle-content');
        $(el).children().each(function(i, el){
          height += Math.ceil(
          $(el).outerHeight());
        });
        this$.options.contentsHeight[id + ""] = height + 'px';
      });
    };
    prototype.setOpenPanel = function(){
      $(this.options.titles).eq(this.options.defaultOpen).addClass('open');
      $(this.options.contents).eq(this.options.defaultOpen).addClass('open');
    };
    prototype.clickEvent = function(el){
      var this$ = this;
      $(el).click(function(it){
        var id, name, description;
        id = $(it.toElement).attr('data-toggle-name');
        name = "[data-toggle-name=\"" + id + "\"]";
        description = "[data-toggle-content=\"" + id + "\"]";
        if ($(description).hasClass('open')) {
          if (this$.options.closable) {
            $(description).removeClass('open');
            $(name).removeClass('open');
            if (this$.options.addHeight) {
              $(description).removeAttr('style');
            }
          }
        } else if (!$(this$.options.selector + '*').hasClass('open')) {
          $(description).addClass('open');
          $(name).addClass('open');
          if (this$.options.addHeight) {
            $(description).css({
              'min-height': this$.options.contentsHeight[id]
            });
          }
        } else {
          $(this$.options.titles).removeClass('open');
          $(this$.options.contents).removeClass('open');
          if (this$.options.addHeight) {
            $(this$.options.contents).removeAttr('style');
          }
          $(description).delay(this$.options.delay).queue(function(next){
            $(description).addClass('open');
            next();
          });
          if (this$.options.addHeight) {
            $(description).css({
              'min-height': this$.options.contentsHeight[id]
            });
          }
          $(name).addClass('open');
        }
        return it.preventDefault();
      });
    };
    return Toggle;
  }());
  $.fn.rapido_Toggle = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Toggle(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));