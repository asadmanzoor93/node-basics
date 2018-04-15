// Include utility module
var Utility = require("../lib/Utility.js");

// Include views file
var View = require("../views/View.js");

// Use module function
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

	// use utility module requestTitle function
	Utility.requestTitle(request.query.address,function(title){
		// print title
		View.title(response,title);
		// set footer title
		View.titleFooter(response);
		// set footer
		View.footer(response);
	});
};
