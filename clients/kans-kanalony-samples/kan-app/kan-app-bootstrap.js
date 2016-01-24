'use strict';


$(document).ready(function () {

    var $html = $('html');

    $.get('./app-config.json',function(data)
    {
        angular.module('kanApp').constant('kAppConfig',data);

        angular.bootstrap($html, ['kanApp']);

    });

});
