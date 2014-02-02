module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-linter');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-watch');

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

    // JS - Fix Style
    closureFixStyle: {
      app:{
        closureLinterPath : '/usr/local/bin',
        command: 'fixjsstyle',
        src: 'js/*.js',
        options: {
          stdout: true,
          strict: true
        }
      }
    },

    // JS - Check errors
    jshint: {
      files: ['gruntfile.js', 'js/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
        }
      }
    },

    jslint: {
      src: 'js/**/*.js',
      directives: {
        browser: true,
        predef: [
          'jQuery'
        ]
      },
    },

    // JS - Concatenate js
    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      dist: {
        src: "js/*.js",
        dest: "dist/js/rapido.js"
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
          require: ['susy', 'sass-media_query_combiner'],
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
          require: ['susy', 'sass-media_query_combiner'],
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
      js: {
        files: ['js/*.js'],
      },
    },

  });

  grunt.registerTask('css',  ['compass']);
  grunt.registerTask('js',   ['concat', 'closureFixStyle', 'jshint', 'uglify']);
  grunt.registerTask('docs', ['compass:dist', 'js', 'copy:js', 'kss']);
  grunt.registerTask('site', ['compass:dist', 'kss', 'copy']);
  grunt.registerTask('default', 'watch');

};
