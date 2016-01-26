"use strict";

module.exports = function($stateParams, kAppConfig, kaAppRoutingUtils)
{

    var self = this;

    function initalize()
    {
        if (!self.reportId)
        {
            kaAppRoutingUtils.goToDefault();
        }
    }


    self.reportId = $stateParams.reportId;

    initalize();

};
