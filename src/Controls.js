import React, { Component } from 'react'

export default class Controls extends Component {
  render () {
   return (
     <div id="controls">
       <button className="elevatorControl"><i class="fa fa-arrow-up"></i>up</button>
       <button className="elevatorControl"><i class="fa fa-arrow-down"></i>down</button>
     </div>
   )
 }
}