var http = require("http");

// Create module function for title extraction
module.exports = {
	requestTitle : function(address,getTitle){
		// regix to fetch title from url
		var regex = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
		// break down address on '/' basis
		var splitUrl = address.split("/");

		if(splitUrl[0].indexOf(".com") !== -1){
			var urlOpts = {
					host: splitUrl[0],
					path: splitUrl[1] == undefined ? "/": "/"+splitUrl[1] + "/", 
					port: '80'
				      };
			http.get(urlOpts, function (res) {
				res.on('data', function (chunk){
					var match = regex.exec(chunk.toString());
					if (match && match[2]) {
						getTitle(((res.statusCode == 200) ? match[2] : "Not found") + " - " + address);
					}
				});
			}).on('error',function(e){
				getTitle("Error: " + e.message);
			});
		}
		else{
			getTitle("Error processing query");
		}
	},
	getCompleteUrl : function(i, callback){
		return callback(i);
	}
}
