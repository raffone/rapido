(function($, window, document){
  'use strict';
  var pluginName, defaults, Select;
  pluginName = "Select";
  defaults = {
    selectClass: '.form__select'
  };
  Select = (function(){
    Select.displayName = 'Select';
    var prototype = Select.prototype, constructor = Select;
    function Select(el, options){
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      this.options = $.extend({}, defaults, options);
      this.init();
    }
    prototype.init = function(){
      this.wrapSelect();
    };
    prototype.wrapSelect = function(){
      if (!$(this.el).parent().hasClass(this.options.selectClass.slice(1))) {
        $(this.el).wrap('<span class="' + this.options.selectClass.slice(1) + '" />');
      }
    };
    return Select;
  }());
  $.rapido_Select = function(options){
    return $('select').each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Select(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));