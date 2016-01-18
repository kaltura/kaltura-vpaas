'use strict';


var appModule = require('./k-app-utils.module');
appModule.run(require('./k-app-utils.run'));
appModule.config(require('./k-app-utils.config'));

appModule.service('kRoutingUtils',require('./services/k-routing.service'));
appModule.service('kFormatterUtils',require('./services/k-formatter-utils.service'));


