'use strict';

require('angular');
var lodash = require('lodash');
window._ = lodash;

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

var d3 = require('d3');
window.d3 = d3;

var moment = require('moment');
window.moment = moment;
require('nvd3');

//load src module
require('./kan-app');

