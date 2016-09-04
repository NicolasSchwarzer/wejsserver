'use strict';

let Express = require('express'),
	BodyParser = require('body-parser'),
	Route = require('../src/server/route');

let config = require('../src/config/init'),
	port = config.port,
	app = Express();

app.map = require('../src/server/map');

app.use(BodyParser.json());

app.use(BodyParser.urlencoded({
	extended: true
}));

app.map((new Route).getRoutings());

app.listen(port);

console.log(`Server started on port ${port}`);
