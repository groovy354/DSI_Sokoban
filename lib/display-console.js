require("colors");

var DisplayConsole = function(board){
	this.board = board;
	this.redraw();
	board.on("change", function(){
		this.redraw();
	}.bind(this))
}

DisplayConsole.prototype = new function(){
	this.redraw = function(){
		for(var i=0; i<this.board.size; i++){
			var line = "";
			for(var j=0; j<this.board.size; j++){
				line+="# ";
			}
			console.log(line);
		}
	}
}

module.exports = DisplayConsole;