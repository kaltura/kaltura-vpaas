"use strict";


module.exports = function()
{
    function Controller($scope,kFormatterUtils)
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
            },
            data: null,
            api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
            options: {
                chart: {
                    type: 'discreteBarChart',
                    height: 300,
                    noData : '',

                    color : ['#00a1d5'],
                    staggerLabels: true,
                    rotateLabels: true,
                    x: function (d) {
                        var result = d[self.reportOptions.xValue.name];
                        if (self.reportOptions.xValue.format)
                        {
                            result = kFormatterUtils.formatByType(result,self.reportOptions.xValue.type,self.reportOptions.xValue.format);
                        }
                        return result;
                    },
                    y: function (d) {
                        var result = d[self.reportOptions.yValue.name];
                        if (self.reportOptions.yValue.format)
                        {
                            result = kFormatterUtils.formatByType(result,self.reportOptions.yValue.type,self.reportOptions.yValue.format);
                        }
                        return result;
                    },
                    showValues: true,
                    valueFormat: function (d) {
                        return d3.format(',')(d);
                    },
                    duration: 500,
                    xAxis: {
                    },
                    yAxis: {
                        axisLabel: 'Plays (CPM)',
                        tickFormat: function (d) {
                            return d3.format(',')(d);
                        },
                        showMaxMin: true
                    }
                }
            }
        };

        self.loadReportData = loadReportData;

        $scope.$watch('vm.options',function()
        {
            self.reportOptions = $.extend({},defaultOptions,self.options);
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
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-bar-chart-section.html',
        controller: Controller,
        link:Link
    };
};


