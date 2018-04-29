// Include rsvp library
var RSVP = require('rsvp');

// Include async library
var Async = require("async");

// Include utility module
var Utility = require("../lib/Utility.js");

// Include views file
var View = require("../views/View.js");

// Task 1
// Implement the above task using plain node.js callbacks 
exports.getTitles = function (request,response) {
	// check if address provided in url or not
	if(request.url.indexOf("address=") == -1){
		View.addressInUrl(response);
		return;
	}

	// set header
	View.header(response);
	// set header title
	View.titleHeader(response);
	
	// If multiple address given iterate over array
	if(request.query.address instanceof Array){
		var arrayLength = request.query.address.length;
		for(var counter = 0;counter < arrayLength; counter++){
			Utility.requestTitle(request.query.address[counter],function(title){
				// print title
				View.title(response,title);
				if(arrayLength == (counter + 1)){
					// set footer title
					View.titleFooter(response);
					// set footer
					View.footer(response);
				}
			});
		}
	}else{
		// use utility module requestTitle function
		Utility.requestTitle(request.query.address,function(title){
			// print title
			View.title(response,title);
			// set footer title
			View.titleFooter(response);
			// set footer
			View.footer(response);
		});  
	}
};

// Task 2
// Implement the above using some kind of flow library e.g. async.js
exports.getTitlesAsync = function (request,response) {
	var stack = [];
	// check if address provided in url or not
	if(request.url.indexOf("address=") == -1){
		View.addressInUrl(response);
		return;
	}

	// set header
	View.header(response);
	// set header title
	View.titleHeader(response);
	
	// If multiple address given iterate over array
	if(request.query.address instanceof Array){
		var arrayLength = request.query.address.length;
		for(var counter = 0;counter < arrayLength; counter++){
			Utility.getCompleteUrl(request.query.address[counter],function(x2){
				var getCompleteTitle = function(callback){
					Utility.requestTitle(x2,function(title){
						callback(null,title);
					});
				}
				// update stack for async implementation
				stack.push(getCompleteTitle);
			});	
		}
	}else{
		var getCompleteTitle = function(callback){
			// use utility module requestTitle function
			Utility.requestTitle(request.query.address,function(title){
				callback(null,title);
			});  
		}
		// update stack for async implementation
		stack.push(getCompleteTitle);
	}

	// async the calls over stack
	Async.parallel(stack,function(err,records){
		if(err){
			console.log("error"+err);
		}
		for(var i = 0;i<records.length;i++){
			// print title
			View.title(response,records[i]);
		}
		// set footer title
		View.titleFooter(response);
		// set footer
		View.footer(response);

	});
};

// Task 3
// Implement the above using Promises. You could use any library e.g. RSVP 
exports.getTitlesRSVP = function (request,response) {
	// check if address provided in url or not
	if(request.url.indexOf("address=") == -1){
		View.addressInUrl(response);
		return;
	}

	// set header
	View.header(response);
	// set header title
	View.titleHeader(response);

	// If multiple address given iterate over array
	if(request.query.address instanceof Array){
		var promises = [];
		var arrayLength = request.query.address.length;
		for(var counter = 0;counter < arrayLength; counter++){
			// create promise for url
			promises.push(new RSVP.Promise(function(resolve,reject){
				Utility.requestTitle(request.query.address[counter],function(title){
					resolve(title);
				});
			}));
		}
		
		// Promise.all function takes a list of promises in the given order and returns another promise
		RSVP.all(promises).then(function(responseText){
			responseText.map(function(item){
				View.title(response,item);
			});
			View.titleFooter(response);
			View.footer(response);
		});
	}else{
		// create promise
		var promise = new RSVP.Promise(function(resolve,reject){
			Utility.requestTitle(request.query.address,function(title){
				resolve(title);// reject if promise
			});
		});

		// bind promis with then 
		promise.then(function(responseText){
			View.title(response,responseText);
			View.titleFooter(response);
			View.footer(response);
		});
	}
};

// Reference : https://medium.com/dev-bits/writing-neat-asynchronous-node-js-code-with-promises-32ed3a4fd098