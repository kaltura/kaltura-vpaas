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
                type: 'filters'
            },
            {
                type: 'diagnostic'
            },
            {
                type: 'barChart'
            },
            {
                type: 'table',
                options: {
                    title: 'Monthly Usage Breakdown',
                    order: '-month_id',
                    fields : [{name : 'month_id', type : 'date', format: 'YYYYMM', title : 'Month'},{name : 'total_plays', type : 'number', format : ',',  title : 'Plays (CPM)'}]
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
