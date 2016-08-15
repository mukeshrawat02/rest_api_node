(function (userRoute) {

    var authenticationController = require("../controllers/authenticationController");
    var userController = require("../controllers/userController");

    userRoute.init = function (apiRouter) {
        apiRouter.route('/signup')
                 .post(userController.register);

        apiRouter.route('/users')
                 .get(userController.getUsers);

        apiRouter.route('/user:user_id')
                 .get(userController.getUser)
                 .put(userController.updateUser)
                 .delete(userController.deleteUser);
    };

})(module.exports);