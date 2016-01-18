"use strict";



module.exports = function(kAPIResponseDescriptor)
{
    var self = this;
    var descriptorsMapping = {};

    function generateItemKey(item)
    {
        return  item.action + ";" + item.service + ";" + item.reportType;
    }




    function createOptimizedMapping()
    {
        _.forEach(kAPIResponseDescriptor,function(item)
        {
            var key = generateItemKey(item.request.params);

            descriptorsMapping[key] = item;
        });
    }

    function parse(response, context)
    {
        var result = response;
        var responseKey = generateItemKey(context);

        var descriptor = descriptorsMapping[responseKey];

        if (descriptor && descriptor.response.type === 'header-data')
        {
            var headers = _.words(response.header, /[^,]+/g);
            result = _.chain(response.data).words(/[^;]+/g).compact().map(function (item) {
                return _.zipObject(headers, _.words(item, /[^,]+/g));
            }).value();

        }
        return result;
    }

    self.parse = parse;

    createOptimizedMapping();
};

