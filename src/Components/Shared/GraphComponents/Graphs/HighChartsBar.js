import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';

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
    // const labels = [];
    // const values = [];
    // for (let i = 0; i < this.props.temp.meta.total; i += 1) {
    //   labels.push(this.props.temp.data[i].address[0].city)
    //   alert(labels[i]);
    // }
    // const tempOptions = {
    //   chart: {
    //     type: 'bar',
    //   },
    //   credits: {
    //     enabled: false,
    //   },
    //   title: {
    //     text: '',
    //   },
    //   xAxis: {
    //     lineWidth: 0,
    //     categories: this.data.labels,
    //     labels:
    //     {
    //       style: { color: '#000000' },
    //       // enabled: false
    //       align: 'left',
    //       x: 20,
    //     },
    //   },
    //   yAxis: {
    //     min: 0,
    //     gridLineWidth: 0,
    //     minorGridLineWidth: 0,
    //     title: { text: '' },
    //     labels: { enabled: false },
    //   },
    //   legend: {
    //     hide: true,
    //     enabled: false,
    //     // reversed: true
    //   },
    //   plotOptions: {
    //     series: {
    //       stacking: 'normal',
    //       pointPadding: 0,
    //       // groupPadding: 0.1,
    //       dataLabels: {
    //         enabled: true,
    //         align: 'right',
    //         x: 15,
    //         style: { color: '#000000' },
    //       },
    //     },
    //   },
    //   series: [{
    //     color: '#FDD85E',
    //     name: this.data.unit,
    //     data: this.data.values,
    //     borderRadiusTopLeft: '80%',
    //     borderRadiusTopRight: '80%',
    //     borderRadiusBottomLeft: '80%',
    //     borderRadiusBottomRight: '80%',
    //   }],
    //   exporting: {
    //     filename: this.props.filename,
    //     buttons: {
    //       contextButton: {
    //         enabled: false,
    //       },
    //     },
    //     chartOptions: {
    //       title: {
    //         text: this.props.filename,
    //       },
    //     },
    //   },
    // };
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
