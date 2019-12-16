// express module
const express = require('express');
//body parser allows for having the request body parsed for us
const bodyParser = require('body-parser');
const taskRouter = require('./task.router');
const app = express();
const port = 3000;

// specifying I am expecting the request body to be json format
app.use(bodyParser.json());
app.use('/api/v1', taskRouter);
app.get('/healthcheck', (req, res) =>
	res.send({
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	})
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
