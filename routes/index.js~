var express = require('express');

// create controller object
var task1Controller = require('../controllers/task-1.js');

// create node express object
var app = express();

app.get("/task-1/I/want/title/", task1Controller.getTitles);

// empty url handling
app.get("*", function (request,response) {
	response.status(404).send('Not found');
});

// start listening npm server
app.listen(8081);
