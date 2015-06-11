var load=require("./load2.js");
var tab=load[0];
var tab1=load[1];
var defaultsizeInput=4,defaultsizeOutput=1,defaultSizeHiddenFirst=40,defaultSizeHiddenSecond=40,MAXSIZE=1000,LERANING=10;
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
		this.runNN(input,this);
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

	this.trainAll = function(){
		for(var i =0 ;i<1500;i++){
			var c=Math.floor(Math.random() * 10000) % 1000;
			this.train(tab[c],tab1[c]);
		}
	}

	this.predict = function(input){
		
		//for(var i =0 ;i<15;i++){
		//	var c=Math.floor(Math.random() * 10000) % 1000;
	//	}
		return this.runNN(input); 
	}

	this.runNN = function(input){
		var tempimput=layerProcces(this.sizeInput,this.sizeHiddenFirst,input,this.firstNeurons);
		tempimput=layerProcces(this.sizeHiddenFirst,this.sizeHiddenSecond,tempimput,this.secondNeurons);
		return layerProcces(this.sizeHiddenSecond,this.sizeOutput,tempimput,this.outputNeurons);
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
	}
	/*for(var i=1;i<=10;i++){
	}*/
}

function testcase(_input,_output){
	this.input=_input;
	this.output=_output;
}

function layerProcces(inputSize,outputSize,input, neurons){
	var ret=[];
	for(var i=0;i<outputSize;i++){
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
		for (var i = 0; i < input.length; i++) {
			ret+=input[i]*this.wage[i];
		}
		this.lastCalculated=activationFunction(ret);
		this.lastSumed=ret;
		return activationFunction(ret);
	}
}
/*
var myNeuralNetwork= new neuralNetwork (defaultsizeInput,defaultsizeOutput,defaultSizeHiddenFirst,defaultSizeHiddenSecond);
myNeuralNetwork.randomWages();
//naiveTest();
szi(tab[1]);
//compare1_10();
/*var b={v:2};
test(b);
function test(a){
	a.v=a.v*a.v;
	return a;
}
*/


module.exports = neuralNetwork;