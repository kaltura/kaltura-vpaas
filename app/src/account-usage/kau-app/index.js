'use strict';

require('../../vendors-shim-workaround');

require('./kau-app-bootstrap');

var appModule = require('./kau-app.module');
appModule.config(require('./kau-app.config'));
appModule.run(require('./kau-app.run.js'));

appModule.controller('kauReport',require('./../kau-app/controllers/kau-report'));

appModule.constant('kauReportsConfiguration',require('./../kau-app/services/kau-reports-configuration.constant.js'));

appModule.directive('kauSideMenu',require('./../kau-app/directives/kau-side-menu'));


