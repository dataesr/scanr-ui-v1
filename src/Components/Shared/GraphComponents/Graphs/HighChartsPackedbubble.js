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
        minSize: '30%',
        maxSize: '150%',
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
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
