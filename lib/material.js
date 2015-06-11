function Material(name, height_bounds, slippery_bounds, hardness_bounds, temperature_bounds){
	this.name = name,
	this.height_bounds = height_bounds;
	this.slippery_bounds = slippery_bounds;
	this.hardness_bounds = hardness_bounds;
	this.temperature_bounds = temperature_bounds;
}

function from_bounds(bounds){
	return Math.floor(bounds[0] + Math.random()*(bounds[1]-bounds[0]+1));
}

Material.prototype.examplify = function(){
	var ret = {};
	ret.name = this.name;
	ret.height = from_bounds(this.height_bounds);
	ret.slippery = from_bounds(this.slippery_bounds);
	ret.hardness = from_bounds(this.hardness_bounds);
	ret.temperature = from_bounds(this.temperature_bounds);
	return ret;
}

module.exports = Material;