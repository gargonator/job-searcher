const mysql = require('mysql');

// initialize database connection to jobs database
if (process.env.JAWSDB_URL) { // connect to remote jaws DB if available
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else { // otherwise connect to local mysql database
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'jobs'
	});
}

// display message depending on whether connection is successful
connection.connect((err) => {
	if (err) {
		console.error('error connecting: ' + err.stack);
	} else {
		console.log('connected as id: ' + connection.threadId);
	}
});

// export connection
module.exports = connection;