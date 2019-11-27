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

export default class HighChartsBar extends Component {
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
    const localData = this.props.data.entries.map(item => ({ label: item.value, count: item.count, label_normalized: item.value.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace('"', '') }));
    const r = {};
    localData.forEach((o) => {
      r[o.label_normalized] = {
        count: (r[o.label_normalized] ? r[o.label_normalized].count + o.count : o.count),
        label: (r[o.label_normalized] ? r[o.label_normalized].label : o.label),
      };
    });
    let result = Object.keys(r).map(k => (
      { label: r[k].label, count: r[k].count }
    ));
    result = result.sort((a, b) => b.count - a.count);
    const labels = [];
    const values = [];
    result.forEach((e) => {
      if (labels.length < this.nbBars) {
        labels.push(e.label);
        values.push(e.count);
      }
    });
    const data = {
      labels,
      values,
    };

    const unit = 'unité';
    const options = {
      chart: {
        type: 'bar',
        style: { 'font-family': 'Inter UI' },
      },
      credits: {
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
        name: unit,
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

HighChartsBar.defaultProps = {
  data: { entries: [] },
};

HighChartsBar.propTypes = {
  filename: PropTypes.string.isRequired,
  data: PropTypes.object,
};
