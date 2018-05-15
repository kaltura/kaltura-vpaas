'use strict';

var _ = require('lodash');
var defaultEnvName = 'dev';
var defaultConfigName = 'live';
var allEnvTaskConfigName = 'all-env';
var vpaasAppModule = 'kauApp';

module.exports = function (grunt) {

    var vendors = require('./clients/kau-account-usage/vendors-references');
    var packageConfig = grunt.file.readJSON('./package.json');
    var buildConfig = grunt.file.readJSON('./build/build-config.json');

    // Define the configuration for all the tasks
    var gruntConfig = {
        packageConfig: packageConfig,
        // Project settings
        project: {
            // Configurable paths
            app: 'clients/kau-account-usage',
            infra: 'clients/ka-infra',
            config: '<%= project.app %>/config',
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
                        '<%= project.app %>/src',
                        '.tmp',
                    ]
                }
            },
            'env-prod': {
                options: {
                    keepalive: true,
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
            'env-dev-js': {
                options: {
                    spawn: false
                },
                files: ['<%= project.app %>/src/**/*.js', '<%= project.infra %>/**/*.js'],
                tasks: ['jshint', 'kan-app-scripts:all-env-app']
            },
            'env-dev-spec': {
                options: {
                    spawn: false
                },
                files: ['<%= project.app %>/src/**/*.spec.js', '<%= project.infra %>/**/*.spec.js'],
                tasks: ['jasmine']
            },
            'env-dev-config': {
                options: {
                    spawn: false
                },
                files: ['<%= project.config %>/*.json'],
                tasks: ['copy:config']
            },
            'env-dev-html': {
                files: [
                    '<%= project.app %>/**/*.html'
                ]
            },
            'env-dev-scss': {
                files: ['<%= project.assets %>/**/*.scss'],
                tasks: ['kan-app-styles:all-env']

            },
            'env-dev-assets': {
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
            'all-env': [
                'Gruntfile.js',
                '<%= project.app %>/src/{,*/}*.js',
                '<%= project.infra %>/{,*/}*.js'
            ]
        },


        // Copies remaining files to places other tasks can use
        copy: {
            'env-dev': {
                files: [{
                    dest: '<%= project.temp %>/app-config.json',
                    src: '<%= project.config %>/<%= runtime.configName %>.json'
                }]
            },
            'env-prod': {
                files: [
                    {
                        dest: '<%= project.dist %>/app-config.json',
                        src: '<%= project.config %>/<%= runtime.configName %>.json'
                    },
                    {
                        expand: true,
                        cwd: '<%= project.temp %>',
                        dest: '<%= project.dist %>',
                        src: ['app.js', 'vendors.js', 'assets/**/*.*', '!assets/**.scss']
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
                        dest: '<%= project.dist %>/',
                        src: ['LICENSE']
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
                    }]
            }
        },

        'kan-app-styles': {
            'all-env': {
                files: {
                    '<%= project.temp %>/assets/main.css': '<%= project.assets %>/sass/main.scss'
                }
            }
        },
        'kan-app-scripts': {
            'all-env-app': {
                options: {
                    debug: false,
                    browserify: {
                        external: vendors.commonjs
                    }
                },
                files: {
                    '.tmp/app.js': ['./<%= project.app %>/src/kau-app/index.js']
                }
            },
            'all-env-vendors': {
                options: {
                    debug: false,
                    globals: vendors.globals,
                    browserify: {
                        require: vendors.commonjs
                    }
                },
                files: {
                    '.tmp/vendors.js': ['.']
                }
            }
        },
        browserify: {
            specs: {
                src: ['<%= project.app %>/src/**/*.spec.js', '<%= project.infra %>/**/*.spec.js'],
                dest: '<%= project.temp %>/app-specs.js'

            }
        },
        zip: {
            'env-prod': {
                cwd: 'dist/',
                dest: '<%= project.temp + "/" + packageConfig.name + "_v" + packageConfig.version %>.zip',
                src: ['dist/**/*.*']
            }
        },
        concat: {
            'env-prod-templates': {
                src: ['<%= project.temp %>/infra-templates.js', '<%= project.temp %>/app-templates.js'],
                dest: '<%= project.dist %>/app-templates.js',
            }
        },
        ngtemplates: {
            options: {
                module: vpaasAppModule,
                htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true}
            },
            'env-prod-app': {
                cwd: '<%=project.app %>/src',
                src: ['**/**.html', '!index.html'],
                dest: '<%= project.temp %>/app-templates.js'


            },
            'env-prod-infra': {
                cwd: '<%=project.infra %>',
                src: '**/**.html',
                dest: '<%= project.temp %>/infra-templates.js'
            }
        },
        cachebreaker: {
            'env-prod': {
                options: {
                    match: ['.js', '.css'],
                },
                files: {
                    src: ['<%= project.dist %>/index.html']
                }
            }
        },

        'dom_munger': {
            'env-dev': {
                options: {
                    append: [
                        {selector: 'body', html: '<script src="vendors.js"></script>'},
                        {selector: 'body', html: '<script src="app.js"></script>'},
                    ]
                },
                src: '<%= project.app %>/index.html',
                dest: '<%= project.temp %>/index.html'
            },
            'env-prod': {
                options: {
                    read: [
                        {selector: 'link', attribute: 'href', writeto: 'cssRefs'},
                        {selector: 'script', attribute: 'src', writeto: 'jsRefs'}
                    ],
                    remove: ['[data-remove=true]', 'script'],
                    append: [
                        {selector: 'body', html: '<script src="vendors.js"></script>'},
                        {selector: 'body', html: '<script src="app.js"></script>'},
                        {selector: 'body', html: '<script src="app-templates.js"></script>'}
                    ],
                    callback: function ($) {
                        // this is a temporary workaround until we will support css budnling
                        _.each($('link[rel="stylesheet"]'), function (element) {
                            var href = $(element).attr('href');
                            href = 'assets/' + href.replace(/(node_modules|dist|build|assets)[\/]/g, '');
                            $(element).attr('href', href);
                        });
                    }

                },
                src: '<%= project.app %>/index.html',
                dest: '<%= project.dist %>/index.html'
            }
        },
        jasmine: {
            'all-env': {

                options: {
                    //'--remote-debugger-port': 9009,
                    keepRunner: true,
                    outfile: '.tmp/_SpecRunner.html',
                    specs: ['<%= project.temp %>/app-specs.js'],
                    vendor: ['<%= project.temp %>/vendors.js', './node_modules/angular-mocks/angular-mocks.js'],
                    summary: false
                }
            }
        }
    };


    function logTasksList(tasks) {
        console.log('Running the following tasks:');
        _.each(tasks, function (task) {
            console.log(task);
        });
    }

    function addEnvTasks(tasks, newTasks, envTaskId) {
        _.each(newTasks, function (taskName) {
            var taskConfig = gruntConfig[taskName];
            _.chain(taskConfig).keys().filter(function (key) {
                return key === envTaskId || key.indexOf(envTaskId + '-') === 0 || key === allEnvTaskConfigName || key.indexOf(allEnvTaskConfigName + '-') === 0;
            }).each(function (key) {
                tasks.push(taskName + ':' + key);
            }).value();
        });
    }

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig(gruntConfig);

    grunt.loadTasks('./build/grunt/tasks');

    grunt.registerTask('test', function () {
        grunt.task.run(['build']);

    });

    grunt.registerTask('build', function (envName, configName) {
        envName = envName || defaultEnvName;
        configName = configName || defaultConfigName;

        var envConfig = buildConfig.environments[envName];
        if (!envConfig) {
            grunt.fatal('missing configuration for environment "' + envName + '"');
            return;
        }

        var envTaskId = envConfig.gruntTaskId;

        grunt.config('runtime.configName', configName);

        console.log('invoking task with environment "' + envName + '" (grunt task "' + envTaskId + '", config "' + configName + '")');


        var tasks = [];

        addEnvTasks(tasks, ['jshint', 'clean', 'kan-app-scripts', 'kan-app-styles'], envTaskId);

        addEnvTasks(tasks, ['ngtemplates', 'dom_munger', 'concat', 'copy','cachebreaker', 'zip'], envTaskId);

        logTasksList(tasks);

        grunt.task.run(tasks);
    });


    grunt.registerTask('serve', function (envName, configName) {
        envName = envName || defaultEnvName;
        configName = configName || defaultConfigName;

        var envConfig = buildConfig.environments[envName];
        if (!envConfig) {
            grunt.fatal('missing configuration for environment "' + envName + '"');
            return;
        }

        var envTaskId = envConfig.gruntTaskId;

        var tasks = [
            'build:' + envName + ':' + configName,
            'connect:' + envTaskId
        ];

        if (envTaskId === 'env-dev') {
            tasks.push('watch');
        }

        logTasksList(tasks);

        grunt.task.run(tasks);
    });
};

