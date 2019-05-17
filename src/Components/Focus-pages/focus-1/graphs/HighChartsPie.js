import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
  },
  title: { text: 'Je suis un titre' },
  credits: false,
  // title: {
  //     text: 'Browser<br>shares<br>2017',
  //     align: 'center',
  //     verticalAlign: 'middle',
  //     y: 0
  // },
  legend: {
    align: 'right',
    layout: 'vertical',
    verticalAlign: 'middle',
    x: 0,
    y: 0,
    itemStyle: {
      fontSize: '20px',
    },
    itemMarginTop: 15,
    itemMarginBottom: 15,
    labelabelFormatter() {
      return `<span>${this.name}</span>(<b>${this.y}%)<br/>`;
    },
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false,
        // distance: -50,
        // style: {
        //     fontWeight: 'bold',
        //     color: 'white'
        // }
      },
      showInLegend: true,
      startAngle: 0,
      endAngle: 360,
      center: ['50%', '50%'],
      size: '100%',
    },
  },
  series: [{
    type: 'pie',
    name: 'Browser share',
    innerSize: '50%',
    data: [
      ['Chrome', 58.9],
      ['Firefox', 13.29],
      ['Internet Explorer', 13],
      ['Edge', 3.78],
      ['Safari', 3.42],
      {
        name: 'Other',
        y: 7.61,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  }],
};

const HighChartsPie = () => (
  <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>
);

export default HighChartsPie;
