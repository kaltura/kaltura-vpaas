"use strict";


module.exports = function()
{
    function Controller($scope, kauReportsData,$window)
    {
        var self = this;

        self.reportAPI = {
            loadReportData : function(reportData)
            {
                if (reportData)
                {
                    self.currentMonth =  _.find(reportData,function(item)
                    {
                        var monthValue = item['month_id'];
                       return monthValue ? monthValue.format('YYYYMM') === moment().format('YYYYMM') : false;
                    });
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
        templateUrl: 'account-usage/kau-reports/directives/sections/kau-totals-section.html',
        controller: Controller,
        link:Link
    };
};


