let $ = jQuery, window, document

  'use strict'

  pluginName = "Select"

  defaults =
    selectClass: '.form__select'

  class Select
    (@el, options) !->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
      @init!

    init: !->
      @wrapSelect!

    # Check if the select has already the wrapper class
    wrapSelect: !->
      if !$(@el).parent!.hasClass @options.selectClass.slice(1)
        $(@el).wrap('<span class="' + @options.selectClass.slice(1) + '" />')

  $.rapido_Select = (options) ->
    $('select').each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Select @, options
