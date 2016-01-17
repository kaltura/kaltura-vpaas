'use strict';

module.exports = function ($stateProvider) {

    $stateProvider.state('root.shell.account-usage', {
        url: '/account-usage',
        abstract:true,
        template: '<div class="k-account-usage" data-ui-view></div>'
    });

    $stateProvider.state('root.shell.account-usage.reports', {
        url: '/reports',
        abstract:true,
        templateUrl: 'account-usage/kan-account-usage/partials/reports.html'
    });

    $stateProvider.state('root.shell.account-usage.reports.report', {
        url: '/{reportId}',
        templateUrl: 'account-usage/kan-account-usage/partials/kau-report.html',
        controller : 'kauReport',
        controllerAs : 'vm'
    });


};

