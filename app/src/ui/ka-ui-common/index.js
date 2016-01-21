'use strict';


var appModule = require('./ka-ui-common.module');
appModule.run(require('./ka-ui-common.run'));
appModule.config(require('./ka-ui-common.config'));

appModule.directive('kStatusNotification',require('./directives/k-status-notification'));
