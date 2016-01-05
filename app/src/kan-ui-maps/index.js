'use strict';


var appModule = require('./kan-ui-maps.module');
appModule.run(require('./kan-ui-maps.run'));
appModule.config(require('./kan-ui-maps.config'));
appModule.directive('kanMap',require('./directives/kan-map'));
