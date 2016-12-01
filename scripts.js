		var pokaz = document.getElementById("plansza");
		var wysLicznik = document.getElementById("licznik");
		var opisGry = document.getElementById("opis"); 
		var wskZielonych = document.getElementById("wskaznikzielonych"); 
		var tab = [];
		var tab2 = [];
		var iloscLiczb = 100;
		var iloscLiczbDoTrafienia = 10;
		var licznik = ((iloscLiczb/2)-iloscLiczbDoTrafienia);
		var licznikStaly = ((iloscLiczb/2)-iloscLiczbDoTrafienia);
		var licznikZielonych = iloscLiczbDoTrafienia;
		var odgadniete = 0;

		function legenda(x){
			switch(x){
				case 0:
					opisGry.innerHTML = ("Odkryj wszystkie zielone pola, aby wygrać.<br />Każde odkrycie nie zielonego pola kosztuje 1 monetę.<br />Kliknij na pole z legendy, aby dowiedzieć się więcej.");
					break;
				case 1:
					opisGry.innerHTML = ("Zielone pola otoczone są w pionie i poziomie (nie w narożnikach!) polami z numerami 1 i 2.<br />Zielone pola mogą także występować obok siebie.");
					break;
				case 2:
					opisGry.innerHTML = ("Żółte pole oznacza, że w kratce obok znajduje się pole zielone.");
					break;
				case 3:
					opisGry.innerHTML = ("Pomarańczowe pole oznacza, że 2 kratki dalej w tej samej linii znajduje się pole zielone.");
					break;
				case 4:
					opisGry.innerHTML = ("Czerwone pole oznacza, że w zasięgu 2 kratek na pewno nie ma zielonego pola (ale może być ono w narożniku).");
					break;
			}	
		}
		
		wysLicznik.innerHTML += ("Masz " + licznik + " monet");
		wskZielonych.innerHTML = ("Znajdz " + licznikZielonych + " zielonych!");
		function losuje(){		
			for(var i=0; i<iloscLiczb; i++){
				tab[i] = Math.round(Math.random()*10000);
			}	
			wybierzMaxLiczby(iloscLiczbDoTrafienia);
		}								// w 100 elementowej tablicy zapisuje wartosci i 5 najwiekszych przyjmuje wartosc = 1, a reszta wartosc = 0
		function wybierzMaxLiczby(liczby){	
			var indy = [];
			for (var m=0; m<liczby; m++){		
				var maxIndex = tab.indexOf(Math.max(...tab));
				var maxy = Math.max.apply(Math,tab);
				tab[maxIndex] = 0;
			}
			ulozLiczby();
		}
		function ulozLiczby(){					// przyjmuje wartosci dla max liczb w nowej tab2 = 0, a dla reszty = u
		for (var u=0; u<iloscLiczb; u++){
			if(tab[u] == 0){
				tab2[u] = 0;
			}
			else{
			tab2[u] = u+1;
			}
			tab[u] = u+1;						// zwalnia miejsce z tab i przypisuje w ich miejsce liczby od 1 do "iloscLiczbDoTrafienia"
		}
		obok();
		}
		function obok(){
			for (o=0; o<iloscLiczb; o++){
				if(((tab2[o] == 0) && (tab2[o-1] > 0) && ((tab2[o-1])%10 != 0)) || ((tab2[o] == 0) && (tab2[o-1] < -1)) && ((tab2[o-1])%10 != 0)){
					tab2[o-1] = -1;
				}
				if(((tab2[o] == 0) && (tab2[o+1] > 0) && ((tab2[o+1]-1)%10 != 0)) || ((tab2[o] == 0) && (tab2[o+1] < -1)) && ((tab2[o+1]-1)%10 != 0)){
					tab2[o+1] = -1;
				}
				if((tab2[o] == 0) && (tab2[o-2] > 0) && (tab2[o-1] != 0) && (tab2[o-2] != 0) && (tab2[o-2] != -1) && (tab2[o-2] != -2) && ((tab2[o-2])%10 != 0) && ((tab2[o-1])%10 != 0)){
					tab2[o-2] = -2;
				}
				if((tab2[o] == 0) && (tab2[o+2] > 0) && (tab2[o+1] != 0) && (tab2[o+2] != 0) && (tab2[o+2] != -1) && (tab2[o+2] != -2) && ((tab2[o+2]-1)%10 != 0) && ((tab2[o+1]-1)%10 != 0)){
					tab2[o+2] = -2;
				}
				if(((tab2[o] == 0)  && (tab2[o-10] > 0)) || ((tab2[o] == 0) && (tab2[o-10] == -2))){
					tab2[o-10] = -1;
				}				
				if(((tab2[o] == 0)  && (tab2[o+10] > 0)) || ((tab2[o] == 0) && (tab2[o+10] == -2))){
					tab2[o+10] = -1;
				}
				if((tab2[o] == 0) && (tab2[o-20] > 0)){ 
					tab2[o-20] = -2;
				}
				if((tab2[o] == 0) && (tab2[o+20] > 0)){
					tab2[o+20] = -2;
				}		
			}
					wyswietlLiczby();
		}
		function wyswietlLiczby(){
			for (var w=0; w<iloscLiczb; w++){
				pokaz.innerHTML += ("<div class='wliczby' onclick='sprawdz(" + w + ")' id='liczba" + w + "'>" + tab[w] + "</div>");
				if((w+1)%10 == 0){
					pokaz.innerHTML += ("<div style='clear:both;'></div>");
				}
			}
		}
		function sprawdz(nr){
			if(tab2[nr] == 0){
				pokaz = document.getElementById("liczba" + nr).innerHTML = ("&#10004;");
				pokaz = document.getElementById("liczba" + nr).style = ("border-color: #00cc00; background: lightgreen; cursor: default; color: #00cc00; transform:rotateY(360deg); -webkit-transform:rotateY(360deg); -moz-transition-duration: 2s; -moz-transform:rotateY(720deg);");		
				pokaz = document.getElementById("liczba" + nr).setAttribute("onclick",";")
				odgadniete++;
				wskaznikZielonych();
				if(odgadniete == iloscLiczbDoTrafienia){
					koniecGry(odgadniete);
				}
			}
			else if(tab2[nr] == -1){
				pokaz = document.getElementById("liczba" + nr).innerHTML = ("&#10122;");
				pokaz = document.getElementById("liczba" + nr).style = ("border-color: #cccc00; background: #ffff80; cursor: default; font-size: 30px; color: #cccc00; ");
				licznik -= 1;
				pokaz = document.getElementById("liczba" + nr).setAttribute("onclick",";")
			}
			else if(tab2[nr] == -2){
				pokaz = document.getElementById("liczba" + nr).innerHTML = ("&#10123;");
				pokaz = document.getElementById("liczba" + nr).style = ("border-color: #cc7a00; background: #ffd280; cursor: default; font-size: 30px; color: #cc7a00; ");
				licznik -= 1;
				pokaz = document.getElementById("liczba" + nr).setAttribute("onclick",";")
			}
			else{
				pokaz = document.getElementById("liczba" + nr).innerHTML = ("&#10008;");
				pokaz = document.getElementById("liczba" + nr).style = ("border-color: #cc0000; background: #ff8080; cursor: default; color: #cc0000; ");
				licznik -= 1;
				pokaz = document.getElementById("liczba" + nr).setAttribute("onclick",";")
				}
				
			if(licznik == 0){
				koniecGry(licznik);
			}
			if(((licznik%10) >= 2 && (licznik%10 <= 4)) && ((licznik < 5) || (licznik > 21))){
				wysLicznik.innerHTML = ("Zostały " + licznik + " monety");
			} 
			else if(licznik == 1){
				wysLicznik.innerHTML = ("Została " + licznik + " moneta");
			}
			else if(licznik <= 0 ){
				wysLicznik.innerHTML = ("Straciłeś wszystkie monety!");
			}
			else{
				wysLicznik.innerHTML = ("Zostało " + licznik + " monet");
			}
		}
		function koniecGry(odgadniete){
			if(odgadniete == iloscLiczbDoTrafienia || odgadniete == -10 || licznik == 0){
				for (var x = 0; x < iloscLiczb; x++){
						if(tab2[x] == 0){
							pokaz = document.getElementById("liczba" + x).innerHTML = ("&#10004;");
							pokaz = document.getElementById("liczba" + x).style = ("border-color: #00cc00; background: lightgreen; cursor: default; color: #00cc00; transform:rotateY(3600deg); -webkit-transform:rotateY(3600deg); transition-duration: 10s; -moz-transform:rotateY(3600deg);");		
							pokaz = document.getElementById("liczba" + x).setAttribute("onclick",";");
						}
						else if(tab2[x] == -1){
							pokaz = document.getElementById("liczba" + x).innerHTML = ("&#10122;");
							pokaz = document.getElementById("liczba" + x).style = ("border-color: #cccc00; background: #ffff80; cursor: default; font-size: 30px; color: #cccc00; ");
							pokaz = document.getElementById("liczba" + x).setAttribute("onclick",";");
						}
						else if(tab2[x] == -2){
							pokaz = document.getElementById("liczba" + x).innerHTML = ("&#10123;");
							pokaz = document.getElementById("liczba" + x).style = ("border-color: #cc7a00; background: #ffd280; cursor: default; font-size: 30px; color: #cc7a00; ");
							pokaz = document.getElementById("liczba" + x).setAttribute("onclick",";");
						}
						else{
							pokaz = document.getElementById("liczba" + x).innerHTML = ("&#10008;");
							pokaz = document.getElementById("liczba" + x).style = ("border-color: #cc0000; background: #ff8080; cursor: default; color: #cc0000; ");
							pokaz = document.getElementById("liczba" + x).setAttribute("onclick",";");
						}
				}
				if(odgadniete == -10){
					alert("Tak łatwo się poddajesz? Popatrz jakie to było proste i spróbuj jeszcze raz :)");
					}
					else{				
						if(licznik == 0 ){
							alert("Co za pech! Straciłeś wszystkie monety.");
						}
						else{
							alert("Gratulacje! Zachowałeś " + licznik + "/" + licznikStaly + " monet");			
						}
					}
				}
		}
		function wskaznikZielonych(odgadniete){
			licznikZielonych--;
			if(licznikZielonych == 0){
				wskZielonych.innerHTML = ("Brawo!");
			}
			else if(licznikZielonych <= 4 && licznikZielonych > 1) {
				wskZielonych.innerHTML = ("Jeszcze " + licznikZielonych + " zielone!");
			}
			else if(licznikZielonych == 1){
				wskZielonych.innerHTML = ("Ostatni zielony!");
			}
			else{
				wskZielonych.innerHTML = ("Jeszcze " + licznikZielonych + " zielonych!");
			}
		}
		function potwierdzKoniecGry() {
			var r = confirm("Czy na pewno chcesz się poddać?");
			if (r == true) {
				koniecGry(-10);
			}
		}

		
/*				
				var maxy = tab[0];
				var maxIndex = 0;
				for (var j=0; j<tab.length; j++){
					if (maxy <= tab[j]){
						maxIndex = j;
						maxy = tab[j];
						tab[j] = 0;
					}
				}
*/
