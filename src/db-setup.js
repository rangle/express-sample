const sqlite3 = require('sqlite3').verbose();

module.exports = DbSetup = () => {
	let db = new sqlite3.Database(':memory', err => {
		if (err) return console.error(err.message);
	});
	db.exec(`Drop Table IF EXISTS Tasks`);
	db.exec(
		`CREATE TABLE IF NOT EXISTS Tasks (
    			id Integer PRIMARY KEY AUTOINCREMENT,
    			task nvarchar NOT NULL);`,
		err => {
			if (err) console.error(err);
		}
	);
	db.exec(`INSERT INTO Tasks(Task)
              VALUES('Eat Dinner');`);
	db.exec(`INSERT INTO Tasks(Task)
              VALUES('Walk the dog');`);
	db.close(err => {
		if (err) console.error(err);
	});
};
