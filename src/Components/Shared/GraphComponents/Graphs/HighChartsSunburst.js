import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addSankeyModule from 'highcharts/modules/sunburst';

addSankeyModule(Highcharts);

Highcharts.setOptions(Highcharts.theme);
Highcharts.getOptions().colors.splice(0, 0, 'transparent');

const SunburstChart = (props) => {
  const options = {
    title: {
      text: props.text,
    },
    exporting: { enabled: false },
    credits: { enabled: false },
    series: [{
      type: 'sunburst',
      data: props.series,
      allowDrillToNode: true,
      cursor: 'pointer',
      dataLabels: {
        format: '{point.name}',
        filter: {
          property: 'innerArcLength',
          operator: '>',
          value: 1,
        },
      },
      levels: [{
        level: 1,
        levelIsConstant: true,
      }, {
        level: 2,
        colorByPoint: true,
      },
      {
        level: 3,
        colorVariation: {
          key: 'brightness',
          to: -0.5,
        },
      }],
    }],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default SunburstChart;

SunburstChart.propTypes = {
  series: PropTypes.array.isRequired,
  text: PropTypes.string,
};
