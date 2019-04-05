"use strict";


module.exports = function()
{
    function controller(kauReportsData, $timeout)
    {
        var self = this;
        var sections = [];
        var requiredReportConfigParameters =["reportId", "data.reportType"];
        var areAllSectionsLoaded = false;

        function notifyOnEvent(name, context)
        {
            _.forEach(sections,function(section)
            {
                if (section.on)
                {
                    section.on.call(null,name,context);
                }
            });
        }

        function updateStatus(statusType, context)
        {
            switch (statusType)
            {
                case "error":
                    self.reportStatus.errorMessage = context.errorMessage;
                    break;
                case "loading":
                    self.reportStatus.isLoading = context.isLoading;
                    break;
            }
        }

        function loadData() {
            if (!areAllSectionsLoaded)
            {
                return;
            }

            self.reportStatus.isLoading = true;
            self.reportStatus.errorMessage = '';


            var filters = { reportType : self.reportConfig.data.reportType, interval: self.reportConfig.data.interval };

            _.forEach(sections,function(section)
            {
                if (section.assignFilters)
                {
                    section.assignFilters.call(section,filters);
                }
            });

            kauReportsData.getReportData(filters).then(function (result) {

                self.reportData = result.data;
                self.reportStatus.hasData = true;

                _.forEach(sections,function(section)
                {
                    if (section.loadReportData)
                    {
                        section.loadReportData.call(section, result.data);
                    }
                });

                self.reportStatus.isLoading = false;
            }, function (reason) {
                self.reportData = null;
                self.reportStatus.hasData = false;
                self.reportStatus.errorMessage = "Failed to load data : '" + reason.errorMessage + "'";
                self.reportStatus.isLoading = false;
            });
        }

        function clearReportData()
        {
            self.reportData = null;

            _.forEach(sections,function(section)
            {
                if (section.loadReportData)
                {
                    section.loadReportData.call(section, self.reportData);
                }
            });
        }

        function addSection(section)
        {
            sections.push(section);

            // extend section api with functions that can trigger report actions
            $.extend(section,{refreshReport : loadData, clearReportData:clearReportData});

            // wait until all sections were added to load data
            if (sections.length=== self.reportConfig.sections.length)
            {
                $timeout(function()
                {
                    areAllSectionsLoaded = true;

                    // Loads the report data after all sections where registered in the next digest cycle
                    // TODO - should use more common technique.
                    loadData();
                },200);

            }
        }

        function buildReport(reportId)
        {
            var kauReportsConfiguration = kauReportsData.getReportsConfiguration();
            var reportConfig = _.find(kauReportsConfiguration,{reportId : reportId});

            if (reportConfig && _.every(requiredReportConfigParameters, _.partial(_.has, reportConfig)))
            {
                self.reportConfig = reportConfig;
            }else
            {
                console.error('Report configuration with id "' + reportId + '" is missing or has missing required information');
            }
        }

        function shouldShow(section,type)
        {
            if (section.type !== type)
            {
                return false;
            }

            return true;
        }

        self.reportStatus = {
            isLoading : true,
            errorMessage : '',
            hasData : false
        };

        self.reportData = null;
        self.reportConfig = [];
        self.reportId = '';

        self.shouldShow = shouldShow;
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
templateUrl: 'kau-reports/directives/kau-report.html',
        controller: controller,
        controllerAs : 'vm'
    }

}
