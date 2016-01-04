'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        project: {
            // Configurable paths
            app: 'app',
            dist: 'dist',
            temp : '.tmp'

        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35739,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        './',
                        '.tmp',
                        '<%= project.app %>/src',
                        '<%= project.app %>'
                    ]
                }
            },
            test: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= project.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= project.dist %>',
                    livereload: false
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: {
                  port : '<%= connect.options.livereload %>'
                }
            },
            js: {
                files: ['<%= project.app %>/src/**/*.js'],
                tasks: ['jshint', 'kan-browserify:app']
            },
            html: {
                files: [
                    '<%= project.app %>/**/*.html'
                ]
            },
            scss : {
                files: ['<%= project.app %>/assets/**/*.scss'],
                tasks: ['kan-app-styles:app']

            },
            assets: {
                files: [
                    '<%= project.app %>/assets/*.*',
                    '!**/*.scss'
                ]
            }
            //jstest: {
            //    options: {
            //        livereload: false
            //    },
            //    files: ['test/spec/{,*/}*.js'],
            //    tasks: ['test:watch']
            //},
            //uncomment this if you want to run testing everytime your scripts changing
            //karma: {
                //options: {
                //    livereload: false
                //},
                //files: ['app/src/**/*.js', 'test/**/*.js'],
                //tasks: ['karma:unit'] //NOTE the :run flag
            //},
            //browserifySpec: {
            //    options: {
            //        livereload: false
            //    },
            //    files: ['<%= project.app %>/src/**/*.spec.js'],
            //    tasks: ['browserify:spec']
            //},

        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= project.dist %>/*',
                        '!<%= project.dist %>/.git*'
                    ]
                }]
            },
            afterBuild: {
                files: [{
                    dot: true,
                    src: ['<%= project.dist %>/src/index.js']
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= project.app %>/src/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        },



        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= project.app %>',
                    dest: '<%= project.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/font-awesome/fonts/*.*'
                    ]
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= project.app %>',
                    dest: '<%= project.dist %>',
                    src: ['src/**/*.html']
                }]
            }
        },


        // Run some tasks in parallel to speed up build process
        concurrent: {
        },
        'kan-app-styles':{
            app: {
                files: {
                    '<%= project.temp %>/assets/main.css': '<%= project.app %>/assets/sass/main.scss'
                }
            }
        },
        'kan-browserify':{
            app:{
                options : {
                    debug:true,
                    vendors : require('./app/vendors-references'),
                    appFiles:  {
                        '.tmp/app.js': ['app/src/index.js']
                    }

                }
            },
            vendors:{
                options : {
                    debug:true,
                    vendors : require('./app/vendors-references'),
                    vendorFiles:  {
                        '.tmp/vendors.js': ['.']
                    }
                }
            }
        }
    });

    grunt.loadTasks('./build/grunt/tasks');


    grunt.registerTask('default',['serve']);

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'kan-browserify',
            'kan-app-styles',
            'connect:livereload',
            'watch'
        ]);
    });


    grunt.registerTask('build', [
        'jshint',
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'cssmin',
        'browserify:dist',
        'clean:afterBuild',
        'copy:dist',
        'copy:html',
        'uglify',
        // 'rev',
        'usemin',
        'htmlmin'
    ]);

};
