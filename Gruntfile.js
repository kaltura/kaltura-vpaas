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
            js: {
                files: ['<%= project.app %>/src/{,*/}*.js'],
                tasks: ['jshint', 'kan-browserify:app'],
                options: { livereload: true }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            //uncomment this if you want to run testing everytime your scripts changing
            //karma: {
                //files: ['app/src/**/*.js', 'test/**/*.js'],
                //tasks: ['karma:unit'] //NOTE the :run flag
            //},
            gruntfile: {
                files: ['Gruntfile.js']
            },
            browserifySpec: {
                files: ['<%= project.app %>/src/**/*.spec.js'],
                tasks: ['browserify:spec']
            },
            styles: {
                files: ['<%= project.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= project.app %>/{,*/}*.html',
                    '<%= project.app %>/src/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= project.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
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



        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.',
                    app: {
                        html: '<%= project.app %>/index.html',
                        ignorePath: '/'
                    },
                    dest: '.tmp/styles/'
                }]
            }
        },

        //browserify task
        //browserify: {
        //  spec: {
        //    files: { '<%= project.temp %>/spec.js': ['<%= project.app %>/src/**/*.spec.js'] },
        //    options: { alias: browserifyAliasConfig }
        //  }
        //},

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= project.dist %>/src/{,*/}*.js',
                        '<%= project.dist %>/styles/{,*/}*.css',
                        '<%= project.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= project.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: { dest: '<%= project.dist %>' },
            html: '<%= project.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: { assetsDirs: ['<%= project.dist %>'] },
            html: ['<%= project.dist %>/{,*/}*.html'],
            css: ['<%= project.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= project.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= project.dist %>/images'
                }],
                options: { cache: false }
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= project.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= project.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= project.dist %>',
                    src: '**/*.html',
                    dest: '<%= project.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= project.dist %>/styles/style.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: [{
                    src: '<%= project.dist %>/src/{,*/}*.js', // source files mask
                    expand: true // allow dynamic building
                }]
            }
        },
        concat: {
            dist: {
                src: ['.tmp/styles/{,*/}*.css'],
                dest: '.tmp/styles/style.css'
            }
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
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= project.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: '<%= project.app %>/bower_components/modernizr/modernizr.js',
                outputFile: '<%= project.dist %>/src/vendor/modernizr.js',
                files: {
                    src: [
                        '<%= project.dist %>/src/{,*/}*.js',
                        '<%= project.dist %>/styles/{,*/}*.css',
                        '!<%= project.dist %>/src/vendor/*'
                    ]
                },
                uglify: true
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        // karma testing
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        },

        // Jasmine testing framework configuration options
        jasmine: {
            pivotal: {
                src: '<%= project.app %>/src/**/*.js',
                options: {
                    specs: 'test/spec/*Spec.js',
                    helpers: 'test/spec/*Helper.js'
                }
            }
        },
        'node-inspector': {
            dev: {}
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

    grunt.registerTask('debug',['node-inspector']);

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            /*'concurrent:server',*/
            'concat',
            'kan-browserify',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'jasmine'
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

    grunt.registerTask('deploy', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
