"use strict";

var descriptor =[
    {
        request : {
            params:
            {
                action:'getTable',
                service:'report',
                reportType:26
            }
        },
        response : {
            type : 'header-data',
            fields :[
                'month_id,date,YYYYMM',
                'total_plays,number',
                'bandwidth_gb,number',
                'avg_storage_gb,number',
                'transcoding_gb,number',
                'total_media_entries,number',
                'total_end_users,number'
            ]
        }

    }
];

module.exports = descriptor;
