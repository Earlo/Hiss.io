gameDiv.style.display = 'inline-block';
const WIDTH = 800 |0;
const HEIGHT = WIDTH |0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//const gfx0 = document.getElementById("effect0").getContext("2d");
//const ctxUi = document.getElementById("ctx-ui").getContext("2d");
//ctxUi.font = '30px Arial';
//gfx0.fillStyle = 'rgb(0,0,255)';
ctx.fillStyle = 'rgb(0,0,127)';

setWAVETYPE = function(i){
	currentFunction = waveTypes[i];
}

setInterval(function(){
	ctx.fillRect(0,0,WIDTH,HEIGHT);
	//gfx0.clearRect(0,0,WIDTH,HEIGHT);

},1);
