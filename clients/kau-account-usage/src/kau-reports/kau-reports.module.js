'use strict';

require('../../../ka-infra/core/ka-kaltura-api');
require('angular-daterangepicker');
require('../../../ka-infra/core/ka-common-utils');
require('../../../ka-infra/ui/ka-ui-common');
require('../../../ka-infra/ui/ka-ui-charts');


module.exports = angular.module('kauReports',['kaKalturaAPI','kaCommonUtils','daterangepicker','kaUICommon','kaUICharts']);
