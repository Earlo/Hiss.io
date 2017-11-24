class Building {
  constructor(levels) {
    this.levels = levels
  }
}


class Elevator {
  constructor(level, capacity) {
    this.level = level
    this.goingTo = level
    this.inbetween = 0.0
    this.capacity = capacity
    this.speed = 0.001
    this.moving = false
  }
  move(to){
    if (this.level != this.goingTo){
      const direction = Math.sign(this.level - this.goingTo)
      this.inbetween += direction * this.speed
      if (this.inbetween > 1){
        this.inbetween = 0.0
        this.level += direction
      }
    }
}

function moveUp() {
  console.log('UP')
}

function moveDown() {
  console.log('DOWN')
}