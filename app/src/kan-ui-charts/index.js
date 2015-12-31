'use strict';


var appModule = require('./kan-ui-charts.module');
appModule.run(require('./kan-ui-charts.run'));
appModule.config(require('./kan-ui-charts.config'));
appModule.directive('kanLineChart',require('./directives/kan-line-chart'));
