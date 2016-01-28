'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('kan-app-styles', 'convert application sass files into css', function () {

        //var debug = this.data.options ? this.data.options.debug || false : false;

        grunt.config.set('sass.kan-styles',
            {
                options: {
                    sourceMap: false,
                    style: 'expanded'
                },
                files: this.data.files

            });

        grunt.task.run(['sass:kan-styles']);


    });
};
