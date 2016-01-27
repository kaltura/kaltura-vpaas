"use strict";

module.exports = function($state, kAppConfig)
{
    var self = this;

    function goToDefault()
    {
        $state.go(kAppConfig.routing.defaultState);
    }

    function openExternalUri(uri)
    {
        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return window.open(uri);
        } else {
            return window.location.replace(uri);
        }
    }

    self.openExternalUri = openExternalUri;
    self.goToDefault = goToDefault;
};
