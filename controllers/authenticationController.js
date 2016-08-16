(function (authenticationController) {
    var User = require('../models').User;
    var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

    authenticationController.login = function (req, res) {
        User.getAuthenticated(
            req.body.username,
            req.body.password,
            function (err, user, reason) {
                if (err) {
                    res.status(500).send(err);
                }

                // login was successful if we have a user
                if (user) {
                    // handle login success

                    // creating jwt token
                    var token = jwt.sign({
                        _id: user._id,
                        username: user.username
                    },
                    req.app.get('jwtTokenSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Login success!',
                        token: token
                    });
                }

                // otherwise we can determine why we failed
                var reasons = User.failedLogin;
                switch (reason) {
                    case reasons.NOT_FOUND:
                        res.status(401)
                            .json({
                                success: true,
                                message: "Authentication failed. User not found!"
                            });
                        break;
                    case reasons.PASSWORD_INCORRECT:
                        res.status(401)
                            .json({
                                success: true,
                                message: "Authentication failed. Incorrect Password!"
                            });
                        break;
                }
            });
    };

})(module.exports);