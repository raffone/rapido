let $ = jQuery, window, document

  'use strict'

  pluginName = "Toggle"

  defaults =
    titleClass: '[data-toggle-name]'
    contentClass: '[data-toggle-content]'
    delay: 500
    closable: true
    addHeight: false
    addMaxHeight: false
    positionMaxHeight: 'padding-top'
    defaultOpen: 0
    debug: false

  class Toggle
    (@el, options) ->
      @_defaults = defaults
      @_name = pluginName
      @options = $.extend {}, defaults, options
        ..selector = $.rapido.getClass(@el) + ' '
        ..titles =  @options.selector + @options.titleClass
        ..contents = @options.selector + @options.contentClass
        ..contentsHeight = {}
      @init!

    init: !->
      if @options.addMaxHeight          then $.rapido.onResize @, @setMaxHeight
      if @options.addHeight             then $.rapido.onResize @, @setHeight
      if @options.defaultOpen != false  then $.rapido.onResize @, @setOpenPanel

      # For each titleClass attach click event
      $(@options.titles).each (i, el) ~>
        if @options.debug then console.log el
        @clickEvent el

    # add max-height to container if addMaxHeight is set to true
    setMaxHeight: !->
      height = []

      # Loop throught and add all childen heights to array
      $(@options.contents).each (i, el) !-> height.push $(el).height!

      # Apply max height to container
      $(@el).css @options.positionMaxHeight, Math.max.apply(null, height) + 'px'

    # add height of current target to container if addHeight is set to true
    setHeight: !->
      $(@options.contents).each (i, el) !~>
        height = 0

        # Get id of current content block
        id = $(el).data 'toggle-content'

        # Sum all the rounded heights of all the children elements
        $(el).children!.each (i, el) !-> height += $(el).outerHeight! |> Math.ceil

        # Create object with heights of all contents
        @options.contentsHeight <<< "#id": height + 'px'

    # Set default open panel
    setOpenPanel: !->
      $(@options.titles).eq @options.defaultOpen .addClass 'open'
      $(@options.contents).eq @options.defaultOpen .addClass 'open'

    clickEvent: (el) !->
      $(el).click ~>

        # Extract ID of clicked element and create selectors
        id = $(it.currentTarget).attr 'data-toggle-name'
        name = "[data-toggle-name=\"#{id}\"]"
        description = "[data-toggle-content=\"#{id}\"]"

        if @options.debug then
          console.log it
          console.log id
          console.log name
          console.log description

        # If target panel is already open and is closable then close it
        if $(description).hasClass 'open'
          if @options.closable
            $(description).removeClass 'open'
            $(name).removeClass 'open'

            if @options.addHeight
              $(description).removeAttr 'style'

        # If no panel is open then open it
        else if !$(@options.selector + '*').hasClass 'open'
          $(description).addClass 'open'
          $(name).addClass 'open'

          # Add min-height if required
          if @options.addHeight
            $(description).css 'min-height': @options.contentsHeight[id]

        # If there is already an open panel then close it and open the target
        # panel (with delay if set)
        else
          # Remove classes to close all
          $(@options.titles).removeClass 'open'
          $(@options.contents).removeClass 'open'

          # Remove all style definitions
          if @options.addHeight
            $(@options.contents).removeAttr 'style'

          # Wait N sec (delay) then add class to open the content
          $(description)
            .delay @options.delay
            .queue (next) !->
              $(description).addClass 'open'
              next!

          # Update min-height
          if @options.addHeight
            $(description).css 'min-height': @options.contentsHeight[id]

          # Finally add class to toggler
          $(name).addClass 'open'

        # Disable default link action
        it.preventDefault!


  $.fn.rapido_Toggle = (options) ->
    @.each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Toggle @, options

