const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./task.router');
const DbSetup = require('./db-setup');
const errorHandler = require('./error-handler');
const app = express();

// specifying I am expecting the request body to be json format
app.use(bodyParser.json());
// open connection to db and create table and seed data
DbSetup();
// use router dedicated to Tasks
// the router has its own specific middleware
app.use('/api/v1', taskRouter);
// handler to deal with errors that express catches
app.use(errorHandler);
// basic health check
app.get('/healthCheck', (req, res) =>
	res.send({
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	})
);
module.exports = app;
