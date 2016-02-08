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

    function validateOptions(options)
    {
        var missingFile = false;

        _.chain(options.browserify.external).each(function(file)
        {
            if (!grunt.file.exists(file))
            {
                missingFile = true;
                grunt.log.warn('missing file marked as browserify external',file);
            }
        }).value();

        _.chain(options.globals).each(function(file)
        {
            if (!grunt.file.exists(file))
            {
                missingFile = true;
                grunt.log.warn('missing file marked as browserify global',file);
            }
        }).value();

        if (missingFile)
        {
            grunt.fatal('cannot browserify requested files');
        }

    }

    grunt.registerMultiTask('kan-app-scripts', 'Bundle app and vendor scripts separately', function () {

        var options = this.options({
            debug: true,
            browserify: {
                require: {},
                external : {}
            },
            globals : []
        });

        validateOptions(options);
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
