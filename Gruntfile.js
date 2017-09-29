module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },
      src: {
        files: ['app/assets/**/*.js', 'app/assets/**/*.css',  'app/assets/**/*.scss'],
        tasks: ['build'],
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      mutile: {
        files: {
          'build/core.js': ['src/Boot.js',
            'src/FailMenu.js', 'src/Game.js', 'src/MainMenu.js', 'src/Preloader.js']
        }
      }
    },
    uglify: {
      options: {
        sourceMap: false
      },
      other: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**/*.js'],
          dest: 'build/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cachebuster');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.registerTask('build', ['cachebuster:build', 'refreshcach']);
  //grunt.registerTask('uncss', ['uncss']);

  grunt.registerTask('build', ['concat', 'uglify']);
};
