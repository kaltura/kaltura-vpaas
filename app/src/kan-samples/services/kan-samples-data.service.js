var storage = require('../scripts/kan-samples-repository');

module.exports = function ($http, $q) {

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

    function getDemoData(filters) {
        var dataKey = filters ? filters.key : '';

        var resultData = null;
        var serverData = storage.get(dataKey);

        switch (dataKey) {
            case 'areaChart':
                resultData = _.map(serverData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data,'dateNumberArray',filters)};
                });
                break;
            case 'lineChart':
                resultData = _.map(serverData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data,'dateNumberMultiSeries',filters)};
                });
                break;
            case 'barChart':
                resultData = _.map(serverData, function (item) {
                    return {key: item.id, values: convertAPIDataToKeyValueArray(item.data,'labelNumberMultiSeries',filters)};
                });
            default:
                break;
        }

        return $q.resolve({data: resultData});

    }

    self.getDemoData = getDemoData;
}

