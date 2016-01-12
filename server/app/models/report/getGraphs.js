module.exports = function () {

    var model = [];

    function get() {
        return model[0].value;
    }

    return {
        get: get
    };
}();






