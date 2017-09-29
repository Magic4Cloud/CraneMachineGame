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
          'app/assets/js/core.js': ['app/assets/js/jquery-3.2.1.min.js',
            'app/assets/js/bootstrap.js']
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'app/assets/css/header.css': 'app/assets/css/header.scss'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/assets/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'public/assets/css/',
          ext: '.css'
        }]
      }
    },
    uncss: {
      dist: {
        files: [{
          nonull: true,
          src: ['http://www.hiotk.com/'],
          dest: 'app/assets/css/app.css'
        }]
      }
    },
    copy: {
      moveCss: {
        expand: true,
        cwd: 'app/assets/css/',
        src: ['**/*.css'],
        dest: 'public/assets/css/'
      },
      moveFonts: {
        expand: true,
        cwd: 'app/assets/fonts/',
        src: ['*'],
        dest: 'public/assets/fonts/'
      },
      moveImg: {
        expand: true,
        cwd: 'app/assets/images/',
        src: ['**/*'],
        dest: 'public/assets/images/'
      }
    },
    uglify: {
      options: {
        sourceMap: false
      },
      other: {
        files: [{
          expand: true,
          cwd: 'app/assets/js/',
          src: ['**/*.js'],
          dest: 'public/assets/js/'
        }]
      }
    },
    cachebuster: {
      build: {
        options: {
          format: 'json',
          basedir: './',
          length: 16,
          formatter: function (hashes) {
            return JSON.stringify(hashes).replace(/\\\\/ig, "/");
          }
        },
        src: [
          'public/assets/js/*.js',
          'public/assets/css/*.css'
        ],
        dest: 'cachebusters.json'
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

  grunt.registerTask('build', ['sass', 'copy',  'concat', 'cssmin', 'uglify', 'cachebuster:build']);
};
