"use strict";

module.exports = function(kanAPIFacade, SessionInfo,$sessionStorage)
{
    var self = this;




    function getReportData(reportType)
    {
        // temporary bypass to ks
        SessionInfo.setKs($sessionStorage.ks);

        // currently reportType = 'plays'

        var requestParams = {
            reportType: 26,
            pager: {pageIndex:1, pageSize:100},
            reportInputFilter: {fromDay: '20151001', toDay: '20151231'}
        };

        return kanAPIFacade.doRequest(requestParams, {service : 'report', action : 'getTable'}).then(function(result)
        {
            var headers = _.words(result.data.header,/[^,]+/g);
            var items = _.chain(result.data.data).words(/[^;]+/g).compact().map(function(item)
            {
                return _.zipObject(headers,_.words(item,/[^,]+/g));
            }).value();

            return { data : items};
        });
    }

    self.getReportData = getReportData;

};

