'use strict';

var nv = require('nvd3');
module.exports =  function()
{

    function data() {
        var sin = [],
            cos = [];

        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
            cos.push({x: i, y: .5 * Math.cos(i/10)});
        }

        return [
            {
                values: sin,
                key: 'Sine Wave',
                color: '#ff7f0e'
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#2ca02c'
            }
        ];
    }

    function linkFunction ($scope, element, attrs) {
        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                .useInteractiveGuideline(true)
                ;

            chart.xAxis
                .axisLabel('Time (ms)')
                .tickFormat(d3.format(',r'))
            ;

            chart.yAxis
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format('.02f'))
            ;

            d3.select(element.find('svg')[0])
                .datum(data())
                .transition().duration(500)
                .call(chart)
            ;

            nv.utils.windowResize(chart.update);

            return chart;
        });


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
