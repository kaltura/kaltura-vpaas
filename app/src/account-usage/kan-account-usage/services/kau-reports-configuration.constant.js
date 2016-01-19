"use strict";

var repository = [

        {
            reportId: 'overall',
            menu: {title: 'Overall Usage Report', order: 0}
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
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true
                    }
                },
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: {name: 'total_plays', type: 'number', labelFormat: '', title: 'Plays (CPM)'}
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
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
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true
                    }
                },
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showLoading: true
                    }
                },
                {
                    type: 'barChart',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default
                    options: {
                        xValue: {name: 'month_id', type: 'date', labelFormat: 'MMMM, YYYY', title: 'Month'},
                        yValue: {name: 'avg_storage_gb', type: 'number', labelFormat: ',.2f', title: 'Average Storage (GB)'}
                    }
                },
                {
                    type: 'table',
                    showOnLoading: false,
                    showOnError: false,  // todo - should be false by default

                    options: {
                        title: 'Monthly Usage Breakdown',
                        order: '-month_id',
                        fields: [{
                            name: 'month_id',
                            type: 'date',
                            valueFormat: 'MMMM, YYYY',
                            title: 'Month'
                        }, {name: 'avg_storage_gb', type: 'number', valueFormat: ',.2f', title: 'Average Storage (GB)'}]
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
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true
                    }
                },
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
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
                            name: 'bandwidth_gb',
                            type: 'number',
                            labelFormat: ',.2f',
                            title: 'Bandwidth Consumption (GB)'
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
                        fields: [{
                            name: 'month_id',
                            type: 'date',
                            valueFormat: 'MMMM, YYYY',
                            title: 'Month'
                        }, {name: 'bandwidth_gb', type: 'number', valueFormat: ',.2f', title: 'Bandwidth Consumption (GB)'}]
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
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true
                    }
                },
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
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
                            name: 'transcoding_gb',
                            type: 'number',
                            labelFormat: ',.2f',
                            title: 'Transcoding Consumption (GB)'
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
                        fields: [{
                            name: 'month_id',
                            type: 'date',
                            valueFormat: 'MMMM, YYYY',
                            title: 'Month'
                        }, {
                            name: 'transcoding_gb',
                            type: 'number',
                            valueFormat: ',.2f',
                            title: 'Transcoding Consumption (GB)'
                        }]
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
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true
                    }
                },
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
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
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
                        showErrors: true
                    }
                },
                {
                    type: 'filters',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: false,  // todo - should be false by default
                },
                {
                    type: 'status',
                    showOnLoading: true, // todo - should be true by default
                    showOnError: true,
                    options: {
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
        }]
    ;

module.exports = repository;
