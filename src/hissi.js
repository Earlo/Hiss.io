const canvas = document.getElementById("hissi-canvas")
const ctx = canvas.getContext("2d")

const WIDTH = canvas.width
const HEIGHT = canvas.height

ctx.fillStyle = 'rgb(0,0,127)'

setInterval(function(){
	ctx.fillRect(0,0,WIDTH,HEIGHT)
},1)
