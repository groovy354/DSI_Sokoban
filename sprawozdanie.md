#Sokoban - sprawozdanie 1

##Opis projektu
Program, który generuje trudne plansze do gry Sokoban. Moim zadaniem było napisanie algorytmu przechodzenia planszy. Ten algorytm będzie potem używany do funkcji oceny w algorytmie genetycznym, który będzie nagradzany za plansze, które wymagają dużej ilości kroków do ukończenia, przy małej ilości ścian.

##Wykonujący:
Jan Orlik

##Opis zadania
Zaimplementowania algorytmu przeszukiwania drzewa stanów.

##Użyte technologie:
* node.js
* immutable.js
* heap.js
* colors.js
* keypress.js

##Opis implementacji:
Sercem działania tej funkcjonalności jest algorytm `treesearch`:
```js
function Treesearch(fringe_class, initial_state, successor, goaltest, f, state_hasher, max_depth, max_visited_states){
    /*inicjalizacja zmiennych - wycięta */
    while(!fringe.empty()){
        var elem = fringe.pop();
        if(goaltest(elem.state)){
            ret = construct_response(elem);
            break;
        }
        amount_of_visited_states++;
        if(amount_of_visited_states>max_visited_states){
            break;
        }
        var next_nodes = successor(elem.state);
        if(elem.depth>=max_encountered_depth) max_encountered_depth = elem.depth;
        if(elem.depth < max_depth){
            for(var i in next_nodes){
                var state_hash = state_hasher(next_nodes[i].state);
                if(!visited_states[state_hash]){
                    var new_node = new Node(next_nodes[i].state, elem.depth+1);
                    new_node.parent = elem;
                    new_node.action = next_nodes[i].action;
                    var estimate = f(new_node.state, new_node.action);
                    if(estimate < best_estimate){ best_estimate = estimate};
                    {fringe.put(new_node, estimate + elem.depth);
                    visited_states[state_hash] = true;}
                }
            }
        }
    }
    return ret;
}  

```
Algorytm ten został wzbogacony o kilka argumentów:
* `state_hasher` - jest to funkcja, która jako argument przyjmuje *stan* planszy, a zwraca jego *hash*. Hash jest potrzebny, aby zapobiec sprawdzaniu dwa razy takiego samego stanu planszy. Dwa obiekty reprezentujące stan aplikacji są uznawane za reprezentujące *ten sam* stam, gdy funkcja `state_hasher` zwraca dla każdego z nich tę samą wartość.
* `max_depth` - liczba całkowita. `treesearch` nie będzie szukał stanów, których odległość od korzenia drzewa jest większa od tej liczby.
* `max_visited_states` - maksymalna liczba stanów, ktore możemy zdjąć z `fringe'a`. Przypadek, w którym algorytm zdejmie tę ilość stanów, a nie dojdzie do celu jest traktowany jako nie do rozwiązania.

##Problemy z aktualną implementacją
* program działa wolno (>1s) dla planszy, w których skrzynka ma dużą swobodę ruchu a w których cel jest nieosiągalny. Wtedy liczba potencjalnych stanów, w których znajduje się plansza gwałtownie "puchnie", a nigdy nie prowadzi do celu. Aktualnie ten problem jest rozwiązywany poprzez podanie odpowiednio niskich argumentów `max_depth` i `max_visited_states` do `treesearch`-a

##Napotkane, pokonane przeszkody
* W pierwotnej wersji kod bywał bardzo wolny (dochodziło nawet to wyczerpania dostępnej pamięci RAM). Było to spowodowane faktem, że dla każdego węzła w drzewie klonowany był obiekt planszy. Klonowanie samo w sobie było kosztowne obliczeniowo, a same klony zajmowały dużo pamięci.
* Algorytm przeglądał niektóre stany wiele razy, co miało bardzo negatywny wpływ na czas działania algorytmu. Zostało to rozwiązane za pomocą odpowiednio skonstruowanej funkcji `state_hasher`. Funkcja ta zwraca ciąg znaków, w którym są zakodowane pozycje skrzynki i agenta. Nie ma sensu sprawdzać stanu, który już został odwiedzony - a dwa stany, w których skrzynka i agent są odpowiednio w tych samych miejscach uznajemy za identyczne. 

##Ciekawowstki
* użycie `immutable.js` - pakietu z npm stworzonego przez Facebooka. Umożliwia on deweloperom tworzenie obiektów, które są niezmienialne - można jedynie tworzyć obiekty, które są modyfikacją jakiejś instancji immutable'a, ale dany immutable jest niezmienny. Przepisanie dużej części klasy `lib/board` z tradycyjnych obiektów JavaScriptowych na Immutable znacząco zwiększyło wydajność algorytmu - Immutable jest szybszy niż `clone` i zdecydowanie bardziej oszczędny, jeżeli chodzi o pamięć RAM. Wcześniej program "zjadał" nawet do 2GB pamięci RAM, teraz mieści się w 60-70 MB.