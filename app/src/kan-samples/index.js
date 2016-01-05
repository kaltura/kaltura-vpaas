'use strict';

var appModule = require('./kan-samples.module');
appModule.config(require('./kan-samples.config'));
appModule.run(require('./kan-samples.run'));

appModule.controller('kanLineChart',require('./controllers/charts/kan-line-chart'));
appModule.controller('kanBarChart',require('./controllers/charts/kan-bar-chart'));
appModule.controller('kanAreaChart',require('./controllers/charts/kan-area-chart'));
appModule.controller('kanMapChart',require('./controllers/charts/kan-map-chart'));
appModule.controller('kanPieChart',require('./controllers/charts/kan-pie-chart'));

appModule.service('kanSamplesService',require('./services/kan-samples-data.service'));

appModule.directive('kanSampleDataLoader',require('./directives/kan-sample-data-loader'));

