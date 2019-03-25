import React, { Component } from 'react'

import OfficeMap from 'office-map'

export default class App extends Component {
  render() {
    const data = [
      { type: 'down', x: 0, y: 0 },
      { type: 'down', x: 1, y: 0 },
      { type: 'down', x: 2, y: 0 },
      { type: 'down', x: 3, y: 0 },     
      { type: 'up', x: 0, y: 1 },
      { type: 'up', x: 1, y: 1 },
      { type: 'up', x: 2, y: 1 },
      { type: 'up', x: 3, y: 1 },
      { type: 'down', x: 0, y: 2 },
      { type: 'down', x: 1, y: 2 },
      { type: 'down', x: 2, y: 2 },
      { type: 'down', x: 3, y: 2 },
      { type: 'left', x: 5, y: 0 },
      { type: 'left', x: 5, y: 1 },
      { type: 'left', x: 5, y: 2 },
      { type: 'right', x: 6, y: 0 },
      { type: 'right', x: 6, y: 1 },
      { type: 'right', x: 6, y: 2 },
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
