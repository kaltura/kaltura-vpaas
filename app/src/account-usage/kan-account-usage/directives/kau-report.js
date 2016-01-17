"use strict";


module.exports = function()
{
    function controller($scope, kauReportsData, kauReportsConfiguration)
    {
        var self = this;
        var sections = [];

        function loadData() {
            self.isLoading = true;

            var filters = {};
            _.forEach(sections,function(section)
            {
                if (section.assignFilters)
                {
                    section.assignFilters.call(section,filters);
                }
            });

            kauReportsData.getReportData('plays', filters).then(function (result) {

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

        function registerSection(section)
        {
            sections.push(section);

            if (sections.length=== self.reportConfig.sections.length)
            {
                loadData();
            }
        }

        function buildReport(reportId)
        {
            self.reportConfig = _.findWhere(kauReportsConfiguration,{reportId : reportId});
        }

        self.reportData = null;
        self.reportConfig = [];
        self.reportId = '';
        self.errorMessage = "";
        self.isLoading = false;

        self.registerSection = registerSection;
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
