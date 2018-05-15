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
            updateTableColumns();
        }

        function updateTableColumns() {
            self.reportOptions = $.extend({},defaultOptions,self.options);

            self.tableColumns = self.reportOptions.fields
                .filter(({ name }) => {
                    if (Array.isArray(self.reportData) && self.reportData.length) {
                        return !!self.reportData[0][name];
                    }

                    return true;
                });
        }

        self.tableColumns = null;
        self.reportData = null;
        self.reportOptions = null;
        self.title = '';

        self.loadReportData = loadReportData;

        $scope.$watch('vm.options', function() {
            updateTableColumns();
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
templateUrl: 'kau-reports/directives/sections/kau-table-section.html',
        controller: Controller,
        link:Link
    };
};


