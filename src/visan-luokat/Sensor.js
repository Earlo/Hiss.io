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
 	this.count = 0
  	this.building.abajs.forEach((abaj) => {
    	if (abaj.floor === this.floor && abaj.destination[0] !== this.floor ){
    		this.count +=1
    	}
	});
  }
}
