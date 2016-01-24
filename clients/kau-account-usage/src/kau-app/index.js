'use strict';

require('../../vendors-shim-workaround');

require('./kau-app-bootstrap');

var appModule = require('./kau-app.module.js');
appModule.config(require('./kau-app.config.js'));
appModule.run(require('./kau-app.run.js'));

appModule.controller('kauReport',require('./controllers/kau-report'));

appModule.constant('kauReportsConfiguration',require('./services/kau-reports-configuration.constant.js'));

appModule.directive('kauSideMenu',require('./directives/kau-side-menu'));


