import Elevator from './Elevator'
import Abaj from './Abaj'
import Sensor from './Sensor'

export default class Building {
  constructor(floors, type) {
    this.floors = floors
    this.floorHeight = 40
    this.buildingHeight = this.floors * this.floorHeight
    this.buildingWidth = 500
    this.type = type
    this.sensors = []
    this.abajs = []
    this.elevators = []
    this.pressure = []
    this.elevatorMap = {}
    this.waitTime = 0
    this.abajsCount = 0
    const offset = type === 'smart'? 0: 600
      for (var i = 0; i < this.floors; i++) {
        this.pressure.push(0)
        this.elevatorMap[ i ] = [];
        if(type === 'smart') {
          new Sensor(i, 420, this)
        }
      }
    new Elevator(0, 20, 4, this)
    new Elevator(this.floors-1, 60, 4, this)
    this.elevatorZone = [20 + offset,80 + offset]
  }

  update () {
    this.abajs.forEach((abaj) => {
      abaj.move( this );
    })
    this.sensors.forEach((sensor) => {
      sensor.update( this );
    })

    this.elevators.forEach((elevator) => {
      elevator.move();
    })

  }

  controlElevator(index, floor){
    this.elevators[index].setDestination(floor)
  }

  findClosestFreeElevator(to){
    const doneAlready = this.elevators.findIndex(elevator => {
      const index = elevator.floorsToVisit.indexOf(to) 
      return  index !== -1 && index < 1
    })

    if(doneAlready !== -1){
      return null
    }

    const filtered = this.elevators.filter(e => {
      return e.isAvailable()
    }).sort((a,b) => {
      return Math.abs(a.floor - to) - Math.abs(b.floor - to)
    })

    const sorted = this.elevators.sort((a,b) => {
      return Math.abs(a.floor - to) - Math.abs(b.floor - to)
    })

    return typeof filtered[0] === 'undefined'? sorted[0]: filtered[0]
  }

  addAbaj(startFloor, endLocation, destination){
    this.abajs.push(new Abaj(startFloor, endLocation, destination))
  }
  getFloorPotential( floor, distance ){
    return this.pressure[floor] - (1.0/this.floors)*distance
  }
  findHighestPotential( elevator ){
    var max = 0
    var target = elevator.floor
    for (var i = 0; i < this.floors; i++) {
      if (this.getFloorPotential(i, Math.abs(elevator.floor - 1) ) > max ){
        max = this.getFloorPotential(i, Math.abs(elevator.floor - 1) )
        target = i
      }
    }
    return target
  }
}
