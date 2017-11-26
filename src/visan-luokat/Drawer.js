import Building from './Building'
import elevatorImg from '../assets/elevator.png'
import abajBody from '../assets/abaj/basic/body_side.png';
import abajCloserArm from '../assets/abaj/basic/closer_arm.png';
import abajFarArm from '../assets/abaj/basic/far_arm.png';
import abajCloserLeg from '../assets/abaj/basic/leg_closer.png';
import abajFarLeg from '../assets/abaj/basic/leg_far.png';

import abajFarArm2 from '../assets/abaj/basic/far_arm_2.png';
import abajBody2 from '../assets/abaj/basic/body_side2_black.png';
import abajCloserArm2 from '../assets/abaj/basic/closer_arm_2.png';
import abajCloserLeg2 from '../assets/abaj/basic/leg_closer_2.png';
import abajFarLeg2 from '../assets/abaj/basic/leg_far_2.png';

import abajBody3 from '../assets/abaj/basic/body_side3.png';
import abajCloserArm3 from '../assets/abaj/basic/closer_arm3.png';
import abajCloserLeg3 from '../assets/abaj/basic/leg_closer_3.png';
import abajFarLeg3 from '../assets/abaj/basic/leg_far_3.png';

import abajBody1 from '../assets/abaj/basic/body_side1.png';
import abajCloserArm1 from '../assets/abaj/basic/closer_arm_1.png';
import abajCloserLeg1 from '../assets/abaj/basic/leg_closer_1.png';
import abajFarLeg1 from '../assets/abaj/basic/leg_far_1.png';

import abajBody4 from '../assets/abaj/basic/body_side4.png';
import abajCloserArm4 from '../assets/abaj/basic/closer_arm4.png';
import abajCloserLeg4 from '../assets/abaj/basic/leg_closer_4.png';
import abajFarLeg4 from '../assets/abaj/basic/leg_far_4.png';

