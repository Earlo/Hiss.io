import Building from './Building'
import Abaj from './Abaj'

export default class Drawer {
  constructor(canvas) {
  	this.canvas = canvas
  	this.building = new Building(0)
  }

  update() {
    this.building.elevators.forEach(function(elevator) {
        //drawElevator(elevator.getGraphicalHeight() * this.building.height)
    })
    this.building.abajs.forEach(function(abaj) {
        //drawElevator(abaj.getGraphicalHeight() * this.building.height)
    })
  }
  drawElevator() {
  	///DO
  }
  drawAbaj() {
  	///DO
  }

}
