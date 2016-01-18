"use strict";

module.exports = function()
{
    var self = this;

    function parseByType(input,type,format)
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

    function formatByType(input, type,format)
    {
        var result = input;
        if (input && type) {
            switch (type) {
                case 'date':
                    if (format) {
                        result = moment(input).format(format);
                    }
                    break;
                case 'number':
                    if (format) {
                        result = d3.format(format)(input);
                    }
                    break;
                default:
                    break;
            }
        }

        return result;
    }

    self.parseByType = parseByType;
    self.formatByType = formatByType;
};
