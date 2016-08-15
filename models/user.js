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
            type: String, required: true, select: false // do not select in query by default
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
    UserSchema.methods.comparePassword = function (password, next) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return next(err);

            next(null, isMatch);
        });
    };

    // Export the Mongoose model
    return mongoose.model('User', UserSchema);
};

module.exports = User;