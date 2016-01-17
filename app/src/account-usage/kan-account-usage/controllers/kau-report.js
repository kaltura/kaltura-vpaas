"use strict";

module.exports = function($stateParams, kAppConfig, kRouting)
{

    var self = this;

    function initalize()
    {
        if (!self.reportId)
        {
            kRouting.goToDefault();
        }
    }


    self.reportId = $stateParams.reportId;

    initalize();

};
