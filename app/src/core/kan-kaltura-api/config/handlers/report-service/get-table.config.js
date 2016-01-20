"use strict";


module.exports = function(kaAPIFacadeProvider)
{
    var handlerInfo = {service: 'report', action: 'getTable'};

    function RequestHandler($q, kaRequestsHandlerUtils, kFormatterUtils) {
        var self = this;

        var responseDescriptor = {
            fields :[
                'month_id,date,YYYYMM',
                'total_plays,number',
                'bandwidth_gb,number',
                'avg_storage_gb,number',
                'transcoding_gb,number',
                'total_media_entries,number',
                'total_end_users,number'
            ]
        };
        var defaultRequestData = {
            pager: {pageIndex: 1, pageSize: 1}
        }

        function prepareRequestData(requestParams) {
            var result = _.defaultsDeep({}, defaultRequestData, requestParams);
            return result;
        }

        function validateRequestData(requestParams) {
            return { valid : true};
        }

        function handleRequest(requestParams)
        {
            var deferred = $q.defer();

            var requestValidation = validateRequestData(requestParams)

            if (requestValidation.valid)
            {
                var parsedRequestData = prepareRequestData(requestParams);

                kaRequestsHandlerUtils.invokeAPIRequest(parsedRequestData,handlerInfo).then(function(result)
                {
                    // convert header/data properties into object { header : data_value }
                    var headers = _.words(result.data.header, /[^,]+/g);
                    result = _.chain(result.data.data).words(/[^;]+/g).compact().map(function (item) {
                        var result = _.zipObject(headers, _.words(item, /[^,]+/g));

                        // traverse on result properties and handle known properties types
                        _.forIn(result, function (value, key, obj) {
                            var fieldDescriptor = _.find(responseDescriptor.fields, function (item) {
                                return item.indexOf(key + ',') === 0;
                            });

                            if (fieldDescriptor) {
                                var descriptorToken = fieldDescriptor.split(',');
                                var type = descriptorToken[1];
                                var format = descriptorToken.length >= 3 ? descriptorToken[2] : null;
                                obj[key] = kFormatterUtils.parseByType(value, type, format);
                            }
                        });

                        return result;

                    }).value();

                    deferred.resolve({data : result});
                },function(reason)
                {
                    deferred.reject(reason);
                });

            }else
            {
                deferred.reject({error: 'k-api-request-data-invalid'});
            }

            return deferred.promise;

        }

        self.handleRequest = handleRequest;
        self.validateRequestData = validateRequestData;
        self.prepareRequestData = prepareRequestData;
    }

    kaAPIFacadeProvider.registerHandler(handlerInfo,RequestHandler);
};
