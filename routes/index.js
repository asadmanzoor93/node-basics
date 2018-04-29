// Include express module
var express = require('express');

// create controller object
var tasksController = require('../controllers/tasks.js');

// create node express object
var app = express();

// Task 1
app.get("/task-1/I/want/title/", tasksController.getTitles);
// Task 2
app.get("/task-2/I/want/title/", tasksController.getTitlesAsync);

// empty url handling
app.get("*", function (request,response) {
	response.status(404).send('Not found');
});

app.listen(8081);
