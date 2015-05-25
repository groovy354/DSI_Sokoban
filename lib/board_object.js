var clone = require("clone");

var EventEmitter = require("events").EventEmitter;

function BoardObject(id, name, char, color){
	EventEmitter.call(this);
	this.id = id;
	this.name = name;
	this.char = char ? char : "#";
	this.color = color;
	this.movable = true;
}

BoardObject.prototype = Object.create(EventEmitter.prototype)


module.exports = BoardObject;