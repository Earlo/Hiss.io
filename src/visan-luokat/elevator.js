class Building {
  constructor(levels) {
    this.levels = levels
    this.levelHeight = 32
    this.elevatos = [new Elevator(0, 0) ]
    this.abajs = []
  }

  update () {
    this.elevators.forEach(function(elevator) {
        elevator.move();
    })
    this.abajs.forEach(function(abaj) {
        abaj.move();
    })

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
  move(){
    if (this.level != this.goingTo){
      const direction = Math.sign(this.level - this.goingTo)
      this.inbetween += direction * this.speed
      if (this.inbetween > 1){
        this.inbetween = 0.0
        this.level += direction
      }
    }
  }
  getGraphicalHeight(building){
    const direction = Math.sign(this.level - this.goingTo)
    return building.levelHeight*(this.level+this.direction*this.inbetween)
  }

}

function moveUp(elevator) {
  console.log('UP')
  elevator.goingTo = elevator.level += 1
}

function moveDown(elevator) {
  console.log('DOWN')
  elevator.goingTo = elevator.level -= 1
}