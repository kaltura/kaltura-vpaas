'use strict';

var _ = require('lodash');

module.exports = function (kanSamplesDataService) {
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

        kanSamplesDataService.getData(origin, 'map-s1').then(function (result) {
            self.samplesDescription = result.description;

            self.samples.sample1.options.data = result.data;


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
            refresh: function () {
                self.samples.sample1.rebind++;
            },
            rebind: 1,
            options: {
                data: null
            }
        }
    };
};
