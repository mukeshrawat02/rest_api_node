(function (config) {

    config.database = 'mongodb://localhost/nodeAPI';
    config.secretKey = '12qwaszx!£';
    config.port = process.env.PORT || 3000;

})(module.exports);