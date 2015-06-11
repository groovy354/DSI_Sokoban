var Field = require("../field.js");
var rock = require("../materials/rock");

var Wall = function(){
	Field.call(this);
	this.set_material(rock);
	this.is_obstacle = true;
}

Wall.prototype = Object.create(Field.prototype);

module.exports = Wall;