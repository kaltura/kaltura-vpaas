"use strict";


module.exports = function (kAPIResponseDescriptor, kFormatterUtils, $http, $q, $location, SessionInfo, $httpParamSerializer, kAppConfig) {
    var self = this;
    var descriptorsMapping = {};
    var isIE = (!!window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;

    function generateItemKey(item) {
        return item.action + ";" + item.service + ";" + item.reportType;
    }

    function createOptimizedMapping() {
        _.forEach(kAPIResponseDescriptor, function (item) {
            var key = generateItemKey(item.request.params);

            descriptorsMapping[key] = item;
        });
    }

    function parse(response, context) {
        // TODO this function can be improved in respect to performance. should be handled after we will cover more scenarios
        var result = response;
        var responseKey = generateItemKey(context);

        var descriptor = descriptorsMapping[responseKey];

        // check for existance of descriptor matching the response provided
        if (descriptor && descriptor.response.type === 'header-data') {
            // has response descriptor, use it to parse the response while handling properties types

            // convert header/data properties into object { header : data_value }
            var headers = _.words(response.header, /[^,]+/g);
            result = _.chain(response.data).words(/[^;]+/g).compact().map(function (item) {
                var result = _.zipObject(headers, _.words(item, /[^,]+/g));

                // traverse on result properties and handle known properties types
                _.forIn(result, function (value, key, obj) {
                    var fieldDescriptor = _.find(descriptor.response.fields, function (item) {
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

        }
        return result;
    }


    function doRequest(userParams, queryParams) {
        // Creating a deferred object
        var deferred = $q.defer();

        var requestData;
        var method;

        if (isIE < 10) {
            method = 'jsonp';
            requestData = $.extend(true, {}, userParams, {
                ks: SessionInfo.ks,
                'callback': 'JSON_CALLBACK',
                'format': '9'
            });
        }
        else {
            method = "post";
            requestData = $.extend(true, {}, userParams, {
                ks: SessionInfo.ks,
                'format': '1'
            });
        }

        var url = kAppConfig.server.apiUri;
        if (queryParams) {
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
            if (data.objectType === "KalturaAPIException") {
                if (data.code == "INVALID_KS") {
                    // TODO
                    deferred.reject({errorId: 'invalid-ks', errorMessage: 'Invalid partner KS'});
                }
                else {
                    var errorMessage = data.message || 'Failed to invoke request';
                    deferred.reject({errorMessage: data.message});
                }
            }
            else {
                var parserContext = $.extend({}, queryParams, requestData);
                var parsedData = parse(data, parserContext);
                deferred.resolve({data: parsedData});
            }
        }).error(function (data, status) {
            var errorMessage = (data ? data.message : '') || 'unkown error';
            console.log(errorMessage);
            deferred.reject({errorMessage: errorMessage});
        });

        // Returning the promise object
        return deferred.promise;
    };


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

    self.serializeParams = serializeParams;
    self.doRequest = doRequest;
    self.parse = parse;

    createOptimizedMapping();
};

