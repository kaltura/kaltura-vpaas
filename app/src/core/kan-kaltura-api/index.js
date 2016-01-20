'use strict';


var appModule = require('./kan-kaltura-api.module.js');
appModule.run(require('./kan-kaltura-api.run.js'));
appModule.config(require('./kan-kaltura-api.config.js'));


appModule.factory('SessionInfo',require('./services/kan-session-info.factory'));

appModule.provider('kaAPIFacade',require('./services/ka-api-facade.provider'));

appModule.service('kaRequestsHandlerUtils',require('./services/ka-requests-handler-utils.service'));

appModule.config(require('./config/handlers/report-service/get-url-for-report-as-csv.config'));
appModule.config(require('./config/handlers/report-service/get-table.config'));
