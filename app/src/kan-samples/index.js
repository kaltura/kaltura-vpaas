'use strict';

var appModule = require('./kan-samples.module');
appModule.config(require('./kan-samples.config'));
appModule.run(require('./kan-samples.run'));

appModule.controller('kanCharts',require('./controllers/kan-charts'));

