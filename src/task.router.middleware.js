const sqlite3 = require('sqlite3').verbose();

module.exports = dbOpenAndClose = (req, res, next) => {
	res.locals.db = new sqlite3.Database(':memory', err => {
		if (err) next(err.message);
	});

	res.on('finish', () => {
		res.locals.db.close(err => {
			if (err) next(err);
		});
		res.locals = null;
	});
	next();
};
