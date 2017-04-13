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
      }
    }
  });

  // Load dependences
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Tasks
  grunt.registerTask('build', ['clean', 'copy']);
}
