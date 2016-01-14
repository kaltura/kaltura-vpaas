"use strict";

module.exports = function($q, kanAPIFacade, SessionInfo,$sessionStorage)
{
    var self = this;




    function getReportData(reportType, filters)
    {
        // temporary bypass to ks
        SessionInfo.setKs($sessionStorage.ks);

        // currently reportType = 'plays'

        if (filters) {
            var requestParams = {
                reportType: 26,
                pager: {pageIndex: 1, pageSize: 100},
                reportInputFilter: {fromDay: moment(filters.startDate).format('YYYYMMDD'), toDay: moment(filters.endDate).format('YYYYMMDD')}
            };

            return kanAPIFacade.doRequest(requestParams, {
                service: 'report',
                action: 'getTable'
            }).then(function (result) {
                var headers = _.words(result.data.header, /[^,]+/g);
                var items = _.chain(result.data.data).words(/[^;]+/g).compact().map(function (item) {
                    return _.zipObject(headers, _.words(item, /[^,]+/g));
                }).value();

                return {data: items};
            });
        }else
        {
            return $q.reject({errorMessage: 'missing date filter'});

        }
    }

    self.getReportData = getReportData;

};

