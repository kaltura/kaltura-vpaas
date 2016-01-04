
var storage = require('../scripts/kan-samples-repository');

module.exports = function($http,$q)
{

    var self = this;

    function convertToKeyValueArray(data, keyName, valueName,takeTop10) {
        var result = _.chain(data).words(/[^;]+/g).map(function (item) {
            var result = {};

            var token = item.split(',');
            result[keyName] = moment(token[0], 'YYYYMMDD').toDate();
            result[valueName] = parseFloat(token[1]);
            return result;
        });

        if (takeTop10) {
            result = result.take(10);
        }


        return result.value();
    }

    function getDemoData(filters)
    {
        var dataKey = filters ? filters.key : '';

        if (dataKey)
        {
            var serverData = storage.get(dataKey);

            var resultData = _.map(serverData, function (item) {
                return {key: item.id, values: convertToKeyValueArray(item.data, 'x', 'y',filters.takeTop10)};
            });

            return $q.resolve({data : resultData});
        }
    }

    self.getDemoData = getDemoData;
}

