import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';


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
    this.data = this.props.data;
    this.state = {
      options: null,
    };
    this.exportChartPdf = this.exportChartPdf.bind(this);
    this.exportChartPng = this.exportChartPng.bind(this);
    this.exportChartCsv = this.exportChartCsv.bind(this);
  }

  componentDidMount() {
    // alert(this.data.data[0].year);
    // alert(this.data.data[0].value);
    const allData = [];
    const dl = this.data.length;
    let series = [];
    for (let i = 0; i < dl; i += 1) {
      const data = [];
      for (let j = 0; j < this.data[i].data.length; j += 1) {
        const tmp = [];
        tmp.push(this.data[i].data[j].year);
        tmp.push(this.data[i].data[j].value);
        data.push(tmp);
      }
      allData.push(data);
    }

    if (dl === 1) {
      series = [{
        name: 'Population',
        data: allData[0],
        color: '#FFB200',
      }];
    } else if (dl === 2) {
      series = [{
        name: 'Population',
        data: allData[0],
        color: '#FFB200',
      }, {
        name: 'Test',
        data: allData[1],
      }];
    } else {
      series = [{
        name: 'Population',
        data: allData[0],
        color: '#FFB200',
      }, {
        name: 'Test',
        data: allData[1],
      }, {
        name: 'Test2',
        data: allData[2],
      }];
    }

    const options = {
      chart: {
        type: 'column',
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>',
      },
      series,
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
              <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                ref={this.chart}
              />
            )
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

HighChartsBar.propTypes = {
  data: PropTypes.object.isRequired,
};
