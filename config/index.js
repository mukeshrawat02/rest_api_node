(function (config) {
    var db;
    if (process.env.NODE_ENV === "development")
    {
        db = 'mongodb://localhost/favLister';
    }
    else
    {
        db = 'mongodb://mgit:admin@123@ds031607.mlab.com:31607/_mgit';
    }
    config.database = db;
    config.testDatabase = 'mongodb://localhost/nodeAPI_Test';
    config.secretKey = '12qwaszx!£';
    config.port = process.env.PORT || 3000;

})(module.exports);