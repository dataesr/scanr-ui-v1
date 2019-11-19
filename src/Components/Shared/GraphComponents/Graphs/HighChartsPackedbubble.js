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
    colors: ['#43ab92', '#f75f00', '#c93838', '#512c62', '#8f4426', '#64ccda', '#5f6769', '#ff78ae', '#00818a', '#0c093c'],
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
        useSimulation: true,
        minSize: '10%',
        maxSize: '100%',
        layoutAlgorithm: {
          splitSeries: (props.data.length > 2),
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: true,
        },
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
