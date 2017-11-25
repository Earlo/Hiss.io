export default class Abaj {
  constructor(floor, position, destination) {
    this.floor = floor
    this.position = position
    this.destination = destination
    this.speed = 8
    this.elevator = null
    this.waitStartTime = null
    this.waitTime = null
    this.animationTick = 0
    this.steppingForward = true
    this.isWaiting = false;
  }

  getGraphicalHeight(){
    if (this.elevator){
      //-1 to account for text rendering
      return this.elevator.getGraphicalHeight() -1
    }
    else{
      return (this.floor )
    }
  }

  move( building ) {
    console.log('isWaiting', this.isWaiting)
    if(this.floor !== this.destination[0]){
      if(!this.elevator){
        this.moveTowardsElevator( building )
        if(this.steppingForward) {
          this.animationTick += 15
          if(this.animationTick >= 100) {
            this.steppingForward = false
          }
        } else {
          this.animationTick -= 10
          if(this.animationTick <= 0) {
            this.steppingForward = true
          }
        }
      }
      else{
        this.floor = this.elevator.floor
      }
    }else{
      if(this.elevator){
        const index = this.elevator.passengers.indexOf(this)
        this.elevator.passengers.splice(index,1)
        this.elevator = null
        building.abajsCount += 1
        building.waitTime += this.waitTime
      }
      this.moveTowardsExit(building)
      if(this.steppingForward) {
        this.animationTick += 15
        if(this.animationTick >= 100) {
          this.steppingForward = false
        }
      } else {
        this.animationTick -= 10
        if(this.animationTick <= 0) {
          this.steppingForward = true
        }
      }
    }

  }

  moveTowardsElevator( building ){
  	if( this.position < building.elevatorZone[0] ){
  		this.position += this.speed
  	}
  	else if( this.position - 13 > building.elevatorZone[1] ){
  		this.position -= this.speed
  	}
    else{
  	  this.isWaiting = true;
      this.useElevator( building )
    }
  }

  moveToElevator( elevator ){
    this.isWaiting = false;
    if(!elevator.isFull() || elevator.passengers.indexOf(this) !== -1){
      elevator.beingLoaded = true
      elevator.passengers.push(this)
      if ( Math.abs(this.position - elevator.xPos) > this.speed){
        if( this.position < elevator.xPos ){
          this.position += this.speed
        }
        else if( this.position > elevator.xPos ){
          this.position -= this.speed
        }
      }
      else{
        elevator.beingLoaded = false
        if(!this.waitTime && this.waitStartTime) {
          this.waitTime = new Date().getTime() - this.waitStartTime
        } else {
          this.waitTime = 0
        }
        this.position = elevator.xPos
        this.elevator = elevator
        this.elevator.setDestination( this.destination[0] )
      }
    }
  }


  moveTowardsExit(building){
    if ( Math.abs(this.position - this.destination[1]) > this.speed){
      if( this.position < this.destination[1] ){
        this.position += this.speed
      }
      else if( this.position > this.destination[1] ){
        this.position -= this.speed
      }
    }
    else{
      
      //this.destination[0] = Math.floor((Math.random() * building.floors)); 
      const index = building.abajs.indexOf(this)
      building.abajs.splice(index,1)
    }
  }

  useElevator( building ){
    if (building.elevatorMap[this.floor].length > 0){
      this.moveToElevator( building.elevatorMap[this.floor][0] )
    } 
    else{
      let closestElevator = building.findClosestFreeElevator( this.floor )
      if(closestElevator){
        closestElevator.setDestination(this.floor)
      }
      if(!this.waitStartTime) this.waitStartTime = new Date().getTime()
    }
  }
}
