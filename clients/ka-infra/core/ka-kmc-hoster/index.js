'use strict';


var appModule = require('./ka-kmc-hoster.module.js');
appModule.run(require('./ka-kmc-hoster.run.js'));
appModule.config(require('./ka-kmc-hoster.config.js'));

appModule.constant('kaKMCConfig',require('./services/ka-kmc-config.constant'));

