'use strict';

var _ = require('lodash');

module.exports = function($timeout,$http) {
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

    // this configuration will be used globally and in the future should be enforced on all charts
    self.config = {
        deepWatchOptions : false,
        refreshDataOnly : false
    };

    self.barChart =
    {
        sample1: {
            data: [{
                key: "Cumulative Return",
                values: [
                    { "label" : "A" , "value" : -29.765957771107 },
                    { "label" : "B" , "value" : 0 },
                    { "label" : "C" , "value" : 32.807804682612 },
                    { "label" : "D" , "value" : 196.45946739256 },
                    { "label" : "E" , "value" : 0.19434030906893 },
                    { "label" : "F" , "value" : -98.079782601442 },
                    { "label" : "G" , "value" : -13.925743130903 },
                    { "label" : "H" , "value" : -5.1387322875705 }
                ]
            }],
            api : {},
            options: {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x: function(d){ return d.label; },
                    y: function(d){ return d.value; },
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.4f')(d);
                    },
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'X Axis'
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        axisLabelDistance: 30
                    }
                }

            }
        }
    };


    self.lineChart =
    {
        sample1: {
            data:null,
            api : {},
            viewData : {
              showViewFinder : false
            },
            refresh : function()
            {
                var chartType =  self.lineChart.sample1.viewData.showViewFinder ? 'lineWithFocusChart' : 'lineChart';
                self.lineChart.sample1.options.chart.type = chartType;
                if (angular.isFunction(self.lineChart.sample1.api.refresh))
                {
                    self.lineChart.sample1.api.refresh();
                }
            },
            options: {
                chart: {
                    type: '',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    useInteractiveGuideline : true,
                    transitionDuration: 500,

                    xAxis: {
                        axisLabel: 'Time',
                        tickFormat: function(d){
                            return d3.time.format('%b %d')(new Date(d));
                        }
                    },
                    yAxis: {
                        axisLabel: 'Total',
                        tickFormat: function(d){
                            return d3.format(',r')(d);
                        }
                    }
                }

            }
        },
        sample2: {
            data: data(),
            api : {},
            options: {
                viewFinder:true,

            }
        }
    };
    self.lineChart.sample1.refresh();


    function convertToKeyValueArray(data,keyName,valueName)
    {
        return _.words(data,/[^;]+/g).map(function(item)
        {
            var result = {};
            var token = item.split(',');
            result[keyName] =  moment(token[0],'YYYYMMDD').toDate();
            result[valueName] = parseInt(token[1]);
           return result;
        });
    }
    // TODO : currently loads data directly from controller instead of from dedicated service
    $http.post('http://localhost:9911/api_v3/report/getGraphs').then(function(result)
    {
        var lineData = _.map(result.data,function(item)
        {
           return {key : item.id, values : convertToKeyValueArray(item.data,'x','y')};
        });
        self.lineChart.sample1.data = lineData;
        self.lineChart.sample1.api.refresh();

        //self.lineChart.sample2.api.refresh();

    });

};
