"use strict";

var moment = require('moment');

module.exports = function($q, kaKalturaAPIFacade, kauReportsConfiguration)
{
    var self = this;
    var requireFiltersProperties = ["reportType","date.startDate","date.endDate"];
    var cachedReportsConfiguration;
    var cachedReportsData = {};

    function getReportCSVUri(filters)
    {
        if (filters && _.every(requireFiltersProperties, _.partial(_.has,filters))) {
            var requestParams = {
                reportType: filters.reportType,
                reportTitle : 'kaltura',
                reportInputFilter: {fromDay: moment(filters.date.startDate).format('YYYYMMDD'), toDay: moment(filters.date.endDate).format('YYYYMMDD')}
            };

            return kaKalturaAPIFacade.invoke('report','getUrlForReportAsCsv',requestParams);
        }else
        {
            return $q.reject({errorMessage: 'get report csv uri was invoked with partial/missing required filters'});

        }
    }

    function isValidCachedResponse(cachedItem)
    {
        if (cachedItem)
        {
            return cachedItem.expirationDate.isAfter(moment());
        }

        return false;
    }

    function getReportData(filters)
    {
        if (filters && _.every(requireFiltersProperties, _.partial(_.has,filters))) {
            var deferred = $q.defer();

            var requestParams = {
                reportType: filters.reportType,
                reportInputFilter: {interval: filters.interval ,fromDay: moment(filters.date.startDate).format('YYYYMMDD'), toDay: moment(filters.date.endDate).format('YYYYMMDD')}
            };

            var cacheKey = JSON.sortify(requestParams);
            var cachedResponse = cachedReportsData[cacheKey];
            if (isValidCachedResponse(cachedResponse))
            {
                console.log('loading response from cache (cached data expires ' + cachedResponse.expirationDate.fromNow() + ')');
                deferred.resolve(cachedResponse.response);
            }else {
                cachedReportsData[cacheKey] = null;

                kaKalturaAPIFacade.invoke('report', 'getTable', requestParams).then(function (result) {
                    var cachedResponseItem = {response : result, expirationDate : moment().add(1,'h')};
                    console.log('added response to cache (cached data expires ' + cachedResponseItem.expirationDate.fromNow() + ')');
                    cachedReportsData[cacheKey] = cachedResponseItem;
                    deferred.resolve(result);
                    }, function (reason) {
                        deferred.reject(reason);
                    }
                );
            }

            return deferred.promise;
        }else
        {
            return $q.reject({errorMessage: 'get report was invoked with partial/missing required filters'});

        }
    }

    function getReportsConfiguration()
    {
        if (cachedReportsConfiguration)
        {
            return cachedReportsConfiguration;
        }

        cachedReportsConfiguration = _.chain(kauReportsConfiguration).value();

        return cachedReportsConfiguration;
    }

    self.getReportCSVUri = getReportCSVUri;
    self.getReportData = getReportData;
    self.getReportsConfiguration = getReportsConfiguration;



};

