module.exports = function () {

    var service = {};

    var model = {
        description : 'Report: Live Real-Time Dashboard > Live Content\nPartner: WEATHER NATION (!)\nEntry: WNTV PRIMARY\nFilter: from 01/11/2016 10:00',
    data : {"objects":[{"city":{"latitude":"41.390205","longitude":"2.154007","name":"Barcelona","objectType":"KalturaCoordinate"},"country":{"latitude":"31.5","longitude":"34.75","name":"Spain","objectType":"KalturaCoordinate"},"entryId":"1_oorxcge2","peakAudience":"0","peakDvrAudience":"0","audience":"10","dvrAudience":"6","avgBitrate":"679.0","bufferTime":"60.0","plays":"0","secondsViewed":"10","timestamp":"1452502630","objectType":"KalturaGeoTimeLiveStats"},{"city":{"latitude":"33.3796","longitude":"-96.2475","name":"LEONARD","objectType":"KalturaCoordinate"},"country":{"latitude":"38.0","longitude":"-97.0","name":"UNITED STATES","objectType":"KalturaCoordinate"},"entryId":"1_oorxcge2","peakAudience":"0","peakDvrAudience":"0","audience":"1","dvrAudience":"0","avgBitrate":"2096.0","bufferTime":"0.0","plays":"0","secondsViewed":"10","timestamp":"1452502630","objectType":"KalturaGeoTimeLiveStats"}],"totalCount":"2","objectType":"KalturaLiveStatsListResponse"}
};


    function parseRequest(request, filters,kanSamplesHelper) {
        // process data to create new layers
        var countriesAggregation = {};

        var value = request.data.objects;
        var countriesData = [];
        var citiesData = [];

        if (value) {
            for (var i = 0; i < value.length; i++) {
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
                    lat: countriesAggregation[key].country.latitude,
                    lng: countriesAggregation[key].country.longitude,
                    "audience": countriesAggregation[key].audience,
                    "dvr": countriesAggregation[key].dvrAudience,
                    "data": val,
                    "text": countriesAggregation[key].country.name
                });
            }
        }

       return { description : request.description, data :{ cities : citiesData, countries : countriesData}};
    }

    function invokeDemoRequest($q,$http) {
        var deferred = $q.defer();
        deferred.resolve(model);
        return deferred.promise;
    }

    function invokeLiveRequest(kaAPIFacade) {

        // simulate request of existing analytics system
        var d = new Date();
        var time = Math.floor(d.getTime() / 1000) - 60; //var from = to - (10*60*1000); //36 hours = 129600

        var requestParams = {
            'ignoreNull': '1',
            'filter:objectType': 'KalturaLiveReportInputFilter',
            'filter:fromTime': time,
            'filter:toTime': time,
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

        return kaAPIFacade.doRequest(requestParams,null).then(function (result) {
            return { description : description, data: result.data};
        });
    }

    service.invokeDemoRequest = invokeDemoRequest;
    service.invokeLiveRequest =  invokeLiveRequest;
    service.parseRequest = parseRequest;

    return service;

};
