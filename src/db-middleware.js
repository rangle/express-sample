const sqlite3 = require('sqlite3').verbose();

module.exports = dbConfiguration = (req, res, next) => {
	res.locals.db = new sqlite3.Database(':memory', err => {
		if (err) return console.error('error: ' + err.message);
	});

	res.on('finish', () => {
		res.locals.db.close(err => {
			if (err) console.error(err);
		});
		res.locals = null;
	});
	next();
};
