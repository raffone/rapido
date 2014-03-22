let $ = jQuery, window, document

  'use strict'

  pluginName = "Scroll"

  defaults =
    duration: 1600
    offset: 20
    offsetClass: '.offcanvas__content'

  class Scroll
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
        ..target = $(@el).attr 'href'
        ..isOffset = !!$(@options.offsetClass).length
      @init!

    init: !->
      # Set corrent container of the content
      if @options.isOffset
        then @options.container = @options.offsetClass
        else @options.container = 'html, body'
      @clickEvent!

    # Add offset to taget position
    getOffset: ->
      $(@options.target).offset!.top - @options.offset

    # On click go to target
    clickEvent: !->
      $(@el).click ~>
        $(@options.container).animate scrollTop: @getOffset!, @options.duration
        it.preventDefault!

  $.fn.rapido_Scroll = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Scroll @, options

