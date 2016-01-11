var appConfig = require('../../appConfig');
var dataModel = require('../../models/report/getGraphs');

module.exports = function()
{
    function initialize(router) {

        router.route('/report/getGraphs').post(function (req, res) {

            var result = null;
            var isRequestValid = true; // perform here validations on the request query

            if (isRequestValid) {
                result = dataModel.get();

                res.json(result);
            } else {
                res.json({error: 'missing_query'});
            }
        });
    }

    return { initialize: initialize };

}();
