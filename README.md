# office-map

> Get a graphical react component that can create an office map to control key equipment information.

[![NPM](https://img.shields.io/npm/v/office-map.svg)](https://www.npmjs.com/package/office-map) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>

![myOffice](https://user-images.githubusercontent.com/43149895/56732731-a70b3280-6734-11e9-8ed4-000591fd360d.gif)

## Install

```bash
npm install --save office-map
```

## Usage

```jsx
import React, { Component } from 'react'

import OfficeMap from 'office-map'

const INITIAL_STATE = { desk: undefined }
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  render() {
    const data = [
      {
        id: 1,
        chairDirection: 'south', x: 0, y: 0,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'laptop', specification: 'Laptop Dell Inspiron 15 5000' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'drawer', specification: 'Simple drawer' },
        ],
      },
      {
        id: 2,
        chairDirection: 'south', x: 1, y: 0,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' },
          { type: 'drawer', specification: 'Simple drawer' },
        ],
      },
      {
        id: 3, chairDirection: 'south', x: 2, y: 0,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' },
          { type: 'drawer', specification: 'Simple drawer' },
        ],
      },
      {
        id: 4, chairDirection: 'south', x: 3, y: 0,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'laptop', specification: 'Laptop Dell Inspiron 15 5000' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'drawer', specification: 'Simple drawer' },
        ],
      },
      {
        id: 5, chairDirection: 'west', x: 0, y: 1,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'laptop', specification: 'Laptop Dell Inspiron 15 5000' },
          { type: 'drawer', specification: 'Simple drawer' },
        ],
      },
      {
        id: 6, chairDirection: 'east', x: 1, y: 1,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'drawer', specification: 'Simple drawer' },
        ],
      },
      {
        id: 7, chairDirection: 'north-west', x: 2, y: 1,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 8 GB RAM, 512 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'drawer', specification: 'Simple drawer' },
        ]
      },
      {
        id: 8, chairDirection: 'north-east', x: 3, y: 1,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'laptop', specification: 'Laptop Dell Inspiron 15 5000' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
        ]
      },
      {
        id: 9, chairDirection: 'west', x: 0, y: 2,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'drawer', specification: 'Simple drawer' },
        ]
      },
      {
        id: 10, chairDirection: 'east', x: 1, y: 2,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'desktop', specification: 'HP CPU, keyboard and mouse' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'drawer', specification: 'Simple drawer' },
        ]
      },
      {
        id: 11, chairDirection: 'south-west', x: 2, y: 2,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' },
          { type: 'drawer', specification: 'Simple drawer' },
        ]
      },
      {
        id: 12, chairDirection: 'south-east', x: 3, y: 2,
        equipments: [
          { type: 'desk', specification: 'Simple desk' },
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' },
          { type: 'drawer', specification: 'Simple drawer' },
        ]
      }
    ]

    const desk = this.state.desk
    return (
      <div style={{ width: 1200, margin: "10px auto" }}>
        <h1>OfficeMap Example</h1>
        {
          (desk && desk.x >= 0 && desk.y >= 0) ?
            (<h2>The desk {desk.id} moved to: {desk.x}, {desk.y}</h2>) :
            (desk && desk.id ? <h2>The desk {desk.id} was selected</h2> : '')}
        <hr />
        <br />
        <OfficeMap
          data={data}
          onSelect={desk => this.setState({ desk })}
          onMove={desk => this.setState({ desk })}
          editMode={true} 
          showNavigator={true} 
          horizontalSize={5}
          verticalSize={3} />
      </div>
    )
  }
}
```

## License

MIT © [thiagoferrax](https://github.com/thiagoferrax)
