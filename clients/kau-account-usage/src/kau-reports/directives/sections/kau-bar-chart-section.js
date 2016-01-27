"use strict";


module.exports = function()
{
    function Controller($scope,kFormatterUtils,$timeout)
    {
        var self = this;
        var defaultOptions = {
            xValue : {},
            yValue : {}
        };

        function loadReportData(reportData)
        {
            self.grid.data = [{key: '', values: reportData}];
        }

        self.reportOptions = null;
        self.grid = {
            config : {
                deepWatchDataDepth : 0
            },
            data: null,
            api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
            options: {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    noData : '',
                    color : ['#00a1d5'],
                    margin :{
                        bottom: 150
                    },
                    staggerLabels: false,
                    x: function (d) {
                        return d[self.reportOptions.xValue.name];
                    },
                    y: function (d) {
                        return d[self.reportOptions.yValue.name];

                    },
                    showValues: false,
                    valueFormat: function (d) {
                        return d3.format(',')(d);
                    },
                    duration: 500,
                    xAxis: {
                        rotateLabels:90,
                        tickFormat: function (d) {
                            if (self.reportOptions.xValue.labelFormat)
                            {
                                return kFormatterUtils.formatByType(d,self.reportOptions.xValue.type,self.reportOptions.xValue.labelFormat);
                            }
                            return d;
                        }
                    },
                    yAxis: {
                        axisLabel: '',
                        tickFormat: function (d) {
                            if (self.reportOptions.yValue.labelFormat)
                            {
                                return kFormatterUtils.formatByType(d,self.reportOptions.yValue.type,self.reportOptions.yValue.labelFormat);
                            }
                            return d;
                        },
                        showMaxMin: false
                    }
                }
            }
        };

        self.loadReportData = loadReportData;

        $scope.$watch('vm.options',function()
        {
            self.reportOptions = $.extend({},defaultOptions,self.options);
            self.grid.options.chart.yAxis.axisLabel = self.reportOptions.yValue.title;
        });
    }

    function Link(scope, element, attrs, ctrls) {
        var ctrl = ctrls[0];
        var reportCtrl = ctrls[1];

        // write section API
        var sectionReportAPI = {
            loadReportData : function(reportData)
            {
                ctrl.loadReportData(reportData);
            }
        };
        reportCtrl.addSection(sectionReportAPI);
    }


    return {
        restrict: 'A',
        scope:{
            options : '=kOptions',
            reportStatus : '=kReportStatus'
        },
        require: ['kauBarChartSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
templateUrl: 'kau-reports/directives/sections/kau-bar-chart-section.html',
        controller: Controller,
        link:Link
    };
};


