'use strict';

var appModule = require('./kau-reports.module');
appModule.config(require('./kau-reports.config'));
appModule.run(require('./kau-reports.run'));



appModule.service('kauReportsData',require('./services/kau-reports-data.service'));


appModule.directive('kauReport',require('./directives/kau-report'));

appModule.directive('kauFiltersSection',require('./directives/sections/kau-filters-section'));
appModule.directive('kauBarChartSection',require('./directives/sections/kau-bar-chart-section'));
appModule.directive('kauTableSection',require('./directives/sections/kau-table-section'));
appModule.directive('kauTotalsSection',require('./directives/sections/kau-totals-section'));
appModule.directive('kauDiagnosticSection',require('./directives/sections/kau-diagnostic-section'));
appModule.directive('kauStatusSection',require('./directives/sections/kau-status-section'));

appModule.filter('kauDynamicFilter',require('./filters/kau-dynamic-filter'));

// todo: move to core ui module
appModule.filter('kDate',function()
{
    return function(value)
    {
        return value ? moment(value,'YYYYMM').format('MMMM, YYYY') : value;
    }
})
