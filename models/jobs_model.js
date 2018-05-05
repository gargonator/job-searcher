var orm = require('../config/orm.js');

// model methods 
var saved_jobs = {
  // get all saved jobs
	getAll: function(cb) {
		orm.getAll(cb);
	},
  // save a new job
	create: function(job, cb) {
		orm.insertOne(job, cb);
	},
  // delete a saved job
	delete: function(id, cb) {
		orm.deleteOne(id, cb);
	},
}

module.exports = todo;