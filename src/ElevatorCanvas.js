import React, { Component } from 'react'
import Controls from './Controls'

export default class ElevatorCanvas extends Component {
  render () {
    return <div>
      <canvas id="hissi-canvas" width="600" height="600"/>
      <Controls/>
    </div>
  }
}
