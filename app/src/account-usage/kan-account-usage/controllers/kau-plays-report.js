"use strict";

module.exports = function($scope, kauReportsData)
{
    var self = this;

    function loadData() {
        self.loadingData = true;
        self.grid.data = null;
        self.table.data = null;

        kauReportsData.getReportData('plays',self.filters.date).then(function (result) {
            self.grid.data = [{key : '', values : result.data}];
            self.table.data = result.data;
            self.errorMessage = '';
            self.loadingData = false;
        }, function (reason) {
            self.errorMessage = "Failed to load data : '" + reason.errorMessage + "'";
            self.loadingData = false;
        });
    }

    self.loadData = loadData;
    self.errorMessage = "";
    self.loadingData = false;

    self.bla = 1;

    self.filters = { date : { startDate: moment().subtract(3, 'month').startOf('month'), endDate: moment().subtract(1, 'month').endOf('month')}};
    self.dateOptions = {
        ranges: {
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Last 3 Months': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    };

    self.table = {
        data : null
    }
    self.grid = {
        config : {
        },
        data: null,
        api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
        options: {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 110
                },
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
                    axisLabelDistance: -10,
                    showMaxMin: true
                }
            }
        }
    };

    $scope.$watch('vm.filters.date',function()
    {
        loadData();
    });

    loadData();
};
