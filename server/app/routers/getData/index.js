var appConfig = require('../../appConfig');
var repository = require('../../models/getData/mediaModel');

module.exports = function()
{
    function initialize(router) {

        router.route('/getData').get(function (req, res) {

            var result = null;
            var isRequestValid = true; // perform here validations on the request query

            if (isRequestValid) {
                result = repository.get();

                res.json(result);
            } else {
                res.json({error: 'missing_query'});
            }
        });
    }

    return { initialize: initialize };

}();
