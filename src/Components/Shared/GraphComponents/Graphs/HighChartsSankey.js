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
    // this.data = this.props.data;
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
      //colors: ['#43ab92', '#f75f00', '#c93838', '#512c62', '#8f4426', '#64ccda', '#5f6769', '#ff78ae', '#00818a', '#0c093c'],
      colors: [classes.sanKey1, classes.sanKey2],
      tooltip: {
        enabled: false,
      },
      series: [{
        keys: ['from', 'to', 'weight'],
        data: this.props.data,
        type: 'sankey',
      }],
    };
    this.setState({ options });
  }

  render() {
    if (!this.state.options) {
      return null;
    }

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
  data: [['2006', 'ANR', 1], ['ANR', 'na', 16]],
};

HighChartsSankey.propTypes = {
  data: PropTypes.array,
  filename: PropTypes.string,
  language: PropTypes.string,
};
