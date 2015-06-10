# include <cstdio>
# include <fstream>
# include <string>
# include <cstdlib>
# include <iostream>
using namespace std;
struct range{
	int low,up;
};
struct material{
	string name;
	range hight,slippery,hardness,temperature;
	bool przeszkoda;
};
struct field{
	string name;
	int hight,slippery,hardness,temperature;
	bool przeszkoda;
};
material types[5];
field generated[100];
void set(int number, string _name,int hil,int hiu,int sll,int slu,int hal,int hau,int tel,int teu, bool przeszkoda){
	types[number].name=_name;
	types[number].hight.low=hil;
	types[number].hight.up=hiu;
	types[number].slippery.low=sll;
	types[number].slippery.up=slu;
	types[number].hardness.low=hal;
	types[number].hardness.up=hau;
	types[number].temperature.low=tel;
	types[number].temperature.up=teu;
	types[number].przeszkoda = przeszkoda;
}
void init(){
	set(0,"skala",2,4,1,1,3,4,1,2, true);
	set(1,"drewno",2,3,2,3,3,4,2,3, true);
	set(2,"plotno",2,3,3,4,1,2,3,4, true);
	set(3,"ziemia",1,2,1,1,2,3,1,3, false);
	set(4,"trawa",3,4,2,3,1,2,2,3, false);
}
int random(int low,int up){
	if(low==up)
		return low;
	return low+(rand()%(up-low+1));
}
void generate(){
	for(int i=0;i<100;i++){
		int type=rand()%5;
		generated[i].name=types[type].name;
		//cout<<
		generated[i].hight=random(types[type].hight.low,types[type].hight.up);
		generated[i].slippery=random(types[type].slippery.low,types[type].slippery.up);
		generated[i].hardness=random(types[type].hardness.low,types[type].hardness.up);
		generated[i].temperature=random(types[type].temperature.low,types[type].temperature.up);
		generated[i].przeszkoda = types[type].przeszkoda;
	}
}
void write(string file){
	std::fstream plik;
	plik.open( "json.txt", std::ios::in | std::ios::out );
	plik<<"zestaw_testowy:["<<endl;
	for(int i=0;i<100;i++){
   		plik<<"{nazwa:"<<generated[i].name<<",wysokosc:"<<generated[i].hight<<",sliskosc:"<<generated[i].slippery<<",twardosc:"<<generated[i].hardness<<",temperatura:"<<generated[i].temperature<<",class:";
   		if(generated[i].name=="trawa"||generated[i].name=="ziemia")
   			plik<<"true";
		else
			plik<<"false";
		plik<<"}"<<endl;
   	}
   	plik<<"]";
}
void print(){
	cout<<"["<<endl;
	for(int i=0;i<100;i++){
   		cout<<"{\"nazwa\":\""<<generated[i].name<<"\",\"height\":"<<generated[i].hight<<",\"slippery\":"<<generated[i].slippery<<",\"hardness\":"<<generated[i].hardness<<",\"temperature\":"<<generated[i].temperature
		   <<", \"class\":"<<(generated[i].przeszkoda? "true" : "false") <<"},"<<endl;
   	}
   	cout<<"]";
}
int main(){
	init();
	generate();
	//cout<<"aaa";
	print();
	write("json");
	return 0;
}
