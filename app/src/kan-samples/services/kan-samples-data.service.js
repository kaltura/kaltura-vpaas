var storage = require('../scripts/kan-samples-repository');

module.exports = function ($http, $q,kanAPIFacade) {

    var self = this;


    function getAPIDataConfiguration(key, clone) {
        var configuration = null;

        switch (key) {
            case 'dateNumberArray':
            {
                configuration = {
                    itemType : 'array',
                    keyType: 'date',
                    keyFormat: 'YYYYMMDD',
                    valueType: 'number',
                    valueFormat: ''
                };
                break;
            }
            case 'dateNumberMultiSeries':
                configuration = {
                    itemType : 'object',
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
                    itemType : 'object',
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
        var filters = $.extend({}, {take:null}, filters);
        configuration = angular.isString(configuration) ? getAPIDataConfiguration(configuration) : configuration;
        var result = null;

        if (angular.isDefined(configuration) && configuration !== null) {
            var parsedResult = _.chain(data).words(/[^;]+/g).map(function (item) {


                var token = item.split(',');
                var key = parseAPIToken(token[0], configuration.keyType, {format: configuration.keyFormat});
                var value = parseAPIToken(token[1], configuration.valueType, {format: configuration.valueFormat});

                var result = null;
                if (configuration.itemType === 'array')
                {
                    result = [key,value];
                }else
                {
                    result = {};
                    result[configuration.keyName] = key;
                    result[configuration.valueName] = value;
                }

                return result;
            });

            if (filters.take) {
                parsedResult = parsedResult.sortByOrder([configuration.valueName],['desc']).take(filters.take);
            }

            result = parsedResult.value();
        }

        return result;
    }

    function parseResponse(requestType, responseData,filters)
    {
        var result = null;
        switch (requestType) {
            case 'areaChart':
                result = _.map(responseData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data,'dateNumberArray',filters)};
                });
                break;
            case 'lineChart':
                result = _.map(responseData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data,'dateNumberMultiSeries',filters)};
                });
                break;
            case 'barChart':
                result = _.map(responseData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data,'labelNumberMultiSeries',filters)};
                });
            case 'pieChart':
                result = _.map(responseData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data,'labelNumberMultiSeries',filters)};
                });
                break;
            default:
                break;
        }

        return result;
    }

    function getDemoData(requestType,filters) {
        var serverData = storage.get(requestType);
        var resultData = parseResponse(requestType, serverData,filters);

        return $q.resolve({data: resultData});
    }

    function getLiveData(requestType, filters)
    {
        var requestParams ={};
        switch (requestType) {
            case 'areaChart':

                break;
            case 'lineChart':
                requestParams = {reportType : '1', reportInputFilter:{fromDay : '20151206', toDay:'20160101' },dimension:'count_plays'};
                break;
            case 'barChart':

            case 'pieChart':

                break;
            default:
                break;
        }

        return kanAPIFacade.doRequest(requestParams, {service:'report',action:"getGraphs"}).then(function(result)
        {
            var resultData = parseResponse(requestType, result.data,filters);
            return $q.resolve({data: resultData})
        });
    }

    function getData(origin, requestType,filters)
    {
        if (origin === 'live')
        {
            return getLiveData(requestType,filters);
        }else
        {

            return getDemoData(requestType,filters);
        }
    }

    self.getData = getData;
    self.getDemoData = getDemoData;
}

