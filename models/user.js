var User = function (mongoose) {

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
        created_at: { type: Date, default: Date.now() }
    });

    // Export the Mongoose model
    return mongoose.model('User', UserSchema);
};

module.exports = User;