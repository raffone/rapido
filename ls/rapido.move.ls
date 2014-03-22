let $ = jQuery, window, document

  'use strict'

  pluginName = "Move"

  defaults =
    destination: null
    maxWidth: null
    minWidth: null

  class Move
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
        ..origin = '.' + @el.parentNode.className
      @min = @options.minWidth # Shortcut
      @max = @options.maxWidth # Shortcut
      @init!

    init: !->
      # On ready and resize call function
      $.rapido.onResize @, @moveElement

    # Get current window width
    getWidth: ->
      $(window).width!

    moveElement: !->
      w = @getWidth!

          # If max-width and min-height are set and match window
      if  @max && @min && w <= @max && w >= @min ||

          # If only @max-width is set and match window
          @max && !@min && w <= @max ||

          # If only @min-width is set and match window
          @min && !@max && w >= @min

      then
        $(@options.destination).append @el

      # If none match window
      else
        $(@options.origin).append @el

  $.fn.rapido_Move = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Move @, options
