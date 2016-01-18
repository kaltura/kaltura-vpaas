"use strict";

module.exports = function($stateParams, kAppConfig, kRoutingUtils)
{

    var self = this;

    function initalize()
    {
        if (!self.reportId)
        {
            kRoutingUtils.goToDefault();
        }
    }


    self.reportId = $stateParams.reportId;

    initalize();

};
