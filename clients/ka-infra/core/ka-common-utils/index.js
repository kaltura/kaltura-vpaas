'use strict';


var appModule = require('./ka-common-utils.module');
appModule.run(require('./ka-common-utils.run'));
appModule.config(require('./ka-common-utils.config'));

appModule.service('kaAppRoutingUtils',require('./services/ka-app-routing.service'));
appModule.service('kFormatterUtils',require('./services/ka-formatter-utils.service'));


