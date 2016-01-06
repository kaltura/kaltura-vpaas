var storage = require('../scripts/kan-samples-repository');

module.exports = function ($http, $q, kanAPIFacade) {

    var self = this;

    function getAPIDataConfiguration(key, clone) {
        var configuration = null;

        switch (key) {
            case 'dateNumberArray':
            {
                configuration = {
                    itemType: 'array',
                    keyType: 'date',
                    keyFormat: 'YYYYMMDD',
                    valueType: 'number',
                    valueFormat: ''
                };
                break;
            }
            case 'dateNumberMultiSeries':
                configuration = {
                    itemType: 'object',
                    keyName: 'x',
                    keyType: 'date',
                    keyFormat: 'YYYYMMDD',
                    valueName: 'y',
                    valueType: 'number',
                    valueFormat: ''
                };
                break;
            case 'labelNumberMultiSeries':
                configuration = {
                    itemType: 'object',
                    keyName: 'label',
                    keyType: 'text',
                    keyFormat: '',
                    valueName: 'value',
                    valueType: 'number',
                    valueFormat: ''
                };
                break;
            default:
                break;
        }

        return clone ? $.extend(true, {}, configuration) : configuration;
    }


    function parseAPIToken(value, valueType, options) {
        var result = null;

        switch (valueType) {
            case 'date':
                result = moment(value, options.format || 'YYYYMMDD').toDate();
                break;
            case 'number':
                result = parseFloat(value);
                break;
            default:
                result = value;
                break;
        }

        return result;
    }


    function convertAPIDataToKeyValueArray(data, configuration, filters) {
        var filters = $.extend({}, {take: null}, filters);
        configuration = angular.isString(configuration) ? getAPIDataConfiguration(configuration) : configuration;
        var result = null;

        if (angular.isDefined(configuration) && configuration !== null) {
            var parsedResult = _.chain(data).words(/[^;]+/g).map(function (item) {


                var token = item.split(',');
                var key = parseAPIToken(token[0], configuration.keyType, {format: configuration.keyFormat});
                var value = parseAPIToken(token[1], configuration.valueType, {format: configuration.valueFormat});

                var result = null;
                if (configuration.itemType === 'array') {
                    result = [key, value];
                } else {
                    result = {};
                    result[configuration.keyName] = key;
                    result[configuration.valueName] = value;
                }

                return result;
            });

            if (filters.take) {
                parsedResult = parsedResult.sortByOrder([configuration.valueName], ['desc']).take(filters.take);
            }

            result = parsedResult.value();
        }

        return result;
    }

    function parseResponse(requestType, responseData, filters) {
        var result = null;
        switch (requestType) {
            case 'areaChart':
                result = _.map(responseData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data, 'dateNumberArray', filters)};
                });
                break;
            case 'lineChart':
                result = _.map(responseData, function (item) {
                    return {
                        key: item.id,
                        values: convertAPIDataToKeyValueArray(item.data, 'dateNumberMultiSeries', filters)
                    };
                });
                break;
            case 'barChart':
                result = _.map(responseData, function (item) {
                    return {
                        key: item.id,
                        values: convertAPIDataToKeyValueArray(item.data, 'labelNumberMultiSeries', filters)
                    };
                });
                break;
            case 'barChartCompare':
                result = responseData;
                break;
            case 'pieChart':
                result = _.map(responseData, function (item) {
                    return {
                        key: item.id,
                        values: convertAPIDataToKeyValueArray(item.data, 'labelNumberMultiSeries', filters)
                    };
                });
                break;
            default:
                break;
        }

        return result;
    }

    function getDemoData(requestType, filters) {
        var serverData = storage.get(requestType);

        if (serverData) {
            var resultData = parseResponse(requestType, serverData.data, filters);

            return $q.resolve({description: 'Recorded request\n' + serverData.description, data: resultData});
        }else
        {
            return $q.reject({errorMessage : 'invalid request'});
        }
    }

    function getLiveData(requestType, filters) {
        var requestParams = {};
        var description = 'Live request\n';

        switch (requestType) {
            case 'barChart':
                requestParams = {
                    reportType: '2',
                    reportInputFilter: {fromDay: '20151201', toDay: '20160101'}
                };
                description += 'Report: Content Reports > Content Drop-off\nFilter: from 01/12/2015 - 01/01/2016';
                break;
            case 'lineChart':
                requestParams = {
                    reportType: '1',
                    reportInputFilter: {fromDay: '20151201', toDay: '20160101'}
                };
                description += 'Report: Content Reports > Top Content\nMatrics: (determined by response)\nDimension: "Time"\nFilter: from 01/12/2015 - 01/01/2016';
                break;
            case 'areaChart':
                requestParams = {
                    reportType: '1',
                    reportInputFilter: {fromDay: '20151201', toDay: '20160101'}
                };
                description += 'Report: Content Reports > Top Content\nMatrics: (determined by response)\nDimension: "Time"\nFilter: from 01/12/2015 - 01/01/2016';
                break;
            case 'pieChart':

                break;
            default:
                break;
        }

        return kanAPIFacade.doRequest(requestParams, {service: 'report', action: "getGraphs"}).then(function (result) {
            var resultData = parseResponse(requestType, result.data, filters);
            return $q.resolve({ description : description, data: resultData})
        });
    }

    function getLiveBarChartCompare()
    {
        var deferred = $q.defer();

        var tableRequestParams = {
            reportType: '2',
            pager : {pageIndex : 1, pageSize : 25},
            reportInputFilter: {fromDay: '20151201', toDay: '20160101'}
        };

         kanAPIFacade.doRequest(tableRequestParams, {service: 'report', action: "getTable"}).then(function (result) {
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
                 description: 'Report: Content Reports > Content Drop-off comparison of 3 entries',
                 data : filteredData});
        });

        return deferred.promise;
    }

    function getData(origin, requestType, filters) {
        if (origin === 'live') {
            if (requestType === 'barChartCompare')
            {
                return getLiveBarChartCompare();
            }else {
                return getLiveData(requestType, filters);
            }
        } else {

            return getDemoData(requestType, filters);
        }
    }

    self.getData = getData;
    self.getDemoData = getDemoData;
}

