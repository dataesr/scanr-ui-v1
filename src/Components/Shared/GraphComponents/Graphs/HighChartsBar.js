import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import ShareComponent from './SubComponents/ShareComponent';

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
    const localData = this.props.data.entries.filter(item => item.value).map(item => ({ label: item.value, count: item.count, label_normalized: item.value.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace('"', '') }));
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
    const style = { 'font-family': 'Inter UI' };
    if (this.props.height) {
      style.height = this.props.height;
    }

    const unit = 'unité';
    const options = {
      chart: {
        type: 'bar',
        style,
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
          'font-size': '1.2rem',
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
                <ShareComponent
                  language={this.props.language}
                  filename={this.props.filename}
                  chart={this.chart}
                />
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
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  data: PropTypes.object,
  height: PropTypes.string,
};
