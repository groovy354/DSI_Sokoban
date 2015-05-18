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

function fitness(a,b){
	if (Math.abs(50 - a) < Math.abs(50 - b)){
		return -1;
	}
	else if (Math.abs(50 - a) < Math.abs(50 - b)){
		return 0;
	}
	else {
		return 1;
	} 
}

console.log(population);

var solution = new Array();

for (var i in population){
	solution.push(mutation(population[i]));
}

var solution_number = 3;

console.log(Genetic(population, crossover, mutation, fitness, 10, 3));



