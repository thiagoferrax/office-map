# office-map

> Get a graphical react component that can create an office map to control key equipment information.

[![NPM](https://img.shields.io/npm/v/office-map.svg)](https://www.npmjs.com/package/office-map) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![officeMap](https://user-images.githubusercontent.com/43149895/54888655-ab1a0b00-4e7d-11e9-88cf-b22dca598a12.jpg)

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

    return (<OfficeMap data={data} />)
  }
}
```

## License

MIT © [thiagoferrax](https://github.com/thiagoferrax)
