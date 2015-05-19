var clone = require("clone");
var Materials = require("./materials/materials");

var Field = function(board, x, y){
	this.material = null;
	this.position = {
		x: x,
		y: y
	}

	//this.board = board;
}

Field.prototype.set_material = function(material){
	this.material = material;
}

Field.prototype.is_obstacle = function(){
	if(this.material!=null){
		return true;
	}
	return false;
}

Field.prototype.switch_material = function(){
	if(this.material.name == "stone"){
		this.material = null;
	}else{
		this.material = Materials.Stone;
	}
}

Field.prototype.get_state = function(){
	var state = {};
	state.position = clone(this.position, false);

	state.object_stack = clone(this.object_stack);
	
	state.material = clone(this.material, false);

	return state;
}


module.exports = Field;