export default class Elevator {
  constructor(floor, xPos, capacity, building) {
    const offset = building.type === 'smart'? 0: 600
    this.floor = floor
    this.xPos = xPos + offset
    this.capacity = capacity
    this.building = building
    this.building.elevators.push(this)
    
    this.floorCount = this.building.floors
    this.goingTo = floor
    this.inbetween = 0.0
    this.passengers  = []
    this.direction = 1
    this.speed = 0.1 //0.05
    this.beingLoaded = false
    this.floorsToVisit = []
    this.setFloor( this.floor )
  }
  setDestination( dest ){
    if (dest >= 0 && dest < this.floorCount && dest !== this.floor){
      if(!this.hasAsDestination(dest)) this.floorsToVisit.push(dest)
    }
  }
  hasAsDestination( dest ){
    return this.floorsToVisit.indexOf(dest) !== -1
  }
  moving(){
    return this.floorsToVisit.length > 0
  }
  isFull(){
    return this.passengers.length === this.capacity
  }
  isAvailable(){
    return !this.isFull() && !this.moving()
  }
  move(){
    this.goingTo = this.getNextFloor()
    //console.log(this.building.getFloorPotential(this.floor, 0), this.building.getFloorPotential(this.goingTo, Math.abs(this.goingTo-this.floor)))

    const shouldMove = this.building.getFloorPotential(this.floor, 0) < this.building.getFloorPotential(this.goingTo, Math.abs(this.goingTo-this.floor))
    if (!this.beingLoaded && this.floorsToVisit.length > 0 || shouldMove){
      let i = this.building.elevatorMap[this.floor].indexOf(this)
      if (i !== -1){
        this.building.elevatorMap[this.floor].splice(i, 1);
      }
      this.direction = Math.sign(this.goingTo - this.floor)
      this.inbetween += this.direction * this.speed
      if ( Math.abs(this.inbetween) > 1){
        this.inbetween = 0.0
        this.setFloor(this.floor + this.direction)
      }
    }
  }
  setFloor( floor ){
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

  getNextFloor(){
    if(this.direction === 1){
      return this.floorsToVisit.sort()[this.floorsToVisit.length - 1]
    } else {
      return this.floorsToVisit.sort()[0]
    }
  }
}
