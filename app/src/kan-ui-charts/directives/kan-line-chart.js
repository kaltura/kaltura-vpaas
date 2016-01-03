'use strict';

var nv = require('nvd3');
module.exports = function () {

    function linkFunction(scope, element, attrs, ctrl) {
        var chart = null;

        function initializeChart() {
            if (!chart && ctrl.options && ctrl.dataSource) {

                element.find('svg').attr('height','300px');

                chart = nv.addGraph(function () {
                    var chart = nv.models.lineChart();

                    if (ctrl.options.useInteractiveGuideline) {
                        chart.useInteractiveGuideline(true);
                    }

                    if (ctrl.options.viewFinder) {
                        chart.margin({bottom: 30})
                            .focusEnable(true);
                    }

                    chart.xAxis
                        .axisLabel('Time (ms)')
                        .tickFormat(d3.format(',r'));

                    chart.yAxis
                        .axisLabel('Voltage (v)')
                        .tickFormat(d3.format('.02f'));

                    if (ctrl.dataSource) {
                        d3.select(element.find('svg')[0])
                            .datum(ctrl.dataSource)
                            .transition().duration(500)
                            .call(chart);
                    }

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            } else {
                // TODO
            }

        }

        scope.$watch('vm.rebind', function () {
                initializeChart();
            });

        scope.$watch('vm.dataSource', function () {
                initializeChart();
            });

        scope.$watch('vm.options', function () {
                initializeChart();
            });

        scope.$watch('$destroy', function () {
            // TODO
        });


    }

    function controllerFunction() {

    }


    return {
        restrict: 'A',
        scope: {
            options: '=kOptions',
            rebind : '=kRebind',
            dataSource : '=kDataSource'
        },
        templateUrl: 'src/kan-ui-charts/directives/kan-line-chart.html',
        controller: controllerFunction,
        controllerAs: 'vm',
        bindToController: true,
        link: linkFunction
    }
};
