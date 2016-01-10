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

        kanSamplesDataService.getData(origin,'map-s1').then(function(result)
        {
            self.samplesDescription = result.description;

            self.samples.sample1.data = result.data;



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
            refresh: function () {

            },
            rebind : 1,
            options: {
                overlays: {
                    cities: {
                        name: 'Cities',
                        type: 'markercluster',
                        visible: true
                    }
                },
                markers: {
                    m1: {
                        lat: 42.20133,
                        lng: 2.19110,
                        layer: 'cities',
                        message: "I'm a moving car"
                    },
                    m2: {
                        lat: 42.21133,
                        lng: 2.18110,
                        layer: 'cities',
                        message: "I'm a car"
                    },
                    m3: {
                        lat: 42.19133,
                        lng: 2.18110,
                        layer: 'cities',
                        message: 'A bike!!'
                    },
                    m4: {
                        lat: 42.3,
                        lng: 2.16110,
                        layer: 'cities'
                    },
                    m5: {
                        lat: 42.1,
                        lng: 2.16910,
                        layer: 'cities'
                    },
                    m6: {
                        lat: 42.15,
                        lng: 2.17110,
                        layer: 'cities'
                    }
                }
            }
        }
    };
};
