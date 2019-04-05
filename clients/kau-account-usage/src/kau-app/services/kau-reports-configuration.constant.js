"use strict";

var repository = [

        {
            reportId: 'overall',
            menu: {title: 'Overall Usage Report', order: 0},
            data: {
                reportType: 26
            },
            sections: [

                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                    options: {
                        title: 'Month to Date Usage Summary'

                    }
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'totals',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        fields: [
                            {
                                name: 'total_plays',
                                type: 'number',
                                valueFormat: ',',
                                title: 'Plays (CPM)'
                            },
                            {
                                name: 'avg_storage_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Average Storage (GB)'
                            },
                            {
                                name: 'average_storage',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Average Storage (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'transcoding_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Transcoding Consumption (GB)'
                            },
                            {
                                name: 'transcoding_consumption',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Transcoding Consumption (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'bandwidth_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Bandwidth Consumption (GB)'
                            },
                            {
                                name: 'bandwidth_consumption',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Bandwidth Consumption (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'total_media_entries',
                                type: 'number',
                                valueFormat: ',',
                                title: 'Media Entries'
                            }, {
                                name: 'total_end_users',
                                type: 'number',
                                valueFormat: ',',
                                title: 'End Users'
                            }
                        ]
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width: '100%',
                        fields: [
                            {
                                name: 'month_id',
                                type: 'date',
                                valueFormat: 'MMMM, YYYY',
                                title: 'Month'
                            },
                            {
                                name: 'total_plays',
                                type: 'number',
                                valueFormat: ',',
                                title: 'Plays (CPM)'
                            },
                            {
                                name: 'avg_storage_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Average Storage (GB)'
                            },
                            {
                                name: 'average_storage',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Average Storage (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'transcoding_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Transcoding Consumption (GB)'
                            },
                            {
                                name: 'transcoding_consumption',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Transcoding Consumption (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'bandwidth_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Bandwidth Consumption (GB)'
                            },
                            {
                                name: 'bandwidth_consumption',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Bandwidth Consumption (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'total_media_entries',
                                type: 'number',
                                valueFormat: ',',
                                title: 'Media Entries'
                            }, {
                                name: 'total_end_users',
                                type: 'number',
                                valueFormat: ',',
                                title: 'End Users'
                            }
                        ]
                    }
                }
            ]
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
                //{
                //    type: 'diagnostic',
                //    showOnLoading: true, // todo - should be true by default
                //    showOnError: true
                //},
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                    options: {
                        filters : {
                            dateRange : true
                        }
                    }
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: {name: 'total_plays', type: 'number', labelFormat: ',', title: 'Plays (CPM)'}
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width : '50%',
                        fields: [{
                            name: 'month_id',
                            type: 'date',
                            valueFormat: 'MMMM, YYYY',
                            title: 'Month'
                        }, {name: 'total_plays', type: 'number', valueFormat: ',', title: 'Plays (CPM)'}]
                    }
                }
            ]
        },
        {
            reportId: 'storage',
            menu: {title: 'Storage Report', order: 0},
            data: {
                reportType: 26
            },
            sections: [
                //{
                //    type: 'diagnostic',
                //    showOnLoading: true, // todo - should be true by default
                //    showOnError: true
                //},
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                    options: {
                        filters : {
                            dateRange : true
                        }
                    }
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: [
                            {
                                name: 'average_storage',
                                type: 'number',
                                labelFormat: ',.0f',
                                title: 'Average Storage (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'avg_storage_gb',
                                type: 'number',
                                labelFormat: ',.0f',
                                title: 'Average Storage (GB)'
                            },
                        ]
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width : '50%',
                        fields: [
                            {
                                name: 'month_id',
                                type: 'date',
                                valueFormat: 'MMMM, YYYY',
                                title: 'Month'
                            },
                            {
                                name: 'avg_storage_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Average Storage (GB)'
                            },
                            {
                                name: 'average_storage',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Average Storage (GB)',
                                conversion: 'mb_gb'
                            }
                        ]
                    }
                }
            ]
        },
        {
            reportId: 'bandwidth',
            menu: {title: 'Bandwidth Report', order: 0},
            data: {
                reportType: 26
            },
            sections: [
                //{
                //    type: 'diagnostic',
                //    showOnLoading : true, // todo - should be true by default
                //    showOnError : true
                //},

                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                    options: {
                        filters : {
                            dateRange : true
                        }
                    }
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: [
                            {
                                name: 'bandwidth_consumption',
                                type: 'number',
                                labelFormat: ',.0f',
                                title: 'Bandwidth Consumption (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'bandwidth_gb',
                                type: 'number',
                                labelFormat: ',.0f',
                                title: 'Bandwidth Consumption (GB)'
                            },
                        ]
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width : '50%',
                        fields: [
                            {
                                name: 'month_id',
                                type: 'date',
                                valueFormat: 'MMMM, YYYY',
                                title: 'Month'
                            },
                            {
                                name: 'bandwidth_consumption',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Bandwidth Consumption (GB)',
                                conversion: 'mb_gb'
                            },
                            {
                                name: 'bandwidth_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                title: 'Bandwidth Consumption (GB)'
                            }
                        ]
                    }
                }]
        },
        {
            reportId: 'transcoding',
            menu: {title: 'Transcoding Consumption Report', order: 0},
            data: {
                reportType: 26
            },
            sections: [
                //{
                //    type: 'diagnostic',
                //    showOnLoading : true, // todo - should be true by default
                //    showOnError : true
                //},
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                    options: {
                        filters : {
                            dateRange : true
                        }
                    }
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: [
                            {
                                name: 'transcoding_consumption',
                                type: 'number',
                                labelFormat: ',.0f',
                                conversion: 'mb_gb',
                                title: 'Transcoding Consumption (GB)'
                            },
                            {
                                name: 'transcoding_gb',
                                type: 'number',
                                labelFormat: ',.0f',
                                conversion: 'mb_gb'
                            },
                        ]
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width: '100%',
                        fields: [
                            {
                                name: 'month_id',
                                type: 'date',
                                valueFormat: 'MMMM, YYYY',
                                title: 'Month'
                            },
                            {
                                name: 'transcoding_consumption',
                                type: 'number',
                                valueFormat: ',.2f',
                                conversion: 'mb_gb',
                                title: 'Transcoding Consumption (GB)'
                            },
                            {
                                name: 'transcoding_gb',
                                type: 'number',
                                valueFormat: ',.2f',
                                conversion: 'mb_gb'
                            },
                        ]
                    }
                }]
        },
        {
            reportId: 'media',
            menu: {title: 'Media Entries Report', order: 0},
            data: {
                reportType: 26
            },
            sections: [
                //{
                //    type: 'diagnostic',
                //    showOnLoading : true, // todo - should be true by default
                //    showOnError : true
                //},
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                    options: {
                        filters : {
                            dateRange : true
                        }
                    }
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: {
                            name: 'total_media_entries',
                            type: 'number',
                            labelFormat: ',',
                            title: 'Total'
                        }
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width : '50%',

                        fields: [{
                            name: 'month_id',
                            type: 'date',
                            valueFormat: 'MMMM, YYYY',
                            title: 'Month'
                        }, {
                            name: 'total_media_entries',
                            type: 'number',
                            valueFormat: ',',
                            title: 'Total'
                        }]
                    }
                }]
        },
        {
            reportId: 'users',
            menu: {title: 'End Users Report', order: 0},
            data: {
                reportType: 26
            },
            sections: [
                //{
                //    type: 'diagnostic',
                //    showOnLoading : true, // todo - should be true by default
                //    showOnError : true
                //},
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                    options: {
                        filters : {
                            dateRange : true
                        }
                    }
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: {
                            name: 'total_end_users',
                            type: 'number',
                            labelFormat: ',',
                            title: 'Total'
                        }
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width : '50%',

                        fields: [{
                            name: 'month_id',
                            type: 'date',
                            valueFormat: 'MMMM, YYYY',
                            title: 'Month'
                        }, {
                            name: 'total_end_users',
                            type: 'number',
                            valueFormat: ',',
                            title: 'Total'
                        }]
                    }
                }]
        },
        {
            reportId: 'entries',
            menu: {title: 'Peak Entries Report', order: 0},
            data: {
                reportType: 27,
                interval: 'months',
            },
            sections: [
                {
                    type: 'filters',
                    showOnLoading: true,
                    showOnError: false,
                    options: {
                        filters : {
                            dateRange : true
                        }
                    }
                },
                {
                    type: 'status',
                    showOnLoading: true,
                    showOnError: true,
                    options: {
                        showErrors: true,
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: {
                            name: 'peak_entries',
                            type: 'number',
                            labelFormat: ',',
                            title: 'Peak'
                        }
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,
                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        width : '50%',

                        fields: [{
                            name: 'month_id',
                            type: 'date',
                            valueFormat: 'MMMM, YYYY',
                            title: 'Month'
                        }, {
                            name: 'peak_entries',
                            type: 'number',
                            valueFormat: ',',
                            title: 'Peak'
                        }]
                    }
                }]
        }]
    ;

module.exports = repository;
