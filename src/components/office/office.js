import React, { Component } from 'react'
import $ from 'jquery'
import memoize from 'memoize-one'

const CELL_SIZE = 260

const INITIAL_STATE = { selectedElement: undefined, offset: { x: 0, y: 0 }, viewBox: undefined, svg: undefined, xPosition: undefined, yPosition: undefined }

export default class OfficeMap extends Component {

    constructor(props) {
        super(props)

        const viewBox =
            OfficeMap.calculateViewBox(this.props.data, this.props.minHorizontalSize, this.props.minVerticalSize)

        this.state = { ...INITIAL_STATE, viewBox }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            const viewBox =
                OfficeMap.calculateViewBox(nextProps.data, nextProps.minHorizontalSize, nextProps.minVerticalSize)
            return { viewBox }
        } else {
            return null
        }
    }

    unSelectDesk() {
        $('#selectableRect').css('visibility', 'hidden')
        $('#selectableRect').attr('x', 0)
        $('#selectableRect').attr('y', 0)
    }

    static calculateViewBox = memoize((data, minHorizontalSize, minVerticalSize) => {
        const maximus = data && data.reduce((maximus, desk) => {
            maximus.x = Math.max(maximus.x, desk.x)
            maximus.y = Math.max(maximus.y, desk.y)
            return maximus
        }, { x: 0, y: 0 })

        maximus.x = Math.max(minHorizontalSize || 1, maximus.x)
        maximus.y = Math.max(minVerticalSize || 1, maximus.y)

        const width = (maximus.x + 1) * CELL_SIZE + 2
        const height = (maximus.y + 1) * CELL_SIZE + 2

        return { minX: 0, minY: 0, width, height }
    })

    getEquipmentInfo = desk => {
        const equipments = desk.equipments || []
        let equipmentsInfo = equipments.reduce((message, equipment) => {
            if (equipment.name && equipment.specification) {
                message += message ? "" : `DESK ${desk.id}\n`
                message += `${equipment.name.toUpperCase()} - ${equipment.specification}\n`
            }

            return message
        }, "")

        return equipmentsInfo || `DESK ${desk.id}`
    }

    selectDesk = (event) => {
        if (this.props.onSelect) {
            const x = event.target.x.baseVal.value
            const y = event.target.y.baseVal.value

            $('#selectableRect').css('visibility', 'visible')
            $('#selectableRect').attr('x', x)
            $('#selectableRect').attr('y', y)

            const id = event.target.id
            const desk = this.props.data.filter(d => d.id === +id)[0]

            this.props.onSelect(desk)
        }
    }

    startDrag = (event) => {
        const selectedElement = event.target

        $(`#${selectedElement.id}`).insertBefore("#selectableRect")

        let offset = this.getMousePosition(event)

        const xPosition = parseInt(offset.x / CELL_SIZE)
        const yPosition = parseInt(offset.y / CELL_SIZE)

        offset.x -= selectedElement.getAttributeNS(null, "x")
        offset.y -= selectedElement.getAttributeNS(null, "y")


        this.setState({ selectedElement, offset, xPosition, yPosition })
    }

    endDrag(event) {
        const selectedElement = this.state.selectedElement
        if (selectedElement) {
            var coord = this.getMousePosition(event)

            const xPosition = parseInt(coord.x / CELL_SIZE)
            const yPosition = parseInt(coord.y / CELL_SIZE)

            let x = xPosition * CELL_SIZE
            let y = yPosition * CELL_SIZE

            selectedElement.setAttributeNS(null, "x", x)
            selectedElement.setAttributeNS(null, "y", y)

            const xPositionBefore = this.state.xPosition
            const yPositionBefore = this.state.yPosition

            this.setState({ selectedElement: undefined, xPosition: undefined, yPosition: undefined })

            if (this.props.onMove &&
                (xPosition !== xPositionBefore ||
                    yPosition !== yPositionBefore)) {
                const id = event.target.id
                const desk = this.props.data.filter(d => d.id === +id)[0]
                this.props.onMove({ ...desk, x: xPosition, y: yPosition })
            } else if (this.props.onSelect){
                this.selectDesk(event)
            }
        }
    }

    getMousePosition(event) {
        let svg = this.state.svg
        if (!svg) {
            svg = document.getElementById("svg")
            this.setState({ svg })
        }

        let pt = svg.createSVGPoint()

        pt.x = event.clientX;
        pt.y = event.clientY;

        let svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

        return {
            x: svgP.x,
            y: svgP.y
        }
    }

    drag(event) {
        const selectedElement = this.state.selectedElement
        const offset = this.state.offset
        if (selectedElement) {
            var coord = this.getMousePosition(event)
            let dx = coord.x - offset.x
            let dy = coord.y - offset.y

            selectedElement.setAttributeNS(null, "x", dx)
            selectedElement.setAttributeNS(null, "y", dy)
        }
    }

    showEditMode() {
        const lines = []

        if (this.props.editMode) {
            const viewBox = this.state.viewBox
            for (let i = 0; i < (viewBox.height / CELL_SIZE); i++) {
                lines.push(<line x1={0} y1={i * CELL_SIZE + 1} x2={viewBox.width} y2={i * CELL_SIZE + 1} style={{ stroke: '#1a2980', strokeWidth: 1 }} strokeDasharray="5,5" />)
            }

            for (let i = 0; i < (viewBox.width / CELL_SIZE); i++) {
                lines.push(<line x1={i * CELL_SIZE + 1} y1="0" x2={i * CELL_SIZE + 1} y2={viewBox.height} style={{ stroke: '#1a2980', strokeWidth: 1 }} strokeDasharray="5,5" />)
            }
        }

        return lines;
    }

    render() {
        const viewBox = this.state.viewBox
        return (
            <svg id="svg"
                viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
                style={{ background: 'linear-gradient(to right, #ece9e6, #ffffff)' }}>
                <defs>
                    <g id="chair">
                        <rect width="70" height="70" stroke="black" fill="#1a2980" transform="translate(110 102)" strokeWidth='0.7' rx="20" ry="20" />
                        <rect width="60" height="12" stroke="black" fill="#a5a5a5" transform="translate(114 169)" strokeWidth='0.7' rx="20" ry="20" />
                        <rect width="10" height="40" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.7' }} transform="translate(102 112)" rx="3" ry="3" />
                        <rect width="10" height="40" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.7' }} transform="translate(178 112)" rx="3" ry="3" />
                    </g>
                    <g id="drawer">
                        <rect width="70" height="100" stroke="black" fill="#c4c4c4" transform="translate(200 38)" strokeWidth='0.7' rx="1" ry="1" />
                        <rect width="20" height="4" style={{ fill: 'transparent', stroke: 'black', strokeWidth: '2' }} transform="translate(225 141)" rx="1" ry="1" />
                        <rect width="70" height="4" stroke="black" fill="#a5a5a5" transform="translate(200 138)" strokeWidth='0.7' rx="1" ry="1" />
                    </g>
                    <g id="keyboard">
                        <rect width="100" height="32" x="95" y="68" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} rx="1" ry="1" />
                        <rect width="60" height="4" x="115" y="90" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="101" y="90" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="108" y="90" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="178" y="90" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="185" y="90" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />

                        <rect width="18" height="4" x="101" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="122" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="129" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="136" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="143" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="150" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="157" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="164" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="18" height="4" x="171" y="82" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />

                        <rect width="11" height="4" x="101" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="115" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="122" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="129" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="136" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="143" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="150" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="157" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="164" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="171" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="11" height="4" x="178" y="74" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                    </g>
                    <g id="monitor">
                        <rect width="50" height="20" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: 0.7 }} transform="translate(112 23)" rx="1" ry="1" />
                        <rect width="136" height="5" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} transform="translate(70 30)" rx="1" ry="1" />
                    </g>
                    <g id="phone">
                        <rect width="45" height="45" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} transform="translate(247 10)" rx="1" ry="1" />
                        <rect width="19" height="10" style={{ fill: '#f0f0f0', stroke: 'black', strokeWidth: '0.5' }} transform="translate(267 15)" rx="1" ry="1" />
                        <rect width="10" height="35" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(252 15)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(267 31)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(267 38)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(267 45)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(274 31)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(274 38)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(274 45)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(281 31)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(281 38)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(281 45)" rx="1" ry="1" />
                    </g>
                    <g id="mouse">
                        <rect width="12" height="20" x="215" y="75" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} rx="4" ry="4" />
                        <line x1="221" y1="75" x2="221" y2="82" style={{ stroke: 'black', strokeWidth: 0.5 }} />
                    </g>
                    <g id="desk">
                        <rect width="260" height="104" x="1" y="1" style={{ fill: 'white', stroke: 'black', strokeWidth: 1 }} rx="1" ry="1" />
                    </g>
                    <g id="cpu">
                        <rect width="40" height="78" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} transform="translate(10 10)" rx="1" ry="1" />
                    </g>
                    <g id="myDesk_south">
                        <use href="#chair" transform="translate(-20 -7)" />
                        <use href="#drawer" transform="translate(-20 -28)" />
                        <use href="#desk" transform="translate(0 0)" />
                        <use href="#keyboard" transform="translate(-20 -4)" />
                        <use href="#mouse" transform="translate(-28 -4)" />
                        <use href="#monitor" transform="translate(-10 0)" />
                        <use href="#phone" transform="translate(-40 0)" />
                        <use href="#cpu" transform="translate(0 0)" />
                    </g>
                    <g id="myDesk_north">
                        <use href="#myDesk_south" transform={`rotate(-180 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`} />
                    </g>
                    <g id="myDesk_east">
                        <use href="#myDesk_south" transform={`rotate(-90 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`} />
                    </g>
                    <g id="myDesk_west">
                        <use href="#myDesk_east" transform={`rotate(-180 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`} />
                    </g>
                    <g id="myDesk_north-east">
                        <use href="#myDesk_east" transform={`rotate(-45 ${CELL_SIZE / 2 - 38} ${CELL_SIZE / 2 - 93})`} />
                    </g>
                    <g id="myDesk_south-west">
                        <use href="#myDesk_north-east" transform={`rotate(-180 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`} />
                    </g>
                    <g id="myDesk_south-east">
                        <use href="#myDesk_east" transform={`rotate(45 ${CELL_SIZE / 2 - 38} ${CELL_SIZE / 2 + 95})`} />
                    </g>
                    <g id="myDesk_north-west">
                        <use href="#myDesk_south-east" transform={`rotate(-180 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`} />
                    </g>
                </defs>

                {this.showEditMode()}

                {
                    this.props.data && this.props.data.map(desk =>
                        (<use
                            id={desk.id}
                            style={this.props.onMove ? { cursor: 'grab' } : {}}
                            key={`key_${desk.id}`}
                            href={`#myDesk_${desk.chairDirection}`}
                            x={desk.x * CELL_SIZE}
                            y={desk.y * CELL_SIZE}
                            className="clickable draggable"
                            onMouseDown={this.props.onMove ? event => this.startDrag(event) : () => { }}
                            onMouseMove={this.props.onMove ? event => this.drag(event) : () => { }}
                            onMouseUp={this.props.onMove ? event => this.endDrag(event) : () => { }}
                            onClick={this.props.onSelect ? event => this.selectDesk(event) : () => { }}>
                            <title>{this.getEquipmentInfo(desk)}</title>
                        </use>))
                }

                <rect id="selectableRect" x={0} y={0} width="260" height="260" style={{ fill: 'rgb(0,123,255, 0.2)', strokeWidth: 2, stroke: 'rgb(0,123,255)', visibility: 'hidden' }} transform="translate(1 1)" rx="1" ry="1" onClick={this.unSelectDesk} />

            </svg>)
    }
}