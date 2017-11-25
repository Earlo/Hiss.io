import Building from './Building'
import elevatorImg from '../assets/elevator.png'
import abajBody from '../assets/abaj/body_side.png';
import abajCloserArm from '../assets/abaj/closer_arm.png';
import abajFarArm from '../assets/abaj/far_arm.png';
import abajCloserLeg from '../assets/abaj/leg_closer.png';
import abajFarLeg from '../assets/abaj/leg_far.png';


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
  	this.rotateTick = 0;

  	//initializing image assets
  	this.images = {
        elevatorImg: getImage(elevatorImg),
        abaj: {
          body: getImage(abajBody),
          closerLeg: getImage(abajCloserLeg),
          farLeg: getImage(abajFarLeg),
          closerArm: getImage(abajCloserArm),
          farArm: getImage(abajFarArm)
        }
    }
  	this.building = new Building(10)
  }

  update = () => {
    this.building.update()
    //TODO set variable
    this.context.clearRect(0,0,600,600)
    this.drawBuilding()
    this.drawFloors()
    this.drawAverageWaitTime()
    this.building.elevators.forEach((elevator) => {
        this.drawElevatorChute(elevator.xPos)
        this.drawElevator(elevator.xPos - 1, this.height - elevator.getGraphicalHeight() * this.building.floorHeight)
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


  drawImageRotation = (context, image, x, y, cx, cy, rotation, angleOffset, mirrored) => {
    context.save()
    context.translate(cx, cy)
    context.rotate(mirrored ? -(angleOffset - 0.20 + rotation * 0.1) :  angleOffset + rotation * 0.1)
    context.translate(-cx, -cy)
    if(mirrored)
      this.DrawOrFlip(context, image, x, y, image.width * 0.8, image.height * 0.8, mirrored)
    else
      context.drawImage(image, x, y, image.width * 0.8, image.height * 0.8)
    context.restore()
  }

  DrawOrFlip = (ctx, img,x,y, width, height, isMirrored) => {
    if(isMirrored) {
      // move to x + img's width
      ctx.translate(x + img.width, y);

      // scaleX by -1; this "trick" flips horizontally
      ctx.scale(-1, 1);

      // draw the img
      // no need for x,y since we've already translated
      ctx.drawImage(img, 0, 0, width, height);

      // always clean up -- reset transformations to default
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      ctx.drawImage(img, x, y, width, height)
    }
  }

  drawAbaj(abaj) {
    const { context } = this

    const { body, closerLeg, farLeg, closerArm, farArm } = this.images.abaj
      const isMirrored = abaj.floor === abaj.destination[0];
      const x = abaj.position+6
      const y = this.height - abaj.getGraphicalHeight() * this.building.floorHeight - 18 + 3
    if (abaj.elevator || abaj.isIdling){
        this.drawImageRotation(context, farArm, x-3, y-10, x+1, y-7, 0.3, 0.1);

        this.drawImageRotation(context, farLeg, x-2, y, x+4-2, y+3, 6, -0.7);
        //draw body
        context.drawImage(body, x-4, y-21, body.width * 0.8, body.height * 0.8);

        //draw closer arm and leg
        this.drawImageRotation(context, closerLeg, x-5, y, x+4-5, y+3, -2.7, 0.4);
        this.drawImageRotation(context, closerArm, x-3, y-10, x+1, y-7, 0, -0.3);

    }
    else{

      this.drawImageRotation(context, farArm, x-3, y-10, x+1, y-7, abaj.animationTick/10, -0.1, isMirrored);

      this.drawImageRotation(context, farLeg, x-2, y, x+4-2, y+3, abaj.animationTick/7, -0.7, isMirrored);
      //draw body
      this.DrawOrFlip(context, body, x-4, y-21, body.width * 0.8, body.height * 0.8, isMirrored)

      //draw closer arm and leg
      this.drawImageRotation(context, closerLeg, x-5, y, x+4-5, y+3, -abaj.animationTick/10, 0.4, isMirrored);
      this.drawImageRotation(context, closerArm, x-3, y-10, x+1, y-7, abaj.animationTick/10, -0.3, isMirrored);
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

  drawElevatorChute(x) {
    const width = 24
    const height = this.building.buildingHeight
    this.context.strokeStyle = "#000"
    this.context.strokeRect(x, 600 - height,width,height)
    this.context.stroke();
  }

  drawFloors() {
    const floorCount = this.building.floors
    const floorHeight = this.building.floorHeight
    const startX = 85
    const endX = startX + this.building.buildingWidth - 65
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

  drawAverageWaitTime(){
    let waitTime = this.building.waitTime
    let abajsCount = this.building.abajsCount
    if(waitTime){
      let formattedWaitTime = Math.round(waitTime / abajsCount / 1000 * 100) / 100
      const waitTimeString = `Average time spent waiting for elevator: ${formattedWaitTime} s`
      this.context.font="20px Monaco"
      this.context.fillText(waitTimeString, 100,100)
    }
  }
}
