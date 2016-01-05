'use strict';


module.exports = function (SessionInfo) {
    function Controller() {
        var self = this;

        function submit(origin) {

            self.error = '';

            if (origin === 'live')
            {
                if (!self.data.ks)
                {
                    self.error = 'Missing partner KS value';
                    return;
                }

                SessionInfo.setKs(self.data.ks);
            }

            self.loadData({context: {origin: origin}});
        }

        self.dataFormType = 'live';
        self.data = {ks : SessionInfo.ks};
        self.submit = submit;
    }


    function Link(scope, element, attrs, ctrl) {

    }


    return {
        restrict: 'A',
        scope: {
            loadData: '&kLoadData'
        },
        templateUrl: 'src/kan-samples/directives/kan-sample-data-loader.html',
        controller: Controller,
        controllerAs: 'vm',
        bindToController: true,
        link: Link
    }


};
