import React, { Component } from 'react'
import Controls from './Controls'
import Drawer from './visan-luokat/Drawer'


export default class ElevatorCanvas extends Component {
  render () {
    return <div>
      <canvas ref={canvas => this.canvas = canvas } id="hissi-canvas" width="1200" height="600"/>
      <Controls moveUp={this.moveUp} moveDown={this.moveDown} addAbaj={this.addRandomAbaj}/>
    </div>
  }

  componentDidMount () {
    this.drawer = new Drawer(this.canvas)
    setInterval(() => {
      this.drawer.update()
    }, 50)
  }

  moveUp = () => {
    this.drawer.building.controlElevator(0, this.drawer.building.elevators[0].goingTo + 1)
  }

  moveDown = () => {
    this.drawer.building.controlElevator(0, this.drawer.building.elevators[0].goingTo - 1)
  }

  addRandomAbaj = () => {
    this.drawer.addAbajs()
  }
}
