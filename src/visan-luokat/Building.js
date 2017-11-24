import Elevator from './Elevator'

export default class Building {
  constructor(levels) {
    this.levels = levels
    this.levelHeight = 32
    this.buildingHeight = this.levels * this.levelHeight
    this.buildingWidth = 500
    this.elevators = [new Elevator(0, 0) ]
    this.elevators[0].goingTo = 4
    this.abajs = []
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