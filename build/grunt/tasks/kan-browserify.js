'use strict';

module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash');

    /*grunt.config.set('browserify', {

            app: {
                options : {
                    debug: true,
                    external:['angular']
                },
                files: {
                    '.tmp/app.js': ['app/src/index.js']
                }
            },vendor: {

                // External modules that don't need to be constantly re-compiled
                src: ['.'],
                dest: 'build/vendor.js',
                options: {
                    debug: false,
                    alias: [
                        'react:',
                        'react/lib/ReactCSSTransitionGroup:',
                        'react/lib/cx:',
                        'q:',
                        'underscore:',
                        'loglevel:'
                    ],
                    external: null  // Reset this here because it's not needed
                }
            }
        }
    );*/

    grunt.registerMultiTask('kan-browserify','Bundle app and vendor scripts separately',function()
    {
        var debug = this.data.options.debug || false;
        var vendors = this.data.options.vendors;

        grunt.config.set('browserify.kan-app', {
            options: {
                debug: debug,
                external: _.keys(vendors)
            },
            files: this.data.options.appFiles
        });

        if (this.data.options.appFiles) {
            grunt.log.writeln('Browserifying application sources');

            grunt.config.set('browserify.kan-app', {
                options: {
                    debug: debug,
                    external: _.keys(vendors)
                },
                files: this.data.options.appFiles
            });

            grunt.task.run(['browserify:kan-app']);
        }

        if (this.data.options.vendorFiles) {
            grunt.log.writeln('Browserifying vendors sources');

            // create alias data as required by browserify
            var browserifyAlias = [];
            var browserifyShim = {};

            _.forOwn(vendors, function (value, key) {
                    if (_.isArray(value))
                    {
                        browserifyAlias.push(value[0] + ':' + key);
                        browserifyShim[key] = {exports : value[1]};
                    }else
                    {
                        browserifyAlias.push(value + ':' + key);
                    }
                }
            );

            grunt.config.set('browserify.kan-vendors', {
                options: {
                    debug: true,
                    require: browserifyAlias,
                    browserifyOptions : {
                        "browserify-shim": browserifyShim

                    }
                },
                files: this.data.options.vendorFiles
            });

            grunt.task.run(['browserify:kan-vendors']);
        }
    });
};
