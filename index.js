var Sokoban = {};
var Board = require("./lib/board.js");
var ConsoleDisplay = require("./lib/display-console.js");

var plansza = new Board(10);
var display = new ConsoleDisplay(plansza);

