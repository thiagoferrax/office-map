# office-map

> Get a graphical react component that can create an office map to control key equipment information.

[![NPM](https://img.shields.io/npm/v/office-map.svg)](https://www.npmjs.com/package/office-map) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![officeMap](https://user-images.githubusercontent.com/43149895/54926470-21a32100-4eef-11e9-8676-d7ae5e620c39.jpg)

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
    return (<OfficeMap data={data} />)
  }
}
```

## License

MIT © [thiagoferrax](https://github.com/thiagoferrax)
