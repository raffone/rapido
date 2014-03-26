module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-linter');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-livescript');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({

    pkg: grunt.file.readJSON("bower.json"),

    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.authors %>\n" +
        " *  Under <%= pkg.license %> License\n" +
        " */\n"
    },

    notify: {
      livescript: {
        options: {
          title: 'LiveScript',
          message: 'Compilato con successo',
        }
      },
    },

    // Compile LiveScript
    livescript: {
      options: {
        bare: true,
        prelude: true
      },

      src: {
        files: {
          'js/rapido.animation.js': 'ls/rapido.animation.ls',
          'js/rapido.dropdown.js': 'ls/rapido.dropdown.ls',
          'js/rapido.move.js': 'ls/rapido.move.ls',
          'js/rapido.offcanvas.js': 'ls/rapido.offcanvas.ls',
          'js/rapido.overlay.js': 'ls/rapido.overlay.ls',
          'js/rapido.scroll.js': 'ls/rapido.scroll.ls',
          'js/rapido.select.js': 'ls/rapido.select.ls',
          'js/rapido.suggest.js': 'ls/rapido.suggest.ls',
          'js/rapido.toggle.js': 'ls/rapido.toggle.ls',
          'js/rapido.tooltip.js': 'ls/rapido.tooltip.ls',
          'js/rapido.utilities.js': 'ls/rapido.utilities.ls',

          'dist/js/rapido.js': 'ls/*.ls',
        }
      }
    },

    // JS - Create minified version
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        },
        banner: "<%= meta.banner %>"
      },
      min: {
        src: "dist/js/rapido.js",
        dest: "dist/js/rapido.min.js"
      }
    },



    // CSS - Compile css
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/rapido.css': 'stylesheets/rapido.scss',
        }
      }
    },

    compass: {
      dist: {
        options: {
          require: ['susy', 'sass-media_query_combiner', 'breakpoint', 'compass-placeholders'],
          sassDir: 'stylesheets',
          cssDir: 'dist/css',
          specify: 'stylesheets/rapido.scss',
          noLineComments: true,
          environment: 'development',
          outputStyle: 'expanded'
        }
      },
      min: {
        options: {
          require: ['susy', 'sass-media_query_combiner', 'breakpoint', 'compass-placeholders'],
          sassDir: 'stylesheets',
          cssDir: 'dist/css',
          specify: 'stylesheets/rapido.min.scss',
          noLineComments: true,
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },


    // CSS - Create documentation
    kss: {
      options: {
        includeType: 'css',
        template: '../../forks/kss-node-template/template/',
        includePath: 'dist/css/rapido.css',
      },
      dist: {
        files: {
          'docs': ['stylesheets']
        }
      }
    },

    // CSS - Copy docs files to website repository
    copy: {
      main: {
        files: [
          {
          expand: true,
          cwd: 'docs/',
          src: ['**'],
          dest: '../../server/sites/raffone/rapido'
        },
        ]
      },
      js: {
        files: [
          {
          expand: true,
          cwd: 'dist/js',
          src: ['rapido.js'],
          dest: '../../forks/kss-node-template/template/public'
        },
        ]
      },
      jsToRapidoIE: {
        files: [
          {
          expand: true,
          cwd: 'dist/js',
          src: ['rapido.js'],
          dest: '../../server/sites/rapido-ie/assets/js'
        },
        ]
      },
      cssToRapidoIE: {
        files: [
          {
          expand: true,
          cwd: 'dist/css',
          src: ['rapido.css'],
          dest: '../../server/sites/rapido-ie/'
        },
        ]
      }
    },

    // Testing
    watch: {
      options: {
        interrupt: false,
        livereload: true
      },
      css: {
        files: ['stylesheets/**/*.scss'],
        tasks: ['sass', 'copy:cssToRapidoIE']
      },
      html: {
        files: ['tests/*.html'],
      },
      livescript: {
        files: ['ls/*.ls'],
        tasks: ['js', 'copy:jsToRapidoIE']
      },
    },

  });

  grunt.registerTask('css',  ['sass:dist']);
  grunt.registerTask('js',   ['livescript:src', 'uglify', 'notify:livescript']);
  grunt.registerTask('docs', ['sass:dist', 'js', 'copy:js', 'kss']);
  grunt.registerTask('site', ['sass:dist', 'kss', 'copy']);
  grunt.registerTask('test', ['sass:dist', 'kss']);
  grunt.registerTask('default', 'watch');

};
