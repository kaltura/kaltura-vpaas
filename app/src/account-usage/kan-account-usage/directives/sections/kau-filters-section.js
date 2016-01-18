"use strict";


module.exports = function()
{
    function Controller($scope)
    {
        var self = this;

        self.filters = { date : { startDate: moment().subtract(2, 'month').startOf('month'), endDate: moment().endOf('month')}};

        self.dateOptions = {
            ranges: {
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Previous Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 3 Months': [moment().subtract(2, 'month').startOf('month'), moment().endOf('month')]
            }
        };

        $scope.$watch('vm.filters.date',function()
        {
            if (self.reportAPI.refreshReport) {
                self.reportAPI.refreshReport.call(null);
            }
        });

        self.reportAPI = {
            assignFilters : function(filters)
            {
                $.extend(filters, self.filters);
            }
        };
    }

    function Link(scope, element, attrs, ctrls) {
        var ctrl = ctrls[0];
        var reportCtrl = ctrls[1];

        reportCtrl.addSection(ctrl.reportAPI);
    }


    return {
        restrict: 'A',
        scope:false,
        require: ['kauFiltersSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-filters-section.html',
        controller: Controller,
        link:Link
    };
};


