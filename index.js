var keypress = require('keypress');

var Sokoban = {};
var Board = require("./lib/board.js");
var BoardObject = require("./lib/board_object");
var ConsoleDisplay = require("./lib/display-console.js");
var Materials = require("./lib/materials/materials.js");

var plansza = new Board(40);

console.log("generating walls...");
var amount_of_walls = 65;
for(var i=1; i<=amount_of_walls; i++){
	var field = plansza.get_random_field();
	field.set_material(Materials.Stone);
}
console.log("done!".green);

console.log("placing crate...");
var amount_of_crates = 1;
for(var i=1; i<=amount_of_crates; i++){
	var inserted = false;
	do{
		var field = plansza.get_random_field();
		if(!field.is_obstacle()){
			var skrzynka = new BoardObject("crate", String.fromCharCode(9632), "yellow");
			plansza.insert_object(field.position, skrzynka);
			inserted = true;
		}		
	}while(!inserted);
}
console.log("done!".green);

console.log("choosing crate goal...");
do{
	var goal_field = plansza.get_random_field();	
}while(goal_field.is_obstacle());
console.log("done!".green);

plansza.set_goal(goal_field.position.x, goal_field.position.y);


console.log("placing agent...");
var agent = new BoardObject("agent", String.fromCharCode(9632), "green", 5, 5);
plansza.insert_object(plansza.get_random_field().position, agent);
console.log("done!".green);

//=========================================================
/*
keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
	try{
		switch(key.name){
			case "up":
			plansza.move_object(agent.id, {x:0, y:-1});
			break;
			case "down":
			plansza.move_object(agent.id, {x:0, y:1});
			break;
			case "left":
			plansza.move_object(agent.id, {x:-1, y:0});
			break;
			case "right":
			plansza.move_object(agent.id, {x:1, y:0});
			break;
		}		
	//
	}catch(error){
		//console.error(error, error.stack);
		throw error;
	}
	//
	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});
process.stdin.setRawMode(true);
process.stdin.resume();
var preview = new ConsoleDisplay(plansza);

*/
//=========================================================

var initial_board_state = plansza.get_state();

var preview = new ConsoleDisplay(plansza);



var action_path = plansza.solve(plansza.size*3, Math.pow(plansza.size, 3));
if(!action_path) console.log("UNSOLVABLE".red); else console.log("SOLVED!".green);

var plansza = Board.fromState(initial_board_state);

function perform_agent_action(action_path){
	if(action_path.length>0){
		var action = action_path.pop();
		console.log(action);
		plansza.move_object(agent.id, action);
		setTimeout(function(){
			perform_agent_action(action_path);
		}, 100);
	}
}


var display = new ConsoleDisplay(plansza);

//perform_agent_action(action_path);