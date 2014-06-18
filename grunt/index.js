module.exports = function(grunt, custom, options){
  var fs, _, modules, defaults, settings, project, config, isEnabled, key, value, merged;
  fs = require('fs');
  _ = require('lodash');
  custom = custom || {};
  options = options || {};
  modules = {};
  defaults = JSON.parse(fs.readFileSync('./bower_components/rapido/grunt/defaults.json', 'utf8'));
  settings = JSON.parse(fs.readFileSync('./project.json', 'utf8'));
  project = _.merge(defaults, settings, function(a, b){
    if (_.isArray(a)) {
      return a.concat(b);
    } else {
      return undefined;
    }
  });
  project.modules.push('watch');
  project.modules.push('notify');
  config = {
    project: project
  };
  isEnabled = function(it){
    return project.modules.length > 0 && project.modules.indexOf(it) !== -1;
  };
  modules.notify = function(){
    grunt.loadNpmTasks('grunt-notify');
    config.notify = {
      sass: {
        options: {
          message: 'Sass compiled'
        }
      },
      js: {
        options: {
          message: 'Javascript changed'
        }
      },
      ls: {
        options: {
          message: 'LiveScript compiled'
        }
      },
      template: {
        options: {
          message: 'Template changed'
        }
      },
      sprite: {
        options: {
          message: 'Sprites updated'
        }
      }
    };
  };
  modules.watch = function(){
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    config.watch = {
      options: {
        livereload: true,
        interrupt: true
      },
      template: {
        files: ['*.php', '*.html', '**/*.php', '**/*.html', '!**/bower_components/**', '!**/node_modules/**'],
        tasks: ['notify:template']
      }
    };
  };
  modules.sass = function(){
    grunt.loadNpmTasks('grunt-contrib-sass');
    config.sass = {
      all: {
        options: {
          style: 'compressed',
          sourcemap: '<%= project.sass.sourcemap %>',
          require: ['sass-globbing', 'sass-media_query_combiner']
        },
        files: {
          '<%= project.sass.target %>': '<%= project.sass.source %>'
        }
      }
    };
    config.watch.sass = {
      files: ['**/*.sass', '**/*.scss', '!**/bower_components/**', '!**/node_modules/**'],
      tasks: ['sass', 'notify:sass']
    };
  };
  modules.sprite = function(){
    grunt.loadNpmTasks('grunt-spritesmith');
    config.sprite = {
      all: {
        src: '<%= project.sprite.source %>',
        destImg: '<%= project.sprite.target %>',
        destCSS: '<%= project.sprite.stylesheet %>',
        padding: 6,
        cssTemplate: 'bower_components/rapido/grunt/sprites.sass.mustache'
      }
    };
    config.watch.sprites = {
      options: {
        interrupt: false
      },
      files: '<%= project.sprite.source %>',
      tasks: ['sprite', 'notify:sprite']
    };
  };
  modules.svgsprite = function(){
    grunt.loadNpmTasks('grunt-svg-sprite');
    config.svgsprite = {
      options: {
        dims: true,
        spritedir: '../images',
        sprite: 'svg-sprites',
        render: {
          css: false,
          scss: {
            dest: '<%= project.svgsprite.stylesheet %>'
          }
        }
      },
      all: {
        src: '<%= project.svgsprite.source %>',
        dest: '<%= project.svgsprite.target %>'
      }
    };
    config.watch.svgsprite = {
      options: {
        interrupt: false
      },
      files: ['<%= project.svgsprite.watch %>'],
      tasks: ['svgsprite', 'notify:sprite']
    };
  };
  modules.svg2png = function(){
    grunt.loadNpmTasks('grunt-svg2png');
    config.svg2png = {
      all: {
        files: [{
          src: '<%= project.svg2png.source %>',
          dest: '<%= project.svg2png.target %>'
        }]
      }
    };
    config.watch.svg2png = {
      files: ['<%= project.svg2png.source %>'],
      tasks: ['svg2png']
    };
  };
  modules.concat = function(){
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('js', ['concat']);
    config.concat = {
      ie: {
        src: ['<%= project.js.sources.ie %>'],
        dest: '<%= project.js.target.ie %>'
      },
      vendor: {
        src: ['<%= project.js.sources.vendor %>'],
        dest: '<%= project.js.target.vendor %>'
      },
      modernizr: {
        src: ['<%= project.js.sources.modernizr %>'],
        dest: '<%= project.js.target.modernizr %>'
      }
    };
    if (project.js.target.app) {
      config.concat.app = {
        src: ['<%= project.js.sources.app %>'],
        dest: '<%= project.js.target.app %>'
      };
      config.watch.js = {
        config: ['<%= project.js.sources.app %>'],
        tasks: ['js', 'notify:js']
      };
    }
  };
  modules.uglify = function(){
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('js', ['uglify']);
    config.uglify = {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      all: {
        files: {
          '<%= project.js.target.ie %>': ['<%= project.js.sources.ie %>'],
          '<%= project.js.target.vendor %>': ['<%= project.js.sources.vendor %>'],
          '<%= project.js.target.modernizr %>': ['<%= project.js.sources.modernizr %>']
        }
      }
    };
    if (project.js.target.app) {
      config.uglify.all.files['<%= project.js.target.app %>'] = ['<%= project.js.sources.app %>'];
      config.watch.js = {
        files: ['<%= project.js.sources.app %>'],
        tasks: ['js', 'notify:js']
      };
    }
  };
  modules.livescript = function(){
    grunt.loadNpmTasks('grunt-livescript');
    config.livescript = {
      options: {
        bare: true
      },
      all: {
        files: {
          '<%= project.ls.target %>': ['<%= project.ls.sources %>']
        }
      }
    };
    config.watch.ls = {
      files: ['<%= project.ls.sources %>'],
      tasks: ['livescript', 'notify:js']
    };
  };
  modules.time = function(){
    require('time-grunt')(grunt);
  };
  modules.debug = function(){
    console.log('DEFAULT -----------------------------------------------------');
    console.log(JSON.stringify(defaults, null, '\t'));
    console.log('CONFIG ------------------------------------------------------');
    console.log(JSON.stringify(config, null, '\t'));
    console.log('CUSTOM ------------------------------------------------------');
    console.log(JSON.stringify(custom, null, '\t'));
    console.log('MERGED ------------------------------------------------------');
    console.log(JSON.stringify(merged, null, '\t'));
  };
  for (key in modules) {
    value = modules[key];
    if (isEnabled(key)) {
      value();
    }
  }
  merged = _.merge(config, custom);
  if (options.debug) {
    modules.debug();
  }
  if (options.time) {
    modules.time();
  }
  grunt.initConfig(merged);
};