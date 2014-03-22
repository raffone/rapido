module.exports = function(grunt) {

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
      task_name: {
        options: {
          // Task-specific options go here.
        }
      },
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
      toRapidoIE: {
        files: [
          {
          expand: true,
          cwd: 'dist/js',
          src: ['rapido.js'],
          dest: '../../server/sites/rapido-ie/assets/js'
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
        tasks: ['compass:dist']
      },
      html: {
        files: ['tests/*.html'],
      },
      livescript: {
        files: ['ls/*.ls'],
        tasks: ['js', 'copy:toRapidoIE']
      },
    },

  });

  grunt.registerTask('css',  ['compass']);
  grunt.registerTask('js',   ['livescript:src', 'uglify', 'notify:livescript']);
  grunt.registerTask('docs', ['compass:dist', 'js', 'copy:js', 'kss']);
  grunt.registerTask('site', ['compass:dist', 'kss', 'copy']);
  grunt.registerTask('default', 'watch');

};
