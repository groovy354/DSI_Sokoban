var keypress = require('keypress');

var Sokoban = {};
var Board = require("./lib/board.js");
var BoardObject = require("./lib/board_object");
var ConsoleDisplay = require("./lib/display-console.js");
var Materials = require("./lib/materials/materials.js");

var plansza = new Board(40);
var display = new ConsoleDisplay(plansza);


var amount_of_walls = 900;
for(var i=1; i<=amount_of_walls; i++){
	var field = plansza.get_random_field();
	field.set_material(Materials.Stone);
}


var agent = new BoardObject("agent", "@", "red", 5, 5);

plansza.addObject(agent);

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
	try{
		switch(key.name){
			case "up":
			agent.move(0, -1);
			break;
			case "down":
			agent.move(0,1);
			break;
			case "left":
			agent.move(-1, 0);
			break;
			case "right":
			agent.move(1, 0);
			break;
		}		
	}catch(error){
		//console.error(error);
	}
	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});

process.stdin.setRawMode(true);
process.stdin.resume();
