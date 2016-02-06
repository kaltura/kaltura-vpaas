'use strict';

module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash');

    function invokeBrowserifyTask(options,files)
    {
        var browserifyConfig =  {
            options: {
                browserifyOptions: {
                    debug: options.debug
                }
            },
            files: files
        };

        if(options.browserify.require)
        {
            browserifyConfig.options.require = _.map(options.browserify.require, function (value, key) {
                return value + ':' + key;
            });
        }

        if(options.browserify.external)
        {
            browserifyConfig.options.external =  _.keys(options.browserify.external);
        }

        browserifyConfig.options.ignore = ['angular','jquery','moment'];

        grunt.config.set('browserify.kan-app-scripts', browserifyConfig);
        grunt.task.run(['browserify:kan-app-scripts']);
    }

    grunt.registerMultiTask('kan-app-scripts', 'Bundle app and vendor scripts separately', function () {

        var options = this.options({
            debug: false,
            browserify: {
                require: {},
                external : {}
            },
            globals : []
        });

        invokeBrowserifyTask(options,this.files);



        if (options.globals.length > 0)
        {
            if (this.files.length !== 1)
            {
                grunt.fatal('option "globals" is supported when has only one destination file');
            }
            var destFile = this.files[0].dest;
            grunt.config.set('concat.kan-app-scripts', {
                src: [options.globals,destFile],
                dest: destFile,
            });

            grunt.task.run(['concat:kan-app-scripts']);
        }

    });
};
