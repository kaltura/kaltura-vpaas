'use strict';

module.exports = function (grunt) {

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
            temp: '.tmp'

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
                    port: '<%= connect.options.livereload %>'
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
            scss: {
                files: ['<%= project.app %>/assets/**/*.scss'],
                tasks: ['kan-app-styles:app']

            },
            assets: {
                files: [
                    '<%= project.app %>/assets/*.*',
                    '!**/*.scss'
                ]
            }
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
            serve: {
                files: [{
                    dot: true,
                    src: ['<%= project.temp %>/**/*.*']
                }]
            }
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
            'dist': {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= project.app %>/src',
                    dest: '<%= project.dist %>',
                    src: [
                        '**/*.html'
                    ]
                },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= project.app %>',
                        dest: '<%= project.dist %>',
                        src: [
                            '*.html'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/bootstrap/dist',
                        dest: '<%= project.dist %>/assets/bootstrap',
                        src: [
                            '**/*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/leaflet/dist',
                        dest: '<%= project.dist %>/assets/leaflet',
                        src: [
                            '**/*.css',
                            'images/**/*.*'
                        ]
                    },
                    {
                        dest: '<%= project.dist %>/assets/nvd3/nv.d3.css',
                        src: ['bower_components/nvd3/build/nv.d3.css']
                    },
                    {
                        expand: true,
                        cwd: '<%= project.temp %>',
                        dest: '<%= project.dist %>',
                        src: ['app.js', 'vendors.js', 'assets/**/*.*']
                    }]
            }
        },

        'kan-app-styles': {
            app: {
                files: {
                    '<%= project.temp %>/assets/main.css': '<%= project.app %>/assets/sass/main.scss'
                }
            }
        },
        'kan-browserify': {
            app: {
                options: {
                    debug: true,
                    vendors: require('./app/vendors-references'),
                    appFiles: {
                        '.tmp/app.js': ['app/src/index.js']
                    }

                }
            },
            vendors: {
                options: {
                    debug: true,
                    vendors: require('./app/vendors-references'),
                    vendorFiles: {
                        '.tmp/vendors.js': ['.']
                    }
                }
            }
        }
    });

    grunt.loadTasks('./build/grunt/tasks');


    grunt.registerTask('default', ['serve']);

    grunt.registerTask('serve', function () {

        grunt.task.run([
            'clean:serve',
            'jshint',
            'kan-browserify',
            'kan-app-styles',
            'connect:livereload',
            'watch'
        ]);
    });


    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'kan-browserify',
        'kan-app-styles',
        'copy:dist'
    ]);

};

