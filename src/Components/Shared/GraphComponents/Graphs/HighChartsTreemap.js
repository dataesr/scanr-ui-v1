import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import treemapModule from 'highcharts/modules/treemap';
import ShareComponent from './SubComponents/ShareComponent';

import classes from '../GraphComponents.scss';

treemapModule(Highcharts);

HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);

/**
 * HighChartsTreemap
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsTreemap extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.state = {
      options: null,
    };
    this.nbBars = 10;
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
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top',
            style: {
              fontSize: '15px',
              fontWeight: 'bold',
            },
          },
        }],
        data: this.props.data,
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
                { this.props.share ? (
                  <ShareComponent
                    language={this.props.language}
                    filename={this.props.filename}
                    chart={this.chart}
                  />
                ) : null }
              </div>
            )
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

HighChartsTreemap.defaultProps = {
  data: [],
  share: true,
};

HighChartsTreemap.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  data: PropTypes.array,
  share: PropTypes.any,
};
