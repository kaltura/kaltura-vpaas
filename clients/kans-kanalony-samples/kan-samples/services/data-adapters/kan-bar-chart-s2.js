module.exports = function () {

    var service = {};

    var model = {
        description: 'Report: Content Reports > Content Drop-off comparison of 3 entries\nFilter: from 01/12/2015 - 01/01/2016',
        data: [{
            "key": "Five retention reducers",
            "values": [{"label": "count_plays", "value": 493}, {
                "label": "count_plays_25",
                "value": 423
            }, {"label": "count_plays_50", "value": 419}, {
                "label": "count_plays_75",
                "value": 414
            }, {"label": "count_plays_100", "value": 405}]
        }, {
            "key": "Working with  using  and minimizing the ribbon",
            "values": [{"label": "count_plays", "value": 145}, {
                "label": "count_plays_25",
                "value": 123
            }, {"label": "count_plays_50", "value": 120}, {
                "label": "count_plays_75",
                "value": 114
            }, {"label": "count_plays_100", "value": 102}]
        }, {
            "key": "Adjusting spacing",
            "values": [{"label": "count_plays", "value": 128}, {
                "label": "count_plays_25",
                "value": 102
            }, {"label": "count_plays_50", "value": 90}, {
                "label": "count_plays_75",
                "value": 70
            }, {"label": "count_plays_100", "value": 61}]
        }]
    };


    function parseRequest(request, filters,kanSamplesHelper) {
        return request;
    }

    function invokeDemoRequest($q,$http) {
        var deferred = $q.defer();
        deferred.resolve(model);
        return deferred.promise;
    }

    function invokeLiveRequest($q,kaKalturaAPIFacade) {
        var deferred = $q.defer();

        var tableRequestParams = {
            reportType: '2',
            pager : {pageIndex : 1, pageSize : 25},
            reportInputFilter: {fromDay: '20151201', toDay: '20160101'}
        };

        kaKalturaAPIFacade.doRequest(tableRequestParams, {service: 'report', action: "getTable"}).then(function (result) {
            var resultData = result.data;
            var data = _.map(_.words(resultData.data,/[^;]+/g),function(item)
            {
                return  _.zipObject(_.words(resultData.header,/[^,]+/g), _.map(_.words(item,/[^,]+/g),function(item) { return /^[0-9]+$/.test(item) ? parseFloat(item) : item;}));
            });

            var filteredData = _.chain(data).sortByOrder(['count_plays'], ['desc']).take(3).map(function(item) {
                var values = [];
                _.forEach(item,function(value,key)
                {
                    if (key.indexOf('count') === 0)
                    {
                        values.push({label : key, value : value});
                    }

                });
                return {key : item['entry_name'],values : values}
            }).value();
            deferred.resolve({
                description: 'Report: Content Reports > Content Drop-off (comparison of 3 entries)',
                data : filteredData});
        });

        return deferred.promise;
    }

    service.invokeDemoRequest = invokeDemoRequest;
    service.invokeLiveRequest =  invokeLiveRequest;
    service.parseRequest = parseRequest;

    return service;

};
