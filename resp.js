/*
	Assignment 1
	Author: Balaji N V
	Purpose: Wrapper for Response sending 

*/

/*Export object creation*/
var responseWrapper =  {};

/*Definitions */



//Object functions
responseWrapper.ResponseObj = class {
	constructor(r, b) {
		this.res = null; 
		this.bodyObj = null;
		if (typeof r == "object") {
			this.res = r;
		}
		if (typeof b != "object") {
			this.bodyObj = b;
		}

	}
	set body(b) {
		this.bodyObj = b;
	}
	
	get body() {
		return this.bodyObj;
	}

	sendError(err) {
		this.sendRsp(err.httpStatusCode, 
				 { "content-type": "application/json", 
		           	"charset": "utf-8"
		         }, err.getErrBodyObj());
	}

	sendBody(str) {
		if (typeof str != "undefined") {
			this.body = str;
		}

		this.res.end(this.body);
	}

	sendRsp(status, hdr, rspBodyObj) {
		this.res.writeHead(status, hdr)
		this.res.end(JSON.stringify(rspBodyObj));
	}


}

//Static functions

responseWrapper.createResponse = function(res) {
	return new responseWrapper.ResponseObj(res);
}





/* Exports*/
module.exports = responseWrapper;