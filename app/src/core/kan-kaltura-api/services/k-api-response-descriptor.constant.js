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
                {
                    name : 'month_id',
                    type : 'date',
                    format : 'YYYYMM'
                },
                {
                    name : 'total_plays',
                    type : 'number',
                    format : 'float'
                }
            ]
        }

    }
] ;

module.exports = descriptor;
