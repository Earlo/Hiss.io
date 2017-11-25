import Elevator from './Elevator'
import Abaj from './Abaj'

export default class Building {
  constructor(floors) {
    this.floors = floors
    this.floorHeight = 32
    this.buildingHeight = this.floors * this.floorHeight
    this.buildingWidth = 500

    this.elevators = []    
    this.elevatorMap = {}
    for (var i = 0; i < this.floors; i++) {
      this.elevatorMap[i]=[];
    } 
    new Elevator(0, 20, 1, this)

    this.abajs = [new Abaj(0,500,[1,200])]
    this.elevatorZone = [20,50]
  }

  update () {
    this.elevators.forEach((elevator) => {
      elevator.move();
    })
    this.abajs.forEach((abaj) => {
      abaj.move( this );
    })
  }

  controlElevator(index, floor){
    this.elevators[index].setDestination(floor)
  }
}