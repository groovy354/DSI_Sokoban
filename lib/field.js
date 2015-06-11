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


var algorithm = "neural_network";

var neuralNetwork = require("../calculate.js");

var myNeuralNetwork= new neuralNetwork(4,1,40,40);
myNeuralNetwork.randomWages();
myNeuralNetwork.trainAll();

Field.prototype.set_material = function(material){
	this.material = material;
	if(material) this.material_instance = material.examplify();
}

Field.prototype.is_obstacle = function(subtree, use_decision_tree){
	if(this.material_instance==undefined) return false;
	if(algorithm=="decision_tree"){
		//decision tree
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
			return this.is_obstacle(new_subtree, true);
		}		
	}else{
		//neural network
		//naiveTest();
		var ret = myNeuralNetwork.predict([this.material_instance.height, this.material_instance.slippery, this.material_instance.hardness, this.material_instance.temperature])[0];
		ret =  Math.round(ret);
		return ret;
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