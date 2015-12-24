'use strict';

module.exports = function(){
    require('angular-ui-router');
    require('../kan-shell');

    return angular.module('kanApp',['ui.router', 'kanShell']);
};

