'use strict';


var appModule = require('./ka-kaltura-api.module');
appModule.run(require('./ka-kaltura-api.run'));
appModule.config(require('./ka-kaltura-api.config'));

appModule.provider('kaKalturaAPIFacade',require('./services/ka-kaltura-api-facade.provider'));

appModule.service('kaRequestsHandlerUtils',require('./services/ka-requests-handler-utils.service'));

appModule.config(require('./config/handlers/report-service/get-url-for-report-as-csv.config'));
appModule.config(require('./config/handlers/report-service/get-table.config'));
