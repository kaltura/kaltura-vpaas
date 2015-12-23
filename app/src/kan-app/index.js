'use strict';

require('./kan-app-bootstrap');

var appModule = require('./kan-app.module')(); // invoke the module to get the angular module instance
appModule.config(require('./kan-app.config'));
appModule.run(require('./kan-app.run'));

