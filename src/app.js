const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./task.router');
const DbSetup = require('./db-setup');
const app = express();
const port = 3000;

// specifying I am expecting the request body to be json format
app.use(bodyParser.json());
// open connection to db and create table and seed data
DbSetup.prototype.setup();
// use router dedicated to Tasks
// the router has its own specific middleware
app.use('/api/v1', taskRouter);
// basic health check
app.get('/healthcheck', (req, res) =>
	res.send({
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	})
);
// start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
