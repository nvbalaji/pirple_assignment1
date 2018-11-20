/*
	Purpose: Assignment 1 of Pirple course
	Functionality: This is the entry function for the Hello service.
	Only the server is created here
	Author: Balaji N V

*/

/*Dependencies*/
var http = require("http");
var url = require("url");

var response = require("./resp");
var error = require("./error");

/*Configuration*/


/*App Object*/
var app = {
	httpServer: undefined,
	httpsServer: undefined,

	routes : {}
};

/*Function definitions*/
app.initRoutes = function() {
	this.routes["hello"] = this.helloHandler;
}

app.helloHandler = function(req, parsedUl, cb) {
	err = error.createErrorObj(); //No error
	cb(err, req, {"body": {
								"msg":"Hello"
						  }, 
		           "headers":{
		           				"content-type": "application/json", 
		           				"charset": "utf-8"
		           			  }, 
		           	"status": 200
		        }
	);
}

app.initiateParse = function(req, cb) {
	var parsedUrl = url.parse(req.url, true);
	err = error.createErrorObj(); //No error
	cb(err, req, parsedUrl);
}

app.initiateRouting = function(req, parsedUrl, cb) {
	var path = parsedUrl.path;
	trimmedPath = path.replace(/^\/+|\/+$/g,"").toLowerCase();
	console.log("Path = " + trimmedPath);
	if (typeof app.routes[trimmedPath] == "function") {
		app.routes[trimmedPath](req, parsedUrl, cb);
	} else {
		err = error.createErrorObj(-1, "Resource Not found");
		cb(err, req);
	}
}

app.createHttpServer =  function() {
	this.httpServer = http.createServer((req,res) => {
		var appRespObj = response.createResponse(res); 

		
		app.initiateParse(req, (err, req, parsedURL) => {
			if ((err.isOK())) {
				this.initiateRouting(req, parsedURL, (err, req, respObj) => {
					if (!err.isOK()) {
						appRespObj.sendError(err);
					} else {
						appRespObj.sendRsp(respObj.status, 
										   respObj.headers, 
										   respObj.body);
					}
				});
			} else {
				appRespObj.sendError(err);
			}

		});
		
		appRespObj.body = "Hello\n"
		//appRespObj.sendBody();

	});
}
app.listenToHttpPort = function() {
	this.httpServer.listen(3000, () => {
		console.log("Server is listening on Port 3000");
	});
}
app.startServer = function() {
	if (this.httpServer == undefined) {
		app.createHttpServer();
		app.initRoutes();
	}
	app.listenToHttpPort();

}



/* Function Invocation */
app.startServer();
