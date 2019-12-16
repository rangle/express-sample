const express = require('express');
let router = express.Router();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory', err => {
	if (err) return console.error(err.message);
	console.log('Connected to the in memory SQLite db');
});

let tasks = [
	{
		id: 001,
		task: 'eat yogurt',
	},
	{
		id: 002,
		task: 'make a sandwich',
	},
];

router.get('/tasks', (req, res) => res.send(tasks));
router
	.route('/task/:id')
	.get((req, res) => res.send(tasks.find(task => task.id === +req.params.id)))
	.delete((req, res) => {
		let index = tasks.findIndex(task => task.id === +req.params.id);
		if (index > -1) tasks.splice(index, 1);
		res.send(tasks);
	});
router
	.route('/task')
	.put((req, res) => {
		let index = tasks.findIndex(task => task.id === req.body.id);
		if (index > -1) tasks.splice(index, 1, req.body);
		res.send(tasks);
	})
	.post((req, res) => {
		tasks.push(req.body);
		res.send(tasks);
	});
module.exports = router;
