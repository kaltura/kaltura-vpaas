'use strict';


var appModule = require('./kan-shell.module');
appModule.config(require('./kan-shell.config'));
appModule.run(require('./kan-shell.run'));

