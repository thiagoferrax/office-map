import React, { Component } from 'react'

import OfficeMap from 'office-map'

const INITIAL_STATE = { deskId: undefined }
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }
  
  render() {
    const data = [
      {
        id: 1,
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
        id: 2,
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
      { id: 3, chairPosition: 'south', x: 2, y: 0 },
      { id: 4, chairPosition: 'south', x: 3, y: 0 },
      { id: 5, chairPosition: 'west', x: 0, y: 1 },
      { id: 6, chairPosition: 'east', x: 1, y: 1 },
      {
        id: 7, chairPosition: 'north-west', x: 2, y: 1,
        equipments: {
          cpu: 'Dual core 2.4 GHz, 8 GB RAM, 512 GB HD',
          monitor: 'HP V197 18.5-inch',
          keyboard: 'HP Ultrathin Wireless Keyboard',
          phone: 'Cisco Phone IP 7960G/7940G',
          chair: '817L Kare Ergonomic Office Chair'
        }
      },
      { id: 8, chairPosition: 'north-east', x: 3, y: 1 },
      { id: 9, chairPosition: 'west', x: 0, y: 2 },
      { id: 10, chairPosition: 'east', x: 1, y: 2 },
      { id: 11, chairPosition: 'south-west', x: 2, y: 2 },
      { id: 12, chairPosition: 'south-east', x: 3, y: 2 }
    ]

    return (
      <div style={{ width: 1200, margin: "10px auto" }}>
        <h1>OfficeMap Example</h1>
        {this.state.deskId ? (<h2>The desk selected was: {this.state.deskId}</h2>) : ''}
        <hr />
        <br />
        <OfficeMap data={data} onSelect={deskId => this.setState({deskId})} />
      </div>
    )
  }
}
