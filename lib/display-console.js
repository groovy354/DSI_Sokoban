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
				return "@".green;
			}else{
				return "#".gray;
			}			
		}else{
			return "#".gray;
		}
	}

	this.redraw = function(){
		console.log('\033[2J');
		var line = "";
		for(var i=0; i<this.board.size; i++){
			for(var j=0; j<this.board.size; j++){
				var object = this.board.fields[i][j].getTopObject();
				line += object_to_char(object) + " ";
			}
			line+="\n";
		}
		console.log(line);
	}
}

module.exports = DisplayConsole;