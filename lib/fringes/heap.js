var Heap = require("heap");


var HeapNode = function(object, weight){
	this.object = object;
	this.weight = weight;
}

var HeapFringe = function(){
	this.heap = new Heap(function(a, b){
		return a.weight - b.weight;
	})
}

HeapFringe.prototype.put = function(object, weight){
	weight = weight==undefined? 0 : weight;
	var node = new HeapNode(object, weight);
	this.heap.push(node);
}

HeapFringe.prototype.pop = function(){
	var node = this.heap.pop();
	return node.object;
}

HeapFringe.prototype.empty = function(){
	return this.heap.empty();
}

module.exports = HeapFringe;