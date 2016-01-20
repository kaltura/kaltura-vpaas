
module.exports = function ($http, $q, kaAPIFacade, kanSamplesHelper,$injector) {

    var self = this;

    function getData(origin, requestType, filters) {

        var deferred = $q.defer();

        var adapter = kanSamplesHelper.getAdapterByType(requestType);

        if (adapter)
        {
            var invokePromise = null;
            var descriptionPrefix = '';
            if (origin === 'live')
            {
                invokePromise = $injector.invoke(adapter.invokeLiveRequest);
                descriptionPrefix = 'Live request\n';

            }else
            {
                invokePromise = $injector.invoke(adapter.invokeDemoRequest);
                descriptionPrefix = 'Recorded request\n';
            }

            invokePromise.then(function (result) {
                var response = $injector.invoke(adapter.parseRequest,null,{ request: result,filters : filters});
                response.description = descriptionPrefix + response.description;

                deferred.resolve(response);
            }, function (reason) {
                deferred.reject(reason);
            });
        }else
        {
            deferred.reject({errorMessage : 'unknown request type ' + requestType});
        }

        return deferred.promise;
    }

    self.getData = getData;
}

