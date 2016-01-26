'use strict';


var appModule = require('./ka-ui-maps.module.js');
appModule.run(require('./ka-ui-maps.run.js'));
appModule.config(require('./ka-ui-maps.config.js'));
appModule.directive('kaMap',require('./directives/ka-map'));

appModule.constant('kaCountriesGeojson',require('./services/ka-countries-geojson.constant.js'));
