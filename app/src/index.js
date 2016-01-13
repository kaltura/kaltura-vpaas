'use strict';

/* browserify-shim temoprary workaround */
// TODO: should use browserify-shim
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

var leaflet = require('leaflet');
window.L = leaflet;

require('nvd3');
/* end of browserify-shim temoprary workaround */

//load src module
require('./dashboard/kan-app');

