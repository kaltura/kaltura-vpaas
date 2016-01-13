'use strict';

var appModule = require('./kan-account-usage.module.js');
appModule.config(require('./kan-account-usage.config.js'));
appModule.run(require('./kan-account-usage.run.js'));


appModule.directive('kAuSideMenu',require('./directives/k-au-side-menu'));
