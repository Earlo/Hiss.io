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
    const B = new Building(10)
    setInterval(function(){
      console.log("uliuli")
      B.update()
    },100);
  }

  moveUp = () => {
    console.log('Up')
  }

  moveDown = () => {
    console.log('Down')
  }
}
