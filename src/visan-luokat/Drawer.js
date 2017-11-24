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
    this.drawBuilding()
    this.drawElevatorChute()
    this.drawFloors()
    this.building.elevators.forEach((elevator) => {
        this.drawElevator(this.height - elevator.getGraphicalHeight() * this.building.levelHeight)
    })
    this.building.abajs.forEach((abaj) => {
        this.drawElevator(this.height - abaj.getGraphicalHeight() * this.building.levelHeight)
    })
  }

  drawElevator = (height) => {
    this.context.fillRect(23,height,20,32);
    this.context.stroke(); 
    //ctx.drawImage(url.default,300,height)
  }
  drawAbaj() {
    ///DO
  }

  drawBuilding(){
    const height = this.building.buildingHeight
    const width = this.building.buildingWidth
    this.context.strokeStyle = "#FF0000"
    this.context.strokeRect(20, 600 - height,width,height);
    this.context.stroke();
  }

  drawElevatorChute() {
    const width = 24
    const height = this.building.buildingHeight
    this.context.strokeStyle = "#000"
    this.context.strokeRect(21, 600 - height,width,height)
    this.context.stroke();
  }

  drawFloors() {
    const floorCount = this.building.levels
    const floorHeight = this.building.levelHeight
    const startX = 45
    const endX = 45 + this.building.buildingWidth - 25
    let y
    const { context } = this
    for(let i = 1; i < floorCount; i++){
      y = 600 - i * floorHeight
      context.beginPath()
      context.moveTo(startX, y)
      context.lineTo(endX, y)
      this.context.strokeStyle = "#000"
      context.stroke()
    }
  }
}
