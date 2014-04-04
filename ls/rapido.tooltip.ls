let $ = jQuery, window, document

  'use strict'

  pluginName = "Tooltip"

  defaults =
    margin: 15

  class Tooltip
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
      @init!

    init: !->
      @options.content = $(@el).data 'tooltip-content'
      @options.position = $(@el).data 'tooltip-position'
      @is =
        top:     @options.position.indexOf('top') >= 0
        right:   @options.position.indexOf('right') >= 0
        bottom:  @options.position.indexOf('bottom') >= 0
        left:    @options.position.indexOf('left') >= 0
        center:  @options.position.indexOf('center') >= 0

      $.rapido.onResize @, [
        @getTargetData
        @getTooltipData
        @setTooltipPositioning
      ]

      @addTooltip!
      @hoverEvent!

    # Get position of target
    getTargetData: ->
      @target =
        #top:     $(@el).position!.top + $(@el).parent!.scrollTop!
        top:     $(@el).position!.top
        left:    $(@el).position!.left
        height:  $(@el).outerHeight!
        width:   $(@el).outerWidth!

    # Get size of tooltip
    getTooltipData: ->
      @tooltip =
        height:  $(@el).next!.outerHeight!
        width:   $(@el).next!.outerWidth!

    # Calculate positioning
    setTooltipPositioning: ->
      @style = {}

      # Set tooltip offset
      if @is.top    then @style.top  = @target.top  - @tooltip.height - @options.margin
      if @is.left   then @style.left = @target.left - @tooltip.width  - @options.margin
      if @is.bottom then @style.top  = @target.top  + @target.height  + @options.margin
      if @is.right  then @style.left = @target.left + @target.width   + @options.margin

      # If top or bottom align horizontally
      if @is.top or @is.bottom then
        @style.left = @target.left + @target.width / 2 - @tooltip.width / 2

      # If left or right align vertically
      if @is.left or @is.right then
        @style.top = @target.top + @target.height / 2 - @tooltip.height / 2

      # Correct if offscreen left position
      if @style.left < 0 then
        @style.left = @target.left
        $(@el).next!.addClass 'left-offset'
      else
        $(@el).next!.removeClass 'left-offset'

    # Add tooltip to html
    addTooltip: !->
      $('<span class="tooltip" />')
        .html @options.content
        .insertAfter @el

      # Add css positioning to tooltip
      $.rapido.onResize @, -> $(@el).next!.css @style

    # Toggle on :hover
    hoverEvent: !->
      $(@el).on 'mouseenter mouseleave', -> $(@).next!.toggleClass 'open'

      # Prevent from closing if tooltip is hovered
      $(@el).next!.on 'mouseenter mouseleave', ->  $(@).toggleClass 'open'

  $.fn.rapido_Tooltip = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Tooltip @, options
