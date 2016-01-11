'use strict';


var appModule = require('./kan-ui-maps.module');
appModule.run(require('./kan-ui-maps.run'));
appModule.config(require('./kan-ui-maps.config'));
appModule.directive('kanMap',require('./directives/kan-map'));

appModule.constant('kanCountriesGeojson',require('./services/kan-countries-geojson.constant'));
