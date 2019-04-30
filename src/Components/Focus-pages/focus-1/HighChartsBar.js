import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCRounded from 'highcharts-rounded-corners';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';

HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);

const options = {
  chart: {
    type: 'bar',
  },
  credits: {
    enabled: false,
  },
  // labels: {
  //     align: 'right',
  //     x: -1,
  //     y: 0
  // },
  title: {
    text: '',
  },
  xAxis: {
    lineWidth: 0,
    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    labels:
    {
      style: { color: '#000000' },
      // enabled: false
      align: 'left',
      x: 20,
    },
  },
  yAxis: {
    min: 0,
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    title: {
      text: '',
      // text: 'Total fruit consumption'
    },
    labels:
    {
      enabled: false,
    },
  },
  legend: {
    hide: true,
    enabled: false,
    // reversed: true
  },
  plotOptions: {
    series: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
        align: 'right',
        x: 15,
        style: { color: '#000000' },
      },
    },
  },
  series: [{
    color: '#FDD85E',
    name: 'John',
    data: [7, 5, 4, 3, 2],
    borderRadiusTopLeft: '80%',
    borderRadiusTopRight: '80%',
    borderRadiusBottomLeft: '80%',
    borderRadiusBottomRight: '80%',
  }],
  // }, {
  //   name: 'Jane',
  //   data: [2, 2, 3, 2, 1],
  // }, {
  //   name: 'Joe',
  //   data: [3, 4, 4, 2, 5],
  // }],
};

const HighChartsBar = () => (
  <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>
);

export default HighChartsBar;
