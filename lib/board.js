var clone = require("clone");
var md5 = require("MD5");
var CircularJSON = require("circular-json");

var EventEmitter = require('events').EventEmitter;
var Field = require("./field.js");

var TreeSearch = require("./treesearch.js");

var Board = function(size, fields){
	EventEmitter.call(this);

	var ret = this;

	this.size = size;

	if(fields){
		this.fields = fields;
	}else{
		this.fields = [];

		for(var x=0; x<size; x++){
			this.fields[x] = [];
			for(var y=0; y<size; y++){
				this.fields[x][y] = new Field(this, x, y);
			}
		}		
	}


	this.registred_objects = {};
	this.object_positions = {};
	this.objects_by_position = {};
	this.constructor = Board;
}

Board.fromState = function(state){
	var ret = new Board(state.size, state.fields);
	ret.registred_objects = {};
	for(var x=0; x<state.size; x++){
		for(var y=0; y<state.size; y++){
			ret.fields[x][y].material = state.fields[x][y].material;
		}
	}
	ret.set_goal(state.goal_position.x, state.goal_position.y)
	ret.registred_objects = clone(state.registred_objects, false);
	ret.object_positions = clone(state.object_positions, false);
	ret.objects_by_position = clone(state.objects_by_position, false);
	return ret;
	
	//return state;
}

Board.hash_state = function(state){
	/*var temp_board = Board.fromState(state);
	var object_positions = {};
	var hash = "";
	for(var i in temp_board.registred_objects){
		var object = temp_board.registred_objects[i];
		if(object_positions[object.name]==undefined){
			object_positions[object.name] = [];
		}
		object_positions[object.name].push({x:object.x, y:object.y});
	}
	for(var object_name in object_positions){
		object_positions[object_name] = object_positions[object_name].sort(function(a, b){
			return a.x - b.x;
		})
		hash += object_name + ":" + object_positions[object_name].map(function(a){return a.x+"-"+a.y}).join(",") + ";";
	}
	//return md5(CircularJSON.stringify(state.fields));
	return hash;
	*/
	var all_objects = [];
	for(var id in state.object_positions){
		var object_name = state.registred_objects[id].name;
		var object_position = state.object_positions[id];
		if(all_objects[object_name]==undefined) all_objects[object_name]=[];
		all_objects[object_name].push(object_position);
	}
	var hash = "";
	for(var object_name in all_objects){
		var object_positions = all_objects[object_name].sort(function(a, b){return a.x-b.x}).map(function(pos){return pos.x+","+pos.y}).join(",");
		hash+=object_name + ":" +  object_positions + ";";
	}
	return hash;
}

Board.prototype = Object.create(EventEmitter.prototype);


function remove_object_from_field(position, object_id){
	var position_hash = position_hasher(position);
	var objects_in_that_position = this.objects_by_position[position_hash];
	var index = null;
	for(var i in objects_in_that_position){
		if(objects_in_that_position[i].id==object_id) index=i;
	}
	if(index!==null) this.objects_by_position[position_hash].splice(index, 1);
	delete this.registred_objects[object_id];//questionable
	delete this.object_positions[object_id];
}

