"use strict";


module.exports = function($q, kAPIRequestsHandler)
{
    var handlerInfo = {service: 'report', action: 'getUrlForReportAsCsv'};

    function RequestHandler() {
        var self = this;
        var requiredProperties = ['headers'];
        var defaultRequestData = {
            pager: {pageIndex: 1, pageSize: 1000}
        }


        /*
         action:getUrlForReportAsCsv
         callback:angular.callbacks._1
         format:9
         headers:;month,plays,bandwidth,avg_storage,transcoding,entries,users
         ks:ZWYyYjM2NDM1MGQ0NzZiNmU1OWNhNjljZTQ3MDNiYTc2ZmE1YTc4Znw5MzE3MDI7OTMxNzAyOzE0NTMyODEwNTM7MjsxNDUzMTk0NjUzLjk5NTI7dGtlbGx5QHdlYXRoZXJuYXRpb250di5jb207KixkaXNhYmxlZW50aXRsZW1lbnQ7Ow
         pager:objectType:KalturaFilterPager
         pager:pageIndex:1
         pager:pageSize:1
         reportInputFilter:fromDay:20151101
         reportInputFilter:objectType:KalturaReportInputFilter
         reportInputFilter:timeZoneOffset:-120
         reportInputFilter:toDay:20160119
         reportText:
         reportTitle:Usage report
         reportType:26
         service:report
         */

        function prepareRequestData(data) {
            var result = _.defaultsDeep({}, defaultRequestData, data);
            return result;
        }

        function validateRequestData(data) {
            return { valid : true};
        }

        function invokeRequest(data)
        {
            var deferred = $q.defer();

            var requestValidation = validateRequestData(data)

            if (requestValidation.valid)
            {
                var parsedRequestData = prepareRequestData(data);

                kAPIRequestsHandler
            }else
            {
                deferred.reject({error: 'k-api-request-data-invalid'});
            }
            return $q.promise;

        }

        self.validateRequestData = validateRequestData;
        self.prepareRequestData = prepareRequestData;
    }

    kAPIRequestsHandler.registerHandler(handlerInfo,RequestHandler);
};
