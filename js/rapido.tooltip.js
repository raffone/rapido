(function($, window, document){
  'use strict';
  var pluginName, defaults, Tooltip;
  pluginName = "Tooltip";
  defaults = {
    margin: 15
  };
  Tooltip = (function(){
    Tooltip.displayName = 'Tooltip';
    var prototype = Tooltip.prototype, constructor = Tooltip;
    function Tooltip(el, options){
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      this.options = $.extend({}, defaults, options);
      this.init();
    }
    prototype.init = function(){
      this.options.content = $(this.el).data('tooltip-content');
      this.options.position = $(this.el).data('tooltip-position');
      this.is = {
        top: this.options.position.indexOf('top') >= 0,
        right: this.options.position.indexOf('right') >= 0,
        bottom: this.options.position.indexOf('bottom') >= 0,
        left: this.options.position.indexOf('left') >= 0,
        center: this.options.position.indexOf('center') >= 0
      };
      $.rapido.onResize(this, [this.getTargetData, this.getTooltipData, this.setTooltipPositioning]);
      this.addTooltip();
      this.hoverEvent();
    };
    prototype.getTargetData = function(){
      return this.target = {
        top: $(this.el).position().top,
        left: $(this.el).position().left,
        height: $(this.el).outerHeight(),
        width: $(this.el).outerWidth()
      };
    };
    prototype.getTooltipData = function(){
      return this.tooltip = {
        height: $(this.el).next().outerHeight(),
        width: $(this.el).next().outerWidth()
      };
    };
    prototype.setTooltipPositioning = function(){
      this.style = {};
      if (this.is.top) {
        this.style.top = this.target.top - this.tooltip.height - this.options.margin;
      }
      if (this.is.left) {
        this.style.left = this.target.left - this.tooltip.width - this.options.margin;
      }
      if (this.is.bottom) {
        this.style.top = this.target.top + this.target.height + this.options.margin;
      }
      if (this.is.right) {
        this.style.left = this.target.left + this.target.width + this.options.margin;
      }
      if (this.is.top || this.is.bottom) {
        this.style.left = this.target.left + this.target.width / 2 - this.tooltip.width / 2;
      }
      if (this.is.left || this.is.right) {
        this.style.top = this.target.top + this.target.height / 2 - this.tooltip.height / 2;
      }
      if (this.style.left < 0) {
        return this.style.left = 0;
      }
    };
    prototype.addTooltip = function(){
      $('<span class="tooltip" />').html(this.options.content).insertAfter(this.el);
      $.rapido.onResize(this, function(){
        return $(this.el).next().css(this.style);
      });
    };
    prototype.hoverEvent = function(){
      $(this.el).on('mouseenter mouseleave', function(){
        return $(this).next().toggleClass('open');
      });
      $(this.el).next().on('mouseenter mouseleave', function(){
        return $(this).toggleClass('open');
      });
    };
    return Tooltip;
  }());
  $.fn.rapido_Tooltip = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Tooltip(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));