import elevatorRope from '../assets/hissi/elevator_rope.png';



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
  	this.building = new Building(10, 'smart');
  	this.buildings = [this.building, new Building(10, 'dumb')]
  	this.rotateTick = 0;
  	this.context.lineWidth = 2;

  	//initializing image assets
  	this.images = {
        elevatorImg: getImage(elevatorImg),
        elevatorRope: getImage(elevatorRope),
        abaj0: {
          body: getImage(abajBody),
          closerLeg: getImage(abajCloserLeg),
          farLeg: getImage(abajFarLeg),
          closerArm: getImage(abajCloserArm),
          farArm: getImage(abajFarArm)
        },
        abaj1: {
          body: getImage(abajBody1),
          closerLeg: getImage(abajCloserLeg1),
          farLeg: getImage(abajFarLeg1),
          closerArm: getImage(abajCloserArm1),
          farArm: getImage(abajFarArm)
        },
        abaj2: {
          body: getImage(abajBody2),
          closerLeg: getImage(abajCloserLeg2),
          farLeg: getImage(abajFarLeg2),
          closerArm: getImage(abajCloserArm2),
          farArm: getImage(abajFarArm2)
        },
        abaj3: {
          body: getImage(abajBody3),
          closerLeg: getImage(abajCloserLeg3),
          farLeg: getImage(abajFarLeg3),
          closerArm: getImage(abajCloserArm3),
          farArm: getImage(abajFarArm)
        },
        abaj4: {
          body: getImage(abajBody4),
          closerLeg: getImage(abajCloserLeg4),
          farLeg: getImage(abajFarLeg4),
          closerArm: getImage(abajCloserArm4),
          farArm: getImage(abajFarArm)
        }
    }
  }

  update = () => {
    this.context.clearRect(0, 0, 1200, 600)
    for(const building of this.buildings) {
      building.update()
      //TODO set variable
      const elevatorStartCoords = [];

      this.drawBuilding(building.type)
      this.drawFloors(building.type)
      this.drawAverageWaitTime(building)

      building.elevators.forEach((elevator) => {
        elevatorStartCoords.push(elevator.xPos);
        this.drawElevator(elevator.xPos - 1, this.height - elevator.getGraphicalHeight() * this.building.floorHeight, building.type)
      })

      building.abajs.forEach((abaj) => {
        this.drawAbaj(abaj)
      })

      building.elevators.forEach((elevator) => {
        this.drawElevatorChute(elevator.xPos)
      })

      building.sensors.forEach((sensor) => {
        this.drawSensor(sensor)
      })
      //draw black between 2 elevators;

      this.context.fillStyle = 'rgba(0, 0, 0, 0.8)'
      const height = building.buildingHeight;
      this.context.fillRect(building.type !== 'dumb' ? 45 : 645, 600 - height, 14, building.buildingHeight);
      this.context.fillStyle = 'rgba(255, 255, 255)'
    }
  }

  drawElevator = (xPos, yPos ) => {
    const height = this.building.buildingHeight
    this.context.drawImage(this.images.elevatorRope, xPos + 10, 600 - height, this.images.elevatorRope.width, yPos - 600 + height)
    this.context.drawImage(this.images.elevatorImg, xPos, yPos, 25, this.building.floorHeight)
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

    const { body, closerLeg, farLeg, closerArm, farArm } = this.images[abaj.abajType]
      const isMirrored = abaj.floor === abaj.destination[0];
      let x = abaj.position+6
      let y = this.height - abaj.getGraphicalHeight() * this.building.floorHeight - 18 + 3
    if (abaj.elevator || abaj.isWaiting){
        x += 5;
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
    if (sensors.building.type === 'smart'){
      context.font="20px Monaco"
    }
    else{
      context.font="10px Monaco"      
    }
    //console.log( this.building.pressure[sensors.floor])
    context.fillText(sensors.building.pressure[sensors.floor].toString(), sensors.position+6, -10+ this.height - sensors.getGraphicalHeight() * this.building.floorHeight)
    
    //context.fillText(this.building.pressure[sensors.floor].toString(), sensors.position+6, -10+ this.height - sensors.getGraphicalHeight() * this.building.floorHeight)
    //context.fillText(sensors.count.toString(), sensors.position+6, -10+ this.height - sensors.getGraphicalHeight() * this.building.floorHeight)
  }

  drawBuilding(type){
    const offset = type === 'smart'? 20: 620
    const height = this.building.buildingHeight
    const width = this.building.buildingWidth
    this.context.strokeStyle = "#000"
    this.context.strokeRect(offset, 600 - height,width,height);
    this.context.stroke();
  }

  drawElevatorChute(x) {
    const { context } = this
    const width = 24
    const height = this.building.buildingHeight

    context.fillStyle = 'rgba(121,121,121, 0.5)';
    context.fillRect(x, 600 - height,width,height);

    context.strokeStyle = "#000"
    context.strokeRect(x, 600 - height,width,height)
    context.stroke();
  }

  drawFloors(type) {
    const { context } = this
    const offset = type === 'smart'? 0: 600
    const floorCount = this.building.floors
    const floorHeight = this.building.floorHeight
    const startX = 85 + offset
    const endX = startX + this.building.buildingWidth - 65
    let y
    this.context.strokeStyle = "#000"
    for(let i = 1; i <= floorCount; i++){
      y = 600 - i * floorHeight
      context.fillStyle = '#e9ff88';
      context.fillRect(startX, y, endX - startX, floorHeight);
      context.beginPath()
      context.moveTo(startX, y)
      context.lineTo(endX, y)
      context.stroke()
      context.fillStyle = '#000';
    }
  }

  drawAverageWaitTime(building){
    const offset = building.type === 'smart'? 0: 600
    let waitTime = building.waitTime
    let abajsCount = building.abajsCount
    if(abajsCount !== 0){
      let formattedWaitTime = Math.round(waitTime / abajsCount / 1000 * 100) / 100
      const waitTimeString = `Average time spent waiting for elevator: ${formattedWaitTime} s`
      this.context.font="16px Monaco"
      this.context.fillText(waitTimeString, 20 + offset,100)
    }
  }

  addAbajs(){
    const destination = [this.valueBetween(0,this.building.floors), this.valueBetween(100,400)]
    let startFloor = this.valueBetween(0,this.building.floors)
    while (startFloor === destination[0]) {
      startFloor = this.valueBetween(0,this.building.floors)
    }
    for(const building of this.buildings){
      const offset = building.type === 'smart'? 0: 600
      const endLocation = 500 + offset
      building.addAbaj(startFloor, endLocation, [destination[0], destination[1] + offset])
    }
  }

  valueBetween(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
