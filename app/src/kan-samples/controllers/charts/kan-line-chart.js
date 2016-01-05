'use strict';

var _ = require('lodash');

module.exports = function (kanSamplesService) {
    var self = this;



    function clearChartsData()
    {
        _.each(self.samples,function(sample)
        {
            sample.data = null;
        });

        refreshChartsLayout();
    }

    function refreshChartsLayout()
    {
        _.each(self.samples,function(sample)
        {
            sample.refresh();
        });

    }

    function loadChartsData(origin) {

        var loadDataPromise  =  null;

        self.loadingData = true;
        if (origin === 'demo')
        {
            loadDataPromise = kanSamplesService.getDemoData({key : 'lineChart', take : (self.filters.top10 ? 10 : 0) });
        }else
        {

        }

        if (loadDataPromise )
        {
            loadDataPromise.then(function(result)
            {
                self.samples.sample1.data = result.data;


                var yAxisIndex = result.data.length > 1 ? Math.round(result.data.length / 2) : null;

                self.samples.sample2.data = _.map(result.data, function (item, index) {
                    var yAxisValue = yAxisIndex ? (index + 1 <= yAxisIndex ? 1 : 2) : 1;
                    return {
                        key: item.key,
                        type: 'line',
                        yAxis: yAxisValue,
                        values: item.values
                    };
                });

                self.samples.sample3.data = result.data;

                refreshChartsLayout();

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

    self.refreshChartsLayout = refreshChartsLayout;
    self.loadChartsData = loadChartsData;
    self.clearChartsData = clearChartsData;

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
                var chartType = self.samples.sample1.viewData.showViewFinder ? 'lineWithFocusChart' : 'lineChart';
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
                    useInteractiveGuideline: true,
                    transitionDuration: 500,
                    color: d3.scale.category10().range(),
                    /* Configure chart axis */
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
                    },
                    /* Configure view finder axis */
                    x2Axis: {
                        axisLabel: 'Time',
                        tickFormat: function (d) {
                            return d3.time.format('%b %d')(new Date(d));
                        }
                    },
                    y2Axis: {
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
                    useInteractiveGuideline: true,
                    color: d3.scale.category10().range(),
                    //useInteractiveGuideline: true,
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
                    type: 'cumulativeLineChart',
                    height: 450,
                    margin: {
                        top: 30,
                        right: 60,
                        bottom: 50,
                        left: 70
                    },
                    showControls: false, // show/hide additional controls which are context oriented
                    useInteractiveGuideline: true,
                    y: function (d) {
                        return d.y / 100;
                    },
                    color: d3.scale.category10().range(),
                    //useInteractiveGuideline: true,
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
