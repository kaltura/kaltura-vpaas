"use strict";



module.exports = function(kAPIResponseDescriptor, kFormatterUtils)
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
        // TODO this function can be improved in respect to performance. should be handled after we will cover more scenarios
        var result = response;
        var responseKey = generateItemKey(context);

        var descriptor = descriptorsMapping[responseKey];

        // check for existance of descriptor matching the response provided
        if (descriptor && descriptor.response.type === 'header-data')
        {
            // has response descriptor, use it to parse the response while handling properties types

            // convert header/data properties into object { header : data_value }
            var headers = _.words(response.header, /[^,]+/g);
            result = _.chain(response.data).words(/[^;]+/g).compact().map(function (item) {
                var result = _.zipObject(headers,_.words(item, /[^,]+/g));

                // traverse on result properties and handle known properties types
                _.forIn(result,function(value,key,obj)
                {
                    var fieldDescriptor =_.find(descriptor.response.fields,function (item)
                    {
                        return item.indexOf(key + ',') ===0;
                    });

                    if (fieldDescriptor)
                    {
                        var descriptorToken = fieldDescriptor.split(',');
                        var type = descriptorToken[1];
                        var format = descriptorToken.length >= 3 ? descriptorToken[2] : null;
                        obj[key] =kFormatterUtils.parseByType(value, type, format);
                    }
                });

                return result;

            }).value();

        }
        return result;
    }

    self.parse = parse;

    createOptimizedMapping();
};

