var keypress = require('keypress');

var Sokoban = {};
var Board = require("./lib/board.js");
var BoardObject = require("./lib/board_object");
var ConsoleDisplay = require("./lib/display-console.js");
var Materials = require("./lib/materials/materials.js");

var plansza = new Board(10);
var display = new ConsoleDisplay(plansza);


var amount_of_walls = 10;
for(var i=1; i<=amount_of_walls; i++){
	var field = plansza.get_random_field();
	field.set_material(Materials.Stone);
}

var amount_of_crates = 5;
for(var i=1; i<=amount_of_crates; i++){
	var field = plansza.get_random_field();
	if(!field.is_obstacle()){
		var skrzynka = new BoardObject("crate", String.fromCharCode(9632), "yellow");
		field.insert(skrzynka);		
	}
}

var goal_field = plansza.get_random_field();
plansza.set_goal(goal_field.position.x, goal_field.position.y);


var agent = new BoardObject("agent", String.fromCharCode(9632), "green", 5, 5);

plansza.get_random_field().insert(agent);

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
	///*
	}catch(error){
		//console.error(error, error.stack);
		//throw error;
	}
	//*/
	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});

//console.log(agent.find_path_to_goal());

process.stdin.setRawMode(true);
process.stdin.resume();
