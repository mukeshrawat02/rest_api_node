(function (database) {
    var mongoose = require('mongoose');

    database.init = function (config) {
        console.log("Connection String: " + config.database);
     
        var options = { 
            server: { 
                socketOptions: { 
                    keepAlive: 300000, 
                    connectTimeoutMS: 30000 
                } 
            }, 
            replset: { 
                socketOptions: { 
                    keepAlive: 300000,
                    connectTimeoutMS : 30000 
                } 
            } 
        };   
        mongoose.connect(config.database, options);
        
        var conn = mongoose.connection;             
        conn.on('error', console.error.bind(console, 'connection error:'));  
        
        conn.once('open', function() {
            console.log('Successfully connected to MongoDB');                       
        });
    };

})(module.exports);