var fs, _, defaults, settings, project, isEnabled, initConfig;
fs = require('fs');
_ = require('lodash');
defaults = fs.readFileSync('./bower_components/rapido/grunt/defaults.json', 'utf8');
settings = fs.readFileSync('./project.json', 'utf8');
project = JSON.parse(_.merge(settings, defaults, function(a, b){
  if (_.isArray(a)) {
    return a.concat(b);
  } else {
    return undefined;
  }
}));
isEnabled = function(name){
  return project.modules.length > 0 && project.modules.indexOf(name) !== -1;
};
initConfig = function(grunt, custom, debug){
  var modules, config, merged;
  modules = require('./plugins');
  custom = custom || {};
  config = {
    project: project
  };
  modules.watch(grunt);
  modules.notify(grunt);
  if (isEnabled('sass')) {
    modules.sass(grunt);
  }
  if (isEnabled('sprite')) {
    modules.sprite(grunt);
  }
  if (isEnabled('svgsprite')) {
    modules.svgsprite(grunt);
  }
  if (isEnabled('svg2png')) {
    modules.svg2png(grunt);
  }
  if (isEnabled('uglify')) {
    modules.uglify(grunt);
  }
  if (isEnabled('livescript')) {
    modules.livescript(grunt);
  }
  merged = _.merge(config, custom);
  if (project.debug) {
    modules.debug(config, custom, merged);
  }
  if (project.time) {
    modules.time(grunt);
  }
  grunt.initConfig(merged);
};
module.exports.initConfig = initConfig;