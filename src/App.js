import React, { Component } from 'react'
import Controls from './Controls'
import ElevatorCanvas from './ElevatorCanvas'
import PropTypes from 'prop-types'

export default class App extends Component {
  static childContextTypes = {
    canvas: PropTypes.element
  }

  getChildContext(){
    return { canvas }
  }

  render() {
    return (
      <div id="game">
      <i class="fa fa-camera-retro"></i> fa-camera-retro

        <ElevatorCanvas/>
        <Controls/>
      </div>
    )
  }
}

const canvas = <canvas id="hissi-canvas" width="600" height="600"/>

