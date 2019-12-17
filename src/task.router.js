const express = require('express');
let router = express.Router();
const dbConfiguration = require('./db-middleware');
const TaskService = require('./task.service');
// middleware dedicated to opening and closing db connections for Tasks
router.use(dbConfiguration);

router.get('/tasks', (req, res) => {
	res.send(TaskService.prototype.getAllTasks(res.locals.db));
});
router
	.route('/task/:id')
	.get((req, res) => {
		const taskService = new TaskService();
		res.send(taskService.getTaskById(+req.params.id));
	})
	.delete((req, res) => {
		const taskService = new TaskService();
		res.send(taskService.deleteTaskById(+req.body.id));
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
