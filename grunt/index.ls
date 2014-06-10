# Load modules
require! {
  fs
  _: lodash
}

# Settings
defaults = fs.readFileSync './bower_components/rapido/grunt/defaults.json', 'utf8'
settings = fs.readFileSync './project.json', 'utf8'
project = JSON.parse _.merge settings, defaults, (a, b) ->
  if _.isArray a then
    a.concat b
  else
    undefined

isEnabled = (name) ->
  project.modules.length > 0 and project.modules.indexOf(name) isnt -1

initConfig = (grunt, custom, debug) !->
  modules = require './plugins'

  # Initialize config
  custom = custom or {}
  config = project: project

  # Include modules
  modules.watch grunt
  modules.notify grunt
  modules.sass grunt if isEnabled 'sass'
  modules.sprite grunt if isEnabled 'sprite'
  modules.svgsprite grunt if isEnabled 'svgsprite'
  modules.svg2png grunt  if isEnabled 'svg2png'
  modules.uglify grunt if isEnabled 'uglify'
  modules.livescript grunt if isEnabled 'livescript'

  # Merge rapido config with custom config
  merged = _.merge config, custom

  # Include debug modules if necessary
  if project.debug then modules.debug config, custom, merged
  if project.time then modules.time grunt

  # Initialize grunt
  grunt.initConfig merged

# Export module
module.exports.initConfig = initConfig
