var EventEmitter = require("events").EventEmitter;

var max_id = 0;

function BoardObject(name, char, color, x, y){
	EventEmitter.call(this);
	this.id = max_id++;
	this.x = x;
	this.y = y;
	this.name = name;
	this.board = null;
}

BoardObject.prototype = Object.create(EventEmitter.prototype)

BoardObject.prototype.setPosition = function(x, y){
	var previous_location = {
		x: this.x, 
		y: this.y
	}
	this.x = x;
	this.y = y;

	var current_location = {
		x:x,
		y: y
	}
	this.emit("move", previous_location, current_location);
}

BoardObject.prototype.setBoard = function(board){
	this.board = board;
}

BoardObject.prototype.move = function(y_offset, x_offset){
	this.setPosition(this.x+x_offset, this.y+y_offset);
}

module.exports = BoardObject;