'use strict';



module.exports = function()
{
    function Controller() {
        var self = this;

        function submit(origin)
        {
            self.loadData({context : {origin : origin}});
        }

        self.dataFormType = 'demo';

        self.submit = submit;
    }


    function Link(scope,element,attrs, ctrl)
    {
    }


    return {
        restrict: 'A',
        scope: {
            loadData : '&kLoadData'
        },
        templateUrl: 'src/kan-samples/directives/kan-sample-data-loader.html',
        controller: Controller,
        controllerAs: 'vm',
        bindToController: true,
        link: Link
    }




};
