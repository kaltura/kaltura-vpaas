"use strict";


module.exports = function()
{
    function Controller()
    {
        var self = this;

    }

    function Link(scope, element, attrs, ctrl) {


    }


    return {
        restrict: 'A',
        scope:false,
        controllerAs:'vm',
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-totals-section.html',
        controller: Controller,
        link:Link
    };
};


