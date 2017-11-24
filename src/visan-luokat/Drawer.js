import Building from './Building'
import Abaj from './Abaj'

//import * as url from '../../public/hissi1.ico';

export default class Drawer {
  constructor(canvas) {
  	this.canvas = canvas
  	this.building = new Building(10)
  }

  update = () => {
    this.building.elevators.forEach((elevator) => {
        this.drawElevator(elevator.getGraphicalHeight() * this.building.height)
    })
    this.building.abajs.forEach((abaj) => {
        this.drawElevator(abaj.getGraphicalHeight() * this.building.height)
    })
  }

  drawElevator = (height) => {
    console.log(height)
    var ctx = this.canvas.getContext("2d")
    console.log(ctx)
    ctx.strokeStyle = "#FF0000"

    ctx.fillRect(300,10,20,20);
    ctx.stroke(); 
    //ctx.drawImage(url.default,300,height)
  }
  drawAbaj() {
    ///DO
  }

}
