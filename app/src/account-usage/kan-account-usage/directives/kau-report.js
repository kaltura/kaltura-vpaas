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

        function notifyLoading(loading)
        {
            self.isLoading = loading;

            notifyOnEvent('report:loading',{isLoading : loading});
        }

        function notifyError(message)
        {
            self.errorMessage = message;

            notifyOnEvent('report:error',{errorMessage : message});
        }


        function loadData() {
            if (!areAllSectionsLoaded)
            {
                return;
            }

            notifyLoading(true);
            notifyError('');

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

                notifyLoading(false);
            }, function (reason) {
                notifyError("Failed to load data : '" + reason.errorMessage + "'");
                notifyLoading(false);
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
                areAllSectionsLoaded = true;

                $timeout(function()
                {
                    // Loads the report data after all sections where registered in the next digest cycle
                    // TODO - should use more common technique.
                    loadData();
                },200);

            }
        }

        function buildReport(reportId)
        {
            var kauReportsConfiguration = kauReportsData.getReportsConfiguration();
            var reportConfig = _.findWhere(kauReportsConfiguration,{reportId : reportId});

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

            if (self.isLoading)
            {
                return section.showOnLoading;
            }

            if (self.errorMessage)
            {
                return section.showOnError;
            }

            return true;
        }

        self.reportData = null;
        self.reportConfig = [];
        self.reportId = '';
        self.isLoading = false; // TODO : default to 'true' so the sections not needed to be seens willl not appear before the first data loading
        self.errorMessage = '';

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
        templateUrl: 'account-usage/kan-account-usage/directives/kau-report.html',
        controller: controller,
        controllerAs : 'vm'
    }

}
