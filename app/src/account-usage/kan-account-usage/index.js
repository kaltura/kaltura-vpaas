'use strict';

var appModule = require('./kan-account-usage.module.js');
appModule.config(require('./kan-account-usage.config.js'));
appModule.run(require('./kan-account-usage.run.js'));


appModule.controller('kauReport',require('./controllers/kau-report'));

appModule.service('kauReportsData',require('./services/kau-reports-data.service'));

appModule.constant('kauReportsConfiguration',require('./services/kau-reports-configuration.constant'));

appModule.directive('kauSideMenu',require('./directives/kau-side-menu'));
appModule.directive('kauReport',require('./directives/kau-report'));

appModule.directive('kauFiltersSection',require('./directives/sections/kau-filters-section'));
appModule.directive('kauBarChartSection',require('./directives/sections/kau-bar-chart-section'));
appModule.directive('kauTableSection',require('./directives/sections/kau-table-section'));
appModule.directive('kauTotalsSection',require('./directives/sections/kau-totals-section'));
appModule.directive('kauDiagnosticSection',require('./directives/sections/kau-diagnostic-section'));


// todo: move to core ui module
appModule.filter('kDate',function()
{
    return function(value)
    {
        return value ? moment(value,'YYYYMM').format('MMMM, YYYY') : value;
    }
})
