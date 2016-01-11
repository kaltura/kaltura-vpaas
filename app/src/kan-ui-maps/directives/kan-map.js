module.exports = function () {
    function Controller($scope, SessionInfo, $timeout, kanCountriesGeojson) {
        var self = this;


        function getColor(d) {
            return d > 1000 ? '#800026' :
                d > 500 ? '#BD0026' :
                    d > 200 ? '#E31A1C' :
                        d > 100 ? '#FC4E2A' :
                            d > 50 ? '#FD8D3C' :
                                d > 20 ? '#FEB24C' :
                                    d > 10 ? '#FED976' :
                                        '#FFEDA0';
        }

        function style(feature) {
            return {
                fillColor: getColor(feature.properties.total),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        function createPath(item) {
            return {
                type: "circle",
                radius: 20000,
                color: 'transparent',
                fillColor: 'orange',
                fillOpacity: 0.8,
                properties: item,
                latlngs: {lat: parseFloat(item.lat), lng: parseFloat(item.lng)}
            }
        }

        function handleCounties(data) {
            var result = {
                paths: {}, geojson: {
                    style: style,
                    onEachFeature: function (feature, layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight
                        });
                    },
                    data: []
                }
            };


            var index = 0;
            _.each(data, function (item) {
                var geojson = kanCountriesGeojson[item.text.toLowerCase()];

                if (geojson) {
                    var newGeojson = $.extend(true, {}, geojson);
                    $.extend(newGeojson.properties, item);

                    result.geojson.data.push(newGeojson);
                } else {
                    index++;
                    result['p' + index] = createPath(item);
                }
            });


            return result;
        }


        function handleCities(data) {
            var result = {paths: {}, geojson: {}};
            var index = 0;

            _.each(data, function (item) {
                index++;
                result.paths['p' + index] = createPath(item);

            });

            return result;
        }

        function rebuildMapOptions() {
            var geojson = {};
            var paths = {};

            if (self.options && self.options.data) {

                if (self.center.zoom > 3) {
                    // cities
                    var cities = handleCities(self.options.data.cities);
                    paths = cities.paths;
                    geojson = cities.geojson;
                } else {
                    // countries
                    var countries = handleCounties(self.options.data.countries);
                    paths = countries.paths;
                    geojson = countries.geojson;

                }
            }
            self.hasData = self.options.data.cities || self.options.data.countries;
            self.selectedFeature = null;
            self.paths = paths;
            self.geojson = geojson;
        }

        self.hasData = false;
        self.center = {
            lat: 37.8,
            lng: -96,
            zoom: 3
        };

        self.paths = {};

        self.layers = {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'https://{s}.kaltura.com/content/static/maps/v1/{z}/{x}/{y}.png',
                    layerOptions: {
                        subdomains: ['cf1', 'cf2', 'cf3'],
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        continuousWorld: false
                    }
                }
            }
        };

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 3,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            self.selectedFeature = layer.feature.properties;
        }


        function resetHighlight(e) {
            var layer = e.target;
            layer.setStyle(style(e.target.feature));

            self.selectedFeature = null;

        }

        self.selectedFeature = null;

        self.geojson = {};


        $scope.$watch('vm.rebind', function () {
            rebuildMapOptions();
        });

        $scope.$watch('vm.center.zoom', function () {
            rebuildMapOptions();
        });

        $scope.$on('leafletDirectivePath.mouseout', function (e, args) {
            self.selectedFeature = null;
        });


        $scope.$on('leafletDirectivePath.mouseover', function (e, args) {
            self.selectedFeature = args.leafletObject.options.properties;
        });
    }


    function Link(scope, element, attrs, ctrl) {

    }


    return {
        restrict: 'A',
        scope: {
            options: '=kOptions',
            rebind: '=kRebind'
        },
        templateUrl: 'kan-ui-maps/directives/kan-map.html',
        controller: Controller,
        controllerAs: 'vm',
        bindToController: true,
        link: Link
    }


}
