# office-map

> Get a graphical react component that can create an office map to control key equipment information.

[![NPM](https://img.shields.io/npm/v/office-map.svg)](https://www.npmjs.com/package/office-map) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>

![myOffice](https://user-images.githubusercontent.com/43149895/55097138-032d5900-509a-11e9-89d5-54e6754f1170.gif)

## Install

```bash
npm install --save office-map
```

## Usage

```jsx
import React, { Component } from 'react'

import OfficeMap from 'office-map'

class Example extends Component {
  render () {
    const data = [
      {
        id: 1,
        chairDirection: 'south', x: 0, y: 0,
        equipments: [
          { name: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { name: 'monitor', specification: 'HP V197 18.5-inch' },
          { name: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { name: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { name: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { name: 'mouse', specification: 'HP USB 2 Button Optical Mouse' }
        ],
      },
      {
        id: 2,
        chairDirection: 'south', x: 1, y: 0,
        equipments: [
          { name: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { name: 'monitor', specification: 'HP V197 18.5-inch' },
          { name: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { name: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { name: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { name: 'mouse', specification: 'HP USB 2 Button Optical Mouse' }
        ],
      },
      { id: 3, chairDirection: 'south', x: 2, y: 0 },
      { id: 4, chairDirection: 'south', x: 3, y: 0 },
      { id: 5, chairDirection: 'west', x: 0, y: 1 },
      { id: 6, chairDirection: 'east', x: 1, y: 1 },
      {
        id: 7, chairDirection: 'north-west', x: 2, y: 1,
        equipments: [
          { name: 'cpu', specification: 'Dual core 2.4 GHz, 8 GB RAM, 512 GB HD' },
          { name: 'monitor', specification: 'HP V197 18.5-inch' },
          { name: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { name: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { name: 'chair', specification: '817L Kare Ergonomic Office Chair' },
        ]
      },
      { id: 8, chairDirection: 'north-east', x: 3, y: 1 },
      { id: 9, chairDirection: 'west', x: 0, y: 2 },
      { id: 10, chairDirection: 'east', x: 1, y: 2 },
      { id: 11, chairDirection: 'south-west', x: 2, y: 2 },
      { id: 12, chairDirection: 'south-east', x: 3, y: 2 }
    ]
    return (<OfficeMap data={data} onSelect={deskId => console.log('The desk selected was ' + deskId)} />)
  }
}
```

## License

MIT © [thiagoferrax](https://github.com/thiagoferrax)
