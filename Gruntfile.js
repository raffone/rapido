module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-linter');
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.initConfig({

    pkg: grunt.file.readJSON("rapido.json"),

    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.licenses[0].type %> License\n" +
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
          module: true
        }
      }
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
          require: 'susy',
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
          require: 'susy',
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
        includePath: 'dist/rapido.css',
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
      }
    }

  });

  grunt.registerTask('css',  ['compass']);
  grunt.registerTask('js',   ['concat', 'closureFixStyle', 'jshint', 'uglify']);
  grunt.registerTask('site', ['compass', 'kss', 'copy']);
  grunt.registerTask('docs', ['compass', 'kss']);

};
