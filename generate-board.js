var ConsoleDisplay = require("./lib/display-console");
var Genetic = require("./lib/genetic-algorithm");
var GeneticBoardsFunctions = require("./genetic-board-functions");
var Board = require("./lib/board");


var population = [];
var size = 10;
var population_size = 15;
for (var i = 0;i < population_size;i++){
	population.push(Board.random(size));
}


var cross_amount = 3;
var max_steps = 10;
var solutionBoard = Genetic(population, GeneticBoardsFunctions.crossBoards, GeneticBoardsFunctions.mutateBoard, GeneticBoardsFunctions.fitness, max_steps, cross_amount);
console.log("solution in generate-board: ",solutionBoard.fitness);
ConsoleDisplay.solve_and_show(
	solutionBoard, 
	size*GeneticBoardsFunctions.max_depth_factor, 
	Math.pow(size, GeneticBoardsFunctions.max_visited_factor)
	)

/*
var fs = require('fs');

function fitsort(a, b){
	return b.fitness - a.fitness;
}

function add_fitness(fitness_fn, element){
	if(!element.fitness){
		element.fitness = fitness_fn(element);
	}
	return element;
}

for (var i = 0; i < 10; i++){
	population = []
	for (var j = 0;j < population_size;j++){
	population.push(add_fitness(GeneticBoardsFunctions.fitness,Board.random(size)));
	}
	population = population.sort(fitsort);
	fs.writeFileSync('./random_rate.txt', population[0].fitness + "\n", {flag : 'a'});
}
*/