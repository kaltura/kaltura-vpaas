'use strict';


var appModule = require('./kan-shell.module.js');
appModule.config(require('./kan-shell.config.js'));
appModule.run(require('./kan-shell.run.js'));

