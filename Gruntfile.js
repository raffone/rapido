module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({

    compass: {
      dist: {
        options: {
          sassDir: 'stylesheets',
          cssDir: 'compiled',
          specify: 'stylesheets/rapido.scss',
          noLineComments: true,
          outputStyle: 'nested'
        }
      },
    },

    kss: {
      options: {
        includeType: 'css',
        includePath: 'dist/rapido.css',
      },
      dist: {
        files: {
          'docs': ['stylesheets']
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'docs/', src: ['**'], dest: '../../server/sites/raffone/rapido'},
        ]
      }
    }

  });

  grunt.registerTask('docs', ['compass', 'kss', 'copy']);

};
