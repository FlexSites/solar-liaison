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

import React, {Component} from 'react'
import {Text as ReactText}  from 'react-native'
import Svg,{ G, Path, Text} from 'react-native-svg'
import { Colors, Options, cyclic, identity, fontAdapt } from 'react-native-pathjs-charts/src/util'
import _ from 'lodash'
const Pie = require('paths-js/pie')

export default class PieChart extends Component {

  static defaultProps = {
    options: {
      margin: {top: 20, left: 20, right: 20, bottom: 20},
      width: 600,
      height: 600,
      color: '#2980B9',
      r: 100,
      R: 200,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        bold: true,
        color: '#ECF0F1'
      }
    }
  }

  color(i) {
    let color = this.props.options.color
    if (color && !_.isString(color)) color = color.color
    let pallete = this.props.pallete || Colors.mix(color || '#9ac7f7')
    return Colors.string(cyclic(pallete, i)) }


  get defaultRange() {
    return _.map(Array(this.props.data && this.props.data.length),function(){return 0})
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available'
    if (this.props.production === undefined) return (<ReactText>{noDataMsg}</ReactText>)

    let options = new Options(this.props)

    let x = options.chartWidth / 2
    let y = options.chartHeight / 2

    let radius = Math.min(x, y)

    let production = Pie({
      center: this.props.options.center || [0,0],
      r: this.props.options.r || radius /2,
      R: this.props.options.R || radius,
      data: this.props.production,
      accessor: this.props.accessor || identity(this.props.accessorKey)
    })

    let consumption = Pie({
      center: this.props.options.center || [0,0],
      r: 75,
      R: 100,
      data: this.props.consumption,
      accessor: this.props.accessor || identity(this.props.accessorKey)
    })

    let textStyle = fontAdapt(options.label)

    let slices = [
      (
          <G key={0} x={x - options.margin.left} y={y - options.margin.top}>
              <Path d={consumption.curves[0].sector.path.print()} fill={'#25C7CF'} fillOpacity={1}  />
          </G>
      ),
      (
          <G key={1} x={x - options.margin.left} y={y - options.margin.top}>
              <Path d={consumption.curves[1].sector.path.print()} fill={'#efefef'} fillOpacity={1}  />
          </G>
      )
    ]
    let productionSlices = [
      (
          <G key={0} x={x - options.margin.left} y={y - options.margin.top}>
              <Path d={production.curves[0].sector.path.print()} fill={'#FD8224'} fillOpacity={1}  />
          </G>
      ),
      (
          <G key={1} x={x - options.margin.left} y={y - options.margin.top}>
              <Path d={production.curves[1].sector.path.print()} fill={'#efefef'} fillOpacity={1}  />
          </G>
      ),
    ]


    let returnValue = <Svg width={options.width} height={options.height}>
            <G x={options.margin.left} y={options.margin.top}>
                { productionSlices }
            </G>
            <G x={options.margin.left} y={options.margin.top}>
                { slices }
            </G>
            <Text x={130} y={160} fontSize={72} fontWeight={'500'}>7kW</Text>
          </Svg>

    return returnValue
  }
}