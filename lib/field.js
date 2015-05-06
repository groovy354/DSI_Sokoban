var Field = function(){
	this.contained_objects = {};
	this.last_object = null;
	this.material = null;
	this.is_obstacle = false;
}

Field.prototype.insert = function(object){
	this.contained_objects[object.id] = object;
	this.last_object = object;
}

Field.prototype.getTopObject = function(){
	return this.last_object;
}

Field.prototype.remove_object = function(object_id){
	this.last_object = null;
	if(this.contained_objects[object_id]) delete this.contained_objects[object_id];
}

Field.prototype.set_material = function(material){
	this.material = material;
}

module.exports = Field;