var clone = require("clone");

var EventEmitter = require("events").EventEmitter;

var max_id = 0;

function BoardObject(name, char, color){
	EventEmitter.call(this);
	this.id = max_id++;
	this.name = name;
	this.char = char ? char : "#";
	this.color = color;
	this.movable = true;
}

BoardObject.prototype = Object.create(EventEmitter.prototype)


module.exports = BoardObject;