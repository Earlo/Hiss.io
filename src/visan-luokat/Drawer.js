import Building from './Building'
import Abaj from './Abaj'

//import * as url from '../../public/hissi1.ico';

export default class Drawer {
  constructor(canvas) {
  	this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.context = this.canvas.getContext("2d")

  	this.building = new Building(10)
  }

  update = () => {
    this.building.update()
    //TODO set variable
    this.context.clearRect(0,0,600,600)
    this.building.elevators.forEach((elevator) => {
        console.log(this.building.levelHeight)
        this.drawElevator(this.height - elevator.getGraphicalHeight() * this.building.levelHeight)
    })
    this.building.abajs.forEach((abaj) => {
        this.drawElevator(this.height - abaj.getGraphicalHeight() * this.building.levelHeight)
    })
  }

  drawElevator = (height) => {
    this.context.fillRect(300,height,20,20);
    this.context.stroke(); 
    //ctx.drawImage(url.default,300,height)
  }
  drawAbaj() {
    ///DO
  }

}
