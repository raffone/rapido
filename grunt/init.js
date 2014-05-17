grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-notify');

// Merge Local Settings w/ Defaults
// ------------------------------------------------------------------------
var _ = require('lodash'),
    base = grunt.file.readJSON('bower_components/rapido/grunt/defaults.json'),
    local = grunt.file.readJSON('./project.json'),
    project = _.merge(base, local, function(a, b) {
      return _.isArray(a) ? a.concat(b) : undefined;
    }),
    config;

// Begin Config
// ------------------------------------------------------------------------
config = {
  project: project,
  notify: {
    sass: { options: { message: 'Sass compiled' } },
    js: { options: { message: 'Javascript changed' } },
    ls: { options: { message: 'LiveScript compiled' } },
    template: { options: { message: 'Template changed' } },
    sprite: { options: { message: 'Sprites updated' } }
  }
};

config.watch = {
  options: {
    livereload: true,
    interrupt: true,
  },
  template: {
    files: ['*.php', '*.html', '**/*.php', '**/*.html'],
    tasks: ['notify:template']
  }
};

// Compile Sass Files
// ------------------------------------------------------------------------
if (project.modules.indexOf('sass') !== -1) {

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
    files: ['**/*.sass', '**/*.scss'],
    tasks: ['sass', 'notify:sass']
  };
}

// Png Sprites
// ------------------------------------------------------------------------
if (project.modules.indexOf('sprite') !== -1) {

  grunt.loadNpmTasks('grunt-spritesmith');

  config.sprite = {
    all: {
      src: '<%= project.sprite.source %>',
      destImg: '<%= project.sprite.target %>',
      destCSS: '<%= project.sprite.stylesheet %>',
      padding: 6,
      cssTemplate: 'bower_components/rapido/grunt/sprites.sass.mustache',
    }
  };

  config.watch.sprites = {
    options: { interrupt: false },
    files: '<%= project.sprite.source %>',
    tasks: ['sprite', 'notify:sprite']
  };
}

// Svg Sprites
// ------------------------------------------------------------------------
if (project.modules.indexOf('svgsprite') !== -1) {

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
}

// Svg Failbacks (svg -> Png)
// ------------------------------------------------------------------------
if (project.modules.indexOf('svg2png') !== -1) {

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
}

// Concat Js Files
// ------------------------------------------------------------------------
if (project.modules.indexOf('concat') !== -1) {

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
    },
    app: {
      src: ['<%= project.js.sources.app %>'],
      dest: '<%= project.js.target.app %>'
    }
  };
  config.watch.js = {

    files: ['<%= project.js.sources.app %>'],
    tasks: ['concat', 'notify:js']

  };
}

// Concat & Minify Js Files
// ------------------------------------------------------------------------
if (project.modules.indexOf('uglify') !== -1) {

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
        '<%= project.js.target.modernizr %>': ['<%= project.js.sources.modernizr %>'],
        '<%= project.js.target.app %>': ['<%= project.js.sources.app %>']
      }
    }
  };
  config.watch.js = {

    files: ['<%= project.js.sources.app %>'],
    tasks: ['uglify', 'notify:js']

  };
}

// Concat & Compile Ls Files
// ------------------------------------------------------------------------
if (project.modules.indexOf('livescript') !== -1) {

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
    tasks: ['uglify', 'notify:js']
  };
}


// Debug Mode
// ------------------------------------------------------------------------
if (project.debug) {
  console.log('BASE ---------------------------');
  console.log(base);
  console.log('LOCAL --------------------------');
  console.log(local);
  console.log('MERGED -------------------------');
  console.log(project);
  console.log('CONFIG -------------------------');
  console.log(config);
}

if (project.time) {
  require('time-grunt')(grunt);
}

// Init Config
// ------------------------------------------------------------------------
grunt.initConfig(config);

// Default Task
// ------------------------------------------------------------------------
grunt.registerTask('default', ['watch']);


