import Elevator from './Elevator'
import Abaj from './Abaj'
import Sensor from './Sensor'

export default class Building {
  constructor(floors) {
    this.floors = floors
    this.floorHeight = 32
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


    this.elevatorZone = [20,50]
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

  findClosestFree(to){

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