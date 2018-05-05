var connection = require('./connection.js')

// ORM functions to query jobs table
var orm = {
  // get all saved jobs
	getAll: function selectAll(cb) {
		connection.query(`SELECT * FROM saved_jobs`, (err, results) => {
			if (err) throw err;
			cb(results);
		});
	},
  // add a new saved job
	insertOne: function insertOne(job, cb) {
		connection.query(`INSERT INTO saved_jobs SET ?`, job, (err, results) => {
			if (err) throw err;
			cb(results);
		})

	},
  // remove a saved job
	removeOne: function removeOne(id, cb) {
		connection.query(`DELETE FROM saved_jobs WHERE WHERE id = ?`, [id], (err, results) => {
			if (err) throw err;
			cb(results);
		})
	},

};

module.exports = orm;