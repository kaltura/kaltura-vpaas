

module.exports = function()
{
    function Controller()
    {
        var self = this;

        self.menuItems = [
            {name :'Overall Usage Report', state: 'root.shell.account-usage.reports.overall' },
            {name :'Plays Report', state: 'root.shell.account-usage.reports.plays' },
            {name :'Storage Report', state: 'root.shell.account-usage.reports.storage' },
            {name :'Bandwidth Report', state: 'root.shell.account-usage.reports.bankdwidth' },
            {name :'Transcoding Consumption Report', state: 'root.shell.account-usage.reports.tcr' },
            {name :'Media Entries Report', state: 'root.shell.account-usage.reports.mer' },
            {name :'End Users Report' , state: 'root.shell.account-usage.reports.eur' }];
    }

    function Link(scope, element, attrs, ctrl) {


    }


    return {
        restrict: 'A',
        scope:true,
        controllerAs:'vm',
        templateUrl: 'account-usage/kan-account-usage/directives/kau-side-menu.html',
        controller: Controller,
        link:Link
    };
};


