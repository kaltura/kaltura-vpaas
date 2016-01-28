"use strict";

function KalturaAPIFacade($q, kalturaAPIContext, $injector) {
    var self = this;

    function invoke(service, action, requestParams) {

        var handler = kalturaAPIContext.getHandler({service : service, action:action});

        if (handler) {
            return $injector.instantiate(handler).handleRequest(requestParams);
        } else {
            return $q.reject({error: 'unknown_api_service_action'});
        }
    };


    function getKalturaAPIService()
    {
        return kalturaAPIContext.getInfo().kalturaApiUri;
    }

    function getPartnerKS()
    {
        return kalturaAPIContext.getInfo().partnerKS;
    }


    self.getPartnerKS = getPartnerKS;
    self.getKalturaAPIService = getKalturaAPIService;
    self.invoke = invoke;
};


module.exports = function () {

    var handlers = {},
        kalturaAPIContext = {
            getHandler: getHandler,
            getInfo : getInfo
        },
        info = {
            partnerKS : '',
            kalturaApiUri : ''
        };


    function getInfo()
    {
        return info;
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

    function setKalturaAPIService(serviceUri)
    {
        info.kalturaApiUri = serviceUri;
    }

    function setPartnerKS(ks)
    {
        info.partnerKS = ks;
    }

    this.setPartnerKS = setPartnerKS;
    this.setKalturaAPIService = setKalturaAPIService;

    this.registerHandler = registerHandler;


    this.$get = function ($injector) {
        return $injector.instantiate(KalturaAPIFacade, {kalturaAPIContext: kalturaAPIContext});
    }
}
