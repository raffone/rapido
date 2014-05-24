// Notifications
// ----------------------------------------------------------------------------

module.exports.notify = function(grunt) {

  grunt.loadNpmTasks('grunt-notify');

  config.notify = {
    sass: { options: { message: 'Sass compiled' } },
    js: { options: { message: 'Javascript changed' } },
    ls: { options: { message: 'LiveScript compiled' } },
    template: { options: { message: 'Template changed' } },
    sprite: { options: { message: 'Sprites updated' } }
  };

};

// Watch
// ----------------------------------------------------------------------------

module.exports.watch = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');

  config.watch = {
    options: {
      livereload: true,
      interrupt: true
    },
    template: {
      files: ['*.php', '*.html', '**/*.php', '**/*.html',
              '!**/bower_components/**', '!**/node_modules/**'],
      tasks: ['notify:template']
    }
  };

  grunt.registerTask('default', ['watch']);

};

// Compile Sass Files
// ------------------------------------------------------------------------

module.exports.sass = function(grunt) {

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
    files: ['**/*.sass', '**/*.scss',
            '!**/bower_components/**', '!**/node_modules/**'],
    tasks: ['sass', 'notify:sass']
  };

};

// Png Sprites
// ------------------------------------------------------------------------

module.exports.sprite = function(grunt) {

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
    options: { interrupt: false },
    files: '<%= project.sprite.source %>',
    tasks: ['sprite', 'notify:sprite']
  };

};

// Svg Sprites
// ------------------------------------------------------------------------

module.exports.svgsprite = function(grunt) {

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
    options: { interrupt: false },
    files: ['<%= project.svgsprite.watch %>'],
    tasks: ['svgsprite', 'notify:sprite']
  };

};

// Svg Failbacks (svg -> Png)
// ------------------------------------------------------------------------

module.exports.svg2png = function(grunt) {

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

// Concat Js Files
// ------------------------------------------------------------------------

module.exports.concat = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');

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
  }

  config.watch.js = {
    config: ['<%= project.js.sources.app %>'],
    tasks: ['concat', 'notify:js']

  };

  grunt.registerTask('js', ['concat']);

};

// Concat & Minify Js Files
// ------------------------------------------------------------------------

module.exports.uglify = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-uglify');

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
  }

  config.watch.js = {
    files: ['<%= project.js.sources.app %>'],
    tasks: ['uglify', 'notify:js']
  };

  grunt.registerTask('js', ['uglify']);

};

// Concat & Compile Ls Files
// ------------------------------------------------------------------------

module.exports.livescript = function(grunt) {

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

// ----------------------------------------------------------------------------

module.exports.time = function(grunt) {
  require('time-grunt')(grunt);
};

module.exports.debug = function(config, custom, merged) {
  console.log('CONFIG ------------------------------------------------------');
  console.log(JSON.stringify(config, null, '\t'));
  console.log('CUSTOM ------------------------------------------------------');
  console.log(JSON.stringify(custom, null, '\t'));
  console.log('MERGED ------------------------------------------------------');
  console.log(JSON.stringify(merged, null, '\t'));
};
