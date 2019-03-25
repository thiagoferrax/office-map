# office-map

> Get a graphical react component that can create an office map to control key equipment information.

[![NPM](https://img.shields.io/npm/v/office-map.svg)](https://www.npmjs.com/package/office-map) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>

![officeMap](https://user-images.githubusercontent.com/43149895/54958762-a2850b80-4f35-11e9-82e0-2bbe63df566b.gif)

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
        chairPosition: 'south', x: 0, y: 0,
        equipments: {
          cpu: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD',
          monitor: 'HP V197 18.5-inch',
          keyboard: 'HP Ultrathin Wireless Keyboard',
          phone: 'Cisco Phone IP 7960G/7940G',
          chair: '817L Kare Ergonomic Office Chair',
          mouse: 'HP USB 2 Button Optical Mouse'
        },
      },
      {
        chairPosition: 'south', x: 1, y: 0,
        equipments: {
          cpu: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD',
          monitor: 'HP V197 18.5-inch',
          keyboard: 'HP Ultrathin Wireless Keyboard',
          phone: 'Cisco Phone IP 7960G/7940G',
          chair: '817L Kare Ergonomic Office Chair',
          mouse: 'HP USB 2 Button Optical Mouse'
        }
      },
      { chairPosition: 'south', x: 2, y: 0 },
      { chairPosition: 'south', x: 3, y: 0 },
      { chairPosition: 'west', x: 0, y: 1 },
      { chairPosition: 'east', x: 1, y: 1 },
      {
        chairPosition: 'north-west', x: 2, y: 1,
        equipments: {
          cpu: 'Dual core 2.4 GHz, 8 GB RAM, 512 GB HD',
          monitor: 'HP V197 18.5-inch',
          keyboard: 'HP Ultrathin Wireless Keyboard',
          phone: 'Cisco Phone IP 7960G/7940G',
          chair: '817L Kare Ergonomic Office Chair'
        }
      },
      { chairPosition: 'south-west', x: 2, y: 2 },
      { chairPosition: 'north-east', x: 3, y: 1 },
      { chairPosition: 'south-east', x: 3, y: 2 },
      { chairPosition: 'west', x: 0, y: 2 },
      { chairPosition: 'east', x: 1, y: 2 }
    ]
    return (<OfficeMap data={data} />)
  }
}
```

## License

MIT © [thiagoferrax](https://github.com/thiagoferrax)
