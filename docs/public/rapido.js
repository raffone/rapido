/*
 *  Rapido - v0.2.1
 *  An easy and quick Sass + Compass + Susy + OOCSS + BEM prototyping framework.
 *  https://github.com/raffone/rapido
 *
 *  Made by Raffaele Rasini <raffaele.rasini@gmail.com>
 *  Under MIT License
 */
(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Animation = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Animation', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Animation.defaultOptions, options);

      addClass();
    };

    function addClass() {
      var animation, offset, scrollbar, container, isOffsetLayout, added = false;

      // Get the animation to apply
      animation = base.$el.data('animation');

      // Check if is using the offset layout
      isOffsetLayout = $.rapido_Utilities.elemExist(base.options.offsetClass);

      // Set corrent container of the content
      if (isOffsetLayout) {
        container = base.options.offsetClass;
      } else {
        container = window;
      }

      // Get offset of element to animate
      offset = base.$el.position();
      offset = offset.top - base.options.offset;

      $(container).scroll(function(e) {

        // On scroll udate scroll value fro comparison
        if (isOffsetLayout) {
          scrollbar = $(base.options.offsetClass).scrollTop();
        } else {
          scrollbar = $(document).scrollTop();
        }

        // Check if current container offset is less or equal the
        // element's offset and it's not animated already
        if (offset <= scrollbar && !added) {
          base.$el.addClass(animation);
          added = true;
        }

      });
    }

    base.init();
  };

  $.Rapido.Animation.defaultOptions = {
    offset: 500,
    offsetClass: '.offcanvas__content'
  };

  $.fn.rapido_Animation = function(options) {
    return this.each(function() {
      (new $.Rapido.Animation(this, options));
    });
  };

})(jQuery, window, document);

(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Dropdown = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Dropdown', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Dropdown.defaultOptions, options);

      if (base.options.event == 'hover') {
        toggleHover();
      } else {
        toggleClick();
      }

      close();
    };

    // Event: Click
    var toggleClick = function() {

      base.$el.on(base.options.event, function(e) {

        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $(base.options.wrapperClass).removeClass('open');
          $(this).addClass('open');
        }
      });

      base.$el.on(base.options.event, base.options.togglerClass, function(e) {
        e.preventDefault();
      });

    };

    // Event: Hover
    var toggleHover = function() {

      base.options.event = 'mouseenter mouseleave';

      base.$el.on(base.options.event, function() {
        $(this).toggleClass('open');
      });

    };

    // Close dropdown when mouse click outside of element
    var close = function() {

      $('html').click(function() {
        base.$el.removeClass('open');
      });

      base.$el.click(function(e) {
        e.stopPropagation();
      });

    };

    base.init();
  };

  $.Rapido.Dropdown.defaultOptions = {
    event: 'click',
    wrapperClass: '.dropdown',
    togglerClass: '.dropdown__toggle'
  };

  $.fn.rapido_Dropdown = function(options) {
    return this.each(function() {
      (new $.Rapido.Dropdown(this, options));
    });
  };

})(jQuery, window, document);

(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Move = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Move', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Move.defaultOptions, options);
      base.options.origin = '.' + base.el.parentNode.className;

      // Assign width options to aliases
      var max = base.options.maxWidth;
      var min = base.options.minWidth;

      // On ready and resize call function
      $(window).on('ready resize', function() {

        // Get current window width
        var w = $(window).width();

        // Call move function
        move(w, max, min);

      });

    };

    var move = function(w, max, min) {

      // If max-width and min-height are set and match window
      if (max && min && w <= max && w >= min) {
        $(base.options.destination).append(base.el);

      // If only max-width is set and match window
      } else if (max && !min && w <= max) {
        $(base.options.destination).append(base.el);

      // If only min-width is set and match window
      } else if (min && !max && w >= min) {
        $(base.options.destination).append(base.el);

      // If none match window
      } else {
        $(base.options.origin).append(base.el);

      }

    };

    base.init();
  };

  $.Rapido.Move.defaultOptions = {
    destination: null,
    maxWidth: null,
    minWidth: null
  };

  $.fn.rapido_Move = function(options) {
    return this.each(function() {
      (new $.Rapido.Move(this, options));
    });
  };

})(jQuery, window, document);

