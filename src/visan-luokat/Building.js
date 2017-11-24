import Elevator from './Elevator'
import Abaj from './Abaj'

export default class Building {
  constructor(levels) {
    this.levels = levels
    this.levelHeight = 32
    this.buildingHeight = this.levels * this.levelHeight
    this.buildingWidth = 500
    this.elevators = [new Elevator(0, 0) ]
    this.abajs = [new Abaj(1,500)]
  }

  update () {
    this.elevators.forEach(function(elevator) {
      elevator.move();
    })
    this.abajs.forEach(function(abaj) {
      abaj.move();
    })
  }

  controlElevator(index, floor){
    if (floor >= 0 && floor < this.levels){
      this.elevators[index].setDestination(floor)
    }
  }
}