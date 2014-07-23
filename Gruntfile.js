module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['build']
      },
      temp: {
        src: ['temp']
      }
    },
    copy: {
      js: {
        files: [{ src: ['src/**'], dest: 'temp/' }]
      },
      require: {
        files: [{ expand: true, cwd: 'src/vendor/requirejs/', src: ['require.js'], dest: 'temp/src/js/' }]
      },
      build_require: {
        files: [{ expand: true, cwd: 'src/vendor/requirejs/', src: ['require.js'], dest: 'build/js/' }]
      },
      build_index: {
        files: [{ src: 'src/build/index.html', dest: 'build/index.html' }]
      },
      replace_init: {
        files: [{ src: 'src/build/init.js', dest: 'temp/src/js/init.js' }]
      }
    },
    cssmin: {
      duck: {
        expand: true,
        cwd: 'src/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'temp/css/',
        ext: '.min.css'
      },
      bootstrap: {
        expand: true,
        cwd: 'src/vendor/bootstrap/docs/assets/css/',
        src: ['*.css', '!*.min.css', '!docs.css'],
        dest: 'temp/css/',
        ext: '.min.css'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      cssmin: {
        src: ['temp/css/*.css'],
        dest: 'build/css/all.min.css',
      },
    },
    requirejs: {
      nocompile: {
        options: {
          baseUrl: './',
          name: 'init',
          mainConfigFile: 'src/js/init.js',
          appDir: 'temp/src/js',
          dir: 'build/js',
          preserveLicenseComments: false
        }
      },
      nocompile2: {
        options: {
          baseUrl: 'temp/src/',
          name: 'js/init',
          mainConfigFile: 'temp/src/js/init.js',
          dir: 'build',
          preserveLicenseComments: false
        }
      },
      compile: {
        options: {
          baseUrl: 'temp/src/js/',
          name: 'init',
          mainConfigFile: 'src/js/init.js',
          out: "build/js/init.js",
          preserveLicenseComments: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('build', [ // build entire application
    'clean:build', // remove build directory if exists
    'clean:temp',
    'copy:build_index', // copy build-version index.html file
    'cssmin', // minimize css
    'concat', // concatenate css files
    'copy:js',
    'copy:require',
    'copy:replace_init',
    'requirejs:nocompile2', // optimize entire application into build directory
    'copy:build_require',
//    'clean:temp' // clean temp directory
  ]);
  grunt.registerTask('default', ['build']);
};