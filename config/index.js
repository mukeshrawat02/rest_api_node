(function (config) {
    var db;
    if (process.env.NODE_ENV === "development")
    {
        db = 'mongodb://localhost/_mgit-dev';
    }
    else if(process.env.NODE_ENV === "test")
    {
        db = 'mongodb://localhost/_mgit-test';
    }
    else
    {
        db = 'mongodb://mprod:admin@123@ds031607.mlab.com:31607/_mgit';
    }
    config.database = db;
    config.secretKey = '12qwaszx!£';
    config.port = process.env.PORT || 3000;

})(module.exports);