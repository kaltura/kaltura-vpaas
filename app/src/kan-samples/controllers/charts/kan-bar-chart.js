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
            loadDataPromise = kanSamplesService.getDemoData({key : 'barChart', take : 3 });
        }else
        {

        }

        if (loadDataPromise )
        {
            loadDataPromise.then(function(result)
            {
                self.samples.sample1.data = result.data;
                self.samples.sample2.data = [result.data[0]];

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
            },
            refresh: function () {

                // run the refresh api of the actual nvd3 directive
                if (self.samples.sample1.api.refresh) {
                    self.samples.sample1.api.refresh();
                }
            },
            options: {
                chart: {
                    type: 'multiBarHorizontalChart',
                    height: 450,
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 150
                    },
                    showControls: true,
                    showValues: true,
                    duration: 500,
                    xAxis: {
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Values',
                        tickFormat: function(d){
                            return d3.format(',.2f')(d);
                        },
                    }
                }

            }
        },
        sample2: {
            data: null,
            api: {}, /* this object will be modified by nvd3 directive to have invokation functions */
            viewData: {
            },
            refresh: function () {

                // run the refresh api of the actual nvd3 directive
                if (self.samples.sample2.api.refresh) {
                    self.samples.sample2.api.refresh();
                }
            },
            options: {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 50
                    },
                    staggerLabels : true,
                    rotateLabels : true,
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.4f')(d);
                    },
                    duration: 500,
                    xAxis: {
                        axisLabel: 'Browsers'
                    },
                    yAxis: {
                        axisLabel: 'Total',
                        axisLabelDistance: 0,
                        showMaxMin : false
                    }
                }

            }
        }
    };
};
