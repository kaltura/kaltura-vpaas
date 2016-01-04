'use strict';

var _ = require('lodash');

module.exports = function (kanSamplesService) {
    var self = this;



    function refreshAll(origin) {

        var loadDataPromise  =  null;

        self.loadingData = true;
        if (origin === 'demo')
        {
            loadDataPromise = kanSamplesService.getDemoData({takeTop10 : self.filters.top10 });
        }else
        {

        }

        if (loadDataPromise )
        {
            loadDataPromise.then(function(result)
            {
                self.samples.sample1.data = result.data;
                self.samples.sample1.refresh();

                var yAxisIndex = result.data.length > 1 ? Math.round(result.data.length / 2) : null;

                self.samples.sample2.data = _.map(result.data, function (item, index) {
                    var yAxisValue = yAxisIndex ? (index + 1 <= yAxisIndex ? 1 : 2) : 1;
                    return {
                        key: item.key,
                        type: 'bar',
                        yAxis: yAxisValue,
                        values: item.values
                    };
                });
                self.samples.sample2.refresh();

                self.samples.sample3.data = result.data;
                self.samples.sample3.refresh();

                self.errorMessage = '';
                self.loadingData = false;
            },function(reason)
            {
                self.errorMessage = "Failed to load data : '" + reason.error + "'";
            });
        }
    }

    // this configuration will be used globally and in the future should be enforced on all charts
    self.config = {
        deepWatchOptions: false,
        refreshDataOnly: false
    };

    self.filters = {
        top10: false,
        demoServer : true
    };

    self.refreshAll = refreshAll;

    self.errorMessage = "";
    self.loadingData = false;

    self.samples =
    {
        sample1: {
            data: null,
            api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
            viewData: {
                showViewFinder: false
            },
            refresh: function () {
                var chartType = self.samples.sample1.viewData.showViewFinder ? 'barWithFocusChart' : 'barChart';
                self.samples.sample1.options.chart.type = chartType;

                // run the refresh api of the actual nvd3 directive
                if (self.samples.sample1.api.refresh) {
                    self.samples.sample1.api.refresh();
                }
            },
            options: {
                chart: {
                    type: '',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    useInteractiveGuidebar: true,
                    transitionDuration: 500,

                    xAxis: {
                        axisLabel: 'Time',
                        tickFormat: function (d) {
                            return d3.time.format('%b %d')(new Date(d));
                        }
                    },
                    yAxis: {
                        axisLabel: 'Total',
                        tickFormat: function (d) {
                            return d3.format(',.1')(d);
                        }
                    }
                }

            }
        },
        sample2: {
            data: null,
            api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
            refresh: function () {
                // run the refresh api of the actual nvd3 directive
                if (self.samples.sample2.api.refresh) {
                    self.samples.sample2.api.refresh();
                }
            },
            options: {
                chart: {
                    type: 'multiChart',
                    height: 450,
                    margin: {
                        top: 30,
                        right: 60,
                        bottom: 50,
                        left: 70
                    },
                    useInteractiveGuidebar: true,
                    color: d3.scale.category10().range(),
                    //useInteractiveGuidebar: true,
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'Time',
                        tickFormat: function (d) {
                            return d3.time.format('%b %d')(new Date(d));
                        }
                    },
                    yAxis: {
                        axisLabel: 'Total',
                        tickFormat: function (d) {
                            return d3.format(',.0')(d);
                        }
                    },
                    yAxis2: {
                        axisLabel: 'Total 2',
                        tickFormat: function (d) {
                            return d3.format(',.0')(d);
                        }
                    }
                }

            }
        },
        sample3: {
            data: null,
            api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
            refresh: function () {
                // run the refresh api of the actual nvd3 directive
                if (self.samples.sample3.api.refresh) {
                    self.samples.sample3.api.refresh();
                }
            },
            options: {
                chart: {
                    type: 'cumulativeBarChart',
                    height: 450,
                    margin: {
                        top: 30,
                        right: 60,
                        bottom: 50,
                        left: 70
                    },
                    useInteractiveGuidebar: true,
                    y: function (d) {
                        return d.y / 100;
                    },
                    color: d3.scale.category10().range(),
                    //useInteractiveGuidebar: true,
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'Time',
                        tickFormat: function (d) {
                            return d3.time.format('%b %d')(new Date(d));
                        }
                    },
                    yAxis: {
                        axisLabel: 'Total',
                        tickFormat: d3.format(',.1%')
                    }
                }

            }
        }
    };
};