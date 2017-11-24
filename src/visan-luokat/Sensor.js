class Sensor {
  constructor(floor, position, building) {
    this.floor = floor
    this.position = position
    this.count = 0
    this.building = building
  }
  count(){
 
  	this.building.abajs.forEach((abaj) => {
    	console.log(abaj.position, abaj.floor);
	});

  }
  move() {
  	console.log("moving abaj")
  }
}
