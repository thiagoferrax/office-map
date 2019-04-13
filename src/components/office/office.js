import React, { Component } from 'react'
import $ from 'jquery'
import memoize from 'memoize-one'

const CELL_SIZE = 260

const INITIAL_STATE = { selectedElement: undefined, offset: { x: 0, y: 0 }, viewBox: undefined, svg: undefined, xPosition: undefined, yPosition: undefined }

export default class OfficeMap extends Component {

    constructor(props) {
        super(props)

        const viewBox =
            OfficeMap.calculateViewBox(this.props.data,
                this.props.minHorizontalSize,
                this.props.minVerticalSize)

        this.state = { ...INITIAL_STATE, viewBox }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            const viewBox =
                OfficeMap.calculateViewBox(nextProps.data,
                    nextProps.minHorizontalSize,
                    nextProps.minVerticalSize)
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

    mountFieldsMessage = (equipment, fields) => {
        return equipment && fields && fields.reduce((message, field, index) => {
            if (message && field && equipment[field]) {
                message += ' - '
            }
            if (field && equipment[field] && index === 0) {
                message += equipment[field].toUpperCase()
            } else if (field && equipment[field]) {
                message += equipment[field]
            }
            if (index === fields.length - 1) {
                message += '\n'
            }
            return message
        }, '')
    }


    getEquipmentInfo = desk => {

        const fields = this.props.fields || ['type', 'specification']

        const equipments = desk.equipments || []
        let equipmentsInfo = equipments.reduce((message, equipment) => {
            if (fields && fields.length && equipment[fields[0]]) {
                message += message ? "" : `DESK ${desk.id}\n`
                message += this.mountFieldsMessage(equipment, fields)
            }

            return message
        }, "")

        return equipmentsInfo || `DESK ${desk.id}`
    }

    selectDesk = (event) => {
        if (this.props.onSelect) {
            const x = event.target.x.baseVal.value
            const y = event.target.y.baseVal.value

            const xRect = $('#selectableRect').attr('x')
            const yRect = $('#selectableRect').attr('y')
            const visibility = $('#selectableRect').css('visibility')

            if (x === +xRect && y === +yRect && visibility === 'visible') {
                this.unSelectDesk()
            } else {
                $('#selectableRect').css('visibility', 'visible')
                $('#selectableRect').attr('x', x)
                $('#selectableRect').attr('y', y)

                const desk = this.props.data.filter(d => d.id === +event.target.id)[0]

                this.props.onSelect(desk)
            }
        }
    }

    startDrag = (event) => {
        const selectedElement = event.target

        $(`#${selectedElement.id}`).insertBefore("#svgLastElement")

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

                if (this.props.onSelect) {
                    const x = parseInt($('#selectableRect').attr('x') / CELL_SIZE)
                    const y = parseInt($('#selectableRect').attr('y') / CELL_SIZE)

                    if (x === xPositionBefore && y === yPositionBefore) {
                        this.unSelectDesk()
                    }
                }

            } else if (this.props.onSelect) {
                const x = parseInt($('#selectableRect').attr('x') / CELL_SIZE)
                const y = parseInt($('#selectableRect').attr('y') / CELL_SIZE)
                const visibility = $('#selectableRect').css('visibility')

                if (x === xPositionBefore && y === yPositionBefore
                    && visibility === 'visible') {
                    this.unSelectDesk()
                } else {
                    this.selectDesk(event)
                }
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

        let index = 0
        if (this.props.editMode) {
            const viewBox = this.state.viewBox
            for (let i = 0; i < (viewBox.height / CELL_SIZE); i++) {
                lines.push(<line key={`line_${index}`} x1={0} y1={i * CELL_SIZE + 1} x2={viewBox.width} y2={i * CELL_SIZE + 1} style={{ stroke: '#1a2980', strokeWidth: 1 }} strokeDasharray="5,5" />)
                index++
            }

            for (let i = 0; i < (viewBox.width / CELL_SIZE); i++) {
                lines.push(<line key={`line_${index}`} x1={i * CELL_SIZE + 1} y1="0" x2={i * CELL_SIZE + 1} y2={viewBox.height} style={{ stroke: '#1a2980', strokeWidth: 1 }} strokeDasharray="5,5" />)
                index++
            }
        }

        return lines;
    }

    showDesks() {
        return this.props.data && this.props.data.map(desk =>
            (<use
                id={desk.id}
                style={this.props.onMove ? { cursor: 'grab' } : {}}
                key={`key_${desk.id}`}
                href={`#${this.getDeskId(desk)}`}
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

    getDeskComponentsTypes(desk) {
        const deskComponents = desk.equipments ? desk.equipments.map(e => e.type ? e.type.toLowerCase() : '') : []
        const definedComponents = ['chair', 'drawer', 'desk', 'keyboard', 'mouse', 'monitor', 'phone', 'cpu', 'desktop', 'laptop']
        return definedComponents.filter(component => ['desk'].concat(deskComponents).includes(component))
    }

    getDeskComponents(desk) {
        const transformMap = {
            'south': '',
            'north': `rotate(-180 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`,
            'east': `rotate(-90 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`,
            'west': `rotate(90 ${CELL_SIZE / 2 + 1} ${CELL_SIZE / 2 + 1})`,
            'north-east': `rotate(-135 ${CELL_SIZE / 2 + 17} ${CELL_SIZE / 2 - 38})`,
            'south-west': `rotate(45 ${CELL_SIZE / 2 - 93} ${CELL_SIZE / 2 - 38})`,
            'south-east': `rotate(-45 ${CELL_SIZE / 2 + 95} ${CELL_SIZE / 2 - 38})`,
            'north-west': `rotate(135 ${CELL_SIZE / 2 - 15} ${CELL_SIZE / 2 - 38})`
        }

        const deskComponents = this.getDeskComponentsTypes(desk)
        return deskComponents.map(component =>
            (<use
                key={`component_${desk.chairDirection}_${component}`}
                href={`#${component}`}
                transform={transformMap[desk.chairDirection]} />))
    }

    buildDesksDefinitions() {
        const keys = []
        return this.props.data && this.props.data.reduce((desksDefinitions, desk) => {
            const deskId = this.getDeskId(desk)
            const key = `desks_definition_${deskId}`
            if (!keys.includes(key)) {
                keys.push(key)

                const deskComponents = this.getDeskComponents(desk)
                desksDefinitions.push(<g key={key} id={deskId} >{deskComponents}</g>)
            }
            return desksDefinitions
        }, [])
    }

    getDeskId(desk) {
        const chairDirection = desk.chairDirection
        const deskComponents = this.getDeskComponentsTypes(desk)
        return deskComponents.reduce((deskId, component) => {
            deskId += '_' + component
            return deskId
        }, chairDirection)
    }

    render() {
        const viewBox = this.state.viewBox
        return (
            <svg id="svg"
                viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
                style={{ background: 'linear-gradient(to right, #ece9e6, #ffffff)' }}>
                <defs>
                    <g id="chair">
                        <rect width="70" height="70" stroke="black" fill="#1a2980" transform="translate(90 95)" strokeWidth='0.7' rx="20" ry="20" />
                        <rect width="60" height="12" stroke="black" fill="#a5a5a5" transform="translate(94 162)" strokeWidth='0.7' rx="20" ry="20" />
                        <rect width="10" height="40" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.7' }} transform="translate(82 105)" rx="3" ry="3" />
                        <rect width="10" height="40" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.7' }} transform="translate(158 105)" rx="3" ry="3" />
                    </g>
                    <g id="drawer">
                        <rect width="70" height="100" stroke="black" fill="#c4c4c4" transform="translate(180 10)" strokeWidth='0.7' rx="1" ry="1" />
                        <rect width="20" height="4" style={{ fill: 'transparent', stroke: 'black', strokeWidth: '2' }} transform="translate(205 113)" rx="1" ry="1" />
                        <rect width="70" height="4" stroke="black" fill="#a5a5a5" transform="translate(180 110)" strokeWidth='0.7' rx="1" ry="1" />
                    </g>
                    <g id="keyboard">
                        <rect width="100" height="32" x="75" y="62" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} rx="1" ry="1" />
                        <rect width="60" height="4" x="95" y="84" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="81" y="84" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="88" y="84" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="158" y="84" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="165" y="84" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />

                        <rect width="18" height="4" x="81" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="102" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="109" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="116" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="123" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="130" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="137" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="144" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="18" height="4" x="151" y="76" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />

                        <rect width="11" height="4" x="81" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="95" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="102" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="109" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="116" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="123" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="130" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="137" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="144" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="151" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="11" height="4" x="158" y="68" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                    </g>
                    <g id="monitor">
                        <rect width="50" height="20" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: 0.7 }} transform="translate(102 23)" rx="1" ry="1" />
                        <rect width="136" height="5" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} transform="translate(60 30)" rx="1" ry="1" />
                    </g>
                    <g id="phone">
                        <rect width="45" height="45" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} transform="translate(207 10)" rx="1" ry="1" />
                        <rect width="19" height="10" style={{ fill: '#f0f0f0', stroke: 'black', strokeWidth: '0.5' }} transform="translate(227 15)" rx="1" ry="1" />
                        <rect width="10" height="35" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(212 15)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(227 31)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(227 38)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(227 45)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(234 31)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(234 38)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(234 45)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(241 31)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(241 38)" rx="1" ry="1" />
                        <rect width="4" height="4" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} transform="translate(241 45)" rx="1" ry="1" />
                    </g>
                    <g id="mouse">
                        <rect width="12" height="20" x="187" y="71" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} rx="4" ry="4" />
                        <line x1="193" y1="71" x2="193" y2="78" style={{ stroke: 'black', strokeWidth: 0.5 }} />
                    </g>
                    <g id="desk">
                        <rect width="260" height="104" x="1" y="1" style={{ fill: 'white', stroke: 'black', strokeWidth: 1 }} rx="1" ry="1" />
                    </g>
                    <g id="cpu">
                        <rect width="40" height="84" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} transform="translate(10 10)" rx="1" ry="1" />
                    </g>
                    <g id="desktop">
                        <use href="#cpu" />
                        <use href="#keyboard" />
                        <use href="#mouse" />
                    </g>
                    <g id="laptop">
                      
                        <rect width="110" height="3" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} transform="translate(70 18)" rx="2" ry="2" />
                        <polygon points="75,35 175,35 180,20 70,20" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} rx="1" ry="1" />
                        <polygon points="77,33 173,33 177,22 73,22" style={{ fill: '#cacaca', stroke: 'black', strokeWidth: 0.5 }} rx="1" ry="1" />
                        
                        <rect width="100" height="58" x="75" y="36" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} rx="1" ry="1" />
                        <rect width="25" height="13" x="113" y="73" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: '0.7' }} rx="1" ry="1" />
                        <rect width="60" height="4" x="95" y="62" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="81" y="62" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="88" y="62" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="158" y="62" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="165" y="62" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />

                        <rect width="18" height="4" x="81" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="102" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="109" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="116" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="123" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="130" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="137" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="144" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="18" height="4" x="151" y="54" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />

                        <rect width="11" height="4" x="81" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="95" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="102" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="109" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="116" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="123" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="130" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="137" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="144" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="4" height="4" x="151" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />
                        <rect width="11" height="4" x="158" y="46" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.5' }} rx="1" ry="1" />

                        <line x1="126" y1="80" x2="126" y2="85" style={{ stroke: 'black', strokeWidth: 0.5 }} />
                   
                        <use href="#mouse" />
                    </g>

                    {this.buildDesksDefinitions()}
                </defs>

                {this.showEditMode()}

                <rect id="selectableRect" x={0} y={0} width="260" height="260" style={{ fill: 'rgb(0,123,255, 0.2)', strokeWidth: 2, stroke: 'rgb(0,123,255)', visibility: 'hidden' }} transform="translate(1 1)" rx="1" ry="1" onClick={this.unSelectDesk} />

                {this.showDesks()}

                <rect id="svgLastElement" x={0} y={0} width="0" height="0" />

            </svg>)
    }
}