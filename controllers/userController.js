(function (userController) {
    var User = require('../models').User;

    // POST /api/signup
    userController.register = function (req, res) {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.mobile = req.body.mobile;
        user.dob = req.body.dob;

        // Save the user and check for errors
        user.save(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                success: true,
                message: 'User has been added!',
                data: user
            });
        });
    };

    // GET /api/users
    userController.getUsers = function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                success: true,
                data: users
            });
        });
    };

    // GET /api/user/:user_id
    userController.getUser = function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                success: true,
                data: user
            });
        });
    };

    // PUT /api/user/:user_id
    userController.updateUser = function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            // Update only data that exists in request
            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.mobile) user.mobile = req.body.mobile;
            if (req.body.dob) user.dob = req.body.dob;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            user.updated_at = Date.now();

            user.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({
                    success: true,
                    message: 'User updated.',
                    data: user
                });
            });
        });
    };

    // DELETE /api/user/:user_id
    userController.deleteUser = function (req, res) {
        User.findByIdAndRemove(req.params.user_id, function (err) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                success: true,
                message: 'User successfully removed!'
            });
        });
    };

})(module.exports);