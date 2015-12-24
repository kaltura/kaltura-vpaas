/*jslint node: true */
'use strict';

var pkg = require('./package.json');

module.exports = function (grunt) {

    // load all grunt tasks    
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({       
        nodemon:{
            devServer:{
                cwd: 'server',
                script: 'server.js'                
            }
        }
    });
        
    grunt.registerTask('default',['nodemon:devServer']);

};
