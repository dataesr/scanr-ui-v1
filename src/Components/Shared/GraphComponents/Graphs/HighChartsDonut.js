import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';

import classes from '../GraphComponents.scss';

HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);

/**
 * HighChartsDonut
 * Url : <br/>
 * Description : Composant HighCharts qui rend les donuts <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsDonut extends Component {
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
    const unit = 'unité';
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
          fontSize: '14px',
        },
        itemMarginTop: 5,
        itemMarginBottom: 5,
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
        name: unit,
        innerSize: '50%',
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
            </div>
          )
          : <div>Loading...</div>
      }
      </div>
    );
  }
}


HighChartsDonut.propTypes = {
  filename: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
