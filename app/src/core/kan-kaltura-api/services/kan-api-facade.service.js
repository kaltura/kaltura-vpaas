'use strict';

module.exports = function (kAPIRequestsHandler) {

    var self = this;

    function doRequest(userParams,queryParams)
    {
        return kAPIRequestsHandler.doRequest(userParams,queryParams);
    }

    self.doRequest =doRequest;
};
