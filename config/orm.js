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
		});

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

// testing
var testObject1 = {
  title: 'Software Engineer',
  href: 'https://facebook.com',
  company: 'Facebook',
  details: 'Move fast and break things',
  loc: 'Mountain View, CA',
}

var testObject2 =
{
  title: "<strong>Software</strong> Engineer", 
  href: "https://www.adzuna.com/land/ad/823467997?se=8CaiBF…426d84&v=995D33697C24ED92E7967A44CEE4B622E7819B32", 
  company: "Intelliswift Software Inc", 
  details: "Title: <strong>Software</strong> EngineerLocation:… years working as a <strong>software</strong> ...", 
  loc: "San Diego County, California"
}

orm.insertOne(testObject2, results => console.log(results));

