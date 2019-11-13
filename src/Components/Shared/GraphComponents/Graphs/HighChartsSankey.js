import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addSankeyModule from 'highcharts/modules/sankey';
import classes from '../GraphComponents.scss';

addSankeyModule(Highcharts);


/**
 * HighChartsSankey
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsSankey extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.data = this.props.data;
    this.state = {
      options: null,
    };
  }

  componentDidMount() {
    this.loadAll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.loadAll();
    }
  }

  loadAll() {
    const options = {
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        keys: ['from', 'to', 'weight'],
        data: this.data,
        type: 'sankey',
      }],
    };
    this.setState({ options });
  }

  render() {
    return (
      <div>
        <hr className={classes.HorizontalBar} />
        <div className="pl-4">
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state.options}
            ref={this.chart}
          />
        </div>
        <hr className={classes.HorizontalBar} />
      </div>
    );
  }
}

HighChartsSankey.defaultProps = {
  data: [1, 1, 1],
};

HighChartsSankey.propTypes = {
  data: PropTypes.object,
};
