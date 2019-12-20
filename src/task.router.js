const express = require('express');
let router = express.Router();
const dbOpenAndClose = require('./task.router.middleware');

// middleware dedicated to opening and closing db connections for Tasks
router.use(dbOpenAndClose);

router.get('/tasks', (req, res) => {
	let sql = `SELECT * FROM Tasks`;
	let tasks = [];
	res.locals.db.all(sql, [], (err, rows) => {
		if (err) throw new Error(err);

		rows.forEach(row => {
			tasks.push(row);
		});
		res.send(tasks);
	});
});
router
	.route('/task/:id')
	.get((req, res) => {
		let sql = `select * from tasks where id = ${+req.params.id}`;
		res.locals.db.get(sql, [], (err, row) => {
			if (err) throw new Error(err);
			res.send(row);
		});
	})
	.delete((req, res) => {
		let sql = `delete from tasks where id = ${+req.params.id}`;
		res.locals.db.run(sql, [], err => {
			if (err) throw new Error(err);
			res.send({ message: 'deleted' });
		});
	});
router
	.route('/task')
	.put((req, res) => {
		let sql = `update tasks set task = '${req.body.task}' where id = ${req.body.id}`;
		res.locals.db.run(sql, [], err => {
			if (err) throw new Error(err);
			res.send({ message: 'updated' });
		});
	})
	.post((req, res) => {
		let sql = `INSERT INTO Tasks(Task)
              VALUES('${req.body.task}')`;
		res.locals.db.run(sql, [], err => {
			if (err) throw new Error(err);
			res.send({ message: 'posted' });
		});
	});
module.exports = router;
