import Building from './Building'
import elevatorImg from '../assets/elevator.png'

const getImage = (url) => {
    const myImage = new Image();
    myImage.src = url;
    return myImage;
}

export default class Drawer {
  constructor(canvas) {
  	this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.context = this.canvas.getContext("2d")
  	this.building = new Building(10);

  	//initializing image assets
  	this.images = {
        elevatorImg: getImage(elevatorImg)
    }
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
        this.drawElevator(elevator.xPos, this.height - elevator.getGraphicalHeight() * this.building.floorHeight)
    })
    this.building.abajs.forEach((abaj) => {
        this.drawAbaj(abaj)
    })
    this.building.sensors.forEach((sensor) => {
        this.drawSensor(sensor)
    })

  }

  drawElevator = (xPos, yPos ) => {
    this.context.drawImage(this.images.elevatorImg, xPos, yPos, 25, this.building.floorHeight);
  }

  drawAbaj(abaj) {
    const { context } = this
    context.font="20px Monaco"
    if (abaj.elevator){
      context.fillText("O", abaj.position+6, this.height - abaj.getGraphicalHeight() * this.building.floorHeight)
    }
    else{
      context.fillText("X", abaj.position+6, this.height - abaj.getGraphicalHeight() * this.building.floorHeight)      
    }
  }

  drawSensor(sensors) {
    const { context } = this
    context.font="20px Monaco"
    context.fillText(sensors.count.toString(), sensors.position+6, -10+ this.height - sensors.getGraphicalHeight() * this.building.floorHeight)
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
    const floorCount = this.building.floors
    const floorHeight = this.building.floorHeight
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
