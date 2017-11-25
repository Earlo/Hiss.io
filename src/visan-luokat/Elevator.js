export default class Elevator {
  constructor(floor, xPos, capacity, building) {
    this.floor = floor
    this.xPos = xPos
    this.capacity = capacity
    this.building = building
    this.building.elevators.push(this)
    this.setFloor( this.floor )

    this.floorCount = this.building.floors
    this.goingTo = floor
    this.inbetween = 0.0
    this.passengers  = []
    this.direction = "UP" //"DOWN"
    this.speed = 0.1 //0.05
    this.moving = false
  }
  setDestination( dest ){
    if (dest >= 0 && dest < this.floorCount){
      this.goingTo = dest
    }
  }
  move(){
    if (this.floor !== this.goingTo){
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
    if (i){
      this.building.elevatorMap[this.floor].splice(i, 1);
    }
    this.floor = floor
    this.building.elevatorMap[this.floor].push(this)

  }

  getGraphicalHeight(){
    return (this.floor+this.inbetween + 1)
  }
}
