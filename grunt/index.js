var fs = require('fs');
var _ = require('lodash');

// Settings
var defaults = fs.readFileSync('./bower_components/rapido/grunt/defaults.json', 'utf8');
var settings = fs.readFileSync('./project.json', 'utf8');
var project = JSON.parse(_.merge(settings, defaults, function(a, b) {
  return _.isArray(a) ? a.concat(b) : undefined;
}));

// ----------------------------------------------------------------------------

var isEnabled = function(name) {
  return project.modules.length > 0 && project.modules.indexOf(name) !== -1;
};

// ----------------------------------------------------------------------------

var initConfig = function(grunt, custom, debug) {

  var modules = require('./plugins');

  custom = custom || {};

  config = {
    project: project
  };

  // Default
  modules.watch(grunt);
  modules.notify(grunt);

  // Modules
  if (isEnabled('sass')) modules.sass(grunt);
  if (isEnabled('sprite')) modules.sprite(grunt);
  if (isEnabled('svgsprite')) modules.svgsprite(grunt);
  if (isEnabled('svg2png')) modules.svg2png(grunt);
  if (isEnabled('uglify')) modules.uglify(grunt);
  if (isEnabled('livescript')) modules.livescript(grunt);

  // Merge grunt-rapido config with custom config and return object
  var merged = _.merge(config, custom);

  // Debug options
  if (project.debug) modules.debug(config, custom, merged);
  if (project.time) modules.time(grunt);

  // Init config grunt
  grunt.initConfig(merged);

};

// ----------------------------------------------------------------------------

module.exports.initConfig = initConfig;

