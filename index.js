var keypress = require('keypress');

var Sokoban = {};
var Board = require("./lib/board.js");
var BoardObject = require("./lib/board_object");
var ConsoleDisplay = require("./lib/display-console.js");
var Materials = require("./lib/materials/materials.js");

var plansza = new Board(20);

console.log("generating walls...");
var amount_of_walls = 85;
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
			field.insert(skrzynka);		
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


var agent = new BoardObject("agent", String.fromCharCode(9632), "green", 5, 5);

plansza.get_random_field().insert(agent);

/*
keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
	console.log(agent);
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
	//
	}catch(error){
		//console.error(error, error.stack);
		//throw error;
	}
	//
	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});
process.stdin.setRawMode(true);
process.stdin.resume();
*/
var initial_board_state = plansza.get_state();

var preview = new ConsoleDisplay(plansza);

var action_path = agent.find_path_to_goal(plansza.size*plansza.size);
if(!action_path) console.log("UNSOLVABLE".red)

var plansza = Board.fromState(initial_board_state);

function perform_agent_action(action_path){
	if(action_path.length>0){
		var action = action_path.pop();
		console.log(action);
		agent.move(action.y, action.x);
		setTimeout(function(){
			perform_agent_action(action_path);
		}, 150);
	}
}


var display = new ConsoleDisplay(plansza);

if(process.argv[2]==undefined) perform_agent_action(action_path);