(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Offcanvas = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Offcanvas', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Offcanvas.defaultOptions, options);

      toggleClick();
      close();
    };

    var toggleClick = function() {

      // Click on toggle button add class to container
      base.$el.on('click', function() {
        $(base.options.containerClass).addClass(base.options.toggleClass);
      });

    };

    var close = function() {

      // Click on dim area close remove class from container
      $('html').on('click', function(e) {
        $(base.options.containerClass).removeClass(base.options.toggleClass);
      });

      // Prevent from closing if clicking inside the sidebar
      base.$el.on('click', function(e) {
        e.stopPropagation();
      });

      // Prevent from closing if clicking the toggle button
      $(base.options.menuClass).on('click', function(e) {
        e.stopPropagation();
      });

    };

    base.init();
  };

  $.Rapido.Offcanvas.defaultOptions = {
    toggleClass: 'offcanvas__menu--open',
    containerClass: '.offcanvas__container',
    menuClass: '.offcanvas__menu'
  };

  $.fn.rapido_Offcanvas = function(options) {
    return this.each(function() {
      (new $.Rapido.Offcanvas(this, options));
    });
  };

})(jQuery, window, document);

(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Overlay = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Overlay', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Overlay.defaultOptions, options);

      // Remove delay if browser doesn't support css animations
      if ($('html').hasClass('no-csstransitions')) {
        base.options.delay = 0;
      }


      var id = base.$el.data('overlay-ref');

      // Methods
      addOverlay();
      addClose(id);
      openOverlay(id);
      closeOverlay(id);

    };

    var addOverlay = function() {
      var present = $(base.options.backgroundClass).length;

      // If there isn't a .overlay-background element, add it
      if (present === 0) {
        // Add overlay element
        $('<div />')
          .addClass($.rapido_Utilities.dotlessClass(base.options.backgroundClass))
          .appendTo('body');
      }
    };

    var addClose = function(id) {
      // Add close button to overlay
      $('<span>Close</span>')
        .addClass($.rapido_Utilities.dotlessClass(base.options.closeClass))
        .prependTo('[data-overlay-content="' + id + '"]');
    };

    var openOverlay = function(id) {

      base.$el.on('click', function(e) {
        var offset, height;

        $(window).on('ready resize', function() {
          height = $(window).height();
        });

        // Set ovewrflow:hidden to backgroudn page
        $('html').css({
          'overflow': 'hidden',
          'height': 'auto'
        });

        // Add scrollbar offset only if desktop browser
        $('html.no-touch').css({
          'border-right': '15px solid #f2f2f2'
        });

        // Set class to open and add offset
        $('[data-overlay-content="' + id + '"], ' + base.options.backgroundClass)
          .removeClass('close')
          .addClass('open')
          .css({'top': '0', 'height': height});

        // If window is resized update offset
        $(window).resize(function() {
          $('[data-overlay-content="' + id + '"].open, ' + base.options.backgroundClass + '.open')
            .css({'top': '0', 'height': height});
        });

        e.preventDefault();
      });
    };

    var closeOverlay = function(id) {
      $(base.options.closeClass).on('click', function(e) {

        // Remove overflow:hidden
        $('html, body')
          .delay(base.options.delay)
          .queue(function(next) {
              $(this).removeAttr('style');
              next();
            });

        // Set overlay class to close
        $('[data-overlay-content="' + id + '"], ' + base.options.backgroundClass)
          .addClass('close')
          .delay(base.options.delay)
          .queue(function(next) {
              $(this)
              .removeClass('open close')
              .removeAttr('style');
              next();
            });

      });
    };

    base.init();
  };

  $.Rapido.Overlay.defaultOptions = {
    delay: 500,
    closeClass: '.overlay-close',
    backgroundClass: '.overlay-background'
  };

  $.fn.rapido_Overlay = function(options) {
    return this.each(function() {
      (new $.Rapido.Overlay(this, options));
    });
  };

})(jQuery, window, document);


