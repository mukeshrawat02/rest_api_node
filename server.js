// call the packages we need
var express = require('express'),       //call express
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    config = require('./config'),
    data = require('./data'),
    routes = require('./routes');

data.init(config);

// define our app using express
var app = express(); 
app.set('jwtTokenSecret', config.secretKey);

// get an instance of the express Router
var apiRoutes = express.Router();
routes.init(apiRoutes);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// enable Cross Origin Resource Sharing
app.use(function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Request-Method, X-Requested-With, Content-Type, x-access-token");
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

// register our routes -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRoutes);

// if no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// start the server -------------------------------
app.listen(config.port, function (err) {
     if (err)
        console.error(err)
    else
        console.log('Node '+ process.env.NODE_ENV +' Server is running on port ' + config.port)
});

if (process.env.NODE_ENV == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
});
