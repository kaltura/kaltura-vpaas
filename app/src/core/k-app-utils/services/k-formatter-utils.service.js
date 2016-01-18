"use strict";

module.exports = function()
{
    var self = this;

    function formatByType(input, type,format)
    {
        var result = input;
        if (input && type) {
            switch (type) {
                case 'date':
                    if (format) {
                        result = moment(input, format);
                    }
                    break;
                case 'number':
                    result = parseFloat(input);
                    break;
                default:
                    break;
            }
        }

        return result;
    }

    self.formatByType = formatByType;
};
