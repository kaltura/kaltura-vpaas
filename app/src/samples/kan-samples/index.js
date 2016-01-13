'use strict';

var appModule = require('./kan-samples.module.js');
appModule.config(require('./kan-samples.config.js'));
appModule.run(require('./kan-samples.run.js'));

appModule.controller('kanLineChart',require('./controllers/charts/kan-line-chart'));
appModule.controller('kanBarChart',require('./controllers/charts/kan-bar-chart'));
appModule.controller('kanAreaChart',require('./controllers/charts/kan-area-chart'));
appModule.controller('kanPieChart',require('./controllers/charts/kan-pie-chart'));

appModule.controller('kanMap',require('./controllers/maps/kan-map'));

appModule.service('kanSamplesDataService',require('./services/kan-samples-data.service.js'));
appModule.service('kanSamplesHelper',require('./services/kan-samples-helper.service.js'));

appModule.directive('kanSampleDataLoader',require('./directives/kan-sample-data-loader'));

