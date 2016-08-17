(function (database) {
    var mongoose = require('mongoose');

    database.init = function (config) {

        var connectionString = "";

        if (process.env.NODE_ENV == 'test') {
            connectionString = config.testDatabase;
        }
        else {
            connectionString = config.database;
        }
        console.log("Connection String: " + connectionString);
        // connect to the database
        mongoose.connect(connectionString, function (err) {
            if (err) {
                throw err;
            }
            console.log('Successfully connected to MongoDB');
        });
    };

})(module.exports);