module.exports = function () {

    var model = {
        sample: [
            {
               status : 'ready'
            }
        ]
    };

    function get() {
        return model;
    }

    return {
        get: get
    };
}();






