'use strict';


var appModule = require('./kan-kaltura-api.module.js');
appModule.run(require('./kan-kaltura-api.run.js'));
appModule.config(require('./kan-kaltura-api.config.js'));


appModule.factory('SessionInfo',require('./services/kan-session-info.factory'));

appModule.constant('kAPIResponseDescriptor',require('./services/k-api-response-descriptor.constant'));

appModule.service('kanAPIFacade',require('./services/kan-api-facade.service'));
appModule.service('kAPIRequestsHandler',require('./services/k-api-requests-handler.service'));


