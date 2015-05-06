var EventEmitter = require("events").EventEmitter;

var max_id = 0;

function BoardObject(name, char, color, x, y){
	EventEmitter.call(this);
	this.id = max_id++;
	this.x = x===undefined? null : x;
	this.y = y===undefined? null : y;
	this.name = name;
	this.board = null;
	this.char = char ? char : "#";
	this.color = color;
	this.movable = true;
}

BoardObject.prototype = Object.create(EventEmitter.prototype)

BoardObject.prototype.setPosition = function(x, y, emit){
	console.log(this.name + ".setPosition", arguments)
	emit = emit===undefined?true:emit;
	console.log(this.name, "emit:", emit);
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
	if(emit){
		this.emit("move", previous_location, current_location);
	}
}

BoardObject.prototype.setBoard = function(board){
	this.board = board;
}

BoardObject.prototype.get_current_position = function(){
	return {
		x: this.x,
		y: this.y
	}
}

BoardObject.prototype.move = function(y_offset, x_offset){
	var current_position = this.get_current_position();
	var new_position = {x: this.x + x_offset, y: this.y + y_offset};

	this.board.object_can_move_to(current_position, new_position);

	this.setPosition(this.x+x_offset, this.y+y_offset);
}

BoardObject.prototype.find_path_to_goal = function(){
	
}


module.exports = BoardObject;