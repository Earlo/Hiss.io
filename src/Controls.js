import React, { Component } from 'react'

export default class Controls extends Component {
  render () {
   return (
     <div id="controls">
       <button className="elevatorControl">UP</button>
       <button className="elevatorControl">DOWN</button>
     </div>
   )
 }
}