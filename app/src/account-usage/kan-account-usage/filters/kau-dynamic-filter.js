"use strict";

module.exports = function(kFormatterUtils)
{
    return function(input, type, format)
    {
       return kFormatterUtils.formatByType(input,type,format);
    }
};


