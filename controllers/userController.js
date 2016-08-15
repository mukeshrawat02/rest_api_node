(function (userController) {

    var User = require('../models').User;

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
                res.send(err);
            }
            res.json({ message: 'User has been added!', data: user });
        });
    };

    userController.getAllUser = function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    };

})(module.exports);