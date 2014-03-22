let $ = jQuery, window, document

  'use strict'

  pluginName = "Offcanvas"

  defaults =
    toggleClass: '.offcanvas__menu--open'
    containerClass: '.offcanvas__container'
    menuClass: '.offcanvas__menu'

  class Offcanvas
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
      @init!

    init: !->
      @openEvent!
      @closeEvent!

    # Click on toggle button add class to container
    openEvent: !->
      $(@el).click ~>
        $(@options.containerClass).addClass @options.toggleClass.slice(1)

    closeEvent: !->
      # Click on dim area close remove class from container
      $('html').click ~>
        $(@options.containerClass).removeClass @options.toggleClass.slice(1)

      # Prevent from closing if clicking inside the sidebar
      $(@el).click -> it.stopPropagation!

      # Prevent from closing if clicking the toggle button
      $(@options.menuClass).click -> it.stopPropagation!

  $.fn.rapido_Offcanvas = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Offcanvas @, options


