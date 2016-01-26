'use strict';

module.exports = function ($stateProvider, $urlRouterProvider, $httpProvider, $provide, kAppConfig) {


    $urlRouterProvider.otherwise(kAppConfig.routing.defaultUri);

    //add safeApply function for $rootScope - called by $scope.$root.safeApply(fn)
    $provide.decorator('$rootScope', function($delegate) {
            $delegate.safeApply = function(fn) {
                var phase = $delegate.$$phase;
                if (phase === '$apply' || phase === '$digest') {
                    if (fn && typeof fn === 'function') {
                        fn();
                    }
                } else {
                    $delegate.$apply(fn);
                }
            };
            return $delegate;
        }
    );

    $stateProvider.state('root', {
        url: '',
        abstract:true,
        template: '<div ui-view></div>'
    });

    $stateProvider.state('root.shell', {
        url: '',
        abstract:true,
templateUrl: 'kau-app/partials/kau-shell.html'
    });

    $stateProvider.state('root.shell.reports', {
        url: '/reports',
        abstract:true,
templateUrl: 'kau-app/partials/kau-reports.html'
    });

    $stateProvider.state('root.shell.reports.report', {
        url: '/{reportId}',
templateUrl: 'kau-app/partials/kau-report.html',
        controller : 'kauReport',
        controllerAs : 'vm'
    });

};
