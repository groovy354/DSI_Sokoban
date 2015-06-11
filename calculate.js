var load=require("./load2.js");
var tab=load[0];
var tab1=load[1];
var defaultsizeInput=4,defaultsizeOutput=1,defaultSizeHiddenFirst=40,defaultSizeHiddenSecond=40,MAXSIZE=1000,LERANING=10,defaultTestNumber;
function neuralNetwork (_sizeInput,_sizeOutput,_sizeHiddenFirst,_sizeHiddenSecond) {
	this.sizeInput=_sizeInput;
	this.sizeOutput= _sizeOutput;
	this.sizeHiddenFirst= _sizeHiddenFirst;
	this.sizeHiddenSecond=_sizeHiddenSecond;
	this.secondNeurons = [];
	this.firstNeurons = [];
	this.outputNeurons = [];
	this.randomWages = function(){	
		for (var i=0;i<this.sizeOutput;i++){
			var temp=new singelNeuron(this.sizeHiddenSecond);
			for (var j = 0; j < this.sizeHiddenSecond; j++) {
				temp.wage[j]=Math.random();
			}
			this.outputNeurons.push(temp);
		}
		for (var i=0;i<this.sizeHiddenSecond;i++){
			var temp=new singelNeuron(this.sizeHiddenFirst);
			for (var j = 0; j < this.sizeHiddenFirst; j++) {
				temp.wage[j]=Math.random();
			}
			this.secondNeurons.push(temp);
		}
		for (var i=0;i<this.sizeHiddenFirst;i++){
			var temp=new singelNeuron(this.sizeInput);
			for (var j = 0; j < this.sizeInput; j++) {
				temp.wage[j]=Math.random();
			}
			this.firstNeurons.push(temp);
		}
	}
	this.train= function(input,output){
		runNN(input,this);
		for(var i=0;i<this.sizeOutput;i++){
			this.outputNeurons[i].error=derivateAF(this.outputNeurons[i].lastSumed)*(output[i]-this.outputNeurons[i].lastCalculated);
		}
		for(var j =0 ; j< this.sizeHiddenSecond; j++){
			var sum=0;
			for(var i=0;i<this.sizeOutput;i++){
				sum+=this.outputNeurons[i].wage[j]*this.outputNeurons[i].error;
			}
			this.secondNeurons[j].error=derivateAF(this.secondNeurons[j].lastSumed)*sum;
			for(var i=0;i<this.sizeOutput;i++){
				this.outputNeurons[i].wage[j]+=LERANING*this.secondNeurons[j].lastCalculated*this.outputNeurons[i].error
			}
		}
		for(var j =0 ; j< this.sizeHiddenFirst; j++){
			var sum=0;
			for(var i=0;i<this.sizeHiddenSecond;i++){
				sum+=this.secondNeurons[i].wage[j]*this.secondNeurons[i].error;
			}
			this.firstNeurons[j].error=derivateAF(this.firstNeurons[j].lastSumed)*sum;
			for(var i=0;i<this.sizeHiddenSecond;i++){
				this.secondNeurons[i].wage[j]+=LERANING*this.firstNeurons[j].lastCalculated*this.secondNeurons[i].error
			}
		}
	}
	this.trainseries = function(testcases){
		for(var i=0;i<testcases.length;i++){
			this.train(testcases[i].input,testcases[i].output);

		}
	}
}
function szi(){
	//console.log(tab[1]);
	for(var i =0 ;i<1000;i++){
		var c=Math.floor(Math.random() * 10000) % 100;
		myNeuralNetwork.train(tab[c],tab1[c]);
	}
	for(var i =0 ;i<15;i++){
		var c=Math.floor(Math.random() * 10000) % 1000;
		console.log(runNN(tab[c],myNeuralNetwork),tab1[c]);
	}
}
function compare1_10(){
	for(var i =0 ;i<10000000;i++){
		var k=[];
		var suma=0;
		for(var j=0;j<defaultsizeInput;j++){
			var c=Math.floor(Math.random() * 100) % 10+1;
			k.push(c);
			suma+=c;
		}	
		if(suma>(defaultsizeInput*5))
			myNeuralNetwork.train(k,[1]);
		else
			myNeuralNetwork.train(k,[0]);	
		if(i%10000==0){
					var d=runNN(k,myNeuralNetwork);
				if(d>0.5)
					var ka="tak";
				else
					var ka = "nie";
				console.log(k,d,suma,ka);
		}

	}
	for(var i =0 ;i<10;i++){
		var a=Math.floor(Math.random() * 100) % 10;
		var b=Math.floor(Math.random() * 100) % 10;
		var c=Math.floor(Math.random() * 100) % 10;
		var d=runNN([a,b,c],myNeuralNetwork);
		if(d>0.5)
			var k="tak";
		else
			var k = "nie";
		console.log(a," ",b," ",c," ",d,a+b+c,k);
	}
	
}
function compare0_2(){
	for(var i =0 ;i<1000;i++){
		/*var a=Math.floor(Math.random() * 100) % 10;
		var b=Math.floor(Math.random() * 100) % 10;
		if(a==b)
			var c=10;
		else 
			var c=0;*/
		//myNeuralNetwork.train([a,b],[c]);
		/*myNeuralNetwork.train([5,5],[1]);
		myNeuralNetwork.train([2,2],[1]);
		myNeuralNetwork.train([7,7],[1]);
		myNeuralNetwork.train([7,1],[0]);
		myNeuralNetwork.train([5,1],[0]);
		myNeuralNetwork.train([1,9],[0]);
		myNeuralNetwork.train([7,3],[0]);
		myNeuralNetwork.train([1,10],[0]);
		myNeuralNetwork.train([10,1],[0]);
		myNeuralNetwork.train([10,10],[1]);*/
		myNeuralNetwork.train([2,0],[1]);
		myNeuralNetwork.train([1,0],[1]);
		myNeuralNetwork.train([0,0],[0.5]);
		myNeuralNetwork.train([0,1],[0]);
		myNeuralNetwork.train([0,2],[0]);
		myNeuralNetwork.train([1,1],[0.5]);
		myNeuralNetwork.train([2,1],[1]);
		myNeuralNetwork.train([1,2],[0]);
		myNeuralNetwork.train([2,2],[0.5]);
		//myNeuralNetwork.train([0,0],[0]);

		//var i=1;
		//console.log(i," ",runNN([1],myNeuralNetwork));
	}
	/*for(var i=1;i<=10;i++){
		console.log(i," ",11-i," ",runNN([i,11-i],myNeuralNetwork));
	}*/
	console.log(2," ",0," ",runNN([2,0],myNeuralNetwork));
	console.log(0," ",1," ",runNN([0,1],myNeuralNetwork));
	console.log(1," ",1," ",runNN([1,1],myNeuralNetwork));
	console.log(0," ",0," ",runNN([0,0],myNeuralNetwork));
}

