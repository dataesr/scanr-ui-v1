import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';

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
    this.data = this.props.data;
    this.state = {
      options: null,
    };
    this.exportChartPdf = this.exportChartPdf.bind(this);
    this.exportChartPng = this.exportChartPng.bind(this);
    this.exportChartCsv = this.exportChartCsv.bind(this);
  }

  componentDidMount() {
    const typeFacets = this.props.data.find(item => item.id === 'facet_natures') || { entries: [] };
    const UUFacets = this.props.data.find(item => item.id === 'facet_urban_hits') || { entries: [] };
    const UrbanUnitData = {
      labels: UUFacets.entries.slice(0, 10).map(item => (item.value)),
      values: UUFacets.entries.slice(0, 10).map(item => (item.count)),
    };
    const NaturesData = {
      labels: typeFacets.entries.slice(0, 10).map(item => (item.value)),
      values: typeFacets.entries.slice(0, 10).map(item => (item.count)),
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
        lineWidth: 0,
        categories: NaturesData.labels,
        labels:
        {
          style: { color: '#000000' },
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
            stacking: 'normal',
            enabled: true,
            align: 'right',
            // x: 30,
            style: { color: '#000000' },
          },
        },
      },
      series: [{
        color: '#FDD85E',
        name: unit,
        data: NaturesData.values,
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
    };
    const ShareComponent = () => (
      <div>
        <hr />
        <div style={{ float: 'left' }}>
          <p className={`${classes.BtnTxt}`}>Partager</p>
          <i style={btnShare} className="fas fa-share-alt-square fa-lg" />
          <p className={`${classes.BtnTxt}`}>Intégrer le code</p>
          <i style={btnShare} className="fas fa-code fa-lg" />
        </div>
        <div style={{ float: 'right' }}>
          <p className={`${classes.BtnTxt}`}><b>Télécharger</b></p>
          <button type="button" onClick={this.exportChartPdf} className={`${classes.Button}`}><i style={btnExport} className="fas fa-file-pdf fa-lg" /></button>
          <p className={`${classes.BtnTxt}`}>.pdf</p>
          <button type="button" onClick={this.exportChartPng} className={`${classes.Button}`}><i style={btnExport} className="fas fa-image fa-lg" /></button>
          <p className={`${classes.BtnTxt}`}>.png</p>
          <button type="button" onClick={this.exportChartCsv} className={`${classes.Button}`}><i style={btnExport} className="fas fa-table fa-lg" /></button>
          <p className={`${classes.BtnTxt}`}>.csv</p>
        </div>
      </div>
    );
    return (
      <div>
        {
          this.state.options !== null
            ? (
              <div>
                <div style={{ paddingLeft: '5%' }}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                    ref={this.chart}
                  />
                </div>
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
