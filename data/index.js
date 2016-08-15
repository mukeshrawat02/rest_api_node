(function (data) {
    var database = require("./database");

    data.init = function (config) {
        database.init(config);
    };

})(module.exports);