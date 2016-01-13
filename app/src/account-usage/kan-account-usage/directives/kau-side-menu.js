

module.exports = function()
{
    function Controller()
    {
        var self = this;

        self.menuItems = [
            {name :'Overall Usage Report', state: 'root.shell.account-usage.reports.plays' },
            {name :'Plays Report', state: 'root.shell.account-usage.reports.plays' },
            {name :'Storage Report', state: 'root.shell.account-usage.reports.plays' },
            {name :'Bandwidth Report', state: 'root.shell.account-usage.reports.plays' },
            {name :'Transcoding Consumption Report', state: 'root.shell.account-usage.reports.plays' },
            {name :'Media Entries Report', state: 'root.shell.account-usage.reports.plays' },
            {name :'End Users Report' , state: 'root.shell.account-usage.reports.plays' }];
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


