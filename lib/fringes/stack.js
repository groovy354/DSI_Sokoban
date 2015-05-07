function Stack(){
	this.items = [];
}

Stack.prototype.put = function(item){
	this.items.push(item)
}

Stack.prototype.empty = function(){
	return this.items.length == 0;
}

Stack.prototype.pop = function(){
	return this.items.pop();
}

module.exports = Stack;