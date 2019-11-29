import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import ReactPiwik from 'react-piwik';
import treemapModule from 'highcharts/modules/treemap';

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
    this.exportChartPdf = this.exportChartPdf.bind(this);
    this.exportChartPng = this.exportChartPng.bind(this);
    this.exportChartCsv = this.exportChartCsv.bind(this);
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

  exportChartPdf() {
    ReactPiwik.push(['trackEvent', 'Download', 'PDF_'.concat(this.props.filename)]);
    this.chart.current.chart.exportChart({
      type: 'application/pdf',
    });
  }

  exportChartPng() {
    ReactPiwik.push(['trackEvent', 'Download', 'PNG_'.concat(this.props.filename)]);
    this.chart.current.chart.exportChart({
      type: 'image/png',
    });
  }

  exportChartCsv() {
    ReactPiwik.push(['trackEvent', 'Download', 'CSV_'.concat(this.props.filename)]);
    this.chart.current.chart.downloadCSV();
  }

  render() {
    const ShareComponent = () => (
      <div className={`d-flex flex-wrap pl-4 pr-4 p-3 ${classes.ShareComponent}`}>
        <div className="mr-auto d-flex align-items-center">
          <div className="pr-1 d-flex align-items-center">
            <span className={`pr-2 ${classes.ShareTexts}`}>Partager</span>
            <button type="button" className={classes.Button}>
              <i className="fas fa-share-alt-square" />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className={`pr-2 ${classes.ShareTexts}`}>Télécharger:</div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={this.exportChartPdf} className={classes.Button}>
              <i className="fas fa-file-pdf" />
            </button>
            <span className={`pr-1 ${classes.ShareTexts}`}>.pdf</span>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={this.exportChartPng} className={classes.Button}>
              <i className="fas fa-image" />
            </button>
            <span className={`pr-1 ${classes.ShareTexts}`}>.png</span>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={this.exportChartCsv} className={classes.Button}>
              <i className="fas fa-table" />
            </button>
            <span className={classes.ShareTexts}>.csv</span>
          </div>
        </div>
      </div>
    );
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
                  <ShareComponent />) : null }
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
  filename: PropTypes.string.isRequired,
  data: PropTypes.array,
  share: PropTypes.any,
};
