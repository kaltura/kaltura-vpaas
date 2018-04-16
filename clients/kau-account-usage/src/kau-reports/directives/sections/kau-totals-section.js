"use strict";


module.exports = function()
{
    function Controller($scope, kauReportsData,$window)
    {
        var self = this;

        self.reportAPI = {
            loadReportData: function (reportData) {
                if (reportData) {
                    const currentMonthValues = _.find(reportData, function (item) {
                        const monthValue = item['month_id'];
                        return monthValue ? monthValue.format('YYYYMM') === moment().format('YYYYMM') : false;
                    });

                    if (currentMonthValues) {
                        self.currentMonth = self.reportOptions.fields
                            .map(option => {
                                const value = currentMonthValues[option.name];
                                if (value) {
                                    return Object.assign(option, {value})
                                }
                            })
                            .filter(Boolean);
                    }
                }
            }
        };

        self.currentMonth = null;
    }

    function Link(scope, element, attrs, ctrls) {
        var ctrl = ctrls[0];
        var reportCtrl = ctrls[1];

        reportCtrl.addSection(ctrl.reportAPI);
    }


    return {
        restrict: 'A',
        scope:{
            reportOptions : '=kOptions',
            reportStatus : '=kReportStatus'
        },
        require: ['kauTotalsSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
templateUrl: 'kau-reports/directives/sections/kau-totals-section.html',
        controller: Controller,
        link:Link
    };
};


