'use strict';

require('./kan-app-bootstrap');

var appModule = require('./kan-app.module.js');
appModule.config(require('./kan-app.config.js'));
appModule.run(require('./kan-app.run.js'));

