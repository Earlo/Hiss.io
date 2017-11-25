export default class Sensor {
  constructor(floor, position, building) {
    this.floor = floor
    this.position = position
    this.count = 0
    this.building = building
    this.building.sensors.push(this)
  }

  getGraphicalHeight(){
  	return (this.floor )
  }

  update(){
 	let count = 0
  	this.building.abajs.forEach((abaj) => {
    	if (!abaj.elevator && abaj.floor === this.floor && abaj.destination[0] !== this.floor ){
    		count++
    	}
	});

 	if(count !== this.count){
 	  if(count > this.count){
      const elevator = this.building.findClosestFreeElevator(this.floor)
      if(elevator && elevator.isAvailable()){
        elevator.setDestination(this.floor)
      }
    }
 	  this.count = count
  }
  }
}
