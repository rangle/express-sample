const sqlite3 = require('sqlite3').verbose();

module.exports = dbConfiguration = (req, res, next) => {
	res.locals.db = new sqlite3.Database(':memory', err => {
		if (err) return console.error('error: ' + err.message);
	});
	console.log(res.locals.db);

	res.on('finish', () => {
		res.locals.db.close(err => {
			if (err) console.log(err);
		});
		res.locals = null;
		console.log(res.locals.db);
	});
	next();
};
