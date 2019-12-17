const sqlite3 = require('sqlite3').verbose();

class TaskService {
	constructor() {}

	getAllTasks(db) {
		return true;
	}
	getTaskById(id) {
		return true;
	}
	deleteTaskById(id) {
		return true;
	}
	updateTask(task) {
		return true;
	}
}

module.exports = TaskService;
