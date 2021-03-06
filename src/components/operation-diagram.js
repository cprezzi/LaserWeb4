// Copyright 2016 Todd Fleming
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react'
import ReactDOM from 'react-dom'
import Snap from 'snapsvg-cjs';

const hide = [
    'svgCNCFlatBit',
    'svgCNCVbit',
    'svgInside',
    'svgKnifeGrp',
    'svgKnifeView',
    'svgLaserGrp',
    'svgLaserRasterToolpath',
    'svgOpName',
    'svgOutside',
    'svgPocket',
    'svgToolDiaGrp',
    'svgToolpath',
    'svgzClearance',
    'svgZGrp',
    'svgzmulti',
];

const types = {
    'Laser Engrave': { show: ['svgOpName', 'svgLaserGrp', 'svgToolpath'] },
    'Laser Inside': { show: ['svgOpName', 'svgLaserGrp', 'svgToolpath', 'svgInside'] },
    'Laser Outside': { show: ['svgOpName', 'svgLaserGrp', 'svgToolpath', 'svgOutside'] },
    'Mill Pocket': { show: ['svgOpName', 'svgCNCFlatBit', 'svgToolpath', 'svgzClearance', 'svgZGrp', 'svgzmulti', 'svgPocket', 'svgToolDiaGrp'] },
    'Mill Engrave': { show: ['svgOpName', 'svgCNCFlatBit', 'svgToolpath', 'svgzClearance', 'svgZGrp', 'svgzmulti'] },
    'Mill Inside': { show: ['svgOpName', 'svgCNCFlatBit', 'svgToolpath', 'svgzClearance', 'svgZGrp', 'svgzmulti', 'svgInside', 'svgToolDiaGrp'] },
    'Mill Outside': { show: ['svgOpName', 'svgCNCFlatBit', 'svgToolpath', 'svgzClearance', 'svgZGrp', 'svgzmulti', 'svgOutside', 'svgToolDiaGrp'] },
};

export class OperationDiagram extends React.Component {
    componentWillMount() {
        fetch('cnctoolpath.svg')
            .then(resp => resp.text())
            .then(content => {
                this.svg = Snap.parse(content).select('svg').node;
                this.svg.style.width = '100%';
                this.svg.style.height = 'inherit';
                ReactDOM.findDOMNode(this).appendChild(this.svg);
                this.updateSvg();
            });
    }

    updateSvg(props) {
        let { operations, currentOperation } = this.props;
        if (!this.svg)
            return;
        for (let id of hide)
            document.getElementById(id).style.display = 'none';
        let op = operations.find(op => op.id === currentOperation);
        if (!op)
            return;
        let type = types[op.type];
        if (!type)
            return;
        for (let id of type.show)
            document.getElementById(id).style.display = 'inline';
        document.getElementById('svgOpName').textContent = op.type;
        document.getElementById('svgToolDia').textContent = op.toolDiameter + 'mm';
        document.getElementById('svgZClear-8').textContent = ''; // TODO
        document.getElementById('svgZDepth').textContent = op.passDepth + 'mm per pass';
        document.getElementById('svgZFinal').textContent = op.cutDepth + ' mm';
    }

    render() {
        this.updateSvg();
        return <div />;
    }
};
