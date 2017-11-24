export default class Abaj {
  constructor(floor, position, destination) {
    this.floor = floor
    this.position = position
    this.destination = destination
  }

  move() {
    if(this.floor !== this.destination){
      this.moveTowardsElevator()
    }else{
      this.moveTowardsExit()
    }
  }

  moveTowardsElevator(){
    console.log('DO ME')
  }

  moveTowardsExit(){
    console.log('DO ME')
  }
}
