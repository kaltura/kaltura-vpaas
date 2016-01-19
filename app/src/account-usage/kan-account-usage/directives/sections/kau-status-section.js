"use strict";


module.exports = function()
{
    function Controller($scope)
    {
        var self = this;

        var defaultReportOptions = {
            showErrors : false,
            showLoading : false
        };

        self.reportAPI = {

        };

        self.reportOptions = null;

        $scope.$watch('vm.options',function()
        {
            self.reportOptions = $.extend({},defaultReportOptions,self.options);
        });
    }

    function Link(scope, element, attrs, ctrls) {
        var ctrl = ctrls[0];
        var reportCtrl = ctrls[1];

        reportCtrl.addSection(ctrl.reportAPI);
    }


    return {
        restrict: 'A',
        scope:{
            options : '=kOptions',
            reportStatus : '=kReportStatus'
        },
        require: ['kauStatusSection','^kauReport'],
        controllerAs:'vm',
        bindToController : true,
        templateUrl: 'account-usage/kan-account-usage/directives/sections/kau-status-section.html',
        controller: Controller,
        link:Link
    };
};


