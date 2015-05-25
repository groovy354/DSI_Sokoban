var treelearn = require("./decisionTree.js");

var przykłady = [
	{
		class: "koza",
		"ilość nóg": 4,
		"odgłos": "meeee"
	},
	{
		class: "krowa",
		"ilość nóg": 4,
		"odgłos": "muuuuu",
	}
]

var atrybuty = ["odgłos", "ilość nóg"];
var klasa_domyślna = null;

console.log(treelearn(przykłady, atrybuty, klasa_domyślna));