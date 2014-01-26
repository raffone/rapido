/*
 *  Rapido - v0.1.6
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
      var animation, offset, scrollbar, container, added = false;

      animation = base.$el.data('animation');


      if (base.options.offsetMenu) {
        container = '.offcanvas__content';
        offset = base.$el.position();
      } else {
        container = window;
        offset = base.$el.offset();
      }

      offset = offset.top - base.options.offset;
      offset = parseInt(offset);

      //console.log(offset);

      $(container).scroll(function(e) {

        if (base.options.offsetMenu) {
          scrollbar = $('.offcanvas__content').scrollTop();
        } else {
          scrollbar = $(document).scrollTop();
        }

        //console.log(scrollbar);

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
    offsetMenu: false
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

      var wrapperClass, togglerClass, str;

      // Grab and convert class name of container
      wrapperClass = '.' + base.$el.attr('class').split(' ')[0];

      // Grab and convert class of the toggler button
      str = base.$el.children()[0];
      str = '.' + str.className.replace(/ /g, '.');
      str = str.substring(0, str.length - 1);

      togglerClass = str;

      if (base.options.event == 'hover') {
        toggleHover();
      } else {
        toggleClick(wrapperClass, togglerClass);
      }

      close();
    };

    // Event: Click
    var toggleClick = function(wrapperClass, togglerClass) {

      base.$el.on(base.options.event, function(e) {

        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $(wrapperClass).removeClass('open');
          $(this).addClass('open');
        }
      });

      base.$el.on(base.options.event, togglerClass, function(e) {
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
    event: 'click'
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

      var w = $(window).width();

      var max = base.options.maxWidth;
      var min = base.options.minWidth;

      move(w, max, min);

      $(window).resize(function() {
        var w = $(window).width();
        move(w, max, min);
      });

    };

    var move = function(w, max, min) {

      if (max && min && w <= max && w >= min) {
        $(base.options.destination).append(base.el);

      } else if (max && !min && w <= max) {
        $(base.options.destination).append(base.el);

      } else if (min && !max && w >= min) {
        $(base.options.destination).append(base.el);

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

      base.$el.on('click', function() {
        $(base.options.containerClass).addClass(base.options.toggleClass);
      });

    };

    var close = function() {

      $('html').on('click', function(e) {
        $(base.options.containerClass).removeClass(base.options.toggleClass);
      });

      base.$el.on('click', function(e) {
        e.stopPropagation();
      });

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

$('.offcanvas__menu--toggle').rapido_Offcanvas();

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

    // Remove dot for option classes
    var dotless = function(text) {
      return text.slice(1);
    };

    var addOverlay = function() {
      var present = $(base.options.backgroundClass).length;

      // If there isn't a .overlay-background element, add it
      if (present === 0) {
        // Add overlay element
        $('<div />')
          .addClass(dotless(base.options.backgroundClass))
          .appendTo('body');
      }
    };

    var addClose = function(id) {
      // Add close button to overlay
      $('<span>Close</span>')
        .addClass(dotless(base.options.closeClass))
        .prependTo('[data-overlay-content="' + id + '"]');
    };

    var openOverlay = function(id) {

      base.$el.on('click', function(e) {
        var offset, height;

        height = $(window).height();

        $(window).scroll(function() {
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

  $.Rapido.Suggest = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Suggest', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Suggest.defaultOptions, options);

      var className = '.' + base.$el.attr('class').split(' ').join('.');
      compileInput(className);

    };

    var compileInput = function(className) {
      $(className + ' ' + base.options.suggestClass + ' a').on('click', function(e) {
        var value = $(this).text();
        $(this)
          .parents(base.options.containerClass)
          .children('input[type="text"]').val(value);
        e.preventDefault();
      });
    };

    base.init();
  };

  $.Rapido.Suggest.defaultOptions = {
    containerClass: '.form__controls',
    suggestClass: '.form__suggest'
  };

  $.fn.rapido_Suggest = function(options) {
    return this.each(function() {
      (new $.Rapido.Suggest(this, options));
    });
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

        // Se il pannello e' gia aperto > chiudilo
        if ($(description).hasClass('open')) {
          $(description).removeClass('open');
          $(this).removeClass('open');
          return false;

        // Se nessun pannello e' aperto > aprilo
        } else if (!$(baseClass + '*').hasClass('open')) {
          $(description).addClass('open');
          $(this).addClass('open');
          return false;

        // Se c'e un altro pannello perto > chiudilo, aspetta, e apri
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
