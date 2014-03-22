var toString$ = {}.toString;
(function($, window, document){
  'use strict';
  var self;
  self = $.rapido = {
    getClass: function(el){
      el = $.trim(
      $(el).attr('class'));
      return '.' + el.split(' ').join('.');
    },
    dotlessClass: function(string){
      return string.slice(1);
    },
    elemExist: function(string){
      return $(string) != null;
    },
    debounce: function(func, wait, immediate){
      var timeout;
      return function(){
        var args, this$ = this;
        args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function(){
          timeout = null;
          if (!immediate) {
            return func.apply(this$, args);
          }
        }, wait);
        if (immediate && !timeout) {
          return func.apply(this, args);
        }
      };
    },
    onResize: function(bind, func, delay){
      delay == null && (delay = 300);
      if (toString$.call(func).slice(8, -1) === 'Array') {
        return func.forEach(function(it){
          self.debounce(it, delay).bind(bind)();
          return $(window).resize(self.debounce(it, delay).bind(bind));
        });
      } else {
        self.debounce(func, delay).bind(bind)();
        return $(window).resize(self.debounce(func, delay).bind(bind));
      }
    }
  };
}.call(this, jQuery, window, document));