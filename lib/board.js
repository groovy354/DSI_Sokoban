var EventEmitter = require('events').EventEmitter;
var Field = require("./field.js");

var Board = function(size){
	EventEmitter.call(this);

	var ret = this;

	this.size = size;

	this.fields = [];

	for(var x=0; x<size; x++){
		this.fields[x] = [];
		for(var y=0; y<size; y++){
			this.fields[x][y] = new Field(this, x, y);
		}
	}

	this.registred_objects = {};
}

Board.prototype = Object.create(EventEmitter.prototype);


function remove_object_from_field(x, y, object_id){
	this.fields[x][y].remove_object(object_id);
}

function add_object_to_field(x, y, object){
	this.fields[x][y].insert(object);
}
/*
Board.prototype.addObject = function(boardObject){
	if(boardObject.x!==undefined && boardObject.y!==undefined){
		add_object_to_field.call(this, boardObject.x, boardObject.y, boardObject)
	}
	boardObject.setBoard(this);
	boardObject.on("move", handle_object_move.bind(this, boardObject));
	this.emit("change");
}
*/

Board.prototype.handle_object_insert = function(object){
	if(!(object.id in this.registred_objects)){
		object.on("move", handle_object_move.bind(this, object));
		this.emit("change");
		this.registred_objects[object.id] = object;
	}
}

function handle_object_move(boardObject, from, to){
	var from_field = this.fields[from.x][from.y];
	var to_field = 	 this.fields[to.x][to.y];
	var direction = {
		x: Math.sign(to.x - from.x),
		y: Math.sign(to.y - from.y),
	}
	if(to_field.has_objects() && to_field.all_objects_movable()){
		var objects = to_field.get_all_objects();
		for(var i in objects){
			var object = objects[i];
			objects[i].move(direction.y, direction.x);
		}
	}
	remove_object_from_field.call(this, from.x, from.y, boardObject.id);
	add_object_to_field.call(this, to.x, to.y, boardObject);
	this.emit("change");
}

function random(max){
	return Math.floor(Math.random()*max);
}

Board.prototype.get_random_field = function(){
	var x = random(this.size);
	var y = random(this.size);
	return this.fields[x][y];
}

Board.prototype.object_can_move_to = function(from, to){
	if(to.x<0 || to.y<0 || to.y>=this.size || to.x>=this.size){
		throw new Error("Cannot move out of bounds!");
	}
	var to_field = this.fields[to.x][to.y];
	if(to_field.is_obstacle()){
		throw new Error("Obstacle!");
	}
	if(to_field.has_objects() &&  !to_field.all_objects_movable()){
		throw new Error("Unmovable object!");
	}
}


Board.prototype.set_goal = function(x, y){
	this.fields[x][y].is_goal = true;
	this.goal_position = {
		x: x,
		y: y,
	}
}

Board.prototype.estimate = function(){
	var agent;
	for(var i in registred_objects){
		if(registred_objects[i].name=="agent"){
			agent = registred_objects[i];
			break;
		}
	}
	return (agent.x-this.goal_position.x)+(agent.y-this.goal_position.y);
}

//Board.prototype.constructor = Board;

module.exports = Board;