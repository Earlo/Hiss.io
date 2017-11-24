export default class Elevator {
  constructor(level, capacity) {
    this.level = level
    this.goingTo = level
    this.inbetween = 0.0
    this.capacity = capacity
    this.speed = 0.1 //0.05
    this.moving = false
  }
  setDestination( dest ){
    this.goingTo = dest
  }
  move(){
    if (this.level !== this.goingTo){
      const direction = Math.sign(this.goingTo - this.level)
      this.inbetween += direction * this.speed
      if ( Math.abs(this.inbetween) > 1){
        this.inbetween = 0.0
        this.level += direction
      }
    }
  }
  getGraphicalHeight(){
    const direction = Math.sign(this.goingTo - this.level)
    return (this.level+this.inbetween + 1)
  }
}
