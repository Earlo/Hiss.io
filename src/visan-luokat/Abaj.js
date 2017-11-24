export default class Abaj {
  constructor(level, position) {
    this.level = level
    this.position = position
  }

  move() {
    if(this.position > 30){
      this.position -= 1
    }
  }
}
