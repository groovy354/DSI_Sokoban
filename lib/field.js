var clone = require("clone");
var Materials = require("./materials/materials");

var decision_tree_result = require("./decision_tree/result.json");

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
	this.material_instance = material.examplify();
}

Field.prototype.is_obstacle = function(subtree){
	if(this.material==null) return false;
	if(subtree===undefined){
		subtree = decision_tree_result;
	}
	if(typeof subtree == "boolean"){
		return subtree;
	}else if(typeof subtree == "string"){
		return subtree=="true";
	}else{
		var keys = Object.keys(subtree);
		var new_subtree = subtree[keys[0]][this.material_instance[keys[0]]];
		return this.is_obstacle(new_subtree);
	}

	/*
	if(this.material!=null){
		return true;
	}
	return false;
	*/
}

Field.prototype.switch_material = function(){
	if(this.material.name == "rock"){
		this.material = null;
	}else{
		this.material = Materials.rock;
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