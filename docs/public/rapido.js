(function($, window, document){
  'use strict';
  var pluginName, defaults, Animation;
  pluginName = "Animation";
  defaults = {
    offset: 500,
    offsetClass: '.offcanvas__content'
  };
  Animation = (function(){
    Animation.displayName = 'Animation';
    var prototype = Animation.prototype, constructor = Animation;
    function Animation(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.animationName = $(this.el).data('animation');
      x$.isOffset = !!$(this.options.offsetClass).length;
      x$.added = false;
      this.init();
    }
    prototype.init = function(){
      if (this.options.isOffset) {
        this.options.container = this.options.offsetClass;
      } else {
        this.options.container = window;
      }
      this.scrollEvent();
    };
    prototype.getOffset = function(){
      return $(this.el).position().top - this.options.offset;
    };
    prototype.scrollEvent = function(){
      var this$ = this;
      $(this.options.container).scroll(function(){
        if (this$.getOffset() < 0 && !this$.options.added) {
          $(this$.el).addClass(this$.options.animationName);
          this$.options.added = true;
        }
      });
    };
    return Animation;
  }());
  $.fn.rapido_Animation = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Animation(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));
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
(function($, window, document){
  'use strict';
  var pluginName, defaults, Overlay;
  pluginName = "Overlay";
  defaults = {
    delay: 500,
    closeClass: '.overlay-close',
    backgroundClass: '.overlay-background',
    offsetClass: '.offcanvas__content'
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
(function($, window, document){
  'use strict';
  var pluginName, defaults, Scroll;
  pluginName = "Scroll";
  defaults = {
    duration: 1600,
    offset: 20,
    offsetClass: '.offcanvas__content'
  };
  Scroll = (function(){
    Scroll.displayName = 'Scroll';
    var prototype = Scroll.prototype, constructor = Scroll;
    function Scroll(el, options){
      var x$;
      this.el = el;
      this._defaults = defaults;
      this._name = pluginName;
      x$ = this.options = $.extend({}, defaults, options);
      x$.target = $(this.el).attr('href');
      x$.isOffset = !!$(this.options.offsetClass).length;
      this.init();
    }
    prototype.init = function(){
      if (this.options.isOffset) {
        this.options.container = this.options.offsetClass;
      } else {
        this.options.container = 'html, body';
      }
      this.clickEvent();
    };
    prototype.getOffset = function(){
      return $(this.options.target).offset().top - this.options.offset;
    };
    prototype.clickEvent = function(){
      var this$ = this;
      $(this.el).click(function(it){
        $(this$.options.container).animate({
          scrollTop: this$.getOffset()
        }, this$.options.duration);
        return it.preventDefault();
      });
    };
    return Scroll;
  }());
  $.fn.rapido_Scroll = function(options){
    return this.each(function(){
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Scroll(this, options));
      }
    });
  };
}.call(this, jQuery, window, document));
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
        this$.options.input.val($(it.toElement).attr(this$.options.suggestAttr));
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