import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import ShareComponent from './SubComponents/ShareComponent';

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
    if (this.props.colors) {
      this.colors = this.props.colors;
    } else {
      this.colors = ['#43ab92', '#f75f00', '#c93838', '#512c62', '#8f4426', '#64ccda', '#5f6769', '#ff78ae', '#00818a', '#0c093c'];
    }
    this.state = {
      options: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.loadData();
    }
  }

  loadData = () => {
    const data = this.props.data.entries.map(item => ({ name: item.value, y: item.count, color: item.color }));
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: { text: '' },
      subtitle: {
        text: (this.props.subtitle) ? (this.props.subtitle) : '',
      },
      colors: this.colors,
      credits: false,
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
        labelFormatter() {
          const percentage = this.percentage.toFixed(1);
          return `<span>${this.name}</span> (<b>${percentage}%)<br/>`;
        },
      },
      tooltip: {
        pointFormat: '{point.percentage:.1f} % <br> ({point.y} {point.name})',
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
            distance: 50,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 4,
            },
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
        innerSize: '50%',
        data,
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
    if (window.innerWidth < 992) {
      options.legend.align = 'left';
      options.legend.layout = 'horizontal';
      options.legend.verticalAlign = 'bottom';
      options.legend.itemStyle.fontSize = '11px';
      options.legend.maxHeight = 100;
    }
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
              <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                ref={this.chart}
              />
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


HighChartsDonut.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  colors: PropTypes.object,
  subtitle: PropTypes.string,
};
