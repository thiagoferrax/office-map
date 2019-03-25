import React, { Component } from 'react'

import OfficeMap from 'office-map'

export default class App extends Component {
  render() {
    const data = [
      { chairPosition: 'south', x: 0, y: 0 },
      { chairPosition: 'south', x: 1, y: 0 },
      { chairPosition: 'south', x: 2, y: 0 },
      { chairPosition: 'south', x: 3, y: 0 },     
      { chairPosition: 'south', x: 4, y: 0 },   
      { chairPosition: 'west', x: 0, y: 1 },
      { chairPosition: 'east', x: 1, y: 1 },
      { chairPosition: 'north-west', x: 3, y: 1 },
      { chairPosition: 'north-east', x: 4, y: 1 },
      { chairPosition: 'south-west', x: 3, y: 2 },
      { chairPosition: 'south-east', x: 4, y: 2 },
      { chairPosition: 'north', x: 0, y: 2 },
      { chairPosition: 'north', x: 1, y: 2 }  
    ]

    return (
<div style={{ width: 1200, margin: "10px auto" }}>
        <h1>OfficeMap Example</h1>
        <hr/>
        <br/>
        <OfficeMap data={data} />
      </div>
    )
  }
}
