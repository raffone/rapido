module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({

    compass: {
      dist: {
        options: {
          sassDir: 'stylesheets',
          cssDir: 'dist',
          specify: 'stylesheets/rapido.scss',
          noLineComments: true,
          outputStyle: 'nested'
        }
      },
      min: {
        options: {
          sassDir: 'stylesheets',
          cssDir: 'dist',
          specify: 'stylesheets/rapido.min.scss',
          noLineComments: true,
          outputStyle: 'compressed'
        }
      },
    },

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

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'docs/', src: ['**'], dest: '../../server/sites/raffone/rapido'},
        ]
      }
    }

  });

  grunt.registerTask('docs', ['compass', 'kss', 'copy']);
  grunt.registerTask('test', ['compass', 'kss']);

};
