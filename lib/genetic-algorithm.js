/*
population - próbka z której startujemy z rozwojem
crossover(board1, board2) - funkcja krzyżująca dwie plansze
mutation(board) - funkcja mutująca (losowo wprowadzająca lub nie losowe, drobne zmiany)
fitness(board1, board2) - funkcja oceniająca planszę
max_steps - liczba krzyżówek, któe wykonamy
cross_amount - liczba rozwiązań, które mają przejść do następnego etapu i się rozmnażać

*/
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


function Genetic(population, crossover, mutation, fitness, max_steps, cross_amount){
	var population = population;
	var solution = [];
	population = population.map(add_fitness.bind(this, fitness))
	population.sort(fitsort);
	while (max_steps > 0){
		population = population.splice(0, cross_amount);
		solution = population;
		for(var i in population){
			for(var j in population){
				if (i != j){
					solution.push(mutation(crossover(population[i], population[j])));
				}
			}
		}
		solution = solution.map(add_fitness.bind(this, fitness))
		solution = solution.sort(fitsort);
		fs.writeFileSync('./genetic.txt', solution[0].fitness + "\n", {flag : 'a'});
		population = solution;
		max_steps = max_steps - 1;
	}
	console.log("solution_fitness: ", solution[0].fitness);
	return solution[0];
}

module.exports = Genetic;
