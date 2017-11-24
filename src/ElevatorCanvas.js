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
    const drawer = new Drawer(this.canvas)
    setInterval(() => {
      console.log('DRAWER DOES SOMETHING WICKED')
    }, 500)
  }

  moveUp = () => {
    console.log('Up')
  }

  moveDown = () => {
    console.log('Down')
  }
}
