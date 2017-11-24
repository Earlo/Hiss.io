import React, { Component } from 'react'
import Controls from './Controls'
import Drawer from './visan-luokat/Drawer'


export default class ElevatorCanvas extends Component {
  render () {
    return <div>
      <canvas ref={canvas => this.canvas = canvas } id="hissi-canvas" width="600" height="600"/>
      <Controls moveUp={this.moveUp} moveDown={this.moveDown}/>
    </div>
  }

  componentDidMount () {
    this.drawer = new Drawer(this.canvas)
    setInterval(() => {
      this.drawer.update()
      //console.log('DRAWER DOES SOMETHING WICKED')
    }, 50)
  }

  moveUp = () => {
    this.drawer.building.debugUp()
  }

  moveDown = () => {
    this.drawer.building.debugDown()
  }
}
