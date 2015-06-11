require("colors");
var Board = require("./board");

var DisplayConsole = function(board){
	this.board = board;
	this.redraw();
	// PolaProject wydaje się, że plansze "dzieci", narodzone z funkcji crossBoards mają board.on undefined, co powoduje problemy
	board.on("change", function(){
		this.redraw();
	}.bind(this))
}

DisplayConsole.solve_and_show = function(board, max_depth, max_visited, callback){
	var initial_board_state = board.get_state();
	var max_depth = max_depth || board.size*3;
	var max_visited = max_visited || Math.pow(board.size, 3.2);
	var action_path = board.solve(max_depth, max_visited);

	if(!action_path) console.log("UNSOLVABLE".red); else{
		console.log("SOLVED!".green);	
		var board = Board.fromState(initial_board_state);
		var display = new DisplayConsole(board);
		board.perform_agent_action(action_path, callback);
		console.log(action_path.length, "kroków" .green);
	}
}

DisplayConsole.prototype = new function(){

	function object_to_char(object){
		if(object){
			return object.char[object.color];
		}else{
			return "";
		}
	}

	function material_to_char(material){
		if(material){
			if(material.name=="rock"){
				return String.fromCharCode(9632).white;
			}else{
				return "";
			}
		}else{
			return "";
		}
	}

	function field_to_char(field){
		var object = this.board.get_object_at(field.position);
		var object_char = object_to_char(object);
		var material_char = material_to_char(field.material);
		var to_print_char = '';
		if(object_char && material_char){
			to_print_char = object_char;
		}else if(object_char){
			to_print_char = object_char;
		}else if(material_char){
			to_print_char = material_char;
		}else if(this.board.field_is_goal(field.position.x, field.position.y)){
			to_print_char = "@".yellow;
		}else{
			to_print_char = " ";
		}
		return to_print_char;
	}

	this.redraw = function(){
		//console.log('\033[2J');
		var line = "";
		line+=String.fromCharCode(9484);
		for(var i=0; i<this.board.size; i++){
			line+=String.fromCharCode(9472)+String.fromCharCode(9472);
		}
		line+=String.fromCharCode(9488);
		line+="\n";
		for(var i=0; i<this.board.size; i++){
			line+=String.fromCharCode(9474);
			for(var j=0; j<this.board.size; j++){
				var field = this.board.fields.get(j).get(i);
				var to_print_char = (field_to_char.bind(this))(field);
				line += to_print_char + " ";
			}
			line+=String.fromCharCode(9474);
			line+="\n";
		}
		line+=String.fromCharCode(9492);
		for(var i=0; i<this.board.size; i++){
			line+=String.fromCharCode(9472)+String.fromCharCode(9472);
		}
		line+=String.fromCharCode(9496);
		line+="\n";
		console.log(line);
	}
}

module.exports = DisplayConsole;