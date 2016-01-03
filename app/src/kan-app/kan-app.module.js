'use strict';

require('angular-ui-router');
require('../kan-shell');
require('../kan-ui-charts');
require('../kan-samples');
require('angular-nvd3');
require('ui-bootstrap');

module.exports =angular.module('kanApp',['ui.router', 'kanShell','kanUICharts','kanSamples','nvd3','ui.bootstrap']);
