var treelearn = require("./decisionTree.js");

var przykłady = require("../firmy.json");

var atrybuty = ["type", "age", "competition"];
var klasa_domyślna = null;

console.log(
	JSON.stringify(treelearn(przykłady, atrybuty, klasa_domyślna), null, 3)
);