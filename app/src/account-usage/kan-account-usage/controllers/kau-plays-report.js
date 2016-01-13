"use strict";

module.exports = function(kauReportsData)
{
    var self = this;

    function loadData() {
        self.loadingData = true;

        kauReportsData.getReportData().then(function (result) {
            self.grid.data = [{key : 'ss', values : result.data}];
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
                    left: 100
                },
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

    loadData();
};
