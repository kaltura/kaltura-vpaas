'use strict';

module.exports =  function()
{

    function linkFunction ($scope, element, attrs) {


    }

    function controllerFunction()
    {

    }


    return {
        restrict: 'A',
            scope: {},
        templateUrl: 'src/kan-ui-charts/directives/kan-line-chart.html',
            controller : controllerFunction,
        controllerAs : 'vm',
        link : linkFunction
    }
};
