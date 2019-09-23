import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addSankeyModule from 'highcharts/modules/sankey';

addSankeyModule(Highcharts);

Highcharts.theme = {
  colors: ['#55BF3B', '#90ee7e'],
  chart: {
    backgroundColor: '#ffffff',
    style: {
      fontFamily: 'Dosis, sans-serif',
    },
  },
  title: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'rgba(219,219,216,0.8)',
    shadow: false,
  },
  legend: {
    backgroundColor: '#F0F0EA',
    itemStyle: {
      fontWeight: 'bold',
      fontSize: '13px',
    },
  },
  xAxis: {
    gridLineWidth: 1,
    labels: {
      style: {
        fontSize: '12px',
      },
    },
    tickWidth: 2,
  },
  yAxis: {
    tickWidth: 2,
    minorTickInterval: 'auto',
    title: {
      style: {
        textTransform: 'uppercase',
      },
    },
    labels: {
      style: {
        fontSize: '12px',
      },
    },
  },
  plotOptions: {
    candlestick: {
      lineColor: '#404048',
    },
  },
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

const options = {
  title: {
    text: 'Highcharts Sankey Diagram',
  },
  series: [{
    keys: ['from', 'to', 'weight'],
    data: [
      ['H2020', '2012', 5],
      ['H2020', '2013', 1],
      ['H2020', '2014', 1],
      ['H2020', '2015', 1],
      ['ANR', '2012', 1],
      ['ANR', '2014', 5],
      ['ANR', '2015', 1],
      ['2012', 'fin1', 5],
      ['2013', 'fin1', 5],
      ['2014', 'fin2', 15],
      ['2015', 'fin1', 5],
    ],
    type: 'sankey',
    name: 'Sankey demo series',
  }],
};


const SankeyChart = () => (
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
);

export default SankeyChart;
