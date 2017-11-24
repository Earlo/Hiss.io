class Sensor {
  constructor(level, position, building) {
    this.level = level
    this.position = position
    this.count = 0
    this.building = building
  }
  count(){
 
  	this.building.abajs.forEach((abaj) => {
    	console.log(abaj.position, abaj.level);
	});

  }
  move() {
  	console.log("moving abaj")
  }
}
