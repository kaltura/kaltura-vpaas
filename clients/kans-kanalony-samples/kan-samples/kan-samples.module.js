'use strict';

require('../../../ka-infra/ui/ka-ui-maps');
require('../../../ka-infra/ui/ka-ui-charts');
require('../../../ka-infra/core/ka-kaltura-api');

require('ngStorage');
require('angular-leaflet-directive');

module.exports = angular.module('kanSamples',['ngStorage','kaUIMaps','kaUICharts','kaKalturaAPI','leaflet-directive']);
