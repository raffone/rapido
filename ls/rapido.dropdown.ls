let $ = jQuery, window, document

  'use strict'

  pluginName = "Dropdown"

  defaults =
    event:         'click'
    wrapperClass:  '.dropdown'
    togglerClass:  '.dropdown__toggle'

  class Dropdown
    (@el, options) ->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
      @init!

    init: !->
      if @options.event == 'hover'
        then @toggleHover!
        else @toggleClick!
      @closeEvent!

    toggleClick: !->
      options = @options

      $(@el).on @options.event, (e) !->
        if $(@).hasClass('open')
          then
            $(@).removeClass 'open'
          else
            $(options.wrapperClass).removeClass 'open'
            $(@).addClass 'open'

      $(@el).on @options.event, @options.togglerClass, ->
        it.preventDefault!

    toggleHover: !->
      @options.event = 'mouseenter mouseleave'

      $(@el).on @options.event, !->
        $(@).toggleClass 'open'

    closeEvent: !->
      $('html').click !~>
        $(@el).removeClass 'open'

      $(@el).click ->
        it.stopPropagation!

  $.fn.rapido_Dropdown = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Dropdown @, options
