(function (apiRoutes) {

    var userRoute = require("./userRoute");

    apiRoutes.init = function (routes) {
        userRoute.init(routes);
    };

})(module.exports);