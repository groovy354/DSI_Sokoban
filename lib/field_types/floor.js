var Field = require("../field.js");
var Stone = require("../materials/stone");

var Floor = function(){
	Field.call(this);
	this.set_material(Stone);
}

Floor.prototype = Object.create(Field.prototype);

module.exports = Floor;