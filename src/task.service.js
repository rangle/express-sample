class TaskService {
	constructor() {}

	getAllTasks(db) {
		let sql = `SELECT * FROM Tasks`;
		db.all(sql, [], (err, rows) => {
			if (err) throw err;

			rows.forEach(row => {
				console.log(row.id);
				console.log(row.task);
			});
		});
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
