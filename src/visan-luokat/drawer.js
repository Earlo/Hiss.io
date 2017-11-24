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
  drawElevator() {
  	///DO
  }
  drawAbaj() {
  	///DO
  }

}
