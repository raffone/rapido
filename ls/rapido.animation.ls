let $ = jQuery, window, document

  'use strict'

  pluginName = "Animation"

  defaults =
    offset: 500
    offsetClass: '.offcanvas__content'

  class Animation
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
        ..animationName = $(@el).data 'animation'
        ..isOffset = !!$(@options.offsetClass).length
        ..added = false
      @init!

    init: !->
      if @options.isOffset
        then @options.container = @options.offsetClass
        else @options.container = window
      @scrollEvent!

    # Quick get position method
    getOffset: ->
      $(@el).position!.top - @options.offset

    # Add scroll event
    scrollEvent: !->
      # Check if current content position is above or below the treshold of
      # scroll position - element offset, if true add class and mark as added
      $(@options.container).scroll !~>
        if @getOffset! < 0 && !@options.added
          $(@el).addClass @options.animationName
          @options.added = true


  $.fn.rapido_Animation = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Animation @, options


