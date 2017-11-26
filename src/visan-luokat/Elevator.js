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
    this.speed = 0.15 //0.05
    this.beingLoaded = false
    this.floorsToVisit = []
    this.setFloor( this.floor )
  }
  setDestination( dest ){
    if (dest >= 0 && dest < this.floorCount && dest !== this.floor){
      if(!this.hasAsDestination(dest)) this.floorsToVisit.push(dest)
    }
  }
  overrideDestination( dest ){
    if (dest >= 0 && dest < this.floorCount && dest !== this.floor){
      const i = this.building.elevatorMap[this.goingTo].indexOf(this)
      if (i !== -1){
        this.building.elevatorMap[this.goingTo].splice(i, 1);
      }

      this.floorsToVisit = [dest]
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
    //console.log(this.building.getFloorPotential(this.floor, 0), this.building.getFloorPotential(this.goingTo, Math.abs(this.goingTo-this.floor)))
    this.direction = 0
    if (!this.beingLoaded){
      if (this.passengers.length === 0){
        this.overrideDestination( this.building.findHighestPotential( this ) )
      }
      if (this.floorsToVisit.length > 0 ){
        this.direction = Math.sign(this.goingTo - this.floor)
        this.goingTo = this.getNextFloor()

        const i = this.building.elevatorMap[this.floor].indexOf(this)
        if (i !== -1){
          this.building.elevatorMap[this.floor].splice(i, 1);
        }

        this.inbetween += this.direction * this.speed
        if ( Math.abs(this.inbetween) > 1){
          this.inbetween = 0.0
          this.setFloor(this.floor + this.direction)
        }
      }
    }
  }
  setFloor( floor ){
    if(this.floorsToVisit.length){
      let index = this.floorsToVisit.indexOf(floor)
      if(index !== -1) this.floorsToVisit.splice(index, 1)
    }
    this.floor = floor

    const i = this.building.elevatorMap[this.goingTo].indexOf(this)
    if (i !== -1){
      this.building.elevatorMap[this.goingTo].splice(i, 1);
    }

    this.building.elevatorMap[this.goingTo].push(this)
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
