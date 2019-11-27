import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import ReactPiwik from 'react-piwik';

import classes from '../GraphComponents.scss';

HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);

/**
 * HighChartsBar
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsLine extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.data = this.props.data;
    this.state = {
      options: null,
    };
    this.exportChartPdf = this.exportChartPdf.bind(this);
    this.exportChartPng = this.exportChartPng.bind(this);
    this.exportChartCsv = this.exportChartCsv.bind(this);
  }

  componentDidMount() {
    const data = {
      labels: this.data.entries.map(item => (item.value)),
      values: this.data.entries.map(item => (item.count)),
    };

    const options = {
      chart: {
        type: 'area',
        style: { 'font-family': 'Inter UI' },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xAxis: {
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        lineWidth: 0,
        tickWidth: 0,
        categories: data.labels,
        labels: {
          style: { color: '#000000' },
          align: 'right',
          x: -10,
        },
      },
      yAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        tickWidth: 0,
        minorGridLineWidth: 0,
        title: { text: '' },
        labels: { enabled: false },
      },
      legend: {
        hide: true,
        enabled: false,
        // reversed: true
      },
      plotOptions: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
        series: {
          stacking: 'normal',
          pointPadding: 0,
          // groupPadding: 0.1,
          dataLabels: {
            enabled: true,
            align: 'right',
            // textAlign: 'right',
            x: 0,
            style: { color: '#000000' },
          },
        },
      },
      series: [{
        color: '#FDD85E',
        data: data.values,
        borderRadiusTopLeft: '80%',
        borderRadiusTopRight: '80%',
        borderRadiusBottomLeft: '80%',
        borderRadiusBottomRight: '80%',
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
          <div className="pr-1 d-flex align-items-center">
            <span className={`pr-2 pl-3 ${classes.ShareTexts}`}>Intégrer le code</span>
            <button type="button" className={classes.Button}>
              <i className="fas fa-code" />
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
                <ShareComponent />
              </div>
            )
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

HighChartsLine.defaultProps = {
  data: { entries: [] },
};

HighChartsLine.propTypes = {
  filename: PropTypes.string.isRequired,
  data: PropTypes.object,
};
