"use strict";

module.exports = function($state, kAppConfig)
{
    var self = this;

    function goToDefault()
    {
        $state.go(kAppConfig.routing.defaultState);
    }

    self.goToDefault = goToDefault;
};
