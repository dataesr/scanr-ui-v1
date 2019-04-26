import React, { Component } from 'react';
import './App.css';
// import BarChart from './Components/VxBar';
// import PieChart from './Components/VxPie';
import HighChartsSimple from './Components/HighCharts'
import HighChartsBubbles from './Components/HighChartsBubbles'
import HighChartsScatter from './Components/HighChartsScatter'
import HighChartsSimpleAccessibility from './Components/HighChartsAccessibility'
import HighChartsBar from './Components/HighChartsBar'
import D3BarChartSimple from './Components/D3BarSimple'
import VegaBarCharts from './Components/VegaBar'
import D3RoundedBar from './Components/D3RoundedBar'
import {SimplePieChart} from  './Components/D3Pie'
import HighChartsPie from './Components/HighChartsPie'
import D3Bar from './Components/D3Bar'
import Map from './Components/LeafletMap'
import Caca from './Components/LeafletMapExport'

class App extends Component {
  render() {
    return (
      <div>
        {/* <BarChart /> */}
        {/* <HighChartsSimple /> */}
        {/* <HighChartsBubbles /> */}
        {/* <HighChartsSimpleAccessibility /> */}
        <HighChartsBar />
        {/* <D3BarChartSimple />
        <VegaBarCharts />
        <D3RoundedBar />
        <SimplePieChart />
        <HighChartsPie />
        <D3Bar />
        <Map /> */}
        {/* <div style={{height : '400px', wdith: '800px'}}>
        <Map />
        </div> */}
        <Map />
        <div style={{width: '800px'}}>
          <HighChartsPie />
        </div>
        {/* <HighChartsScatter /> */}
        {/* <BubbleChart /> */}
        {/* <PieChart /> */}
      </div>
    )
  }
}

export default App;
