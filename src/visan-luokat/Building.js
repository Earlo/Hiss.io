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

    this.abajs = []
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

  addAbaj(){
    const startFloor = valueBetween(0,this.floors)
    const destination = [valueBetween(0,this.floors), valueBetween(100,400)]
    const endLocation = 500
    this.abajs.push(new Abaj(startFloor, endLocation, destination))
  }
}

function valueBetween(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}