export default class Abaj {
  constructor(level, position, destination) {
    this.level = level
    this.position = position
    this.destination = destination
  }

  move() {
    if(this.level !== this.destination){
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
