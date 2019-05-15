import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// A faire stage:
// valeur numerique + label + couleur -> pourrait etre aussi nombre (type d'affichage)
// serie couleur ou nom échelle ?

import classes from '../GraphComponent.scss';

const test = ['#fe7747', '#96462a'];

const options = {
  chart: {
    marginBottom: 60,
  },
  title: '',
  credits: false,
  legend: {
    enabled: false,
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
    pointFormat: '<b>{point.percentage:.1f}%</b>',
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        format: '<b>{point.name} : {point.percentage:.1f}%</b>',
        style: {
          color: '#003259',
          fontSize: '25px',
        },
        // distance: -50,
        // style: {
        //     fontWeight: 'bold',
        //     color: 'white'
        // }
      },
      showInLegend: true,
      startAngle: 270,
      endAngle: 90,
      center: ['50%', '50%'],
      size: '100%',
    },
  },
  colors: test,
  series: [{
    type: 'pie',
    innerSize: '50%',
    borderWidth: 10,
    data: [
      ['Chercheurs', 52],
      ['Enseignants-chercheurs', 48],
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
