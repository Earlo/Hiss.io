export default class Sensor {
  constructor(floor, position, building) {
    this.floor = floor
    this.position = position
    this.count = 0
    this.building = building
    this.building.sensors.push(this)
	this.weight = this.building.type==='smart'?1:0

  }

  getGraphicalHeight(){
  	return (this.floor )
  }

  update( building ){
    let count = 0
    this.building.abajs.forEach((abaj) => {
      if (!abaj.elevator && abaj.floor === this.floor && abaj.destination[0] !== this.floor ){
        count++
      }
    });

  	this.count = count
    //console.log(this.building.type, this.count * this.weight)
    if (this.building.type == 'smart'){
	  	this.building.pressure[this.floor] += (this.count * this.weight)
	}
  }

}
