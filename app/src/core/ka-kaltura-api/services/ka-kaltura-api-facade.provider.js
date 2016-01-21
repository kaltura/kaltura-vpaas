"use strict";

function KalturaAPIFacade($q, RequestsHandlerRepository, $injector) {
    var self = this;

    function invoke(service, action, requestParams) {

        var handler = RequestsHandlerRepository.get({service : service, action:action});

        if (handler) {
            return $injector.instantiate(handler).handleRequest(requestParams);
        } else {
            return $q.reject({error: 'unknown_api_service_action'});
        }
    };

    self.invoke = invoke;
};


module.exports = function () {

    var handlers = {};
    var RequestsHandlerRepository = {
        get: getHandler
    }

    function getHandler(handlerInfo) {
        var key = generateHandlerKey(handlerInfo);
        return handlers[key];
    }

    function generateHandlerKey(item) {
        return item.action + ";" + item.service;
    }

    function registerHandler(handlerInfo, handler) {
        var key = generateHandlerKey(handlerInfo);
        handlers[key] = handler;
    }


    this.registerHandler = registerHandler;


    this.$get = function ($injector) {
        return $injector.instantiate(KalturaAPIFacade, {RequestsHandlerRepository: RequestsHandlerRepository});
    }
}
