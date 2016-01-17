'use strict';

var appModule = require('./kan-account-usage.module.js');
appModule.config(require('./kan-account-usage.config.js'));
appModule.run(require('./kan-account-usage.run.js'));


appModule.controller('kauReport',require('./controllers/kau-report'));

appModule.service('kauReportsData',require('./services/kau-reports-data.service'));

appModule.directive('kauSideMenu',require('./directives/kau-side-menu'));
appModule.directive('kauReport',require('./directives/kau-report'));

// todo: move to core ui module
appModule.filter('kDate',function()
{
    return function(value)
    {
        return value ? moment(value,'YYYYMM').format('MMMM, YYYY') : value;
    }
})
