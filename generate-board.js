var Immutable = require("immutable");

var ConsoleDisplay = require("./lib/display-console");
var Board = require("./lib/board");
var Field = require("./lib/field");
var Materials = require("./lib/materials/materials");
var Genetic = require("./lib/genetic-algorithm");

var population = [];
var size = 10;
var population_size = 15;
for (var i = 0;i < population_size;i++){
	population.push(Board.random(size));
}

function crossBoards(boardMum, boardDad){
	var mumState = boardMum.get_state();
	var dadState = boardDad.get_state();
	var unitedState = {
		size: mumState.size,
		registred_objects: dadState.registred_objects,
		goal_position: Math.random()>0.5 ? mumState.goal_position : dadState.goal_position,
		/*
		object_positions: Immutable.Map({
			0 : Math.random()>0.5 ? mumState.object_positions.get(0) : dadState.object_positions.get(0),
			1 : Math.random()>0.5 ? mumState.object_positions.get(1) : dadState.object_positions.get(1),
		}),
		*/
	}
	unitedState.object_positions = Immutable.Map();
	unitedState.object_positions = unitedState.object_positions.set(0, Math.random()>0.5 ? mumState.object_positions.get(0) : dadState.object_positions.get(0));
	unitedState.object_positions = unitedState.object_positions.set(1, Math.random()>0.5 ? mumState.object_positions.get(1) : dadState.object_positions.get(1));
	var breakPoint = Math.floor(Math.random()*unitedState.size);
	var mumOrDad = Math.random() > 0.5;
	var united_fields = [];
	for (var i = 0; i < unitedState.size; i++){
		var whom_to_take_from;
		if(i <= breakPoint){
			whom_to_take_from = mumOrDad ? mumState : dadState;
		}else{
			whom_to_take_from = mumOrDad ? dadState : mumState;
		}
		united_fields[i] = whom_to_take_from.fields.get(i);
	}
	unitedState.fields = Immutable.fromJS(united_fields);
	return Board.fromState(unitedState);
}

function mutateBoard(board){
	var initialState = board.get_state();
	var finalState = initialState;
	finalState.goal_position = mutatePosition(finalState.goal_position.x, finalState.goal_position.y, finalState.size, 0.3); 
	var cratePosition = finalState.object_positions.get(1);
	cratePosition = mutatePosition(cratePosition.x, cratePosition.y, initialState.size, 0.2);
	finalState.object_positions = finalState.object_positions.set(1, cratePosition);
	var agentPosition = finalState.object_positions.get(0);
	agentPosition = mutatePosition(agentPosition.x, agentPosition.y, initialState.size, 0.2);
	finalState.object_positions = finalState.object_positions.set(0, agentPosition);

	var field_mutation_probability = 0.05;
	for(var x=0; x<board.size; x++){
		for(var y=0; y<board.size; y++){
			if(Math.random()<field_mutation_probability){
				var current_field = finalState.fields.get(parseInt(x)).get(parseInt(y));
				var new_field = new Field("", x, y);
				if(current_field.material!==null){
					new_field.set_material(null);
				}else{
					new_field.set_material(Materials.Stone);
				}
				finalState.fields = finalState.fields.set(x, finalState.fields.get(parseInt(x)).set(parseInt(y), new_field));
			}
		}
	}
	return Board.fromState(finalState);

}

function mutatePosition(x, y, size, probability){
	if (Math.random() < probability){
		var offsetParam = Math.floor(Math.pow(Math.random(),2)*size/1.5);
		var breakPoint = Math.floor(Math.random()*offsetParam);
		var signX = Math.sign(Math.random() - 0.5);
		var signY = Math.sign(Math.random() - 0.5);
		x = x + signX*breakPoint;
		y = y + signY*(offsetParam-breakPoint);
		if (x < 0) x = 0;
		if (x >= size) x = size - 1;
		if (y < 0) y = 0;
		if (y >= size) y = size - 1;
	}
	return { x : x, y : y,}
}

function fitness(plansza){
	var solving_path = plansza.solve(plansza.size*5, Math.pow(plansza.size, 3.2));
	if (!solving_path){
		console.log("fitness: ", 0);
		return 0;
	} else {
		console.log("fitness: ", solving_path.length);
		return solving_path.length;
	}
}

var cross_amount = 3;
var max_steps = 2;
var solutionBoard = Genetic(population, crossBoards, mutateBoard, fitness, max_steps, cross_amount);
console.log("solution in generate-board: ",solutionBoard.fitness);
ConsoleDisplay.solve_and_show(solutionBoard, size*5);

console.log("solution in generate-board: ",solutionBoard.fitness);
//new ConsoleDisplay(solutionBoard);
//var action_path = solutionBoard.solve()

//new ConsoleDisplay(population[0]);
//new ConsoleDisplay(mutateBoard(population[0]));
