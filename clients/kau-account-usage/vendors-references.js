'use strict';

module.exports = {
    commonjs : {
        'ngStorage': './node_modules/ngStorage/ngstorage.min.js',
        'angular-ui-router': './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'ui-bootstrap': './node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'angular-nvd3': './node_modules/angular-nvd3/dist/angular-nvd3.min.js',
        'angular-leaflet-directive': './node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
        'angular-daterangepicker' : './node_modules/angular-daterangepicker/js/angular-daterangepicker.min.js',
        'spin' : './libs/spin/spin.min.js'
    },
    globals : [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/moment/min/moment.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/lodash/lodash.js',
        './node_modules/d3/d3.min.js',
        './node_modules/nvd3/build/nv.d3.min.js',
        './node_modules/json.sortify/index.js',
        './node_modules/leaflet/dist/leaflet.js',
        './node_modules/bootstrap-daterangepicker/daterangepicker.js'
    ],
    shim : {
        // if browserify shim is needed please add an issue - currently for the few exists we will use the traditional way in package.json
    }
};
