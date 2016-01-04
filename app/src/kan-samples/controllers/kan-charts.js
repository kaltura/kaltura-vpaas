'use strict';

var _ = require('lodash');

module.exports = function ($timeout, $http) {
    var self = this;

    function data() {
        var sin = [],
            cos = [];

        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i / 10)});
            cos.push({x: i, y: .5 * Math.cos(i / 10)});
        }

        return [
            {
                values: sin,
                key: 'Sine Wave',
                color: '#ff7f0e'
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#2ca02c'
            }
        ];
    }

    function convertToKeyValueArray(data, keyName, valueName, additionalProperties) {
        var result = _.chain(data).words(/[^;]+/g).map(function (item) {
            var result = {};
            if (additionalProperties) {
                $.extend(result, additionalProperties);
            }
            var token = item.split(',');
            result[keyName] = moment(token[0], 'YYYYMMDD').toDate();
            result[valueName] = parseFloat(token[1]);
            return result;
        });

        if (self.filters.top10) {
            result = result.take(10);
        }


        return result.value();
    }

    function refreshAll() {
        // TODO : currently loads data directly from controller instead of from dedicated service
        $http.post('http://localhost:9911/api_v3/report/getGraphs').then(function (result) {

            self.samples.sample1.data = _.map(result.data, function (item) {
                return {key: item.id, values: convertToKeyValueArray(item.data, 'x', 'y')};
            });
            ;
            self.samples.sample1.refresh();

            var yAxisIndex = result.data.length > 1 ? Math.round(result.data.length / 2) : null;

            self.samples.sample2.data = _.map(result.data, function (item, index) {
                var yAxisValue = yAxisIndex ? (index + 1 <= yAxisIndex ? 1 : 2) : 1;
                return {
                    key: item.id,
                    type: 'line',
                    yAxis: yAxisValue,
                    values: convertToKeyValueArray(item.data, 'x', 'y')
                };
            });
            self.samples.sample2.refresh();

            self.samples.sample3.data = _.map(result.data, function (item) {
                return {key: item.id, values: convertToKeyValueArray(item.data, 'x', 'y')};
            });
            ;
            self.samples.sample3.refresh();

        });
    }


    // this configuration will be used globally and in the future should be enforced on all charts
    self.config = {
        deepWatchOptions: false,
        refreshDataOnly: false
    };

    self.filters = {
        top10: false
    };

    self.refreshAll = refreshAll;



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


    refreshAll();

};
