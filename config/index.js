(function (config) {

    config.database = 'mongodb://localhost/nodeAPI';
    config.testDatabase = 'mongodb://localhost/nodeAPI_Test';
    config.secretKey = '12qwaszx!£';
    config.port = process.env.PORT || 3000;

})(module.exports);