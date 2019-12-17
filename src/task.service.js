const sqlite3 = require('sqlite3').verbose();

class TaskService {
	constructor(db) {
		this.db = db;
	}

	getAllTasks() {
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
