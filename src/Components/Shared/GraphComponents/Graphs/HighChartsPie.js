import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';

HCExporting(Highcharts);
HCExportingData(Highcharts);

export default class HighChartsPie extends Component {
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
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: { text: '' },
      credits: false,
      // title: {
      //     text: 'Browser<br>shares<br>2017',
      //     align: 'center',
      //     verticalAlign: 'middle',
      //     y: 0
      // },
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'middle',
        x: 0,
        y: 0,
        itemStyle: {
          fontSize: '20px',
        },
        itemMarginTop: 15,
        itemMarginBottom: 15,
        labelabelFormatter() {
          return `<span>${this.name}</span>(<b>${this.y}%)<br/>`;
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            // distance: -50,
            // style: {
            //     fontWeight: 'bold',
            //     color: 'white'
            // }
          },
          showInLegend: true,
          startAngle: 0,
          endAngle: 360,
          center: ['50%', '50%'],
          size: '100%',
        },
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: ['this.props.data', 10],
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


HighChartsPie.propTypes = {
  filename: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
