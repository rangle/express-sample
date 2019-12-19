const sqlite3 = require('sqlite3').verbose();

module.exports = DbSetup = () => {
	let db = new sqlite3.Database(':memory', err => {
		if (err) throw new Error(err);
	});
	db.exec(`Drop Table IF EXISTS Tasks`, err => {
		if (err) throw new Error(err);
	});
	db.exec(
		`CREATE TABLE IF NOT EXISTS Tasks (
    			id Integer PRIMARY KEY AUTOINCREMENT,
    			task nvarchar NOT NULL);`,
		err => {
			if (err) throw new Error(err);
		}
	);
	db.exec(
		`INSERT INTO Tasks(Task)
              VALUES('Eat Dinner');`,
		err => {
			if (err) throw new Error(err);
		}
	);
	db.exec(
		`INSERT INTO Tasks(Task)
              VALUES('Walk the dog');`,
		err => {
			if (err) throw new Error(err);
		}
	);
	db.close(err => {
		if (err) throw new Error(err);
	});
};
