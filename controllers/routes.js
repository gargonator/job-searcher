var express = require('express');
var path = require('path');
var jobs = require('../models/jobs_model.js');

var router = express.Router();

// route for home page (job search page)
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "../public/assets/index.html"));
})

// route for saved jobs page
router.get('/saved-jobs', (req, res) => {
	res.sendFile(path.join(__dirname, "../public/assets/saved.html"));
})

// api route for returning saved jobs from the database
router.get('/api/saved-jobs', (req, res) => {
	jobs.getAll(function(data) {
		console.log(data);
		res.json(data);
	});
})

// route for adding a new saved job
router.post('/api/new-job', (req, res) => {
	// console.log('req body',req.body);
	jobs.create(req.body, (results) => {
		console.log(results);
		res.sendStatus(200);
	});
})

// route for removing a saved job
router.put('/api/delete-job/:id', (req, res) => {
	jobs.delete(req.params.id, (results) => {
		console.log('job with id ' + req.params.id + 'deleted');
		res.sendStatus(200);
	});
})

// export routes so other files can use
module.exports = router;