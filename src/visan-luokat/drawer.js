import * as url from '../public/hissi1.ico';

export class Drawer {
  constructor(canvas, building) {
  	this.canvas = canvas
  	this.building = building
  }

  update() {

    this.building.elevators.forEach(function(elevator) {
        drawElevator(elevator.getGraphicalHeight() * this.building.height)
    })
    this.building.abajs.forEach(function(abaj) {
        drawElevator(abaj.getGraphicalHeight() * this.building.height)
    })
  }
  drawElevator(height) {
    var ctx = this.canvas.getContext("2d")
    ctx.drawImage(url.default,300,height)
	}
  drawAbaj() {
  	///DO
  }

}
