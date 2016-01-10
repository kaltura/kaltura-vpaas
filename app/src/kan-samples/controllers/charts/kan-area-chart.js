'use strict';

var _ = require('lodash');

module.exports = function (kanSamplesService) {
    var self = this;


    function clearChartsData() {
        _.each(self.samples, function (sample) {
            sample.data = null;
        });

        self.samplesDescription = '';

        refreshChartsLayout();
    }

    function refreshChartsLayout() {
        _.each(self.samples, function (sample) {
            sample.refresh();
        });

    }

    function loadData(context) {

        var origin = context.origin;

        clearChartsData();

        self.loadingData = true;

        kanSamplesService.getData(origin, 'area-chart-s1').then(function (result) {
            self.samplesDescription = result.description;

            self.samples.sample1.data = result.data;

            refreshChartsLayout();

            self.errorMessage = '';
            self.loadingData = false;
        }, function (reason) {
            self.errorMessage = "Failed to load data : '" + reason.errorMessage + "'";
            self.loadingData = false;
        });
    }

    // this configuration will be used globally and in the future should be enforced on all charts
    self.config = {
        deepWatchOptions: false,
        refreshDataOnly: false
    };

    self.filters = {
        top10: false,
        demoServer: true
    };

    self.refreshChartsLayout = refreshChartsLayout;
    self.loadData = loadData;
    self.clearChartsData = clearChartsData;

    self.errorMessage = "";
    self.loadingData = false;

    self.samples =
    {
        sample1: {
            data: null,
            api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
            viewData: {},
            refresh: function () {

                // run the refresh api of the actual nvd3 directive
                if (self.samples.sample1.api.refresh) {
                    self.samples.sample1.api.refresh();
                }
            },
            options: {
                chart: {
                    type: 'stackedAreaChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 30,
                        left: 100
                    },
                    x: function (d) {
                        return d[0]
                    },
                    y: function (d) {
                        return d[1];
                    },
                    color: d3.scale.category10().range(),
                    useVoronoi: false,
                    clipEdge: true,
                    duration: 100,
                    useInteractiveGuideline: true,
                    xAxis: {
                        showMaxMin: false,
                        tickFormat: function (d) {
                            return d3.time.format('%x')(new Date(d))
                        }
                    },
                    yAxis: {
                        tickFormat: function (d) {
                            return d3.format(',.2f')(d);
                        }
                    }
                }

            }
        }
    };
};
