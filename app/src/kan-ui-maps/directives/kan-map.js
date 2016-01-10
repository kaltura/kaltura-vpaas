



module.exports = function()
{
    function Controller($scope,  SessionInfo) {
        var self = this;

        var tilesDict = {
            openstreetmap: {
                url: "https://cf{s}.kaltura.com/content/static/maps/v1/{z}/{x}/{y}.png",
                options: {
                    subdomains : '123',
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
            }
        };

        self.center = {
            lat: 47.918464,
            lng: 106.917678,
            zoom: 5
        };

        self.tiles =  tilesDict.openstreetmap;

        self.defaults = {};



    }


    function Link(scope,element,attrs, ctrl)
    {

    }


     return {
    restrict: 'A',
    scope: {
    },
    templateUrl: 'kan-ui-maps/directives/kan-map.html',
    controller: Controller,
    controllerAs: 'vm',
    bindToController: true,
    link: Link
}




}
