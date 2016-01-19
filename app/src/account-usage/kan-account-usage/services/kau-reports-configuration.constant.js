"use strict";

var repository = [

    {
        reportId: 'overall',
        menu: {title: 'Overall Usage Report',order: 0}
    },
    {
        reportId: 'play',
        menu: {
            title: 'Plays Report',
            order: 0,
        },
        data: {
            reportType: 26
        },
        sections: [
            {
                type: 'diagnostic',
                showOnLoading : true, // todo - should be true by default
                showOnError : true
            },
            {
                type: 'status',
                showOnLoading : true, // todo - should be true by default
                showOnError : true,
                options: {
                    showErrors : true
                }
            },
            {
                type: 'filters',
                showOnLoading : true, // todo - should be true by default
                showOnError : false,  // todo - should be false by default
            },
            {
                type: 'status',
                showOnLoading : true, // todo - should be true by default
                showOnError : true,
                options: {
                    showLoading : true
                }
            },
            {
                type: 'barChart',
                showOnLoading : false,
                showOnError : false,  // todo - should be false by default
                options: {
                    xValue : {name : 'month_id', type : 'date', format: 'MMMM, YYYY', title : 'Month'},
                    yValue : {name : 'total_plays', type : 'number',  title : 'Plays (CPM)'}
                }
            },
            {
                type: 'table',
                showOnLoading : false,
                showOnError : false,  // todo - should be false by default

                options: {
                    title: 'Monthly Usage Breakdown',
                    order: '-month_id',
                    fields : [{name : 'month_id', type : 'date', format: 'MMMM, YYYY', title : 'Month'},{name : 'total_plays', type : 'number', format : ',',  title : 'Plays (CPM)'}]
                }
            }
        ]
    },
    {
        reportId: 'storage',
        menu: {title: 'Storage Report', order: 0}
    },
    {
        reportId: 'bandwidth',
        menu: {title: 'Bandwidth Report', order: 0}
    },
    {
        reportId: 'transcoding',
        menu: {title: 'Transcoding Consumption Report', order: 0}
    },
    {
        reportId: 'media',
        menu: {title: 'Media Entries Report', order: 0}
    },
    {
        reportId: 'users',
        menu: {title: 'End Users Report', order: 0}
    }]
;

module.exports = repository;
