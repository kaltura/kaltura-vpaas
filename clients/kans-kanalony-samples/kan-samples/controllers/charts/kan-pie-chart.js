'use strict';

var _ = require('lodash');

module.exports = function (kanSamplesDataService) {
    var self = this;



    function clearChartsData()
    {
        _.each(self.samples,function(sample)
        {
            sample.data = null;
        });

        self.samplesDescription = '';

        refreshChartsLayout();
    }

    function refreshChartsLayout()
    {
        _.each(self.samples,function(sample)
        {
            sample.refresh();
        });

    }

    function loadData(context) {

        var origin = context.origin;
        clearChartsData();
        self.loadingData = true;

        kanSamplesDataService.getData(origin,'pie-chart-s1',{take : 5}).then(function(result)
            {
                self.samplesDescription = result.description;

                self.samples.sample1.data = result.data[0].values;

                refreshChartsLayout();

                self.errorMessage = '';
                self.loadingData = false;
            },function(reason)
            {
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
        demoServer : true
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
                    type: 'pieChart',
                    height: 500,
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    color: d3.scale.category10().range(),

                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }

            }
        }
    };
};
