import React, { Component } from 'react'
import Controls from './Controls'
import ElevatorCanvas from './ElevatorCanvas'

export default class App extends Component {
  render() {
    return (
      <div id="game">
        <ElevatorCanvas/>
        <Controls/>
      </div>
    )
  }
}
