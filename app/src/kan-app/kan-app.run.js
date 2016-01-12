'use strict';

module.exports = function ($rootScope,$state,kanAppConfig) {

    $rootScope.$state = $state;

    $rootScope.kanAppConfig = kanAppConfig;
};
