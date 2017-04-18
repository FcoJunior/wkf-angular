'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Configure tasks
    copy: {
      public: {
        expand: true,
        cwd: 'app',
        src: '**',
        dest: 'dist'
      }
    },

    clean: {
      dist: {
        src: 'dist'
      },
      js: {
        src: ['dist/scripts/**/*.js', '!dist/scripts/*.min.js']
      },
      css: {
        src: ['dist/style/**/*.css', 'dist/style/**/*.scss', '!dist/style/*.min.css']
      }
    },

    useminPrepare: {
      html: 'dist/**/*.html'
    },

    usemin: {
      html: 'dist/**/*.html'
    },

    imagemin: {
      public: {
        expand: true,
        cwd: 'dist/images',
        src: '**/*.{png, jpg, jpeg, gif}',
        dest: 'dist/images'
      }
    },

    rev: {
      options: {
        encoding: 'utf-8',
        algorithm: 'md5',
        lenght: 8
      },

      images: {
        src: ['dist/images/**/*.{png, jpg, jpeg, gif}']
      },

      min: {
        src: ['dist/scripts/**/*.min.js', 'dist/style/**/*.min.css']
      }
    },

    jshint: {
      js: {
        src: ['app/scripts/**/*.js']
      }
    },

    browserSync: {
      public: {
        bsFiles: {
          watchTask: true,
          src: ['app/**/*']
        },

        options: {
          server: {
            baseDir: 'app'
          }
        }
      }
    },

    bowerInstall: {
      public: {
        src: ['app/index.html']
      }
    },

    // Sass
    sass : {
      dist : {
        options : { style : 'compressed' },
        files: [{
          expand: true,
          cwd: 'app/style',
          src: ['*.scss'],
          dest: '.tmp',
          ext: '.css'
        }]
      }
    },

    watch: {
      jshint: {
        options: {
          event: ['changed']
        },
        files: 'app/scripts/**/*.js',
        tasks: 'jshint:js'
      },

      css: {
        files: 'app/style/*.scss',
        tasks: ['sass']
      }
    }
  });

  // Load dependences
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Tasks
  grunt.registerTask('min', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);
  grunt.registerTask('build', ['sass', 'bowerInstall', 'clean:dist', 'copy', 'min', 'clean:js', 'clean:css']);
  grunt.registerTask('server', ['bowerInstall', 'browserSync', 'watch']);
  grunt.registerTask('default', ['server']);
}
