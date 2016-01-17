'use strict';


var appModule = require('./k-app-utils.module.js');
appModule.run(require('./k-app-utils.run.js'));
appModule.config(require('./k-app-utils.config.js'));


appModule.service('kRouting',require('./services/k-routing.service.js'));


