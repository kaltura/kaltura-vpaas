'use strict';

require('../kan-ui-maps');
require('../kan-kaltura-api');
require('ngStorage');
require('angular-leaflet-directive');

module.exports = angular.module('kanSamples',['ngStorage','kanUIMaps','kanUICharts','kanKalturaAPI','leaflet-directive']);
