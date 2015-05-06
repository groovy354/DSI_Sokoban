var keypress = require('keypress');

var Sokoban = {};
var Board = require("./lib/board.js");
var BoardObject = require("./lib/board_object");
var ConsoleDisplay = require("./lib/display-console.js");

var plansza = new Board(20);
var display = new ConsoleDisplay(plansza);

var agent = new BoardObject("agent", "@", "red", 5, 5);

plansza.addObject(agent);

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
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
	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});

process.stdin.setRawMode(true);
process.stdin.resume();
