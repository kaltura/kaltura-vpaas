module.exports = function () {

    var service = {};

    var model = {
        description: 'Report: Content Reports > Content Drop-off\nFilter: from 01/12/2015 - 01/01/2016',
        data: [{
            "id": "content_dropoff",
            "data": "count_plays,392356;count_plays_25,304802;count_plays_50,287516;count_plays_75,273269;count_plays_100,252204;play_through_ratio,0.6428;",
            "objectType": "KalturaReportGraph"
        }]
    };


    function parseRequest(request, filters,kanSamplesHelper) {
        return {description : request.description, data :_.map(request.data, function (item) {
            return {
                key: item.id,
                values: kanSamplesHelper.convertAPIDataToKeyValueArray(item.data, 'labelNumberMultiSeries', filters)
            };
        })};
    }

    function invokeDemoRequest($q,$http) {
        var deferred = $q.defer();
        deferred.resolve(model);
        return deferred.promise;
    }

    function invokeLiveRequest(kanAPIFacade) {
        var requestParams = {
            reportType: '2',
            reportInputFilter: {fromDay: '20151201', toDay: '20160101'}
        };
        var description = 'Report: Content Reports > Content Drop-off\nFilter: from 01/12/2015 - 01/01/2016';

        return kanAPIFacade.doRequest(requestParams, {service: 'report', action: "getGraphs"}).then(function (result) {
            return { description : description, data: result.data};
        });
    }

    service.invokeDemoRequest = invokeDemoRequest;
    service.invokeLiveRequest =  invokeLiveRequest;
    service.parseRequest = parseRequest;

    return service;

};
