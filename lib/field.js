var clone = require("clone");

var Field = function(board, x, y){
	this.material = null;
	this.position = {
		x: x,
		y: y
	}

	this.board = board;
}

Field.prototype.set_material = function(material){
	this.material = material;
}

Field.prototype.is_obstacle = function(){
	/*
	if(this.object_stack.length>0){
		return true;
	}
	*/
	if(this.material!=null){
		return true;
	}
	return false;
}

Field.prototype.has_objects = function(){
	return this.object_stack.length>0;
}

Field.prototype.all_objects_movable = function(){
	for(var i in this.object_stack){
		if(!this.object_stack[i].movable){
			return false;
		}	
	}
	return true;
}

Field.prototype.get_all_objects = function(){
	return this.object_stack;
}

Field.prototype.get_state = function(){
	var state = {};
	state.position = clone(this.position, false);

	state.object_stack = clone(this.object_stack);
	
	state.material = clone(this.material, false);

	return state;
}


module.exports = Field;