var Field = require("../field.js");
var rock = require("../materials/rock");

var Floor = function(){
	Field.call(this);
	this.set_material(rock);
}

Floor.prototype = Object.create(Field.prototype);

module.exports = Floor;