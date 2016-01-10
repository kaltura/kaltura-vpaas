'use strict';

var appModule = require('./kan-samples.module');
appModule.config(require('./kan-samples.config'));
appModule.run(require('./kan-samples.run'));

appModule.controller('kanLineChart',require('./controllers/charts/kan-line-chart'));
appModule.controller('kanBarChart',require('./controllers/charts/kan-bar-chart'));
appModule.controller('kanAreaChart',require('./controllers/charts/kan-area-chart'));
appModule.controller('kanPieChart',require('./controllers/charts/kan-pie-chart'));

appModule.controller('kanMap',require('./controllers/maps/kan-map'));

appModule.service('kanSamplesDataService',require('./services/kan-samples-data.service'));
appModule.service('kanSamplesHelper',require('./services/kan-samples-helper.service'));

appModule.run(function(kanSamplesHelper)
{
    kanSamplesHelper.registerAdapter('line-chart-s1', require('./services/data-adapters/kan-line-chart-s1')());
    kanSamplesHelper.registerAdapter('bar-chart-s1', require('./services/data-adapters/kan-bar-chart-s1')());
    kanSamplesHelper.registerAdapter('bar-chart-s2', require('./services/data-adapters/kan-bar-chart-s2')());
    kanSamplesHelper.registerAdapter('area-chart-s1', require('./services/data-adapters/kan-area-chart-s1')());
    kanSamplesHelper.registerAdapter('pie-chart-s1', require('./services/data-adapters/kan-pie-chart-s1')());
});

appModule.directive('kanSampleDataLoader',require('./directives/kan-sample-data-loader'));

