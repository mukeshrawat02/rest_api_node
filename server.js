// call the packages we need
var express = require('express');          //call express
var app = express();                      //define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var config = require('./config');
var data = require('./data');
var routes = require('./routes');

data.init(config);

// get an instance of the express Router
var apiRoutes = express.Router();
routes.init(apiRoutes);

// register our routes -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRoutes);

// start the server -------------------------------
app.listen(config.port);
console.log('Node Server is running on port ' + config.port);