function testcase(_input,_output){
	this.input=_input;
	this.output=_output;
}
function runNN(input, currentNeuralNetwork){
	var tempimput=layerProcces(currentNeuralNetwork.sizeInput,currentNeuralNetwork.sizeHiddenFirst,input,currentNeuralNetwork.firstNeurons);
	//console.log(tempimput);
	tempimput=layerProcces(currentNeuralNetwork.sizeHiddenFirst,currentNeuralNetwork.sizeHiddenSecond,tempimput,currentNeuralNetwork.secondNeurons);
	return layerProcces(currentNeuralNetwork.sizeHiddenSecond,currentNeuralNetwork.sizeOutput,tempimput,currentNeuralNetwork.outputNeurons);
}
function layerProcces(inputSize,outputSize,input, neurons){
	//console.log(inputSize,outputSize,input,neurons,"kurwa");
	var ret=[];
	for(var i=0;i<outputSize;i++){
		//console.log(i," ",neurons[i].wage[0],"chuj");
		ret.push(neurons[i].calculate(input));
	}
	return ret;
}

function activationFunction(membran){
	
	return 1/(1+Math.exp(membran));
}
function derivateAF(membran){
	return (-1)*Math.exp(membran)/((Math.exp(membran)+1)*(Math.exp(membran)+1));
}
function singelNeuron(inputSize){

	this.wage=new Array(inputSize);
	this.calculate = function (input){
		var ret=0;
		//console.log(input.length,"input.length");
		for (var i = 0; i < input.length; i++) {
	//		console.log(ret,"ret1")
			ret+=input[i]*this.wage[i];
			//console.log(i,"i",input[i],this.wage[i],"ret2")
		}
	//	console.log(ret,"ret3")
		this.lastCalculated=activationFunction(ret);
		this.lastSumed=ret;
		return activationFunction(ret);
	}
}
var myNeuralNetwork= new neuralNetwork (defaultsizeInput,defaultsizeOutput,defaultSizeHiddenFirst,defaultSizeHiddenSecond);
myNeuralNetwork.randomWages();
//naiveTest();
szi();
//compare1_10();
//console.log(runNN([1],myNeuralNetwork));
/*var b={v:2};
test(b);
console.log(b.v);
function test(a){
	a.v=a.v*a.v;
	return a;
}*/
