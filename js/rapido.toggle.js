(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Toggle = function(el, options) {
    var base = this,
        titleClass,
        titlesLoop,
        contentClass,
        contentsLoop,
        id,
        description,
        baseClass,
        contentsHeight = {},
        height;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Toggle', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Toggle.defaultOptions, options);

      titleClass = base.options.titleClass.replace(/(\[|\])/gi, '');
      contentClass = base.options.contentClass.replace(/(\[|\])/gi, '');

      // Create selector for the loops
      baseClass = $.rapido_Utilities.getClass(base.el) + ' ';
      titlesLoop = baseClass + base.options.titleClass;
      contentsLoop = baseClass + base.options.contentClass;

      // add max-height to container if addMaxHeight is set to true
      if (base.options.addMaxHeight) {
        $(window).on('ready resize', function() {
          height = [];

          $(contentsLoop).each(function(i, el) {
            height.push($(el).height());
          });

          base.$el.css(base.options.positionMaxHeight, Math.max.apply(null, height) + 'px');
        });
      }

      // Calculate max-height on load and resize
      if (base.options.addHeight) {
        $(window).on('ready resize', function() {
          $(contentsLoop).each(function(i, el) {
            height = 0;

            $(el).children().each(function(i, el) {
              height += Math.ceil($(el).outerHeight());
            });

            contentsHeight[$(el).data('toggle-content')] = height + 'px';
          });
        });
      }

      // Set default open panel
      if (base.options.defaultOpen !== false) {
        $(titlesLoop).eq(base.options.defaultOpen).addClass('open');
        $(contentsLoop).eq(base.options.defaultOpen).addClass('open');
      }

      // For each titleClass attach click event
      $(titlesLoop).each(function(i, el) {
        toggle(el, baseClass);
      });

    };

    var toggle = function(el, baseClass) {

      $(el).click(function() {

        id = $(this).attr(titleClass);
        description = '[' + contentClass + '="' + id + '"]';

        // If target panel is already open and is closable then close it
        if ($(description).hasClass('open')) {
          if (base.options.closable) {
            $(description).removeClass('open');

            if (base.options.addHeight) {
              $(description).removeAttr('style');
            }

            $(this).removeClass('open');
          }

        // If no panel is open then open it
        } else if (!$(baseClass + '*').hasClass('open')) {
          $(description).addClass('open');

          if (base.options.addHeight) {
            $(description).css({'min-height': contentsHeight[id]});
          }

          $(this).addClass('open');

        // If there is already an open panel then close it and open the target panel
        } else {
          $(baseClass + base.options.titleClass).removeClass('open');
          $(baseClass + base.options.contentClass).removeClass('open');

          if (base.options.addHeight) {
            $(baseClass + base.options.contentClass).removeAttr('style');
          }

          $(description)
            .delay(base.options.delay)
            .queue(function(next) {
                $(this).addClass('open');
                next();
              });
          if (base.options.addHeight) {
            $(description).removeAttr('style');
          }

          $(this).addClass('open');
        }

        return false;
      });


    };

    base.init();
  };

  $.Rapido.Toggle.defaultOptions = {
    titleClass: '[data-toggle-name]',
    contentClass: '[data-toggle-content]',
    delay: 500,
    closable: true,
    addMaxHeight: false,
    positionMaxHeight: 'padding-top',
    defaultOpen: 0,
    addHeight: false
  };

  $.fn.rapido_Toggle = function(options) {
    return this.each(function() {
      (new $.Rapido.Toggle(this, options));
    });
  };

})(jQuery, window, document);
