'use strict';

require('angular-ui-router');
require('../kan-shell');
require('../kan-ui-charts');
require('../kan-samples');

module.exports =angular.module('kanApp',['ui.router', 'kanShell','kanUICharts','kanSamples']);
