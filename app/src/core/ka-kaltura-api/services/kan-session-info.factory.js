'use strict';

module.exports = function ($location) {
    var sessionInfo = {};
    sessionInfo.ks = '';
    sessionInfo.pid = '';
    sessionInfo.uiconfid = '';
    sessionInfo.map_urls = [
        'a.tile.openstreetmap.org/${z}/${x}/${y}.png',
        'b.tile.openstreetmap.org/${z}/${x}/${y}.png',
        'c.tile.openstreetmap.org/${z}/${x}/${y}.png'
    ];
    sessionInfo.map_zoom_levels = 10;

    sessionInfo.setKs = function setKs(value) {
        sessionInfo.ks = value;
    };
    sessionInfo.setPid = function setPid(value) {
        sessionInfo.pid = value;
    };
    sessionInfo.setUiconfId = function setUiconfId(value) {
        sessionInfo.uiconfid = value;
    };
    sessionInfo.setServiceUrl = function setServiceUrl(value) {
        sessionInfo.service_url = value;
    };
    sessionInfo.setMapUrls = function setMapUrls(value) {
        sessionInfo.map_urls = value;
    };
    sessionInfo.setMapZoomLevels = function setZoomLevels(value) {
        sessionInfo.map_zoom_levels = value;
    };


    try {
        var kmc = window.parent.kmc;
        if (kmc && kmc.vars) {
            if (kmc.vars.ks)
                sessionInfo.ks = kmc.vars.ks;
            if (kmc.vars.partner_id)
                sessionInfo.pid = kmc.vars.partner_id;
            if (kmc.vars.service_url)
                sessionInfo.service_url = kmc.vars.service_url;
            if (kmc.vars.liveanalytics) {
                sessionInfo.uiconfid = kmc.vars.liveanalytics.player_id;
                if (kmc.vars.liveanalytics.map_urls) {
                    sessionInfo.map_urls = kmc.vars.liveanalytics.map_urls;
                }
                if (kmc.vars.liveanalytics.map_zoom_levels) {
                    var n = parseInt(kmc.vars.liveanalytics.map_zoom_levels);
                    if (n > 0) {
                        sessionInfo.map_zoom_levels = n;
                    }
                }
            }


        }
    } catch (e) {
        console.log('Could not locate parent.kmc: ' + e);
    }

    /*     if (!sessionInfo.ks) { //navigate to login
     $location.path("/login");
     } */

    return sessionInfo;
};
