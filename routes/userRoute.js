(function (userRoute) {

    var jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
        authenticationController = require("../controllers/authenticationController"),
        userController = require("../controllers/userController");

    userRoute.init = function (apiRouter) {
        apiRouter.route('/signup')
                 .post(userController.register);

        apiRouter.route('/login')
                 .post(authenticationController.login);

        // route middleware to verify a token
        apiRouter.use(function (req, res, next) {
            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, req.app.get('jwtTokenSecret'), function (err, decoded) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Failed to authenticate token.'
                        });
                    }
                    else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                // if there is no token return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        });

        apiRouter.route('/users')
                 .get(userController.getUsers);

        apiRouter.route('/user/:user_id')
                 .get(userController.getUser)
                 .put(userController.updateUser)
                 .delete(userController.deleteUser);
    };

})(module.exports);