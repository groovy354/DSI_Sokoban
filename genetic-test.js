var Genetic = require('./lib/genetic-algorithm.js');
var Board = require('./lib/board.js');


var population = new Array(20, 15, 23, 2);

function crossover(a,b){
	return (a+b)/2;
}


function mutation(a){
	var x = Math.random();
	if (x < 0.5){
		return a;
	}
	if (x < 0.75){
//		console.log("Great mutant! " + (a+1));
		return (a + 1);
	}
	else{

		return (a - 1);
	}
}

function fitness(a){
	return a;
}

var objPopulation = [{value: 2},{value: 18},{value: 23}]

function objCrossover(a, b){
	var c = {}
	c.value = (a.value + b.value)/2
	return c	
}

function objFitness(a){
	return -Math.abs(a.value - 50);
}

function objMutation(a){
	var x = Math.random();
	if (x < 0.5){
	}
	else if (x < 0.75){
//		console.log("Great mutant! " + (a+1));
		a.value = a.value + 1
	}
	else{
		a.value = a.value -1
	}
	return a
}

console.log(population);

var solution = new Array();

for (var i in population){
	solution.push(mutation(population[i]));
}

var solution_amount = 3;

//population.splice(0, solution_amount);

console.log(Genetic(objPopulation, objCrossover, objMutation, objFitness, 10, 3));



