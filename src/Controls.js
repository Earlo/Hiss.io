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
       <button onClick={moveUp} className="elevatorControl"><i class="fa fa-arrow-up"></i>up</button>
       <button onClick={moveDown} className="elevatorControl"><i class="fa fa-arrow-down"></i>down</button>
     </div>
   )
 }
}