function Material(name, slippery, soft, cold){
	this.name = name,
	this.slippery = slippery===undefined? false: slippery;
	this.soft = soft===undefined? false: soft;
	this.cold = cold===undefined? false: cold;
}

module.exports = Material;