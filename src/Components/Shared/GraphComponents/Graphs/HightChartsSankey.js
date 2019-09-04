import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import addSankeyModule from 'highcharts/modules/sankey';
import {
  HighchartsChart, withHighcharts, XAxis, YAxis, Title, SankeySeries, Tooltip,
} from 'react-jsx-highcharts';

addSankeyModule(Highcharts);

const data = {
  Brazil: { Portugal: 5, France: 1, Spain: 1, England: 1 },
  Canada: { Portugal: 1, France: 5, England: 1 },
  Mexico: { Portugal: 1, France: 1, Spain: 5, England: 1 },
  USA:    { Portugal: 1, France: 1, Spain: 1, England: 5 }
};

const SankeyChart = (props) => {
  const formattedData = Object.keys(data).reduce((arr, from) => {
    const weights = data[from];
    return arr.concat(Object.keys(weights).map(to => [from, to, weights[to]]));
  }, []);

  return (
    <div className="SankeyChart">
      <HighchartsChart>
        <Title>
          {props.title}
        </Title>

        <XAxis type="category" />

        <YAxis>
          <SankeySeries name="Sankey demo series" data={formattedData} keys={['from', 'to', 'weight']} />
        </YAxis>

        <Tooltip />
      </HighchartsChart>
    </div>
  );
};

export default withHighcharts(SankeyChart, Highcharts);

SankeyChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
