

module.exports = function()
{
    function Controller(kauReportsConfiguration)
    {
        var self = this;


        function initialize()
        {
            var menus = [];
            _.chain(kauReportsConfiguration).sortBy(function(item) {
                return _.at(item,'menu.order') || 100;
            }).forEach(function(item)
            {
                menus.push({state : 'root.shell.account-usage.reports.report({reportId : "' + item.reportId + '"})', title : item.menu.title});
            }).value();

            self.menuItems = menus;
        }

        self.menuItems = [];

        initialize();
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


