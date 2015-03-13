let $ = jQuery, window, document

  'use strict'

  pluginName = "Overlay"

  defaults =
    duration: 500
    closeClass: '.overlay-close'
    backgroundClass: '.overlay-background'
    offsetClass: '.offcanvas__content'
    closeButtonHtml: '<span>Close</span>'
    addSidebarBorder: true

  class Overlay
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
        ..id = $(@el).data("overlay-ref")
        ..selector = '[data-overlay-content="' + @options.id + '"]'
        ..isOffset = !!$(@options.offsetClass).length
        ..isOldIE = $("html").hasClass("no-csstransitions")
      @init!

    init: !->
      if @options.isOldIE then @options.delay = 0
      @addOverlay!
      @addClose!
      @openOverlay!
      @closeOverlay!

    getHeight: ->
      $(window).height!

    addOverlay: !->
      # If there isn't a .overlay-background element, add it
      if $(@options.backgroundClass).length is 0

        backgroundTarget =
          if @options.isOffset then @options.offsetClass else 'body'

        # Add overlay element
        $('<div />')
          .addClass @options.backgroundClass.slice(1)
          .appendTo backgroundTarget

    # Add close button to overlay
    addClose: !->
      $(@options.closeButtonHtml)
        .addClass @options.closeClass.slice(1)
        .prependTo @options.selector

    openOverlay: !->
      $(@el).on 'click', ~>

        # Set overflow:hidden to background page
        $('html')
          .css overflow: 'hidden' height: '100%'

        # Add scrollbar offset only if desktop browser
        if @options.addSidebarBorder
          $('html.no-touch')
            .css 'border-right': '15px solid #f2f2f2'

        # Set class to open and add offset
        $(@options.selector)
          #.toggleClass 'open'
          .css top: '0' height: @getHeight!
          .fadeIn @options.duration


        $(@options.backgroundClass)
          .css top: '0' height: @getHeight!
          .fadeIn @options.duration

        # If window is resized update offset
        $(window).resize !~>
          $(@options.selector) .css height: @getHeight!
          $(@options.backgroundClass) .css height: @getHeight!

        it.preventDefault!

    closeOverlay: !->
      $(@options.closeClass).on 'click', !~>

        # Set overlay class to close
        $(@options.selector)
          .fadeOut @options.duration
          #.toggleClass 'open'

        $(@options.backgroundClass)
          #.toggleClass 'open'
          .fadeOut @options.duration

        # Remove overflow:hidden
        $('html, body')
          .removeAttr 'style'

  $.fn.rapido_Overlay = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Overlay @, options

