var EventEmitter = require("events").EventEmitter;

function BoardObject(name, x, y){
	EventEmitter.call(this);
	this.x = x;
	this.y = y;
	this.name = name;
}

BoardObject.prototype = Object.create(EventEmitter.prototype)

BoardObject.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
}