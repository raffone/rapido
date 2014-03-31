let $ = jQuery, window, document

  'use strict'

  pluginName = "Suggest"

  defaults =
    containerClass: '.form__controls'
    suggestClass: '.form__suggest'
    suggestAttr: 'title'

  class Suggest
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
        ..input = $(@el).parents @options.containerClass .children 'input[type="text"]'
      @init!

    init: !->
      $.rapido.onResize @, @setSize

      @focusEvent!
      @clickEvent!

    # Get position of the input and position the suggest accordingly
    setSize: !->
      $(@el).css {
        top: @options.input.position!.top + @options.input.height! + 'px'
        left: @options.input.position!.left + 'px'
        width: @options.input.outerWidth! + 'px'
      }

    # Toggle class on :focus
    focusEvent: !->
      @options.input.focus !~>
        $(@options.suggestClass).removeClass 'open'
        $(@el).addClass 'open'

    # Add click event
    clickEvent: !->
      $(@el).on 'click', 'a', ~>
        # Get value of clicked link and add it to input
        @options.input.val $(it.currentTarget).attr @options.suggestAttr

        # Close suggest dropdown
        $(@el).removeClass 'open'

        # Disable default link action
        it.preventDefault!

      # When clicking outside of open suggest dropdown close it
      $('html, body').click ~> $(@options.suggestClass).removeClass 'open'
      $('input').click (e) -> e.stopPropagation!

  $.rapido_Suggest = (options) ->
    $(defaults.suggestClass).each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Suggest @, options

