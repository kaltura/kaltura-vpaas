"use strict";

module.exports = function()
{
    return function(input, type, format)
    {
        var result = input;
        if (input && type) {
            switch (type) {
                case 'date':
                    if (format) {
                        result = moment(input, format).format('MMMM, YYYY');
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
};


