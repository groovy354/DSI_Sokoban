var clone = require("clone");

var TreeSearch = require("./treesearch.js");
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
	emit = emit===undefined?true:emit;
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
		this.board.handle_object_move(this, previous_location, current_location);
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

	if(this.board.object_can_move_to(current_position, new_position, false)){
		this.setPosition(this.x+x_offset, this.y+y_offset);		
	}

}

BoardObject.prototype.find_path_to_goal = function(max_depth){
	var fringe = require("./fringes/heap.js");
	var my_id = this.id;
	var that = this;
	
	function successor(state){
		var board = that.board.constructor.fromState(state);
		var actions = board.get_possible_moves_for_object(my_id);
		var ret = [];
		for(var i in actions){
			var temp_board = that.board.constructor.fromState(state);

			var action = actions[i];
			temp_board.move_object(my_id, action);


			var to_push = {
				action: action,
				state: temp_board.get_state(),				
			};

			ret.push(to_push);
		}	
		return ret;
	}

	function goaltest(state){
		var board = that.board.constructor.fromState(state);
		var crate = board.get_object_by_name("crate");
		return board.is_at_goal(crate.id);
	}

	function estimator(state, action){
		var board = that.board.constructor.fromState(state);
		var crate = board.get_object_by_name("crate");
		var from_crate_to_goal = board.estimate(crate.id);
		var agent = board.get_object_by_name("agent");
		var from_agent_to_crate = Math.abs(agent.x-crate.x) + Math.abs(crate.y-agent.y) -1;

		var divider = process.argv[2]? process.argv[2] : 1;
		return from_crate_to_goal + from_agent_to_crate/divider;
	}

	var initial_state = this.board.get_state();

	function state_hasher(state){
		return that.board.constructor.hash_state(state);
	}

	return TreeSearch(fringe, initial_state, successor, goaltest, estimator, max_depth, state_hasher);
}


module.exports = BoardObject;