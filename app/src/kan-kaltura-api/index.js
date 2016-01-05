'use strict';


var appModule = require('./kan-kaltura-api.module');
appModule.run(require('./kan-kaltura-api.run'));
appModule.config(require('./kan-kaltura-api.config'));


appModule.factory('SessionInfo',require('./services/kan-session-info.factory'));
appModule.factory('kanAPIFacade',require('./services/kan-api-facade.factory'));


