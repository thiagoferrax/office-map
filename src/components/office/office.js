import React from 'react';

const calculate = (bay, axis) => axis === 'x' ? bay.x * 270 : bay.y * 270

const calculateViewBox = data => {
    const maximus = data && data.reduce((maximus, bay) => {
        maximus.x = Math.max(maximus.x, bay.x)
        maximus.y = Math.max(maximus.y, bay.y)
        return maximus
    }, {x:0, y:0})
    
    maximus.x = !maximus.x ? 1 : maximus.x 
    
    return `0 0 ${(maximus.x+1) * 270 + 3} ${(maximus.y+1) * 270 + 3}`
}

export default props =>
    <svg viewBox={calculateViewBox(props.data)} style={{ background: 'linear-gradient(to right, #ece9e6, #ffffff)' }}>
        <defs>
            <g id="chair">
                <rect width="70" height="70" stroke="black" fill="#4d4dff" transform="translate(110 102)" strokeWidth='0.7' rx="20" ry="20" />
                <rect width="60" height="12" stroke="black" fill="#a5a5a5" transform="translate(114 170)" strokeWidth='0.7' rx="7" ry="7" />
                <rect width="10" height="40" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.7' }} transform="translate(102 112)" rx="3" ry="3" />
                <rect width="10" height="40" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: '0.7' }} transform="translate(178 112)" rx="3" ry="3" />
            </g>
            <g id="drawer">
                <rect width="70" height="100" stroke="black" fill="#a5a5a5" transform="translate(200 38)" strokeWidth='0.7' rx="1" ry="1" />
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
                <rect width="50" height="20" style={{ fill: '#e1e1e1', stroke: 'black', strokeWidth: 0.7 }} transform="translate(120 23)" rx="1" ry="1" />
                <rect width="146" height="5" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} transform="translate(70 30)" rx="1" ry="1" />
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
                <rect width="270" height="130" x="1" y="1" style={{ fill: 'white', stroke: 'black' }} stroke-width="1" rx="1" ry="1" />
            </g>
            <g id="cpu">
                <rect width="40" height="78" style={{ fill: '#a5a5a5', stroke: 'black', strokeWidth: 0.7 }} transform="translate(10 10)" rx="1" ry="1" />
            </g>
            <g id="myDesk_down">
                <use href="#chair" transform="translate(-10 19)" />
                <use href="#drawer" transform="translate(-10 2)" />
                <use href="#desk" transform="translate(0 0)" />
                <use href="#keyboard" transform="translate(-10 21)" />
                <use href="#mouse" transform="translate(-18 21)" />
                <use href="#monitor" transform="translate(-10 0)" />
                <use href="#phone" transform="translate(-30 0)" />
                <use href="#cpu" transform="translate(0 0)" />
            </g>
            <g id="myDesk_up">
                <use href="#myDesk_down" transform="rotate(-180 136 136)" />
            </g>
            <g id="myDesk_right">
                <use href="#myDesk_down" transform="rotate(-90 136 136)" />
            </g>
            <g id="myDesk_left">
                <use href="#myDesk_right" transform="rotate(-180 136 136)" />
            </g>
        </defs>

        {
            props.data && props.data.map(bay => (<use href={`#myDesk_${bay.type}`} x={calculate(bay, 'x')} y={calculate(bay, 'y')} />))
        }
    </svg>