'use strict';

module.exports = function ($stateProvider) {

    $stateProvider.state('root.shell', {
        url: '',
        abstract:true,
        templateUrl: 'kan-shell/partials/shell.html'
    });

    $stateProvider.state('root.shell.about', {
        url: '/about',
        templateUrl: 'kan-shell/partials/about.html'
    });
};
