var Set = require("Set"); // klasa zbior 

function najczestsza_klasa (przyklady) {
	var ilosc_wystapien_klas = {};//tworzy pusta mape -patrzymy jakie to zwierze// ilosc zwierzat na ilosc wystapien // obecnosc

	for (var i in przyklady) {
		var klasa_przykladu = przyklady[i].class;// krowe zwracamy
		if (ilosc_wystapien_klas[klasa_przykladu] === undefined) {// wpis w liscie odnosnie tego zwierzecia a jesli jest to zwraca ilosc wystapien klas// nie jest zdefiniowana ilosc koz
			ilosc_wystapien_klas[klasa_przykladu] = 0;// 0 koz
		}
		ilosc_wystapien_klas[klasa_przykladu]++;// o 1 koze wiecej
	}
	var najwieksza_ilosc_wystapien = -Infinity;// chwilowy max
	var najczestsza_klasa;// rodzaj zwierzecia
	for (var klasa in ilosc_wystapien_klas) {// spr max klasa - krowa , mops itp 
		var ilosc_wystapien_aktualnej_klasy = ilosc_wystapien_klas[klasa]; // dana klasa ile ma zwierzat
		if ( ilosc_wystapien_aktualnej_klasy > najwieksza_ilosc_wystapien) {
			najwieksza_ilosc_wystapien = ilosc_wystapien_aktualnej_klasy;
			najczestsza_klasa = klasa;
		}
	}
	return najczestsza_klasa;
}

function wszystkie_wartosci_atrybutu(przyklady, wybrany_atrybut) {
	var zbior_wystepujacych_wartosci = new Set();// 2 nogi
	for ( var i in przyklady) {
		var aktualny_przyklad = przyklady[i];
		var wartosc_atrybutu_dla_aktualnego_przykladu = aktualny_przyklad[wybrany_atrybut];// wybrany atrubut - "nogi" , wartosc atrybutu to ilośc 3,4,...
		zbior_wystepujacych_wartosci.add(wartosc_atrybutu_dla_aktualnego_przykladu);// wrzucamy do zbioru liczbe 2
	}
	return zbior_wystepujacych_wartosci.toArray();// zwroci tablice unikalnych wartosci atrybutu w danej tablicy przykladow 
}

//-------------funckaj pkt 6 b) dla wybranych atrybotow
function lista_minus_element(atrybut, tablica) {
	return tablica.filter(function(element){
			if ( atrybut != element) return true;
			else return false;
	})
}

function znajdź_wszystkie_klasy(przykłady){
	var zbiór = new Set();
	for(var i in przykłady){
		zbiór.add(przykłady[i].class);
	}
	return zbiór.toArray();
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function policz_prawdopodobieństwo_klasy(przykłady, klasa){
	var filtrowane = przykłady.filter(function(element){return element.class == klasa});
	return przykłady.length/filtrowane.length;
}

function zmierz_entropię(przykłady, atrybut){
	var entropia = 0;
	var wartości_atrybutu = wszystkie_wartosci_atrybutu(przykłady, atrybut);
	var wszystkie_klasy = znajdź_wszystkie_klasy(przykłady);
	for(var i in wartości_atrybutu){
		W = wartości_atrybutu[i];
		var podzbiór = przykłady.filter(function(element){
			return element[atrybut]==W;
		})
		for(var j in wszystkie_klasy){
			var klasa = wszystkie_klasy[j];
			var prawdopodobieństwo_klasy = policz_prawdopodobieństwo_klasy(przykłady, klasa);
			entropia -= prawdopodobieństwo_klasy * getBaseLog(prawdopodobieństwo_klasy, 2);
		}
	}
	return entropia

}

function znajdz_najlepszy_atrybut(przykłady, atrybuty){
	var najlepszy_atrybut;
	var min_entropia = Infinity;
	for(var i in atrybuty){
		var atrybut = atrybuty[i];
		var entropia = zmierz_entropię(przykłady, atrybut);
		console.log("entropia dla ", atrybut, ": ", entropia);
		if(entropia<min_entropia){
			min_entropia = entropia;
			najlepszy_atrybut = atrybut;
		}
	}
	return najlepszy_atrybut;
}

function treelearn (przyklady, atrybuty, klasa_domyslna) {
	//=====================================================zwracamy liscie dla konkretnych przypadkow (1/3 pkt)
	if (przyklady.length == 0) {
		return klasa_domyslna;
	}
	//sprawdzamy czy wszystkie sa ten samej klasy 
	var klasa = przyklady[0].class;
	var wszystkie_takie_same = true;
	for ( var i in przyklady) {
		if (przyklady[i].class != klasa){
			wszystkie_takie_same = false;
		}
	}
	if (wszystkie_takie_same) return klasa;
	if (atrybuty.length == 0) {
		
		return najczestsza_klasa(przyklady);
	}
	//=====================================================
	// jelsi wierzcholek jest atrybute tzn ze jest pytaniem 

	var wybrany_atrybut = znajdz_najlepszy_atrybut(przyklady, atrybuty);

	//wybieramy atrybut pierwszy z lewej bo nei bylo minimalizacji entropii!!!pkt 4
	var T = {};
	T[wybrany_atrybut] = {};//



	var nowa_klasa_domyslna = najczestsza_klasa(przyklady);//  pkt 5

	//pkt 6 W unikalne wystapienia - np 2
	// raport jakie wystepuja ilosc nog 
	var wartosci_wybranego_atrybutu = wszystkie_wartosci_atrybutu(przyklady,wybrany_atrybut);
//pkt 6
	for (var i in wartosci_wybranego_atrybutu) {

		var W = wartosci_wybranego_atrybutu[i];
		var nowe_przyklady = przyklady.filter(function (element) {
			if (element[wybrany_atrybut] == W) {//odczytujemy atrybut - zwierze co chcemy
				// zwierze(element) ilosc nog(atrybut): 2(wartosc atrybutu)
				return true;
			}
			else return false;
		});// interesuja nas te co maja okreslona wartosc danego atrybuty np konkretnei 2 nogi


		T[wybrany_atrybut][W] = treelearn(nowe_przyklady,lista_minus_element(wybrany_atrybut,atrybuty),nowa_klasa_domyslna);// pkt 6 b)
	}

	return T;

}

module.exports = treelearn;