(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Scroll = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Scroll', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Scroll.defaultOptions, options);

      scroll();
    };

    var scroll = function() {
      var container, offset, target, isOffsetLayout;

      // Get id of target
      target = base.$el.attr('href');

      // Check if is using the offset layout
      isOffsetLayout = $.rapido_Utilities.elemExist(base.options.offsetClass);

      // Set corrent container of the content
      if (isOffsetLayout) {
        container = '.offcanvas__content';
      } else {
        container = 'html, body';
      }

      // Add offset to taget position
      offset = $(target).position().top - base.options.offset;

      // On click go to taget
      base.$el.on('click', function(e) {

        $(container).animate({
          scrollTop: offset
        }, base.options.duration);

        e.preventDefault();

      });

    };

    base.init();
  };

  $.Rapido.Scroll.defaultOptions = {
    duration: 1600,
    offset: 20,
    offsetClass: '.offcanvas__content'
  };

  $.fn.rapido_Scroll = function(options) {
    return this.each(function() {
      (new $.Rapido.Scroll(this, options));
    });
  };

})(jQuery, window, document);

(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Select = function(options) {
    var base = this;

    base.init = function() {
      base.options = $.extend({},$.Rapido.Select.defaultOptions, options);

      var selectClass = $.rapido_Utilities.dotlessClass(base.options.selectClass);


      // Find all select
      $('select').each(function(i, el) {

        var $this = $(el);
        var $select = $this.parent();
        var is_added = $select[0].className === selectClass ? true : false;

        // Check if the select has already the wrapper class
        if (!is_added) {
          $(this).wrap('<span class="' + selectClass + '" />');
          $select = $(this).parent();
        }

        // Open select (only work with webkit)
        $select.on('click', function() {
          var e = document.createEvent('MouseEvents');
          e.initMouseEvent('mousedown');
          $this[0].dispatchEvent(e);
        });

      });

      // Refresh all event binded to window resize
      $(window).trigger('resize');

    };

    base.init();
  };

  $.Rapido.Select.defaultOptions = {
    selectClass: '.form__select'
  };

  $.rapido_Select = function(options) {
    new $.Rapido.Select(options);
  };

})(jQuery, window, document);


(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Suggest = function(options) {
    var base = this;

    base.init = function() {
      base.options = $.extend({},$.Rapido.Suggest.defaultOptions, options);

      setSize();

      $(window).resize(function() {
        setSize();
      });

      compileInput();

    };

    var setSize = function() {
      $(base.options.suggestClass).each(function() {

        var $suggest = $(this);
        var $input = $(this).parents(base.options.containerClass).children('input[type = "text"]');

        // Get position of the input and position the suggest accordingly
        $suggest.css({
          'top': ($input.position().top + $input.height()) + 'px',
          'left': $input.position().left + 'px',
          'width': $input.outerWidth() + 'px'
        });

        // Toggle class on :focus and :blur
        $input.focus(function() {
          $(base.options.suggestClass).removeClass('open');
          $suggest.addClass('open');
        });

        $input.blur(function() {
          $suggest.removeClass('open');
        });

      });
    };


    var compileInput = function() {
      $(base.options.suggestClass + ' a').on('click', function(e) {

        var value = $(this).attr(base.options.suggestAttr);
        var $input = $(this).parents(base.options.containerClass).children('input[type = "text"]');

        $input.val(value);

        e.preventDefault();
      });
    };

    base.init();
  };

  $.Rapido.Suggest.defaultOptions = {
    containerClass: '.form__controls',
    suggestClass: '.form__suggest',
    suggestAttr: 'title'
  };

  $.rapido_Suggest = function(options) {
    new $.Rapido.Suggest(options);
  };

})(jQuery, window, document);


