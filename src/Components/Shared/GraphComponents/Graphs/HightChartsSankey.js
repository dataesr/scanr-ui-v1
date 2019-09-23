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
      ['2012', 'ANR', 5],
      ['2012', 'H2020', 1],
      ['2013', 'H2020', 1],
      ['2014', 'ANR', 5],
      ['2014', 'H2020', 1],
      ['2015', 'ANR', 1],
      ['2015', 'H2020', 1],
      ['ANR', 'fin1', 5],
      ['H2020', 'fin1', 4],
      ['ANR', 'fin2', 4],
      ['H2020', 'fin2', 1],
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
