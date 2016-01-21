'use strict';


var appModule = require('./ka-kaltura-api.module.js');
appModule.run(require('./ka-kaltura-api.run.js'));
appModule.config(require('./ka-kaltura-api.config.js'));


appModule.factory('SessionInfo',require('./services/kan-session-info.factory'));

appModule.provider('kaKalturaAPIFacade',require('./services/ka-kaltura-api-facade.provider'));

appModule.service('kaRequestsHandlerUtils',require('./services/ka-requests-handler-utils.service'));

appModule.config(require('./config/handlers/report-service/get-url-for-report-as-csv.config'));
appModule.config(require('./config/handlers/report-service/get-table.config'));
