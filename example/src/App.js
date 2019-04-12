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
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' }
        ],
      },
      {
        id: 2,
        chairDirection: 'south', x: 1, y: 0,
        equipments: [
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' }
        ],
      },
      {
        id: 3, chairDirection: 'south', x: 2, y: 0,
        equipments: [
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' }
        ],
      },
      {
        id: 4, chairDirection: 'south', x: 3, y: 0,
        equipments: [
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
        ],
      },
      {
        id: 5, chairDirection: 'west', x: 0, y: 1,
        equipments: [
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
        ],
      },
      {
        id: 6, chairDirection: 'east', x: 1, y: 1,
        equipments: [
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
        ],
      },
      {
        id: 7, chairDirection: 'north-west', x: 2, y: 1,
        equipments: [
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 8 GB RAM, 512 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
        ]
      },
      {
        id: 8, chairDirection: 'north-east', x: 3, y: 1,
        equipments: [
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 8 GB RAM, 512 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
        ]
      },
      {
        id: 9, chairDirection: 'west', x: 0, y: 2,
        equipments: [
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
        ]
      },
      {
        id: 10, chairDirection: 'east', x: 1, y: 2,
        equipments: [
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
        ]
      },
      {
        id: 11, chairDirection: 'south-west', x: 2, y: 2,
        equipments: [
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'phone', specification: 'Cisco Phone IP 7960G/7940G' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' }
        ]
      },
      {
        id: 12, chairDirection: 'south-east', x: 3, y: 2,
        equipments: [
          { type: 'cpu', specification: 'Dual core 2.4 GHz, 16 GB RAM, 256 GB HD' },
          { type: 'monitor', specification: 'HP V197 18.5-inch' },
          { type: 'keyboard', specification: 'HP Ultrathin Wireless Keyboard' },
          { type: 'chair', specification: '817L Kare Ergonomic Office Chair' },
          { type: 'mouse', specification: 'HP USB 2 Button Optical Mouse' }
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
          editMode={true} />
      </div>
    )
  }
}
