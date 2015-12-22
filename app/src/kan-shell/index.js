'use strict';


var appModule = require('./kan-shell.module')(); // invoke the module to get the angular module instance
appModule.config(require('./kan-shell.config'));
appModule.run(require('./kan-shell.run'));

