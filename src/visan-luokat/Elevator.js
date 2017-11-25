export default class Elevator {
  constructor(floor, xPos, capacity, building) {
    this.floor = floor
    this.xPos = xPos
    this.capacity = capacity
    this.building = building
    this.building.elevators.push(this)


    this.floorCount = this.building.floors
    this.goingTo = floor
    this.inbetween = 0.0
    this.passengers  = []
    this.direction = "UP" //"DOWN"
    this.speed = 0.1 //0.05
    this.moving = false
    this.floorsToVisit = []
    this.setFloor( this.floor )
  }
  setDestination( dest ){
    if (dest >= 0 && dest < this.floorCount){
      let index = this.floorsToVisit.indexOf(dest) === -1
      if(index) this.floorsToVisit.push(dest)
    }
  }
  move(){
    if (this.floorsToVisit.length){
      this.goingTo = this.floorsToVisit[0]
      const direction = Math.sign(this.goingTo - this.floor)
      this.inbetween += direction * this.speed
      if ( Math.abs(this.inbetween) > 1){
        this.inbetween = 0.0
        this.setFloor(this.floor + direction)
      }
    }
  }
  setFloor( floor ){
    let i = this.building.elevatorMap[this.floor].indexOf(this)
    if (i !== -1){
      this.building.elevatorMap[this.floor].splice(i, 1);
    }
    if(this.floorsToVisit.length){
      let index = this.floorsToVisit.indexOf(floor)
      if(index !== -1) this.floorsToVisit.splice(index, 1)
    }
    this.floor = floor

    this.building.elevatorMap[this.floor].push(this)

  }

  getGraphicalHeight(){
    return (this.floor+this.inbetween + 1)
  }
}
