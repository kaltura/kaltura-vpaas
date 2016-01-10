module.exports = function () {

    var service = {};

    var model = {};


    function parseRequest(request, filters,kanSamplesHelper) {
        // process data to create new layers
        var countriesAggregation = {};

        var value = request.data.objects;
        var countriesData = [];
        var citiesData = [];

        for ( var i = 0; i < value.length; i++) {
            var val = parseInt(value[i].audience, 10) + parseInt(value[i].dvrAudience, 10); // convert string to int
            if (val == 0) continue; // leave out points where audience is zero - we got them because they have plays)
            // accumulate data for country-level layer
            if (!countriesAggregation[value[i].country.name]) {
                // init - keep whole value for lat/long
                countriesAggregation[value[i].country.name] = value[i];
                countriesAggregation[value[i].country.name]['audience'] = parseInt(value[i].audience, 10);
                countriesAggregation[value[i].country.name]['dvrAudience'] = parseInt(value[i].dvrAudience, 10);
            }
            else {
                // sum audience
                countriesAggregation[value[i].country.name]['audience'] += parseInt(value[i].audience, 10);
                countriesAggregation[value[i].country.name]['dvrAudience'] += parseInt(value[i].dvrAudience, 10);
            }

            citiesData.push(
                {
                    lat: value[i].city.latitude,
                    lng: value[i].city.longitude,
                    "audience": value[i].audience,
                    "dvr": value[i].dvrAudience,
                    "data": val,
                    "text": value[i].city.name
                });
        }

        for (var key in countriesAggregation) {
            var val = countriesAggregation[key].audience + countriesAggregation[key].dvrAudience;
            countriesData.push({
                    lat : countriesAggregation[key].country.latitude,
                    lng : countriesAggregation[key].country.longitude,
                    "audience" : countriesAggregation[key].audience,
                    "dvr" : countriesAggregation[key].dvrAudience,
                    "data" : val,
                    "text" : countriesAggregation[key].country.name
                });
        }

       return { description : request.description, data :{ cities : citiesData, countries : countriesData}};
    }

    function invokeDemoRequest($q,$http) {
        var deferred = $q.defer();
        deferred.resolve(model);
        return deferred.promise;
    }

    function invokeLiveRequest(kanAPIFacade) {
        var requestParams = {
            'ignoreNull': '1',
            'filter:objectType': 'KalturaLiveReportInputFilter',
            'filter:fromTime': 1452338730,
            'filter:toTime': 1452338730,
            'filter:entryIds': '1_oorxcge2',
            'filter:orderBy' : '-audience', //KalturaLiveReportOrderBy.AUDIENCE_DESC
            'pager:objectType': 'KalturaFilterPager',
            'pager:pageIndex': '1',
            'pager:pageSize': '1000',
            'reportType': 'ENTRY_GEO_TIME_LINE',
            'service': 'livereports',
            'action': 'getreport'
        };

        var description = 'Report: Live Real-Time Dashboard > Live Content\nPartner: WEATHER NATION (!)\nEntry: WNTV PRIMARY';

        return kanAPIFacade.doRequest(requestParams,null).then(function (result) {
            return { description : description, data: result.data};
        });
    }

    service.invokeDemoRequest = invokeDemoRequest;
    service.invokeLiveRequest =  invokeLiveRequest;
    service.parseRequest = parseRequest;

    return service;

};
