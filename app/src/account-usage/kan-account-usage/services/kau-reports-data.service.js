"use strict";

module.exports = function($q, kaAPIFacade, kauReportsConfiguration)
{
    var self = this;
    var requireFiltersProperties = ["reportType","date.startDate","date.endDate"];
    var cachedReportsConfiguration;

    function getReportCSVUri(filters)
    {
        if (filters && _.every(requireFiltersProperties, _.partial(_.has,filters))) {
            var requestParams = {
                reportType: filters.reportType,
                reportTitle : 'kaltura',
                reportInputFilter: {fromDay: moment(filters.date.startDate).format('YYYYMMDD'), toDay: moment(filters.date.endDate).format('YYYYMMDD')}
            };

            return kaAPIFacade.invoke('report','getUrlForReportAsCsv',requestParams);
        }else
        {
            return $q.reject({errorMessage: 'get report csv uri was invoked with partial/missing required filters'});

        }
    }

    function getReportData(filters)
    {
        if (filters && _.every(requireFiltersProperties, _.partial(_.has,filters))) {
            var requestParams = {
                reportType: filters.reportType,
                reportInputFilter: {fromDay: moment(filters.date.startDate).format('YYYYMMDD'), toDay: moment(filters.date.endDate).format('YYYYMMDD')}
            };

            return kaAPIFacade.invoke('report','getTable',requestParams);
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

