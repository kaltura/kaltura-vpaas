"use strict";


module.exports = function()
{
    function controller($scope, kauReportsData, kauReportsConfiguration)
    {
        var self = this;
        var sections = [];
        var requiredReportConfigParameters =["reportId", "data.reportType"];

        function loadData() {
            self.isLoading = true;

            var filters = { reportType : self.reportConfig.data.reportType };
            _.forEach(sections,function(section)
            {
                if (section.assignFilters)
                {
                    section.assignFilters.call(section,filters);
                }
            });

            kauReportsData.getReportData(filters).then(function (result) {

                self.reportData = result.data;

                _.forEach(sections,function(section)
                {
                    if (section.loadReportData)
                    {
                        section.loadReportData.call(section, result.data);
                    }
                });

                self.errorMessage = '';
                self.isLoading = false;
            }, function (reason) {
                self.errorMessage = "Failed to load data : '" + reason.errorMessage + "'";
                self.isLoading = false;
            });
        }

        function addSection(section)
        {
            sections.push(section);

            // extend section api with functions that can trigger report actions
            $.extend(section,{refreshReport : loadData});

            // wait until all sections were added to load data
            if (sections.length=== self.reportConfig.sections.length)
            {
                loadData();
            }
        }

        function buildReport(reportId)
        {
            var reportConfig = _.findWhere(kauReportsConfiguration,{reportId : reportId});

            if (reportConfig && _.every(requiredReportConfigParameters, _.partial(_.has, reportConfig)))
            {
                self.reportConfig = reportConfig;
            }else
            {
                console.error('Report configuration with id "' + reportId + '" is missing or has missing required information');
            }
        }

        self.reportData = null;
        self.reportConfig = [];
        self.reportId = '';
        self.errorMessage = "";
        self.isLoading = false;

        self.addSection = addSection;
        self.buildReport = buildReport;
        self.loadData = loadData;

    }

    function link(scope,element,attrs,ctrl)
    {
        ctrl.buildReport(attrs.kauReport);

    }

    return {
        restrict : 'A',
        scope : {},
        link : link,
        templateUrl: 'account-usage/kan-account-usage/directives/kau-report.html',
        controller: controller,
        controllerAs : 'vm'
    }

}
