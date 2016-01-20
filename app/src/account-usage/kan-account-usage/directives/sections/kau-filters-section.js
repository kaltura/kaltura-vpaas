"use strict";


module.exports = function()
{
    function Controller($scope, kauReportsData,$window)
    {
        var self = this;

        function exportToCsv()
        {
            // TODO - should get report type from report configuration
            var requestParams = _.defaults({
                reportType : 26,
                headers:";month,plays,bandwidth,avg_storage,transcoding,entries,users",
                reportTitle: 'Usage report'
            },self.filters);

            kauReportsData.getReportCSVUri(requestParams).then(function (result) {
                $window.location.replace(result.csvUri);
            }, function (reason) {
                if (self.reportAPI.showError)
                {
                    self.reportAPI.showError.call(null,'Error occurred while trying to create csv file');
                }
            });

        }

        self.filters = { date : { startDate: moment().subtract(2, 'month').startOf('month'), endDate: moment().endOf('month')}};

        self.dateOptions = {
            ranges: {
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Previous Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 3 Months': [moment().subtract(2, 'month').startOf('month'), moment().endOf('month')]
            }
        };


        self.reportAPI = {
            assignFilters : function(filters)
            {
                $.extend(filters, self.filters);
            }
        };

        self.export = exportToCsv;
        $scope.$watch('vm.filters.date',function()
        {
            if (self.reportAPI.refreshReport) {
                self.reportAPI.refreshReport.call(null);
            }
        });


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
        require: ['kauFiltersSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-filters-section.html',
        controller: Controller,
        link:Link
    };
};


