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
  }
  move(to){
    this.level += this.speed
  }
}