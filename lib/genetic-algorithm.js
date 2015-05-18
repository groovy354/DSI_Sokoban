/*
population - próbka z której startujemy z rozwojem
crossover(board1, board2) - funkcja krzyżująca dwie plansze
mutation(board) - funkcja mutująca (losowo wprowadzająca lub nie losowe, drobne zmiany)
fitness(board1, board2) - funkcja porównująca plansze
max_steps - liczba krzyżówek, któe wykonamy
solution_number - liczba rozwiązań, które mają przejść do "następnego etapu :)"

*/

function Genetic(population, crossover, mutation, fitness, max_steps, solution_number){
	var population = population;
	var solution = [];
	population.sort(fitness);
	console.log('sorted');
	console.log(population);
	while (max_steps > 0){
		population.splice(solution_number, Number.MAX_VALUE);
		solution = population;
		for(var i in population){
			for(var j in population){
				if (i != j){
					solution.push(mutation(crossover(population[i], population[j])));
				}
			}
		}
		solution.sort(fitness);
		console.log(solution);
		population = solution;
		max_steps = max_steps - 1;		
	}
	return solution.splice(0, solution_number);
}

module.exports = Genetic;
