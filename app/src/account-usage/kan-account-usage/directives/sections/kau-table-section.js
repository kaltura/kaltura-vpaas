"use strict";


module.exports = function()
{
    function Controller($scope)
    {
        var self = this;

        function loadReportData(reportData)
        {
            self.reportData = reportData;
        }

        self.reportData = null;
        self.title = '';

        self.loadReportData = loadReportData;

        $scope.$watch('vm.options',function()
        {
            self.title = self.options.title;
        });
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
        require: ['kauTableSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-table-section.html',
        controller: Controller,
        link:Link
    };
};

