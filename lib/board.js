var EventEmitter = require('events').EventEmitter;
var Field = require("./field.js");

var Board = function(size){
	EventEmitter.call(this);

	var ret = this;

	this.size = size;

	this.fields = [];

	for(var i=0; i<size; i++){
		this.fields[i] = [];
		for(var j=0; j<size; j++){
			this.fields[i][j] = new Field();
		}
	}
}

Board.prototype = Object.create(EventEmitter.prototype);
//Board.prototype.constructor = Board;

module.exports = Board;