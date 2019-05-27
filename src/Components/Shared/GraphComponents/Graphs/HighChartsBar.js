import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';

import classes from '../GraphComponents.scss';

HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);

export default class HighChartsBar extends Component {
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
    const labels = [];
    const values = [];
    const unit = 'unité';
    for (let i = 0; i < this.props.data.length; i += 1) {
      labels.push(this.props.data[i][0]);
      values.push(this.props.data[i][1]);
    }
    const options = {
      chart: {
        type: 'bar',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xAxis: {
        lineWidth: 0,
        categories: labels,
        labels:
        {
          style: { color: '#000000' },
          // enabled: false
          align: 'left',
          x: 20,
        },
      },
      yAxis: {
        min: 0,
        gridLineWidth: 0,
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
            x: 15,
            style: { color: '#000000' },
          },
        },
      },
      series: [{
        color: '#FDD85E',
        name: unit,
        data: values,
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
        },
      },
    };
    this.setState({ options });
  }

  exportChartPdf() {
    this.chart.current.chart.exportChart({
      type: 'application/pdf',
    });
  }

  exportChartPng() {
    this.chart.current.chart.exportChart({
      type: 'image/png',
    });
  }

  exportChartCsv() {
    this.chart.current.chart.downloadCSV();
  }

  render() {
    const btnShare = {
      paddingLeft: '5px',
      paddingRight: '10px',
      color: '#3778bb',
      cursor: 'not-allowed',
    };
    const btnExport = {
      color: '#3778bb',
      cursor: this.state.cursor,
    };
    const ShareComponent = () => (
      <div>
        <hr />
        <div style={{ display: 'inline-block', float: 'left' }}>
          <p className={`${classes.Subtitle}`}>Partager</p>
          <i style={btnShare} className="fas fa-share-alt-square fa-lg" />
          <p className={`${classes.Subtitle}`}>Intégrer le code</p>
          <i style={btnShare} className="fas fa-code fa-lg" />
        </div>
        <div style={{ display: 'inline-block', marginBottom: '20px', float: 'right' }}>
          <p className={`${classes.Subtitle}`}><b>Télécharger</b></p>
          <button type="button" onClick={this.exportChartPdf} className={`${classes.Button}`}><i style={btnExport} className="fas fa-file-pdf fa-lg" /></button>
          <p className={`${classes.Subtitle}`}>.pdf</p>
          <button type="button" onClick={this.exportChartPng} className={`${classes.Button}`}><i style={btnExport} className="fas fa-image fa-lg" /></button>
          <p className={`${classes.Subtitle}`}>.png</p>
          <button type="button" onClick={this.exportChartCsv} className={`${classes.Button}`}><i style={btnExport} className="fas fa-table fa-lg" /></button>
          <p className={`${classes.Subtitle}`}>.csv</p>
        </div>
      </div>
    );
    return (
      <div>
        {
          this.state.options !== null
            ? (
              <div>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={this.state.options}
                  ref={this.chart}
                />
                <ShareComponent />
              </div>
            )
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

HighChartsBar.propTypes = {
  filename: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
