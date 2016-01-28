'use strict';

var _ = require('lodash');
var defaultEnvName = 'dev';
var defaultConfigName = 'live';

module.exports = function (grunt) {

    function addEnvTasks(tasks, newTasks, envTaskId)
    {
        _.each(newTasks, function(taskName)
        {
            var taskConfig = grunt.config(taskName);
            _.chain(taskConfig).keys().filter(function(key)
            {
                return key === envTaskId || key.indexOf(envTaskId + '-') === 0;
            }).each(function(key)
            {
                console.log(taskName + ':' + key);
                tasks.push(taskName + ':' + key);
            }).value();
        });
    }

    var buildConfig = grunt.file.readJSON('./build/build-config.json');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        project: {
            // Configurable paths
            app: 'clients/kau-account-usage',
            infra : 'clients/ka-infra',
            config : '<%= project.app %>/config',
            assets: '<%= project.app %>/assets',
            dist: 'dist',
            temp: '.tmp'

        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9003,
                livereload: 35739,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            'env-dev': {
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
            'env-prod': {
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
                files: ['<%= project.app %>/src/**/*.js','<%= project.infra %>/src/**/*.js'],
                tasks: ['jshint', 'kan-browserify:app']
            },
            config: {
                options:{
                    spawn: false
                },
                files: ['<%= project.config %>/*.json'],
                tasks: ['copy:config']
            },
            html: {
                files: [
                    '<%= project.app %>/**/*.html'
                ]
            },
            scss: {
                files: ['<%= project.assets %>/**/*.scss'],
                tasks: ['kan-app-styles:app']

            },
            assets: {
                files: [
                    '<%= project.assets %>/*.*',
                    '!**/*.scss'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            'env-prod': {
                files: [{
                    dot: true,
                    src: [
                        '<%= project.temp %>',
                        '<%= project.dist %>/*',
                        '!<%= project.dist %>/.git*'
                    ]
                }]
            },
            'env-dev': {
                files: [{
                    dot: true,
                    src: ['<%= project.temp %>']
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
            'env-dev':
            {
                files: [{
                    dest: '<%= project.temp %>/app-config.json',
                    src: '<%= project.config %>/<%= runtime.configName %>.json'
                }]
            },
            'env-prod': {
                files: [
                    {
                        dest: '<%= project.temp %>/app-config.json',
                        src: '<%= project.config %>/<%= runtime.configName %>.json'
                    },
                    {
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
                        cwd: 'node_modules/jquery/dist',
                        dest: '<%= project.dist %>',
                        src: [
                            'jquery.js'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/bootstrap-daterangepicker',
                        dest: '<%= project.dist %>/assets/bootstrap-daterangepicker',
                        src: [
                            'daterangepicker.css'
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
                        src: ['node_modules/nvd3/build/nv.d3.css']
                    },
                    {
                        expand: true,
                        cwd: '<%= project.temp %>',
                        dest: '<%= project.dist %>',
                        src: ['app.js', 'vendors.js', 'assets/**/*.*','app-config.json']
                    }]
            }
        },

        'kan-app-styles': {
            'env-dev': {
                files: {
                    '<%= project.temp %>/assets/main.css': '<%= project.assets %>/sass/main.scss'
                }
            }
        },
        'kan-browserify': {
            'env-dev-app': {
                options: {
                    debug: true,
                    vendors: require('./clients/kau-account-usage/vendors-references'),
                    appFiles: {
                        '.tmp/app.js': ['./<%= project.app %>/src/kau-app/index.js']
                    }

                }
            },
            'env-dev-vendors': {
                options: {
                    debug: true,
                    vendors: require('./clients/kau-account-usage/vendors-references'),
                    vendorFiles: {
                        '.tmp/vendors.js': ['.']
                    }
                }
            }
        },

        'kan-license-crwaler':{
            all: {
                options: {
                    bowerDirectory: 'bower_components',
                    libsDirectory: 'libs',
                    output: 'open-source-libraries.md'
                }
            }
        },
        zip: {
            'env_prod': {
                'location/to/zip/files.zip': ['file/to/zip.js', 'another/file.css']
            }
        }
    });

    grunt.loadTasks('./build/grunt/tasks');

    grunt.registerTask('generate-license',['kan-license-crwaler']);

    grunt.registerTask('build', function (envName, configName) {
        envName = envName || defaultEnvName;
        configName = configName || defaultConfigName;

        var envConfig = buildConfig.environments[envName];
        if (!envConfig)
        {
            grunt.fatal('missing configuration for environment "' + envName + '"');
            return;
        }

        var envTaskId = envConfig.gruntTaskId;

        grunt.config('runtime.configName', configName);

        console.log('invoking task with environment "' + envName + '" (grunt task "' + envTaskId + '", config "' +  configName + '")');


        var tasks = ['jshint'];

        addEnvTasks(tasks, ['clean','kan-browserify','kan-app-styles'],envTaskId);

        tasks.push('kan-license-crwaler');

        addEnvTasks(tasks, ['copy'],envTaskId);

        grunt.task.run(tasks);
    });


    grunt.registerTask('serve', function (envName,configName) {
        envName = envName || defaultEnvName;
        configName = configName || defaultConfigName;

        var envConfig = buildConfig.environments[envName];
        if (!envConfig)
        {
            grunt.fatal('missing configuration for environment "' + envName + '"');
            return;
        }

        var envTaskId = envConfig.gruntTaskId;

        var tasks = [
            'build:' + envName + ':' + configName,
            'connect:' + envTaskId
        ];

        if (envTaskId === 'env-dev') {
            tasks.push('watch' /* temoprary solution - currently only support watching env dev */);
        }

    grunt.task.run(tasks);
    });
};

