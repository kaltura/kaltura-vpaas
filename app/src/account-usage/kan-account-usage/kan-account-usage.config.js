'use strict';

module.exports = function ($stateProvider) {

    $stateProvider.state('root.shell.account-usage', {
        url: '/account-usage',
        abstract:true,
        template: '<div class="k-account-usage" data-ui-view></div>'
    });

    $stateProvider.state('root.shell.account-usage.reports', {
        url: '/reports',
        templateUrl: 'account-usage/partials/reports.html'
    });

    $stateProvider.state('root.shell.account-usage.reports.plays', {
        url: '/plays',
        templateUrl: 'account-usage/partials/plays-report.html'
    });


};
