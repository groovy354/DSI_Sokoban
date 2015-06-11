var treelearn = require("./decisionTree.js");

var przykłady = require("../../testy_do_drzewa.json");

var atrybuty = ["temperature", "height", "slippery", "hardness"];
var klasa_domyślna = null;

console.log(
	JSON.stringify(treelearn(przykłady, atrybuty, klasa_domyślna), null, 3)
);