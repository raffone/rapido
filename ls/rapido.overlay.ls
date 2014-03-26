let $ = jQuery, window, document

  'use strict'

  pluginName = "Overlay"

  defaults =
    delay: 500
    closeClass: '.overlay-close'
    backgroundClass: '.overlay-background'

  class Overlay
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
        ..id = $(@el).data("overlay-ref")
        ..selector = '[data-overlay-content="' + @options.id + '"]'
      @init!

    init: !->
      if $("html").hasClass("no-csstransitions") then @options.delay = 0
      @addOverlay!
      @addClose!
      @openOverlay!
      @closeOverlay!

    getHeight: ->
      $(window).height!

    addOverlay: !->
      # If there isn't a .overlay-background element, add it
      if $(@options.backgroundClass).length is 0

        # Add overlay element
        $('<div />')
          .addClass @options.backgroundClass.slice(1)
          .appendTo 'body'

    # Add close button to overlay
    addClose: !->
      $('<span>Close</span>')
        .addClass @options.closeClass.slice(1)
        .prependTo @options.selector

    openOverlay: !->
      $(@el).on 'click', ~>

        # Set ovewrflow:hidden to backgroudn page
        $('html')
          .css overflow: 'hidden' height: 'auto'

        # Add scrollbar offset only if desktop browser
        $('html.no-touch')
          .css 'border-right': '15px solid #f2f2f2'

        # Set class to open and add offset
        $(@options.selector + ', ' + @options.backgroundClass)
          .removeClass 'close'
          .addClass 'open'
          .css top: '0' height: @getHeight!

        # If window is resized update offset
        $(window).resize !~>
          $(@options.selector + '.open, ' + @options.backgroundClass + '.open')
            .css height: @getHeight!

        it.preventDefault!

    closeOverlay: !->
      $(@options.closeClass).on 'click', !~>

        # Set overlay class to close
        $(@options.selector + ', ' + @options.backgroundClass)
          .addClass 'close'
          .delay @options.delay
          .queue (next) !->
            $(@)
              .removeClass 'open close'
              .removeAttr "style"
              next!

        # Remove overflow:hidden
        $('html, body')
          .delay(@options.delay)
          .queue (next) !->
            $(@).removeAttr 'style'
            next!

  $.fn.rapido_Overlay = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Overlay @, options
