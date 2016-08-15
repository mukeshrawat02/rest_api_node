(function (model) {
    var mongoose = require('mongoose');
    var userModel = require("./user")(mongoose);

    model.User = userModel;

})(module.exports);