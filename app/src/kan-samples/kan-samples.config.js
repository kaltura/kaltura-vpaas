'use strict';

module.exports = function ($stateProvider) {
    $stateProvider.state('root.shell.samples', {
        url: '/samples',
        abstract:true,
        templateUrl: 'kan-samples/partials/samples.html'
    });

    $stateProvider.state('root.shell.samples.charts', {
        url: '/charts',
        abstract:true,
        template: '<div ui-view></div>'
    });

    $stateProvider.state('root.shell.samples.charts.lineChart', {
        url: '/lineChart',
        templateUrl: 'kan-samples/partials/charts/line-chart.html',
        controller : 'kanLineChart',
        controllerAs : 'vm'
    });
};

