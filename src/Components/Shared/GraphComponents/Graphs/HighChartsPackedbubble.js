import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCmore from 'highcharts/highcharts-more.src';
import PropTypes from 'prop-types';

HCmore(Highcharts);

const PackedBubbleChart = (props) => {
  const options = {
    chart: {
      type: 'packedbubble',
      height: '50%',
    },
    exporting: { enabled: false },
    credits: { enabled: false },
    title: {
      text: props.text,
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} productions en commun',
    },
    plotOptions: {
      packedbubble: {
        minSize: '80%',
        maxSize: '100%',
        zMin: 0,
        zMax: 100,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: 1000,
          },
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal',
          },
        },
      },
    },
    series: props.series,
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default PackedBubbleChart;

PackedBubbleChart.propTypes = {
  series: PropTypes.array.isRequired,
  text: PropTypes.string,
};
