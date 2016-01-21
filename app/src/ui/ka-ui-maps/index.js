'use strict';


var appModule = require('./ka-ui-maps.module');
appModule.run(require('./ka-ui-maps.run'));
appModule.config(require('./ka-ui-maps.config'));
appModule.directive('kaMap',require('./directives/ka-map'));

appModule.constant('kaCountriesGeojson',require('./services/ka-countries-geojson.constant'));
