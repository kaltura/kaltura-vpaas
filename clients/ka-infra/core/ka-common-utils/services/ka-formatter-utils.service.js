"use strict";

module.exports = function()
{
    var self = this;

    function parseByType(input,type,format)
    {
        var result = input;

        if (type) {
            switch (type) {
                case 'date':
                    if (format) {
                        result = moment(input, format);
                    }
                    break;
                case 'number':
                    if (angular.isUndefined(input) || input === null)
                    {
                        input = 0;
                    }
                    result = parseFloat(input);
                    break;
                default:
                    break;
            }
        }

        return result;
    }

    function formatByType(input, type, format, conversion)
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
                    switch (conversion) {
                        case 'mb_gb':
                            result = result / 1024;
                            break;
                        default:
                            break;
                    }
                    if (format) {
                        result = d3.format(format)(result);
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
