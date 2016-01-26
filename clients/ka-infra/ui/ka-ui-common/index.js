'use strict';


var appModule = require('./ka-ui-common.module.js');
appModule.run(require('./ka-ui-common.run.js'));
appModule.config(require('./ka-ui-common.config.js'));

appModule.directive('kaStatusNotification',require('./directives/ka-status-notification'));
