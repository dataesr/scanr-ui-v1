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
    legend: !(props.data.lengt > 5),
    exporting: { enabled: false },
    credits: { enabled: false },
    title: {
      text: props.text,
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} '.concat(props.tooltipText),
    },
    series: props.data,
    plotOptions: {
      packedbubble: {
        useSimulation: false,
        minSize: '10%',
        maxSize: '100%',
      },
    },
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
  data: PropTypes.array.isRequired,
  text: PropTypes.string,
  tooltipText: PropTypes.string,
};
