"use strict";


module.exports = function()
{
    function Controller($scope)
    {
        var self = this;
        var defaultOptions = {
            title : '',
            order : '',
            fields : []
        }

        function loadReportData(reportData)
        {
            self.reportData = reportData;
        }

        self.tableHeaders = null;
        self.reportData = null;
        self.reportOptions = null;
        self.title = '';

        self.loadReportData = loadReportData;

        $scope.$watch('vm.options',function()
        {
            self.reportOptions = $.extend({},defaultOptions,self.options);

            self.tableHeaders = _.map(self.reportOptions.fields, function(item) { return {name : item.title};});

        });
    }

    function Link(scope, element, attrs, ctrls) {
        var ctrl = ctrls[0];
        var reportCtrl = ctrls[1];

        reportCtrl.addSection({
            loadReportData : function(reportData)
            {
                ctrl.loadReportData(reportData);
            }
        });
    }

    return {
        restrict: 'A',
        scope:{
            options : '=kOptions',
            reportStatus : '=kReportStatus'
        },
        require: ['kauTableSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-table-section.html',
        controller: Controller,
        link:Link
    };
};


