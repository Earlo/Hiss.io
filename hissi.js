const WIDTH = 800 |0
const HEIGHT = WIDTH |0

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

setInterval(function(){
	ctx.fillRect(0,0,WIDTH,HEIGHT)
},1)
