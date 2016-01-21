"use strict";

var spin = require('spin');
module.exports = function()
{
    var loaderConfig =  {
        lines: 11, // The number of lines to draw
        length: 10, // The length of each line
        width: 6, // The line thickness
        radius: 12, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: [
            'rgb(0,154,218)',
            'rgb(255,221,79)',
            'rgb(0,168,134)',
            'rgb(233,44,46)',
            'rgb(181,211,52)',
            'rgb(252,237,0)',
            'rgb(0,180,209)',
            'rgb(117,192,68)',
            'rgb(232,44,46)',
            'rgb(250,166,26)',
            'rgb(0,154,218)',
            'rgb(232,44,46)',
            'rgb(255,221,79)',
            'rgb(117,192,68)',
            'rgb(232,44,46)'
        ],
        imageUrl: '',  // url for image to replace the spinner
        speed: 1.6,	// Rounds per second
        trail: 100,	// Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000),
        top : 0,
        left : 0

    };

    function link(scope,element,attrs,ctrl)
    {
        var loader = new spin(loaderConfig);
        var isShowingLoader = false;

        element.ready(function () {
            if (attrs.isLoading) {
                scope.$watch(attrs.isLoading, function (val) {
                    if (val) {
                        if (!isShowingLoader) {
                            isShowingLoader = true;
                            loader.spin();
                            $(element.children()[0]).append(loader.el);
                        }
                    } else {
                        loader.stop();
                        isShowingLoader = false;
                    }
                });
            }
        });
    }

    return {
        restrict : 'A',
        link : link,
        template: '<div class="ka-status-notification"></div>'
    }

};
