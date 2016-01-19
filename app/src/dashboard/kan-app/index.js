'use strict';

require('./kan-app-bootstrap');

var appModule = require('./kan-app.module');
appModule.config(require('./kan-app.config'));
appModule.run(require('./kan-app.run.js'));

