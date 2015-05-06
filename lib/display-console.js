require("colors");

var DisplayConsole = function(board){
	this.board = board;
	this.redraw();
	board.on("change", function(){
		this.redraw();
	}.bind(this))
}

DisplayConsole.prototype = new function(){

	function object_to_char(object){
		if(object){
			if(object.name =="agent"){
				return String.fromCharCode(9632).green;
			}else{
				return "#".gray;
			}			
		}else{
			return "";
		}
	}

	function material_to_char(material){
		if(material){
			if(material.name=="stone"){
				return String.fromCharCode(9632).white;
			}else{
				return "";
			}
		}else{
			return "";
		}
	}

	this.redraw = function(){
		console.log('\033[2J');
		var line = "";
		for(var i=0; i<this.board.size; i++){
			for(var j=0; j<this.board.size; j++){
				var object = this.board.fields[i][j].getTopObject();
				var object_char = object_to_char(object);
				var material_char = material_to_char(this.board.fields[i][j].material);
				var to_print_char = '';
				if(object_char && material_char){
					to_print_char = object_char;
				}else if(object_char){
					to_print_char = object_char;
				}else if(material_char){
					to_print_char = material_char;
				}else{
					to_print_char = " ";
				}
				line += to_print_char + " ";
			}
			line+="\n";
		}
		console.log(line);
	}
}

module.exports = DisplayConsole;