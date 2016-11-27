/*
Copyright 2016 Capital One Services, LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import React, { Component } from 'react';
import { Text as ReactText }  from 'react-native';
import Svg, { G, Rect, Path, Text } from 'react-native-svg';
import { identity } from 'react-native-pathjs-charts/src/util';

const pie = require('paths-js/pie');

const dim = 320;


export default class PieChart extends Component {

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available';
    if (this.props.production === undefined) return (<ReactText>{noDataMsg}</ReactText>);

    const radius = dim / 2;

    const production = pie({
      center: [0, 0],
      r: 120,
      R: radius,
      data: this.props.production,
      accessor: this.props.accessor || identity(this.props.accessorKey),
    });

    const consumption = pie({
      center: [0, 0],
      r: 75,
      R: 115,
      data: this.props.consumption,
      accessor: this.props.accessor || identity(this.props.accessorKey),
    });

    const currentConsumption = this.props.consumption.filter((c => c.name === 'Today'))[0];
    const currentProduction = this.props.production.filter((c => c.name === 'Today'))[0];

    const slices = [
      (
        <G key={0} x={radius} y={radius}>
          <Path d={consumption.curves[0].sector.path.print()} fill={'#25C7CF'} fillOpacity={1} />
        </G>
      ),
      (
        <G key={1} x={radius} y={radius}>
          <Path d={consumption.curves[1].sector.path.print()} fill={'#efefef'} fillOpacity={1} />
        </G>
      ),
    ];
    const productionSlices = [
      (
        <G key={0} x={radius} y={radius}>
          <Path d={production.curves[0].sector.path.print()} fill={'#FD8224'} fillOpacity={1} />
        </G>
      ),
      (
        <G key={1} x={radius} y={radius}>
          <Path d={production.curves[1].sector.path.print()} fill={'#efefef'} fillOpacity={1} />
        </G>
      ),
    ];

    const barWidth = dim / 4;
    const barHeight = 5;

    return (
      <Svg style={this.props.style} width={this.props.width} height={this.props.height} viewBox={`0 0 ${dim} ${dim}`}>
        <G x={0} y={0}>
          { productionSlices }
        </G>
        <G x={0} y={0}>
          { slices }
        </G>
        <G x={radius} y={radius}>
          <Text y={-36} fill={'#FD8224'} textAnchor="middle" fontSize={(this.props.width / 10) - 2} fontWeight={'500'}>{`${currentProduction.kW}kW`}</Text>
          <Rect x={-(dim / 8)} y={0} fill={'#cccccc'} width={barWidth} height={barHeight} />
          <Text y={barHeight} fill={'#25C7CF'} textAnchor="middle" fontSize={(this.props.width / 10) - 2} fontWeight={'500'}>{`${currentConsumption.kW}kW`}</Text>
        </G>
      </Svg>
    );
  }
}
