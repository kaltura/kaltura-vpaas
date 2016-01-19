'use strict';


var appModule = require('./k-ui-common.module');
appModule.run(require('./k-ui-common.run'));
appModule.config(require('./k-ui-common.config'));

appModule.directive('kStatusNotification',require('./directives/k-status-notification'));
