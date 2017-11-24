import React, { Component } from 'react'
import Controls from './Controls'
import Building from './visan-luokat/elevator'


export default class ElevatorCanvas extends Component {
  render () {
    return <div>
      <canvas id="hissi-canvas" width="600" height="600"/>
      <Controls moveUp={this.moveUp} moveDown={this.moveDown}/>
    </div>
  }

  Componentdidmount () {
    const B = new Building(10)
    setInterval(function(){
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
