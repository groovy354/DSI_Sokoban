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


function remove_object_from_field(x, y, object_id){
	this.fields[x][y].remove_object(object_id);
}

function add_object_to_field(x, y, object){
	this.fields[x][y].insert(object);
}

Board.prototype.addObject = function(boardObject){
	if(boardObject.x!==undefined && boardObject.y!==undefined){
		add_object_to_field.call(this, boardObject.x, boardObject.y, boardObject)
	}
	boardObject.on("move", function(from, to){
		remove_object_from_field.call(this, from.x, from.y, boardObject.id);
		add_object_to_field.call(this, to.x, to.y, boardObject);
		this.emit("change");
	}.bind(this));
	this.emit("change");
}

//Board.prototype.constructor = Board;

module.exports = Board;