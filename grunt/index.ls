module.exports = (grunt, custom, options) !->

  # Load modules
  # ----------------------------------------------------------------------------
  require! {
    fs
    _: lodash
  }


  # Settings
  # ----------------------------------------------------------------------------
  custom = custom or {}
  options = options or {}
  modules = {}

  # Grab settings
  defaults = JSON.parse fs.readFileSync './bower_components/rapido/grunt/defaults.json', 'utf8'
  settings = JSON.parse fs.readFileSync './project.json', 'utf8'
  project = _.merge defaults, settings, (a, b) ->
    if _.isArray a then
      a.concat b
    else
      undefined

  # Activate default modules
  project.modules.push 'watch'
  project.modules.push 'notify'

  config = project: project

  # Check if enabled function
  # ----------------------------------------------------------------------------

  isEnabled = ->
    project.modules.length > 0 and project.modules.indexOf(it) isnt -1

  # Notifications
  # ----------------------------------------------------------------------------

  modules.notify = !->
    grunt.loadNpmTasks 'grunt-notify'
    config.notify = {
      sass: {options: {message: 'Sass compiled'}}
      js: {options: {message: 'Javascript changed'}}
      ls: {options: {message: 'LiveScript compiled'}}
      template: {options: {message: 'Template changed'}}
      sprite: {options: {message: 'Sprites updated'}}
    }

  # Watch
  # ----------------------------------------------------------------------------

  modules.watch = !->
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.registerTask 'default', ['watch']

    config.watch =
      options:
        livereload: true
        interrupt: true

      template:
        files: [
          '*.php'
          '*.html'
          '**/*.php'
          '**/*.html'
          '!**/bower_components/**'
          '!**/node_modules/**'
        ]

        tasks: ['notify:template']

  # Compile Sass Files
  # ------------------------------------------------------------------------

  modules.sass = !->
    grunt.loadNpmTasks 'grunt-contrib-sass'

    config.sass =
      all:
        options:
          style: 'compressed'
          sourcemap: '<%= project.sass.sourcemap %>'
          require: ['sass-globbing', 'sass-media_query_combiner']

        files:
          '<%= project.sass.target %>': '<%= project.sass.source %>'

    config.watch.sass =
      files: [
        '**/*.sass'
        '**/*.scss'
        '!**/bower_components/**'
        '!**/node_modules/**'
      ]

      tasks: ['sass', 'notify:sass']

  # Png Sprites
  # ------------------------------------------------------------------------

  modules.sprite = !->
    grunt.loadNpmTasks 'grunt-spritesmith'

    config.sprite =
      all:
        src: '<%= project.sprite.source %>'
        destImg: '<%= project.sprite.target %>'
        destCSS: '<%= project.sprite.stylesheet %>'
        padding: 6
        cssTemplate: 'bower_components/rapido/grunt/sprites.sass.mustache'

    config.watch.sprites =
      options:
        interrupt: false
      files: '<%= project.sprite.source %>'
      tasks: ['sprite', 'notify:sprite']

  # Svg Sprites
  # ------------------------------------------------------------------------

  modules.svgsprite = !->
    grunt.loadNpmTasks 'grunt-svg-sprite'

    config.svgsprite =
      options:
        dims: true
        spritedir: '../images'
        sprite: 'svg-sprites'
        render:
          css: false
          scss:
            dest: '<%= project.svgsprite.stylesheet %>'
      all:
        src: '<%= project.svgsprite.source %>'
        dest: '<%= project.svgsprite.target %>'

    config.watch.svgsprite =
      options:
        interrupt: false
      files: ['<%= project.svgsprite.watch %>']
      tasks: ['svgsprite', 'notify:sprite']

  # Svg Failbacks (svg !-> Png)
  # ------------------------------------------------------------------------

  modules.svg2png = !->
    grunt.loadNpmTasks 'grunt-svg2png'

    config.svg2png =
      all:
        files: [
          src: '<%= project.svg2png.source %>'
          dest: '<%= project.svg2png.target %>'
        ]

    config.watch.svg2png =
      files: ['<%= project.svg2png.source %>']
      tasks: ['svg2png']

  # Concat Js Files
  # ------------------------------------------------------------------------

  modules.concat = !->
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.registerTask 'js', ['concat']

    config.concat =
      ie:
        src: ['<%= project.js.sources.ie %>']
        dest: '<%= project.js.target.ie %>'

      vendor:
        src: ['<%= project.js.sources.vendor %>']
        dest: '<%= project.js.target.vendor %>'

      modernizr:
        src: ['<%= project.js.sources.modernizr %>']
        dest: '<%= project.js.target.modernizr %>'

    if project.js.target.app

      config.concat.app =
        src: ['<%= project.js.sources.app %>']
        dest: '<%= project.js.target.app %>'

      config.watch.js =
        files: ['<%= project.js.sources.app %>']
        tasks: ['js', 'notify:js']

  # Concat & Minify Js Files
  # ------------------------------------------------------------------------

  modules.uglify = !->
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.registerTask 'js', ['uglify']

    config.uglify =
      options:
        mangle:
          except: ['jQuery']
      all:
        files:
          '<%= project.js.target.ie %>': ['<%= project.js.sources.ie %>']
          '<%= project.js.target.vendor %>': ['<%= project.js.sources.vendor %>']
          '<%= project.js.target.modernizr %>': ['<%= project.js.sources.modernizr %>']

    if project.js.target.app

      config.uglify.all.files.'<%= project.js.target.app %>' = ['<%= project.js.sources.app %>']

      config.watch.js =
        files: ['<%= project.js.sources.app %>']
        tasks: ['js', 'notify:js']

  # Concat & Compile Ls Files
  # ------------------------------------------------------------------------

  modules.livescript = !->
    grunt.loadNpmTasks 'grunt-livescript'

    config.livescript =
      options:
        bare: true
      all:
        files:
          '<%= project.ls.target %>': ['<%= project.ls.sources %>']

    config.watch.ls =
      files: ['<%= project.ls.sources %>']
      tasks: ['livescript', 'notify:js']

  # Debug
  # ----------------------------------------------------------------------------

  modules.time = !->
    (require 'time-grunt') grunt

  modules.debug = !->
    console.log 'DEFAULT -----------------------------------------------------'
    console.log JSON.stringify defaults, null, '\t'
    console.log 'CONFIG ------------------------------------------------------'
    console.log JSON.stringify config, null, '\t'
    console.log 'CUSTOM ------------------------------------------------------'
    console.log JSON.stringify custom, null, '\t'
    console.log 'MERGED ------------------------------------------------------'
    console.log JSON.stringify merged, null, '\t'

  # initConfig
  # ----------------------------------------------------------------------------

  # Include modules
  for key, value of modules
    if isEnabled key then value!

  # Merge rapido config with custom config
  merged = _.merge config, custom

  # Include debug modules if necessary
  if options.debug then modules.debug!
  if options.time then modules.time!

  # Initialize grunt
  grunt.initConfig merged
