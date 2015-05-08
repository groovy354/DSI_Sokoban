var clone = require("clone");

var Field = function(board, x, y){
	this.contained_objects = {};

	this.object_stack = [];

	this.last_object = null;
	this.material = null;
	this.position = {
		x: x,
		y: y
	}

	this.board = board;
}

Field.prototype.insert = function(object){
	this.contained_objects[object.id] = object;
	this.object_stack.push(object);
	this.last_object = object;
	object.setBoard(this.board);
	object.setPosition(this.position.x, this.position.y, false);
	this.board.handle_object_insert(object);
}

Field.prototype.getTopObject = function(){
	var slice = this.object_stack.slice(-1);
	if(slice.length==0){
		return null;
	}else{
		return slice[0];
	}
}

Field.prototype.remove_object = function(object_id){
	if(this.contained_objects[object_id]){
		delete this.contained_objects[object_id];
		for(var i in this.object_stack){
			if(this.object_stack[i].id==object_id){
				this.object_stack.splice(i, 1);
			}
		}	
	} 
	this.last_object = this.getTopObject();
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