import React, { Component } from 'react'
import Controls from './Controls'
import {Building} from './visan-luokat/elevator'


export default class ElevatorCanvas extends Component {
  render () {
    return <div>
      <canvas ref={canvas => this.canvas = canvas } id="hissi-canvas" width="600" height="600"/>
      <Controls moveUp={this.moveUp} moveDown={this.moveDown}/>
    </div>
  }

  componentDidMount () {
    const building = new Building(3)
    setInterval(() => {
      building.update()
    }, 500)
  }

  moveUp = () => {
    console.log('Up')
  }

  moveDown = () => {
    console.log('Down')
  }
}
