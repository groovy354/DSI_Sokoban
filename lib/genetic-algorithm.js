/*
population - próbka z której startujemy z rozwojem
crossover(board1, board2) - funkcja krzyżująca dwie plansze
mutation(board) - funkcja mutująca (losowo wprowadzająca lub nie losowe, drobne zmiany)
fitness(board) - funkcja oceniająca planszę
max_steps - liczba krzyżówek, któe wykonamy
solution_number - liczba rozwiązań, które mają przejść do "następnego etapu :)"

*/

function genetic(population, crossover, mutation, fitness, max_steps, solution_number){
	var population = population;
	var solution = [];
	var	population.sort(fitness);
	while (max_steps > 0){
		var best_fitness = 0;
		population.splice(solution_number);
		solution = population;
		for(var i in population){
			for(var j in population){
				if (i <> j){
					solution.push(crossover(population[i], population[j]);
				}
			}
		}
		solution.forEach(mutation);
		var solution.sort(fitness);
		population = solution;
		max_steps = max_steps -1;		
	}
	return solution
}