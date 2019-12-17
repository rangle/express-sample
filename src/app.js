// express module
const express = require('express');
//body parser allows for having the request body parsed for us
const bodyParser = require('body-parser');
const taskRouter = require('./task.router');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// specifying I am expecting the request body to be json format
app.use(bodyParser.json());
// open connection to db and create table and seed data
let db = new sqlite3.Database(':memory', err => {
	if (err) return console.error(err.message);
});
db.exec(
	`CREATE TABLE IF NOT EXISTS Tasks (
    id Integer PRIMARY KEY,
    task nvarchar NOT NULL);`,
	err => console.log(err)
);
db.close(err => {
	if (err) console.log(err);
});

app.use('/api/v1', taskRouter);
app.get('/healthcheck', (req, res) =>
	res.send({
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	})
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
