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
        " *  <%= pkg.title || pkg.name %>\n" +
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
      sass: {
        options: {
          title: 'Sass',
          message: 'Compilato con successo',
        }
      },
    },

    // Compile LiveScript
    livescript: {
      options: {
        bare: true
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

          'grunt/index.js': 'grunt/index.ls',
          'grunt/plugins.js': 'grunt/plugins.ls',
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
      options: {
        require: ['sass-globbing', 'sass-media_query_combiner']
      },
      dist: {
        options: {
          style: 'expanded',
        },
        files: {
          'dist/css/rapido.css': 'stylesheets/rapido.scss',
        }
      },
      min: {
        options: {
          style: 'compressed',
        },
        files: {
          'dist/css/rapido.min.css': 'stylesheets/rapido.scss',
        }
      },
      kss: {
        options: {
          style: 'compressed',
        },
        files: {
          '../../forks/kss-node-template/template/public/theme.css': '../../forks/kss-node-template/template/public/theme.sass',
        }
      }
    },

    // CSS - Create documentation
    kss: {
      options: {
        template: '../../forks/kss-node-template/template/',
      },
      dist: {
        files: {
          '../../server/sites/raffone/rapido': ['stylesheets']
        }
      }
    },

    // CSS - Copy docs files to website repository
    copy: {
      main: {
        files: [
          {
          expand: true,
          cwd: '../../server/sites/raffone/rapido/',
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
      },
      kss: {
        files: [
          {
          expand: true,
          cwd: '../../forks/kss-node-template/template/public/',
          src: ['theme.css'],
          dest: '../../server/sites/raffone/rapido/public/'
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
        tasks: ['sass:dist', 'copy:cssToRapidoIE', 'notify:sass']
      },
      livescript: {
        files: ['**/*.ls'],
        tasks: ['js', 'copy:jsToRapidoIE']
      },
      kssCss: {
        files: ['../../forks/kss-node-template/template/public/theme.sass'],
        tasks: ['sass:kss', 'copy:kss']
      },
      kssJs: {
        files: ['../../forks/kss-node-template/template/public/*.js', '../../forks/kss-node-template/template/index.html'],
        tasks: ['kss']
      },
    },

  });

  grunt.registerTask('css',  ['sass:dist', 'sass:min']);
  grunt.registerTask('js',   ['livescript:src', 'uglify', 'notify:livescript']);
  grunt.registerTask('dist', ['css', 'js']);
  grunt.registerTask('docs', ['sass:kss', 'copy:kss', 'js', 'copy:js', 'kss']);
  grunt.registerTask('default', 'watch');

};
