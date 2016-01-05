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
        self.data = {ks : 'djJ8MTk2NjI5MXyruxakcwXo1gIB9bW7cy9seeZJG9hNdXM9kMKiw-mO5raIKWoaLeTNlNSHIJBwTZTxEANaFyRcEREszO5oAQLldKvI3FQA7WkSCnusvTd-l8V25ma3qSI2NxE_Cm5kSX4Vckk8TlSRajT7ZahoJrem'};
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
