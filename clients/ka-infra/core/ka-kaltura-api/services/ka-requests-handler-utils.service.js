'use strict';

module.exports = function ($http, $q, kaKMCConfig, $httpParamSerializer, kAppConfig) {

    var self = this;
    var isIE = (!!window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;


    /**
     * format params as &key1=val1&key2=val2
     * @param params
     * @returns {String}
     */
    function serializeParams(params, parentKey) {
        var s = '';
        for (var key in params) {
            var value = params[key];

            if (s) {
                s += '&';
            }
            if (angular.isObject(value)) {
                s += serializeParams(value, key);
            } else {
                if (parentKey) {
                    s += parentKey + ':' + key + '=' + value;

                } else {
                    s += key + '=' + value;

                }
            }
        }
        return s;
    };


    function invokeAPIRequest(requestParams,queryParams) {


        // Creating a deferred object
        var deferred = $q.defer();

        var parsedRequestParams;
        var method;

        if (isIE < 10) {
            method = 'jsonp';
            parsedRequestParams = $.extend(true, {}, requestParams, {
                ks: kaKMCConfig.ks,
                'callback': 'JSON_CALLBACK',
                'format': '9'
            });
        }
        else {
            method = "post";
            parsedRequestParams = $.extend(true, {}, requestParams, {
                ks: kaKMCConfig.ks,
                'format': '1'
            });
        }

        var url = kAppConfig.server.apiUri;
        if (queryParams)
        {
            url += '?' + $httpParamSerializer(queryParams);
        }

        $http({
            data: (method === 'post' ? serializeParams(parsedRequestParams) : null),
            url: url,
            method: method,
            params: (method === 'jsonp' ? parsedRequestParams : null),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status) {
            if (data.objectType === "KalturaAPIException") {
                if (data.code == "INVALID_KS") {
                    // TODO
                    deferred.reject({error: 'invalid-ks', errorMessage: 'Invalid partner KS'});
                }
                else {
                    var errorMessage = data.message || 'Failed to invoke request';
                    deferred.reject({error: 'failed-to-invoke-api-request',errorMessage: data.message});
                }
            }
            else {
                deferred.resolve({data: data});
            }
        }).error(function (data, status) {
            var errorMessage = (data ? data.message : '') || 'unkown error';
            console.log(errorMessage);
            deferred.reject({errorMessage: errorMessage});
        });

        // Returning the promise object
        return deferred.promise;
    }

    self.invokeAPIRequest = invokeAPIRequest;
};
