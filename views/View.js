// exports module functions 
module.exports = {
	header : function(response){
		if(!response.finished){
			response.write("<html>");
			response.write("<head><title>Get Website Addresses From URL");
			response.write("</title></head>");
			response.write("<body>");
		}
	},
	footer : function(response){
		if(!response.finished){
			response.write("</body>");
			response.write("</html>");	
			response.end();
		}
	},
	titleHeader : function(response){
		if(!response.finished){
			response.write("<h1>Following are the titles of given websites: </h2>");
			response.write("<ul>")
		}
	},
	titleFooter : function(response){
		if(!response.finished){
			response.write("</ul>")
		}
	},
	title : function(response,title){
		if(!response.finished){
			response.write("<li>" + title + "</li>");
		}
	},
	addressInUrl : function(response){
		if(!response.finished){
			response.write("<h2>Enter website address in URL</h2>")
			this.writeFooter(response);
			response.end();
		}	
	},
	errorLog : function(response,msg){
		if(!response.finished){
			response.write(msg);
		}
	}
}
