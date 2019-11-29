import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import addSankeyModule from 'highcharts/modules/sankey';
import ShareComponent from './SubComponents/ShareComponent';

import classes from '../GraphComponents.scss';

addSankeyModule(Highcharts);

HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);


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
      chart: {
        style: { 'font-family': 'Inter UI' },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      colors: [classes.sanKey1, classes.sanKey2],
      tooltip: {
        pointFormat: '{point.fromNode.name} → {point.toNode.name}: <b>{point.weight}',
      },
      series: [{
        keys: ['from', 'to', 'weight'],
        data: this.props.data,
        type: 'sankey',
      }],
      exporting: {
        filename: this.props.filename,
        buttons: {
          contextButton: {
            enabled: false,
          },
        },
        chartOptions: {
          title: {
            text: this.props.filename,
          },
          credits: {
            enabled: true,
            text: "Source : ScanR, Moteur de la Recherche et de l'Innovation",
          },
        },
      },
    };
    this.setState({ options });
  }

  render() {
    return (
      <div>
        {
          this.state.options !== null
            ? (
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
                <ShareComponent
                  language={this.props.language}
                  filename={this.props.filename}
                  chart={this.chart}
                />
              </div>
            )
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

HighChartsSankey.defaultProps = {
  data: [],
};

HighChartsSankey.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  data: PropTypes.object,
};
