'use strict';

module.exports = function ($http, $q, $location, SessionInfo,$httpParamSerializer,kAPIResponseParser,kAppConfig) {
    var KApi = {};

    KApi.redirectToLoginOnInvalidKS = true;

    KApi.setRedirectOnInvalidKS = function setRedirectOnInvalidKS(value) {
        KApi.redirectToLoginOnInvalidKS = value;
    }

    KApi.IE = (!!window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;


    KApi.getApiUrl = function getApiUrl() {
        return SessionInfo.service_url + "/api_v3/index.php";
    }


    /**
     * @param userParams 	user request params
     * @returns	promise object
     */
    KApi.doRequest = function doRequest (userParams,queryParams) {
        // Creating a deferred object
        var deferred = $q.defer();

        var requestData;
        var method;

        if (KApi.IE < 10) {
            method = 'jsonp';
            requestData = $.extend(true,{},userParams,{
                ks : SessionInfo.ks,
                'callback' : 'JSON_CALLBACK',
                'format' : '9'
            });
        }
        else {
            method = "post";
            requestData = $.extend(true,{},userParams,{
                ks : SessionInfo.ks,
                'format' : '1'
            });
        }

        var url = kAppConfig.server.apiUri;
        if (queryParams)
        {
            var qs = $httpParamSerializer(queryParams);
            url = url + '?' + qs;
        }

        $http({
            data: (method === 'post' ? this.serializeParams(requestData) : null),
            url: url,
            method: method,
            params: (method === 'jsonp' ? requestData : null),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status) {
            if (KApi.redirectToLoginOnInvalidKS) {
                if (data.objectType === "KalturaAPIException") {
                    if (data.code == "INVALID_KS") {
                      // TODO
                        deferred.reject({errorId : 'invalid-ks', errorMessage : 'Invalid partner KS'});
                    }
                    else {
                        deferred.reject({ errorMessage : data.message});
                    }
                }
                else {
                    var parserContext = $.extend({},queryParams,requestData);
                    var parsedData = kAPIResponseParser.parse(data,parserContext);
                    deferred.resolve({data : parsedData});
                }
            }
            else {
                deferred.resolve({data : data});
            }
        }).error(function(data, status) {
            console.log(data);
            deferred.reject({ errorMessage : data.message});
        });

        // Returning the promise object
        return deferred.promise;
    };


    /**
     * format params as &key1=val1&key2=val2
     * @param params
     * @returns {String}
     */
    KApi.serializeParams = function serializeParams(params, parentKey) {
        var s = '';
        for (var key in params) {
            var value = params[key];

            if (s)
            {
                s += '&';
            }
            if (angular.isObject(value))
            {
                s += serializeParams(value,key);
            }else {
                if (parentKey)
                {
                    s +=  parentKey + ':' + key + '=' + value;

                }else
                {
                    s +=  key + '=' + value;

                }
            }
        }
        return s;
    };


    KApi.getExportHandlerUrl = function getExportHandlerUrl() {
        var url = $location.absUrl();
        url = url.substring(0, url.indexOf('#/'));
        url += "#/export/[id]/[ks]";
        return url;
    }

    return KApi;
};
