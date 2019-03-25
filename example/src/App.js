import React, { Component } from 'react'

import OfficeMap from 'office-map'

export default class App extends Component {
  render() {
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

    return (
      <div style={{ width: 1200, margin: "10px auto" }}>
        <h1>OfficeMap Example</h1>
        <hr />
        <br />
        <OfficeMap data={data} />
      </div>
    )
  }
}
