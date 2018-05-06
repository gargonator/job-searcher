var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var routes = require('./controllers/routes.js');

// use the PORT from the remote environment,or default to a static port for testing purposes
var PORT = process.env.PORT || 8000;

// create an express app
var app = express();

// set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static content from public directory
app.use(express.static('public'));

// set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// give app access to routes
app.use(routes);

// start listening to port
app.listen(PORT, () => {
	console.log('Listening on port ' + PORT + '...');
});