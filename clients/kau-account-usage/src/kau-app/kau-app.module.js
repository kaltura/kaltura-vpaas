'use strict';

require('angular-ui-router');
require('angular-nvd3');
require('ui-bootstrap');
require('ngStorage');

require('../kau-reports');

module.exports =angular.module('kauApp',['ngStorage','ui.router', 'nvd3','ui.bootstrap','kauReports']);
