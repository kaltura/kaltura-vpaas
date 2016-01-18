"use strict";


module.exports = function()
{
    function Controller($scope)
    {
        var self = this;

        function loadReportData(reportData)
        {
            self.grid.data = [{key: '', values: reportData}];
        }

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
                        return moment(d['month_id'],'YYYYMM').format('MMMM, YYYY');
                    },
                    y: function (d) {
                        return parseFloat(d['total_plays']);
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
    }

    function Link(scope, element, attrs, ctrls) {
        var ctrl = ctrls[0];
        var reportCtrl = ctrls[1];

        reportCtrl.registerSection({
            loadReportData : function(reportData)
            {
              ctrl.loadReportData(reportData);
            }
        });
    }


    return {
        restrict: 'A',
        scope:{
            options : '=kOptions'
        },
        require: ['kauBarChartSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-bar-chart-section.html',
        controller: Controller,
        link:Link
    };
};


