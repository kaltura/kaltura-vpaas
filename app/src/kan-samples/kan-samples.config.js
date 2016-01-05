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


    $stateProvider.state('root.shell.samples.charts.about', {
        url: '/about',
        templateUrl: 'kan-samples/partials/charts/about.html'
    });


    $stateProvider.state('root.shell.samples.charts.lineChart', {
        url: '/lineChart',
        templateUrl: 'kan-samples/partials/charts/line-chart.html',
        controller : 'kanLineChart',
        controllerAs : 'vm'
    });

    $stateProvider.state('root.shell.samples.charts.areaChart', {
        url: '/areaChart',
        templateUrl: 'kan-samples/partials/charts/area-chart.html',
        controller : 'kanAreaChart',
        controllerAs : 'vm'
    });

    $stateProvider.state('root.shell.samples.charts.pieChart', {
        url: '/pieChart',
        templateUrl: 'kan-samples/partials/charts/pie-chart.html',
        controller : 'kanPieChart',
        controllerAs : 'vm'
    });

    $stateProvider.state('root.shell.samples.charts.mapChart', {
        url: '/mapChart',
        templateUrl: 'kan-samples/partials/charts/map-chart.html',
        controller : 'kanMapChart',
        controllerAs : 'vm'
    });

    $stateProvider.state('root.shell.samples.charts.barChart', {
        url: '/barChart',
        templateUrl: 'kan-samples/partials/charts/bar-chart.html',
        controller : 'kanBarChart',
        controllerAs : 'vm'
    });
};

