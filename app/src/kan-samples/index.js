'use strict';

var appModule = require('./kan-samples.module');
appModule.config(require('./kan-samples.config'));
appModule.run(require('./kan-samples.run'));

appModule.controller('kanLineChart',require('./controllers/charts/kan-line-chart'));
appModule.service('kanSamplesService',require('./services/kan-samples-data.service'));

