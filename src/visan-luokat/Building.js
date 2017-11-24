import Elevator from './Elevator'
import Abaj from './Abaj'

export default class Building {
  constructor(floors) {
    this.floors = floors
    this.floorHeight = 32
    this.buildingHeight = this.floors * this.floorHeight
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
    if (floor >= 0 && floor < this.floors){
      this.elevators[index].setDestination(floor)
    }
  }
}