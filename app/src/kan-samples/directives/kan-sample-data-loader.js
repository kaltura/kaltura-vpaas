'use strict';

module.exports = function (SessionInfo,$sessionStorage) {
    function Controller() {
        var self = this;

        function submit(origin) {

            self.error = '';

            if (origin === 'live') {
                if (!self.data.ks) {
                    self.error = 'Missing partner KS value';
                    return;
                }


                $sessionStorage.ks = self.data.ks;
                SessionInfo.setKs(self.data.ks);
            }

            self.loadData({context: {origin: origin}});
        }

        self.dataFormType = 'live';
        self.data = {ks: SessionInfo.ks || $sessionStorage.ks};
        self.submit = submit;

    }


    function Link(scope, element, attrs, ctrl) {
        scope.$storage = $sessionStorage; // set on the scope to 'force' angular to monitor its' change and update the session storage
    }


    return {
        restrict: 'A',
        scope: {
            loadData: '&kLoadData'
        },
        templateUrl: 'kan-samples/directives/kan-sample-data-loader.html',
        controller: Controller,
        controllerAs: 'vm',
        bindToController: true,
        link: Link
    }


};
