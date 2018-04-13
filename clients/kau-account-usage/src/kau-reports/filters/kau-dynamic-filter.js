"use strict";

module.exports = function(kFormatterUtils)
{
    return function(input, type, format, conversion)
    {
       return kFormatterUtils.formatByType(input,type,format, conversion);
    }
};


