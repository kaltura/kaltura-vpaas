module.exports = function () {

    var service = {};

    var model = {
        description: 'Report: Content Reports > Top Content\nMatrics: "Play","Minutes Viewed","Player impression"\nDimension: "Time"\nFilter: from 01/12/2015 - 01/01/2016',
        data: [{
            "id": "count_plays",
            "data": "20151201,25146;20151202,23720;20151203,19717;20151204,20153;20151205,6158;20151206,7547;20151207,19798;20151208,20952;20151209,20235;20151210,18483;20151211,15939;20151212,6551;20151213,8141;20151214,20713;20151215,23833;20151216,18796;20151217,16575;20151218,14394;20151219,3292;20151220,3365;20151221,9351;20151222,9292;20151223,6960;20151224,2536;20151225,1432;20151226,2908;20151227,3592;20151228,9357;20151229,10756;20151230,10916;20151231,7376;20160101,4372;",
            "objectType": "KalturaReportGraph"
        }, {
            "id": "sum_time_viewed",
            "data": "20151201,30442.449;20151202,29358.450;20151203,26372.773;20151204,25105.553;20151205,8676.671;20151206,10087.390;20151207,24706.067;20151208,27953.829;20151209,28227.549;20151210,26662.081;20151211,22590.403;20151212,10059.161;20151213,12209.863;20151214,28636.381;20151215,29850.094;20151216,27070.965;20151217,24417.511;20151218,21114.241;20151219,5208.618;20151220,4718.457;20151221,13166.327;20151222,13449.060;20151223,9884.208;20151224,3631.176;20151225,1961.250;20151226,4632.037;20151227,4769.126;20151228,14830.125;20151229,17105.938;20151230,18076.524;20151231,12936.632;20160101,7427.503;",
            "objectType": "KalturaReportGraph"
        }, {
            "id": "count_loads",
            "data": "20151201,27497;20151202,25818;20151203,21407;20151204,21866;20151205,6637;20151206,8129;20151207,21353;20151208,22802;20151209,22073;20151210,20175;20151211,17311;20151212,7214;20151213,8804;20151214,22439;20151215,26029;20151216,20321;20151217,18214;20151218,15542;20151219,3691;20151220,3678;20151221,10223;20151222,10199;20151223,7494;20151224,2999;20151225,1811;20151226,3279;20151227,3986;20151228,10023;20151229,11486;20151230,11657;20151231,7965;20160101,4853;",
            "objectType": "KalturaReportGraph"
        }]
    };


    function parseRequest(request, filters,kanSamplesHelper) {
        return {description : request.description, data : _.map(request.data, function (item) {
            return {key: item.id, values: kanSamplesHelper.convertAPIDataToKeyValueArray(item.data, 'dateNumberArray', filters)};
        })};
    }

    function invokeDemoRequest($q,$http) {
        var deferred = $q.defer();
        deferred.resolve(model);
        return deferred.promise;
    }

    function invokeLiveRequest(kanAPIFacade) {
        var requestParams = {
            reportType: '1',
            reportInputFilter: {fromDay: '20151201', toDay: '20160101'}
        };
        var description = 'Report: Content Reports > Top Content\nMatrics: (determined by response)\nDimension: "Time"\nFilter: from 01/12/2015 - 01/01/2016';

        return kanAPIFacade.doRequest(requestParams, {service: 'report', action: "getGraphs"}).then(function (result) {
            return { description : description, data: result.data};
        });
    }

    service.invokeDemoRequest = invokeDemoRequest;
    service.invokeLiveRequest =  invokeLiveRequest;
    service.parseRequest = parseRequest;

    return service;

};
