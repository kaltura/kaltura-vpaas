'use strict';

module.exports = function ($stateProvider) {
    $stateProvider.state('root.shell.samples', {
        url: '/samples',
        abstract:true,
        templateUrl: 'kan-samples/partials/samples.html'
    });

    $stateProvider.state('root.shell.samples.charts', {
        url: '/charts',
        templateUrl: 'kan-samples/partials/charts.html'
    });
};

