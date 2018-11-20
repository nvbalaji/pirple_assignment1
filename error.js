/*
	Assignment 1
	Author: Balaji N V
	Purpose: App error Object. It abstracts the error. All functions, while returning error, returns this object

*/

/* Object definition */
var errorWrapper = {};


//Object definitions
errorWrapper.errorObj = class {
	constructor(c,m) {
		this.obj = {};
		this.obj.errCode = 0;
		this.obj.errMsg = "";
		if (typeof(c) == "number") {
			this.obj.errCode = c;
		}
		if (typeof(m) == "string") {
			this.obj.errMsg = m;
		}
	}
	isOK() {
		return (this.obj.errCode == 0);
	}
	getErrBodyObjString() {
		return JSON.stringify(this.obj);
	}
	getErrBodyObj() {
		return this.obj;
	}
	get errorCode() {
		return this.obj.errCode;
	}

	set errorCode(c) {
		this.obj.errCode = c;	
	}

	get errMsg() {
		return this.obj.msg;
	}

	set errMsg(m) {
		this.obj.msg = m;
	}

	get httpStatusCode() {
		if (typeof this.httpCode == "undefined") {
			this.httpCode = 200;
			switch(this.obj.errCode) {
				case -1:
					this.httpCode = 404;
					break;
				default:
					break;
			}
		}
		return this.httpCode;
	}

	set httpStatusCode(c) {
		this.httpCode = c;
	}

}

//static definitions
errorWrapper.createErrorObj = function(c, m) {
	return new this.errorObj(c,m);
};





/* Export */
module.exports = errorWrapper;






