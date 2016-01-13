'use strict';


var appModule = require('./kan-kaltura-api.module.js');
appModule.run(require('./kan-kaltura-api.run.js'));
appModule.config(require('./kan-kaltura-api.config.js'));


appModule.factory('SessionInfo',require('./services/kan-session-info.factory.js'));
appModule.factory('kanAPIFacade',require('./services/kan-api-facade.factory.js'));


