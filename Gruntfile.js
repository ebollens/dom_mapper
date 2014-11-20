module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      core: {
        src: [
          'node_modules/specificity/specificity.js',
          'src/specificity/compare.js',
          'src/dom_mapper/core.js',
          'src/dom_mapper/type/*.js'
        ],
        dest: 'dist/<%= pkg.name %>-core.js'
      },
      polyfills: {
        src: [
          'src/mdn/polyfill/array.prototype.filter.js',
          'src/mdn/polyfill/array.prototype.map.js',
          'src/mdn/polyfill/array.prototype.for_each.js'
        ],
        dest: 'dist/<%= pkg.name %>-polyfills.js'
      },
      rules_aria_mappings: {
        src: [
          'src/aria_mappings/core.js',
          'src/aria_mappings/html5/core.js',
          'src/aria_mappings/html5/landmarks.js'
        ],
        dest: 'dist/<%= pkg.name %>-rules-aria_mappings.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      core: {
        files: { 'dist/<%= pkg.name %>-core.min.js': ['<%= concat.core.dest %>'] }
      },
      polyfills: {
        files: { 'dist/<%= pkg.name %>-polyfills.min.js': ['<%= concat.polyfills.dest %>'] }
      },
      rules_aria_mappings: {
        files: { 'dist/<%= pkg.name %>-rules-aria_mappings.min.js': ['<%= concat.rules_aria_mappings.dest %>'] }
      }
    },
    jshint: {
      files: [
        'Gruntfile.js',
        'src/aria_mappings/**/*.js',
        'src/dom_mapper/**/*.js',
        'src/specificity/**/*.js',
        'test/**/*.js'
      ],
      options: {
        globals: {
          console: true,
          document: true,
          module: true,
          supernew: true
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['concat', 'uglify']);

};