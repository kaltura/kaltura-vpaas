"use strict";

var config = {};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function extractKMC()
{
    try {
        var kmc = window.parent.kmc;
        if (kmc && kmc.vars) {
            if (kmc.vars.ks)
            config.ks =  kmc.vars.ks;
            if (kmc.vars.partner_id)
                config.pid = kmc.vars.partner_id;
            if (kmc.vars.service_url)
                config.service_url = kmc.vars.service_url;
            if (kmc.vars.liveanalytics) {
                if (kmc.vars.liveanalytics.player_id) {
                    config.live.playerId = kmc.vars.liveanalytics.player_id;
                }
                if (kmc.vars.liveanalytics.map_urls) {
                    config.live.map_urls = kmc.vars.liveanalytics.map_urls;
                }
                if (kmc.vars.liveanalytics.map_zoom_levels) {
                    var n = parseInt(kmc.vars.liveanalytics.map_zoom_levels);
                    if (n > 0) {
                        config.live.map_zoom_levels = n;
                    }
                }
            }
        }
    } catch (e) {
        console.log('Could not locate parent.kmc: ' + e);
    }
}

extractKMC();

if (!config.ks)
{
    // fallback to query string ks
    config.ks =  getParameterByName('ks');
}


module.exports = config;
