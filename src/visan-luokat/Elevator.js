export default class Elevator {
  constructor(floor, xPos, capacity) {
    this.floor = 0
    this.xPos = xPos
    this.goingTo = floor
    this.inbetween = 0.0
    this.capacity = capacity
    this.speed = 0.1 //0.05
    this.moving = false
  }
  setDestination( dest ){
    this.goingTo = dest
  }
  move(){
    if (this.floor !== this.goingTo){
      const direction = Math.sign(this.goingTo - this.floor)
      this.inbetween += direction * this.speed
      if ( Math.abs(this.inbetween) > 1){
        this.inbetween = 0.0
        this.floor += direction
      }
    }
  }
  getGraphicalHeight(){
    return (this.floor+this.inbetween + 1)
  }
}
