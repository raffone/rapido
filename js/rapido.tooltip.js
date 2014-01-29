(function($, window, document, undefined) {

  if (!$.Rapido) {
    $.Rapido = {};
  }

  $.Rapido.Tooltip = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data('Rapido.Tooltip', base);

    base.init = function() {
      base.options = $.extend({},$.Rapido.Tooltip.defaultOptions, options);

      addTooltip();
    };


    var addTooltip = function() {

      // Create empty objects
      var target = {};
      var tooltip = {};

      // Get content of tooltip
      var content = base.$el.data('tooltip-content');

      // Get positioning settings of tooltip
      var position = base.$el.data('tooltip-position');

      // Add tooltip to html
      $('<span class="tooltip" />').html('<span>' + content + '</span>').insertAfter(base.el);
      //$('<span class="tooltip" />').appendTo('body');


      // Get position of target
      target.top = base.$el.position().top;
      target.left = base.$el.position().left;
      target.height = base.$el.outerHeight();
      target.width = base.$el.outerWidth();


      // Get size of tooltip
      tooltip.height = $('.tooltip').outerHeight();
      tooltip.width = $('.tooltip').outerWidth();

      // Check what position is set in the options
      var is = {
        top: position.indexOf('top') >= 0,
        right: position.indexOf('right') >= 0,
        bottom: position.indexOf('bottom') >= 0,
        left: position.indexOf('left') >= 0,
        center: position.indexOf('center') >= 0
      };

      // Calculate positioning
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
      //if (is.top && is.center || is.bottom && is.center) {
      //tooltip.left = target.left + ( target.width / 2) - ( tooltip.width / 2);
      //}
      //if (is.left && is.center || is.right && is.center) {
      //tooltip.top = target.top + ( target.height / 2) - ( tooltip.height / 2);
      //}
      if (is.top || is.bottom) {
        tooltip.left = target.left + (target.width / 2) - (tooltip.width / 2);
      }
      if (is.left && is.right) {
        tooltip.top = target.top + (target.height / 2) - (tooltip.height / 2);
      }

      // Reset width and height, we don't need them anymore
      tooltip.height = null;
      tooltip.width = null;

      // Add css positioning to tooltip
      base.$el.next('.tooltip').css(tooltip);

      base.$el.on('mouseenter mouseleave', function() {
        base.$el.next('.tooltip').toggleClass('open');
      });

      //base.$el.on('mouseleave', function(){
      //base.$el.next('.tooltip').removeClass('open')
      //});

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

