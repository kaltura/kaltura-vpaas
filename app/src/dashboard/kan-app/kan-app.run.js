'use strict';

module.exports = function ($rootScope,$state,kAppConfig) {

    $rootScope.$state = $state;

    $rootScope.kAppConfig = kAppConfig;
};
