export default class Abaj {
  constructor(floor, position, destination) {
    this.floor = floor
    this.position = position
    this.destination = destination
    this.speed = 8
    this.elevator = null
    this.waitStartTime = null
    this.waitTime = null
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
    if(this.floor !== this.destination[0]){
      if(!this.elevator){
        this.moveTowardsElevator( building )
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
    }

  }

  moveTowardsElevator( building ){
  	if( this.position < building.elevatorZone[0] ){
  		this.position += this.speed
  	}
  	else if( this.position > building.elevatorZone[1] ){
  		this.position -= this.speed
  	}
    else{
      this.useElevator( building )
    }
  }

  moveToElevator( elevator ){
    if(!elevator.isFull()){
      elevator.beingLoaded = true
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
        elevator.passengers.push(this)
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
      closestElevator.setDestination(this.floor)
      if(!this.waitStartTime) this.waitStartTime = new Date().getTime()
    }
  }
}
