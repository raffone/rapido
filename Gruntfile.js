module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-styleguide');
  grunt.loadNpmTasks('grunt-kss');

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
    }

  });

  grunt.registerTask('compile', ['compass', 'kss']);

};
