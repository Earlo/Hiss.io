import Elevator from './Elevator'
import Abaj from './Abaj'
import Sensor from './Sensor'

export default class Building {
  constructor(floors) {
    this.floors = floors
    this.floorHeight = 40
    this.buildingHeight = this.floors * this.floorHeight
    this.buildingWidth = 500

    this.sensors = []
    this.abajs = []
    this.elevators = []
    this.elevatorMap = {}
    this.waitTime = 0
    this.abajsCount = 0

    for (var i = 0; i < this.floors; i++) {
      this.elevatorMap[i]=[];
      new Sensor(i, 420, this)

    }
    new Elevator(0, 20, 1, this)
    new Elevator(this.floors-1, 60, 1, this)
    this.elevatorZone = [20,80]
  }

  update () {
    this.elevators.forEach((elevator) => {
      elevator.move();
    })
    this.abajs.forEach((abaj) => {
      abaj.move( this );
    })
    this.sensors.forEach((sensor) => {
      sensor.update( this );
    })

  }

  controlElevator(index, floor){
    this.elevators[index].setDestination(floor)
  }

  findClosestFreeElevator(to){
    const sorted = this.elevators.sort((a,b) => {
      return Math.abs(a.floor - to) - Math.abs(b.floor - to)
    })

    return sorted[0]
  }

  addAbaj(){
    const destination = [valueBetween(0,this.floors), valueBetween(100,400)]
    let startFloor = valueBetween(0,this.floors)
    while (startFloor === destination[0]) {
      startFloor = valueBetween(0,this.floors)
    }
    const endLocation = 500
    this.abajsCount += 1
    this.abajs.push(new Abaj(startFloor, endLocation, destination))
  }
}

function valueBetween(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}
