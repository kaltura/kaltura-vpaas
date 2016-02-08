"use strict";

var moment = require('moment');

module.exports = function()
{
    function Controller($scope,kaAppRoutingUtils,  kauReportsData,$element,$timeout)
    {
        var self = this;

        function exportToCsv()
        {
            // TODO - should get report type from report configuration
            var requestParams = _.defaults({
                reportType : 26,
                reportTitle: 'Usage report'
            },self.filters);

            self.csvProcessing = true;
            self.reportStatus.errorMessage = '';
            kauReportsData.getReportCSVUri(requestParams).then(function (result) {

                if (self.csvProcessing) {
                    // if csvProcessing is off it means this response is not longer needed (user might performed a report query)
                    self.csvProcessing = false;
                    self.csvUrl = result.csvUri;
                }


            }, function (reason) {
                self.csvProcessing = false;
                self.reportStatus.errorMessage = 'Error occurred while trying to create cvs file';
            });

        }

        function getDefaultDateRange()
        {
            return { startDate: moment().subtract(2, 'month').startOf('month'), endDate: moment().endOf('month')};
        }

        function clearCsvUrl()
        {
            self.csvUrl = '';
        }


        function checkIsDateValid(date)
        {
            var momentDate = moment.isMoment(date) ? date : moment(date);
            return date ? moment(momentDate._i, momentDate._f,true).isValid() : false;
        }

        self.reportAPI = {
            assignFilters : function(filters)
            {
                $.extend(filters, self.filters);
            },
            loadReportData : function(reportData)
            {
                self.reportData = reportData;
            }
        };


        self.reportData = null;
        self.csvProcessing = false;
        self.csvUrl = '';
        self.clearCsvUrl = clearCsvUrl;
        self.filters = { date : getDefaultDateRange()};

        self.dateOptions = {
            showDropdowns : true,
            maxDate : moment(),
            ranges: {
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Previous Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 3 Months': [moment().subtract(2, 'month').startOf('month'), moment().endOf('month')]
            },
            isInvalidDate : function(date)
            {
                return !checkIsDateValid(date);
            }
        };

        self.export = exportToCsv;
        $scope.$watch('vm.filters.date',function()
        {
            self.reportStatus.errorMessage = '';
            if (checkIsDateValid(self.filters.date.startDate) && checkIsDateValid(self.filters.date.endDate))
            {
                if (self.reportAPI.refreshReport) {
                    self.reportAPI.refreshReport.call(null);
                }
            }else {
                self.reportStatus.errorMessage = 'Provided dates are invalid. Please try again with valid values.';
                if (self.reportAPI.clearReportData) {
                    self.reportAPI.clearReportData.call(null);
                }
            }
        });

        self.initDateRangeControl = function()
        {
            // bypass
            $timeout(function(){
                var $dateRangeElement = $($element.find('.date-picker')[0]);
                var dateRange = $dateRangeElement.data('daterangepicker');
                var $dateRangeSpan = $($dateRangeElement.find('span')[0]);
                var prevCallback = dateRange.callback;
                var wrapperCallback = function(start,end)
                {
                    $dateRangeSpan.html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    return prevCallback.call(null,start,end);
                };
                dateRange.callback = wrapperCallback;
                wrapperCallback(dateRange.startDate,dateRange.endDate);
            },200);
        }

        $scope.$watch('vm.reportStatus.isLoading',function()
        {
           self.csvUrl = false;
            self.csvProcessing = false;
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
templateUrl: 'kau-reports/directives/sections/kau-filters-section.html',
        controller: Controller,
        link:Link
    };
};


