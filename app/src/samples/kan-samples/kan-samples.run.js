'use strict';

module.exports = function (kanSamplesHelper) {
    kanSamplesHelper.registerAdapter('line-chart-s1', require('./services/data-adapters/kan-line-chart-s1')());
    kanSamplesHelper.registerAdapter('bar-chart-s1', require('./services/data-adapters/kan-bar-chart-s1')());
    kanSamplesHelper.registerAdapter('bar-chart-s2', require('./services/data-adapters/kan-bar-chart-s2')());
    kanSamplesHelper.registerAdapter('area-chart-s1', require('./services/data-adapters/kan-area-chart-s1')());
    kanSamplesHelper.registerAdapter('pie-chart-s1', require('./services/data-adapters/kan-pie-chart-s1')());

    kanSamplesHelper.registerAdapter('map-s1', require('./services/data-adapters/kan-map-s1')());

};
