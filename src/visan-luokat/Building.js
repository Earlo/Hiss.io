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

    for (var i = 0; i < this.floors; i++) {
      this.elevatorMap[i]=[];
      new Sensor(i, 420, this)

    }
    new Elevator(0, 20, 1, this)
    new Elevator(0, 60, 1, this)
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

  findFreeIn(floor){
    if (floor >= 0 && floor < this.floors){
      for (var i = 0; i < this.elevatorMap[floor].length; i++) {
        if (!this.elevatorMap[floor][i].moving()){
          return this.elevatorMap[floor][i]
        }
      }
    }
    return null
  }
  findClosestFree(to){
    for (var d = 0; d < this.floors; d++) {
      var r = this.findFreeIn( to + d )
      if (r !== null){
        return r
      }
      r = this.findFreeIn( to - d )
      if (r !== null){
        return r
      }

    }
  }

  addAbaj(){
    const destination = [valueBetween(0,this.floors), valueBetween(100,400)]
    let startFloor = valueBetween(0,this.floors)
    while (startFloor === destination[0]) {
      startFloor = valueBetween(0,this.floors)
    }
    const endLocation = 500
    this.abajs.push(new Abaj(startFloor, endLocation, destination))
  }
}

function valueBetween(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}