function add_object_to_field(position, object){
	var position_hash = position_hasher(position);
	if(this.objects_by_position[position_hash]==undefined) this.objects_by_position[position_hash]=[];
	this.objects_by_position[position_hash].push(object);
	this.registred_objects[object.id] = object;
	this.object_positions[object.id] = position;
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

Board.prototype.handle_object_move = function(boardObject, from, to){
	var to_field = 	 this.fields[to.x][to.y];
	var direction = {
		x: Math.sign(to.x - from.x),
		y: Math.sign(to.y - from.y),
	}
	if(this.field_has_objects(to)){
		var objects = this.objects_by_position[position_hasher(to)];
		for(var i in objects){
			var object = objects[i];
			//objects[i].move(direction.y, direction.x);
			this.move_object(objects[i].id, direction);
		}
	}
	remove_object_from_field.call(this, from, boardObject.id);
	add_object_to_field.call(this, to, boardObject);
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

Board.prototype.field_has_objects = function(position){
	var position_hash = position_hasher(position);
	return this.objects_by_position[position_hash]!==undefined && this.objects_by_position[position_hash].length>0;
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
	var direction = {
		x: Math.sign(to.x-from.x),
		y: Math.sign(to.y-from.y),
	}
	if(this.field_has_objects(to)){
		var objects = this.objects_by_position[position_hasher(to)];
		for(var i in objects){
			var object = objects[i];
			var object_should_move_to = {
				x: to.x + direction.x,
				y: to.y + direction.y,
			};
			var current_object_position = {
				x: to.x,
				y: to.y,
			}
			if(!this.object_can_move_to(current_object_position, object_should_move_to, false)){
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
	var object_position = this.object_positions[object_id]
	return Math.abs(object_position.x-this.goal_position.x)+Math.abs(object_position.y-this.goal_position.y);
}

Board.prototype.get_state = function(){
	var ret = {};
	ret.size = this.size;
	ret.fields = this.fields;
	/*
	for(var i=0; i<this.size; i++){
		ret.fields[i] = [];
		for(var j=0; j<this.size; j++){
			//ret.fields = this.fields[i][j].get_state();
		}
	}
	*/
	ret.goal_position = this.goal_position;
	ret.registred_objects = this.registred_objects;
	ret.object_positions = clone(this.object_positions, false);
	ret.objects_by_position = clone(this.objects_by_position, false);
	return ret;
}

Board.prototype.where_is = function(object_id){
	return this.object_positions[object_id];
}

Board.prototype.get_possible_moves_for_object = function(object_id){
	var object_position = this.where_is(object_id);
	var possible_actions = [{x:-1, y:0}, {x:1, y:0}, {x:0, y:-1}, {x:0, y:1}];
	var ret = [];
	for(var i in possible_actions){
		var action = possible_actions[i];
		var new_pos = {
			x: object_position.x + action.x,
			y: object_position.y + action.y,
		}
		if(this.object_can_move_to(object_position, new_pos, false)){
			ret.push(action);
		}
	}
	return ret;
}

Board.prototype.move_object = function(object_id, offset){
	var object = this.registred_objects[object_id];
	var old_pos = this.object_positions[object_id];
	var new_pos = {
		x: old_pos.x + offset.x,
		y: old_pos.y + offset.y,
	}
	if(this.object_can_move_to(old_pos, new_pos, false)){
		this.handle_object_move(object, old_pos, new_pos);		
	}
}

Board.prototype.is_at_goal = function(object_id){
	var object_position = this.object_positions[object_id]
	var ret = (this.goal_position.x==object_position.x) && (this.goal_position.y==object_position.y)
	return ret;
}

Board.prototype.get_object_by_name = function(name){
	for(var i in this.registred_objects){
		if(this.registred_objects[i].name == name){
			return this.registred_objects[i];
		}
	}
	return null;
}

function position_hasher(position){
	return position.x + "," + position.y;
}

Board.prototype.insert_object = function(position, object){
	this.registred_objects[object.id] = object;
	var position_hash = position_hasher(position);
	if(this.objects_by_position[position_hash]==undefined) this.objects_by_position[position_hash] = [];
	this.objects_by_position[position_hash].push(object);
	this.registred_objects[object.id] = object;
	this.object_positions[object.id] = position;
	this.emit("change");
}

Board.prototype.get_object_at = function(position){
	var position_hash = position_hasher(position);
	if(this.objects_by_position[position_hash]==undefined || this.objects_by_position[position_hash].length==0){
		return null;
	}else{
		return this.objects_by_position[position_hash][0];
	}
}

Board.prototype.solve = function(max_depth){
	var fringe = require("./fringes/heap.js");
	var agent_id = this.get_object_by_name("agent").id;
	var that = this;
	
	function successor(state){
		var board = Board.fromState(state);
		var actions = board.get_possible_moves_for_object(agent_id);
		var ret = [];
		var temp_board;
		for(var i in actions){
			temp_board = Board.fromState(state);

			var action = actions[i];
			temp_board.move_object(agent_id, action);


			var to_push = {
				action: action,
				state: temp_board.get_state(),				
			};

			ret.push(to_push);
		}	
		return ret;
	}

	function goaltest(state){
		var board = Board.fromState(state);
		var crate = board.get_object_by_name("crate");
		return board.is_at_goal(crate.id);
		//return board.is_at_goal(agent_id);
	}

	function estimator(state, action){
		var board = Board.fromState(state);
		board.move_object(agent_id, action);
		
		var crate = board.get_object_by_name("crate");
		var from_crate_to_goal = board.estimate(crate.id);
		var agent_position = board.object_positions[agent_id];
		var crate_position = board.object_positions[crate.id];
		var from_agent_to_crate = Math.abs(agent_position.x-crate_position.x) + Math.abs(crate_position.y-agent_position.y) -1;

		var divider = process.argv[2]? process.argv[2] : 1;
		var ret = from_crate_to_goal + from_agent_to_crate/divider;
		return ret;
	}

	var initial_state = this.get_state();

	function state_hasher(state){
		return Board.hash_state(state);
	}

	return TreeSearch(fringe, initial_state, successor, goaltest, estimator, max_depth, state_hasher);
}

//Board.prototype.constructor = Board;

module.exports = Board;