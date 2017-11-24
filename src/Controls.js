import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Controls extends Component {
  static PropTypes = {
    moveUp: PropTypes.func.isRequired,
    moveDown: PropTypes.func.isRequired
  }

  render () {
    const { moveUp, moveDown } = this.props
   return (
     <div id="controls">
       <button onClick={moveUp} className="elevatorControl">UP</button>
       <button onClick={moveDown} className="elevatorControl">DOWN</button>
     </div>
   )
 }
}