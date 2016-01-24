'use strict';


$(document).ready(function () {

    var $html = $('html');

    $.get('./app-config.json',function(data)
    {
        angular.module('kauApp').constant('kAppConfig',data);

        angular.bootstrap($html, ['kauApp']);

    });

});
