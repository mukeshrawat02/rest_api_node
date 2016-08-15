var User = function (mongoose) {

    var bcrypt = require('bcrypt-nodejs');
    // Create a password salt
    var salt = bcrypt.genSaltSync(10);

    // Define our user schema
    var UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: Number,
        username: { type: String, required: true, unique: true },
        password: {
            type: String, required: true, select: true // do not select in query by default
        },
        dob: Date,
        created_at: { type: Date, default: Date.now() },
        updated_at: Date
    });

    UserSchema.pre('save', function (next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(10,
            function (err, salt) {
                if (err) return next(err);

                // hash password with our new salt
                bcrypt.hash(user.password,
                    salt,
                    null,
                    function (err, hash) {
                        if (err) return next(err);

                        // override the cleartext password with the hashed one
                        user.password = hash;
                        next();
                    });
            });
    });

    // method to compare a given password with the database hash
    UserSchema.methods.comparePassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return cb(err);

            cb(null, isMatch);
        });
    };

    // expose enum on the model, and provide an internal convenience reference 
    var reasons = UserSchema.statics.failedLogin = {
        NOT_FOUND: 0,
        PASSWORD_INCORRECT: 1,
    };

    // statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
    // getAuthenticated is a helper method to check username and password from the database and return the response
    UserSchema.statics.getAuthenticated = function (username, password, cb) {
        this.findOne({ username: username }, function (err, user) {
            if (err) return cb(err);

            // No user found with that username
            if (!user) {
                return cb(null, null, reasons.NOT_FOUND);
            }

            // Make sure the password is correct
            user.comparePassword(password, function (err, isMatch) {
                if (err) return cb(err);

                // password did not match
                if (!isMatch) {
                    return cb(null, null, reasons.PASSWORD_INCORRECT);
                }

                // success
                return cb(null, user);
            });
        });
    };

    // Export the Mongoose model
    return mongoose.model('User', UserSchema);
};

module.exports = User;