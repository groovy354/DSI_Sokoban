var clone = require("clone");

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
	this.constructor = Board;
}

Board.fromState = function(state){
	var ret = new Board(state.size);
	ret.registred_objects = {};
	for(var x=0; x<state.size; x++){
		for(var y=0; y<state.size; y++){
			for(var i in state.fields[x][y].object_stack){
				var object = state.fields[x][y].object_stack[i];
				ret.fields[x][y].insert(object); //order not preserved!
				object.x = x;
				object.y = y;
			}
		}
	}
	ret.goal_position = state.goal_position;
	return ret;
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
		this.emit("change");
		this.registred_objects[object.id] = object;
	}
}

Board.prototype.handle_object_move = function(boardObject, from, to){
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

Board.prototype.object_can_move_to = function(from, to, throw_error){
	throw_error = throw_error === undefined? true : throw_error;
	if(to.x<0 || to.y<0 || to.y>=this.size || to.x>=this.size){
		if(throw_error) throw new Error("Cannot move out of bounds!");
		return false;
	}
	var to_field = this.fields[to.x][to.y];
	if(to_field.is_obstacle()){
		if(throw_error)  throw new Error("Obstacle!");
		return false;
	}
	if(to_field.has_objects() &&  !to_field.all_objects_movable()){
		if(throw_error) throw new Error("Unmovable object!");
		return false;
	}
	var direction = {
		x: Math.sign(to.x-from.x),
		y: Math.sign(to.y-from.y),
	}
	if(to_field.has_objects()){
		var objects = to_field.get_all_objects();
		for(var i in objects){
			var object = objects[i];
			var object_should_move_to = {
				x: object.x + direction.x,
				y: object.y + direction.y,
			};
			var current_object_position = {
				x: object.x,
				y: object.y,
			}
			if(!this.object_can_move_to(current_object_position, object_should_move_to, object.id, false)){
				if(throw_error) throw new Error("Something is blocking the way");
				return false;
			}
		}
	}
	return true;
}


Board.prototype.set_goal = function(x, y){
	this.fields[x][y].is_goal = true;
	this.goal_position = {
		x: x,
		y: y,
	}
}

Board.prototype.estimate = function(object_id){
	var agent = this.registred_objects[object_id];
	return Math.abs(agent.x-this.goal_position.x)+Math.abs(agent.y-this.goal_position.y);
}

Board.prototype.get_state = function(){
	var ret = clone(this);
	ret.goal_position = this.goal_position;
	return this;
}

Board.prototype.get_possible_moves_for_object = function(object_id){
	var object = this.registred_objects[object_id];
	var current_pos = {
		x: object.x,
		y: object.y
	}
	var possible_actions = [{x:-1, y:0}, {x:1, y:0}, {x:0, y:-1}, {x:0, y:1}];
	var ret = [];
	for(var i in possible_actions){
		var action = possible_actions[i];
		var new_pos = {
			x: current_pos.x + action.x,
			y: current_pos.y + action.y,
		}
		if(this.object_can_move_to(current_pos, new_pos, false)){
			ret.push(action);
		}
	}
	return ret;
}

Board.prototype.move_object = function(object_id, offset){
	var object = this.registred_objects[object_id];
	var old_pos = {
		x: object.x,
		y: object.y,
	}
	var new_pos = {
		x: object.x + offset.x,
		y: object.y + offset.y,
	}
	this.handle_object_move(object, old_pos, new_pos);
}

Board.prototype.is_at_goal = function(object_id){
	var object = this.registred_objects[object_id];
	return (this.goal_position.x==object.x) && (this.goal_position.y==object.y)
}

//Board.prototype.constructor = Board;

module.exports = Board;