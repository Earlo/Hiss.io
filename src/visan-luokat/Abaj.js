export default class Abaj {
  constructor(floor, position, destination) {
    this.floor = floor
    this.position = position
    this.destination = destination
    this.speed = 4
    this.elevator = null
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
      this.elevator = null
      this.moveTowardsExit()
    }

  }

  moveTowardsElevator( building ){
    //console.log("ddo",this.position, building.elevatorZone)
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
    if ( Math.abs(this.position - elevator.xPos) > this.speed){
      if( this.position < elevator.xPos ){
        this.position += this.speed
      }
      else if( this.position > elevator.xPos ){
        this.position -= this.speed
      }
    }
    else{
      this.position = elevator.xPos
      this.elevator = elevator
    }
  }


  moveTowardsExit(){
    if ( Math.abs(this.position - this.destination[1]) > this.speed){
      if( this.position < this.destination[1] ){
        this.position += this.speed
      }
      else if( this.position > this.destination[1] ){
        this.position -= this.speed
      }
    }
    else{
      this.position = this.destination[1]
      //DEBUG
      this.destination[0] += 1
    }
  }

  useElevator( building ){
    building.elevators.forEach((elevator)=>{
      if( (elevator.floor === this.floor) ){
        //console.log(this)
        this.moveToElevator( elevator )
      }
    })
  }
}
