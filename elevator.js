class Building {
  constructor(levels) {
    this.levels = levels
  }
}


class Elevator {
  constructor(level, capacity) {
    this.level = level
    this.capacity = capacity
    this.speed = 0.001
    this.moving = false
  }
  move(to){
    direction = Math.sign( this.level - to)
    this.level += this.speed*direction
    if (this.level*direction > to){
      this.level = to
      this.moving = false
    }
  }
}