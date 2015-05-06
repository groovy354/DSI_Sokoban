var Field = require("../field.js");
var Stone = require("../materials/stone");

var Wall = function(){
	Field.call(this);
	this.set_material(Stone);
	this.is_obstacle = true;
}

Wall.prototype = Object.create(Field.prototype);

module.exports = Wall;