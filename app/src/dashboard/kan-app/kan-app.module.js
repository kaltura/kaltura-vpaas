'use strict';

require('angular-ui-router');
require('angular-nvd3');
require('ui-bootstrap');

require('../kan-shell');
require('../../samples/kan-samples');
require('../../account-usage/kau-reports');
require('../../core/ka-common-utils');


module.exports =angular.module('kanApp',['ui.router', 'kanShell','kanSamples','nvd3','ui.bootstrap','kauReports','kaCommonUtils']);
