'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    //********************************
    //Tasks in alphabetical order
    //********************************

    clean: {
      tmp: ['.tmp/*'],
      dist: ['dist/*']
    },

    coffee: {
      src: {
        files: [{
          expand: true,
          cwd: 'scripts',
          src: '**/**/*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },

      spec: {
        files: [{
          expand: true,
          cwd: 'spec',
          src: '**/**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    copy: {
      namespace: {
        src: 'scripts/namespace.js',
        dest: '.tmp/scripts/namespace.js'
      },
      css: {
        src: '.tmp/styles/dash-modal.css',
        dest: 'dist/dash-modal.css'
      },
      scss: {
        src: 'styles/dash-modal.scss',
        dest: 'dist/dash-modal.scss'
      }
    },

    jst: {
      compile: {
        options: {
          namespace: 'DashModalJST'
        },
        files: {
          ".tmp/scripts/dash-modal/templates.js": ["scripts/dash-modal/**/*.ejs"]
        }
      }
    },

    sass: {
      dist: {
        files: {
          ".tmp/styles/dash-modal.css": "styles/dash-modal.scss"
        }
      }
    },

    uglify: {
      options: {
        mangle: true
      },

      dist: {
        files: {
          'dist/dash-modal.min.js': [
            '.tmp/scripts/namespace.js',
            '.tmp/scripts/dash-modal/templates.js',
            '.tmp/scripts/dash-modal/escape_key_up.js',
            '.tmp/scripts/dash-modal/null_escape_key_up.js',
            '.tmp/scripts/dash-modal/view.js'
          ]
        }
      }
    },
  });

  //********************************
  //Builds
  //********************************

  grunt.registerTask('build:dist', [
                     'clean:tmp',
                     'clean:dist',
                     'jst',
                     'coffee:src',
                     'sass',
                     'copy:namespace',
                     'copy:css',
                     'copy:scss',
                     'uglify'

  ]);

  grunt.registerTask('build:spec', [
                     'clean:tmp',
                     'jst',
                     'coffee:src',
                     'sass',
                     'coffee:spec'
  ]);

  grunt.registerTask('default', ['build:dist']);
};
