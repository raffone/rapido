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
      target.top = base.$el.position().top;
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

