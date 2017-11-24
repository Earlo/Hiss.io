import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ElevatorCanvas extends Component {
  static contextTypes = {
    canvas: PropTypes.element.isRequired
  }

  render () {
    console.log(this.context)
    return <div>{ this.context.canvas }</div>
 }
}
