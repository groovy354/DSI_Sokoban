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

	var wybrany_atrybut = atrybuty[0]; // bierzemu pierwszy z brzegu atrybut
	var nowa_klasa_domyslna = najczestsza_klasa(przyklady);//  pkt 5

	//pkt 6 W unikalne wystapienia - np 2
	// raport jakie wystepuja ilosc nog 
	var wartosci_wybranego_atrybutu = wszystkie_wartosci_atrybutu(przyklady,wybrany_atrybut);

	for (var i in wartosci_wybranego_atrybutu) {

		var W = wartosci_wybranego_atrybutu[i];
		var nowe_przyklady = przyklady.filter(// interesuja nas te co maja okreslona wartosc danego atrybuty np konkretnei 2 nogi
	}

}






