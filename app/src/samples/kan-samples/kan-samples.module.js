'use strict';

require('../../ui/kan-ui-maps');
require('../../ui/kan-ui-charts');
require('../../core/ka-kaltura-api');

require('ngStorage');
require('angular-leaflet-directive');

module.exports = angular.module('kanSamples',['ngStorage','kanUIMaps','kanUICharts','kaKalturaAPI','leaflet-directive']);