(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Toggle = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Toggle', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Toggle.defaultOptions, options);

      var baseClass = '.' + base.el.className + ' ';
      var loop = baseClass + base.options.titleClass;

      $(loop).each(function(i, el) {
        toggle(el, baseClass);
      });

    };

    var toggle = function(el, baseClass) {

      $(el).click(function() {

        var titleClass = base.options.titleClass.replace(/(\[|\])/gi, '');
        var contentClass = base.options.contentClass.replace(/(\[|\])/gi, '');

        var id = $(this).attr(titleClass);
        var description = '[' + contentClass + '="' + id + '"]';

        // If target panel is already open then close it
        if ($(description).hasClass('open')) {
          $(description).removeClass('open');
          $(this).removeClass('open');
          return false;

        // If no panel is open then open it
        } else if (!$(baseClass + '*').hasClass('open')) {
          $(description).addClass('open');
          $(this).addClass('open');
          return false;

        // If there is already an open panel then close it and open the target panel
        } else {
          $(baseClass + base.options.titleClass).removeClass('open');
          $(baseClass + base.options.contentClass).removeClass('open');

          $(description)
            .delay(base.options.delay)
            .queue(function(next) {
                $(this).addClass('open');
                next();
              });

          $(this).addClass('open');
          return false;
        }
      });


    };

    base.init();
  };

  $.Rapido.Toggle.defaultOptions = {
    titleClass: '[data-toggle-name]',
    contentClass: '[data-toggle-content]',
    delay: 500
  };

  $.fn.rapido_Toggle = function(options) {
    return this.each(function() {
      (new $.Rapido.Toggle(this, options));
    });
  };

})(jQuery, window, document);

(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Tooltip = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Tooltip', base);

    var target = {};
    var tooltip = {};
    var content = base.$el.data('tooltip-content');
    var position = base.$el.data('tooltip-position');
    var is = {
      top: position.indexOf('top') >= 0,
      right: position.indexOf('right') >= 0,
      bottom: position.indexOf('bottom') >= 0,
      left: position.indexOf('left') >= 0,
      center: position.indexOf('center') >= 0
    };

    base.init = function() {
      base.options = $.extend({},$.Rapido.Tooltip.defaultOptions, options);

      addTooltip();
    };

    // Get position of target
    var getTargetData = function() {
      target.top = base.$el.position().top + base.$el.parent().scrollTop();
      target.left = base.$el.position().left;
      target.height = base.$el.outerHeight();
      target.width = base.$el.outerWidth();
    };

    // Get size of tooltip
    var getTooltipData = function() {
      tooltip.height = base.$el.next().outerHeight();
      tooltip.width = base.$el.next().outerWidth();
    };

    // Calculate positioning
    var setTooltipPositioning = function() {
      if (is.top) {
        tooltip.top = target.top - tooltip.height - base.options.margin;
      }
      if (is.right) {
        tooltip.left = target.left + target.width + base.options.margin;
      }
      if (is.bottom) {
        tooltip.top = target.top + target.height + base.options.margin;
      }
      if (is.left) {
        tooltip.left = target.left - tooltip.width - base.options.margin;
      }
      if (is.top || is.bottom) {
        tooltip.left = target.left + (target.width / 2) - (tooltip.width / 2);
      }
      if (is.left || is.right) {
        tooltip.top = target.top + (target.height / 2) - (tooltip.height / 2);
      }

      // Reset width and height, we don't need them anymore
      tooltip.height = null;
      tooltip.width = null;
    };

    // Add tooltip to html
    var addTooltip = function() {
      $('<span class="tooltip" />').html(content).insertAfter(base.el);

      // Get and set correct positioning
      $(window).on('ready resize', function() {
        getTargetData();
        getTooltipData();
        setTooltipPositioning();
      });

      // Add css positioning to tooltip
      $(window).on('ready resize', function() {
        base.$el.next().css(tooltip);
      });

      // Toggle on :hover
      base.$el.on('mouseenter mouseleave', function() {
        $(this).next().toggleClass('open');
      });

      // Prevent from closing if tooltip is hovered
      base.$el.next().on('mouseenter mouseleave', function() {
        $(this).toggleClass('open');
      });

    };

    base.init();
  };

  $.Rapido.Tooltip.defaultOptions = {
    margin: 15
  };

  $.fn.rapido_Tooltip = function(options) {
    return this.each(function() {
      (new $.Rapido.Tooltip(this, options));
    });
  };

})(jQuery, window, document);


(function($, window, document, undefined) {

  $.rapido_Utilities = {

    // Get class of element object
    getClass: function(el) {
      var attr = $(el).attr('class');
      if (typeof attr !== 'undefined' && attr !== false) {
        el = $.trim($(el).attr('class'));
        return '.' + el.split(' ').join('.');
      }
    },

    // Remove dot from class
    dotlessClass: function(string) {
      return string.slice(1);
    },

    // Check if an element exist
    elemExist: function(string) {
      return $(string).length !== 0;
    }

  };

})(jQuery, window, document);

