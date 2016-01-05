'use strict';

module.exports = function ($http, $q, $location, SessionInfo,$httpParamSerializer) {
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
     * @param request 	request params
     * @returns	promise object
     */
    KApi.doRequest = function doRequest (request,options) {
        // Creating a deferred object
        var deferred = $q.defer();
        // add required params
        request.ks = SessionInfo.ks;
        var method = "post";
        var sParams;
        var params;
        if (KApi.IE < 10) {
            request['callback'] = 'JSON_CALLBACK';
            request['format'] = '9';
            params = request;
            method = 'jsonp';
        }
        else {
            params = {'format' : '1'};
            sParams = this.serializeParams(request);
        }

        // TODO - use options service=report&action=getGraphs
        var url = "https://www.kaltura.com/api_v3/index.php";
        if (options)
        {
            var qs = $httpParamSerializer(options);
            url = url + '?' + qs;
        }

        $http({
            data: sParams,
            url: url,
            method: method,
            params: params,
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
                    deferred.resolve({data : data});
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
