import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Controls extends Component {
  static PropTypes = {
    moveUp: PropTypes.func.isRequired,
    moveDown: PropTypes.func.isRequired,
    addAbaj: PropTypes.func.isRequired
  }

  render () {
    const { moveUp, moveDown, addAbaj } = this.props
   return (
     <div id="controls">
       <button onClick={moveUp} className="elevatorControl"><i className="fa fa-arrow-up"/>up</button>
       <button onClick={moveDown} className="elevatorControl"><i className="fa fa-arrow-down"/>down</button>
       <button onClick={addAbaj} className="elevatorControl">add abaj</button>
     </div>
   )
 }
}