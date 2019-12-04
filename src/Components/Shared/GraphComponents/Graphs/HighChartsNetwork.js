import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import addSankeyModule from 'highcharts/modules/networkgraph';
import ShareComponent from './SubComponents/ShareComponent';

import classes from '../GraphComponents.scss';

addSankeyModule(Highcharts);

HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);


/**
 * HighChartsNetwork
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsNetwork extends Component {
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
        type: 'networkgraph',
        height: '700px',
      },
      plotOptions: {
        networkgraph: {
          keys: ['from', 'to'],
          layoutAlgorithm: {
            enableSimulation: true,
            integration: 'verlet',
            linkLength: 120,
          },
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      subtitle: {
        text: (this.props.subtitle) ? (this.props.subtitle) : '',
      },
      series: [{
        dataLabels: {
          enabled: true,
          allowOverlap: true,
          textPath: {
            enabled: false,
          },
          linkFormat: '',
          filter: {
            property: 'radius',
            operator: '>',
            value: 9.5,
          },
        },
        data: this.props.data,
        nodes: this.props.nodes,
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
            text: "Source : scanR, Moteur de la Recherche et de l'Innovation",
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

HighChartsNetwork.defaultProps = {
  data: [],
};

HighChartsNetwork.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  data: PropTypes.object,
  nodes: PropTypes.object,
  subtitle: PropTypes.string,
};
