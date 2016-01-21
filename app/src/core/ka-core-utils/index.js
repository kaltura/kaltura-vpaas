'use strict';


var appModule = require('./ka-core-utils.module');
appModule.run(require('./ka-core-utils.run'));
appModule.config(require('./ka-core-utils.config'));

appModule.service('kaAppRoutingUtils',require('./services/ka-app-routing.service'));
appModule.service('kFormatterUtils',require('./services/ka-formatter-utils.service'));


