var keypress = require('keypress');

var Sokoban = {};
var Board = require("./lib/board.js");
var ConsoleDisplay = require("./lib/display-console.js");

var plansza = Board.random(20);
var agent = plansza.get_object_by_name("agent");

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

//var preview = new ConsoleDisplay(plansza);


function perform_agent_action(action_path){
	if(action_path.length>0){
		var action = action_path.pop();
		plansza.move_object(agent.id, action);
		setTimeout(function(){
			perform_agent_action(action_path);
		}, 100);
	}
}

var action_path = plansza.solve(plansza.size*3, Math.pow(plansza.size, 3.2));
if(!action_path) console.log("UNSOLVABLE".red); else{
	console.log("SOLVED!".green);	
	var plansza = Board.fromState(initial_board_state);
	var display = new ConsoleDisplay(plansza);
	perform_agent_action(action_path);
} 


perform_agent_action(action_path);

