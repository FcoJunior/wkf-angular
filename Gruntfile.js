'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Configure tasks
    copy: {
      public: {
        expand: true,
        cwd: 'public',
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
        src: ['dist/style/**/*.css', '!dist/style/*.min.css']
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
        src: ['public/scripts/**/*.js']
      }
    },

    watch: {
      jshint: {
        options: {
          event: ['changed']
        },
        files: 'public/scripts/**/*.js',
        tasks: 'jshint:js'
      }
    },

    browserSync: {
      public: {
        bsFiles: {
          watchTask: true,
          src: ['public/**/*']
        },

        options: {
          server: {
            baseDir: 'public'
          }
        }
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

  // Tasks
  grunt.registerTask('min', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);
  grunt.registerTask('build', ['clean:dist', 'copy', 'min', 'clean:js', 'clean:css']);
  grunt.registerTask('server', ['browserSync', 'watch']);
  grunt.registerTask('default', ['server']);
}
