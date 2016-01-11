'use strict';

module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash');



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
