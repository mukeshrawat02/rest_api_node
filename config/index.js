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
        db = 'mongodb://sa:admin@ds139197.mlab.com:39197/_mgit';
    }
    config.database = db;
    config.secretKey = '12qwaszx!£';
    config.port = process.env.PORT || 3000;

})(module.exports);