module.exports = function (grunt) {
  "use strict";

  // This is where we configure each task that we'd like to run.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      // This is where we set up all the tasks we'd like grunt to watch for changes.
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/sass/*.scss', 'src/sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false
        }
      }
    },
    concat: {
      options: {
        sourceMap: true,
        separator: ';'
      },
      dist: {
        src: ['src/js/**.js'],
        dest: 'js/oddsshark_menu.js'
      },
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources : true,
        mangle: true
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'js',
          src: '*.js',
          dest: 'js'
        }]
      }
    },
    sass: {
      // This will compile all of our sass files
      // Additional configuration options can be found at https://github.com/gruntjs/grunt-contrib-sass
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['*.scss'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 4 versions', 'Android > 2', 'Firefox ESR', 'Opera 12.1']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/*.css',
        dest: 'css/'
      },
    },
  });
  // This is where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  // Now that we've loaded the package.json and the node_modules we set the base path
  // for the actual execution of the tasks
  grunt.file.setBase('../');
  // This is where we tell Grunt what to do when we type "grunt" into the terminal.
  // Note. if you'd like to run one of the tasks individually you can do so by typing 'grunt mytaskname' alternatively
  // you can type 'grunt watch' to automatically track your files for changes.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['concat', 'uglify', 'sass', 'autoprefixer']);
};
