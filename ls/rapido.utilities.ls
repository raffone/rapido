let $ = jQuery, window, document

  'use strict'

  self = $.rapido =

    # Get class of element @ect
    getClass: (el) ->
      #attr = $ el .attr 'class'
      #if typeof attr != 'undefined' && attr != false
      el = $ el .attr 'class' |> $.trim
      '.' + el.split ' ' .join '.'

    # Remove dot from class
    dotlessClass: (string) -> string.slice(1)

    # Check if an element exist
    elemExist: (string) -> $(string)?

    # Debounce function from bit.ly/1nMc2cd
    debounce: (func, wait, immediate) ->
      var timeout
      ->
        args = arguments
        clearTimeout timeout
        timeout := setTimeout (~>
          timeout := null
          func.apply @, args if not immediate), wait
        func.apply @, args if immediate and not timeout

    # Call function o on load and debounced call on resize
    onResize: (bind, func, delay = 300) ->
      if typeof! func is 'Array'
        then func.forEach ->
          self.debounce(it, delay).bind(bind)!
          $(window).resize self.debounce(it, delay).bind(bind)
        else
          self.debounce(func, delay).bind(bind)!
          $(window).resize self.debounce(func, delay).bind(bind)

