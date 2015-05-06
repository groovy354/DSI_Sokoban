/*
fringe - struktura danych (np stos, kolejka) przechowująca wierzchołki do odwiedzenia
initial_state  - ~
successor - funkcja następnika
goaltest - funkcja, która dla danego stanu zwraca true, jeżeli stan jest stanem spełniającym cel, false w przeciwnym razie
f - funkcja kosztu
*/

function Treesearch(fringe_class, initial_state, successor, goaltest, f){
	var fringe = new fringe_class();

	fringe.put(new Node(initial_state));
	while(!fringe.empty()){
		var elem = fringe.pop();
		if(goaltest(elem.state)){
			//return .parent.parent ..
		}
		var next_nodes = successor(elem.state);
		for(var i in next_nodes){
			var new_node = new Node(next_nodes[i].state);
			new_node.parent = elem;
			new_node.action = next_nodes[i].action;
		}
	}
	return false;
}	