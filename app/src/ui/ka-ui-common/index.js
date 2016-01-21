'use strict';


var appModule = require('./ka-ui-common.module');
appModule.run(require('./ka-ui-common.run'));
appModule.config(require('./ka-ui-common.config'));

appModule.directive('kaStatusNotification',require('./directives/ka-status-notification'));
