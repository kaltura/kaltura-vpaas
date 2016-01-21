'use strict';

require('../../ui/ka-ui-maps');
require('../../ui/ka-ui-charts');
require('../../core/ka-kaltura-api');

require('ngStorage');
require('angular-leaflet-directive');

module.exports = angular.module('kanSamples',['ngStorage','kaUIMaps','kaUICharts','kaKalturaAPI','leaflet-directive']);
