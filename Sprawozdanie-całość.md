#Sokoban - sprawozdanie całościowe

##Skład zespołu

* Jan Orlik
* Pola Mikołajczak
* Szymon Sobiepanek
* Marta Smektała


##Temat projektu

Program generujący plansze do gry Sokoban.

##Opis projektu

Nasz program korzysta z algorytmów sztucznej inteligencji, aby tworzyć plansze o zadanych wymiarach, które wymagają wykonania dużej ilośći ruchów, aby je ukończyć.

##Użyte algorytmy

Przechodzenie planszy - A* (wykonanie - **Jan Orlik**)

Generowanie planszy - Algorytm genetyczny (jako funkcję oceny wykorzystuje algorytm powyżej). Wykonanie - **Pola Mikołajczak**

Algorytm znajdowania ścieżki musi wiedzieć, czy agent może wejść na dane pole, czy nie. Wykorzystywane jest do tego drzewo decyzyjne, nauczone na wygenerowanych automatycznie przykładach opisów pól (wysokość, twardość, temperatura, śliskość). Wykonanie - **Marta Smektała**

Korzystamy także z sieci neuronowej do sprawdzania, jakiego typu jest dane pole (algorytm będzie wykorzystany przy wyświetlaniu planszy). Wykonanie - **Szymon Sobiepanek**

##Napotkane, pokonane przeszkody
* A* - W pierwotnej wersji kod bywał bardzo wolny (dochodziło nawet to wyczerpania dostępnej pamięci RAM). Było to spowodowane faktem, że dla każdego węzła w drzewie klonowany był obiekt planszy. Klonowanie samo w sobie było kosztowne obliczeniowo, a same klony zajmowały dużo pamięci.

##Ciekawostki
* użycie `immutable.js` - pakietu z npm stworzonego przez Facebooka. Umożliwia on deweloperom tworzenie obiektów, które są niezmienialne - można jedynie tworzyć obiekty, które są modyfikacją jakiejś instancji immutable'a, ale dany immutable jest niezmienny. Przepisanie dużej części klasy `lib/board` z tradycyjnych obiektów JavaScriptowych na Immutable znacząco zwiększyło wydajność algorytmu - Immutable jest szybszy niż `clone` i zdecydowanie bardziej oszczędny, jeżeli chodzi o pamięć RAM. Wcześniej program "zjadał" nawet do 2GB pamięci RAM, teraz mieści się w 60-70 MB.