"use strict";

module.exports = function(kaKalturaAPIFacadeProvider)
{
    var handlerInfo = {service: 'report', action: 'getUrlForReportAsCsv'};

    function RequestHandler($q, kaRequestsHandlerUtils) {
        var self = this;

        var defaultRequestData = {
            pager: {pageIndex: 1, pageSize: 1},
            headers:";month,plays,bandwidth,avg_storage,transcoding,entries,users",
            reportText:''
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
                    deferred.resolve({csvUri : result.data});
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

    kaKalturaAPIFacadeProvider.registerHandler(handlerInfo,RequestHandler);
};

