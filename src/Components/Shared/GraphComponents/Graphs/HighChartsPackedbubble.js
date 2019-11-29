import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import HCmore from 'highcharts/highcharts-more.src';
import ShareComponent from './SubComponents/ShareComponent';

import classes from '../GraphComponents.scss';

HCmore(Highcharts);


HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);

/**
 * HighChartsPackedbubble
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsPackedbubble extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.data = this.props.data;
    this.tooltipText = this.props.tooltipText || '';
    this.state = {
      options: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text || prevProps.tooltipText !== this.props.tooltipText) {
      this.loadData();
    }
  }

  loadData = () => {
    const options = {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'packedbubble',
      },
      tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value} '.concat(this.tooltipText),
      },
      colors: ['#43ab92', '#f75f00', '#c93838', '#512c62', '#8f4426', '#64ccda', '#5f6769', '#ff78ae', '#00818a', '#0c093c'],
      title: {
        text: (this.props.text) ? (this.props.text) : '',
      },
      series: this.data,
      plotOptions: {
        packedbubble: {
          useSimulation: true,
          minSize: '10%',
          maxSize: '80%',
          layoutAlgorithm: {
            splitSeries: true,
            seriesInteraction: false,
            dragBetweenSeries: false,
            parentNodeLimit: true,
          },
        },
      },
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
                <div className="pl-4">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                    ref={this.chart}
                  />
                </div>
                <hr className={classes.HorizontalBar} />
                {
                  this.props.exporting
                    ? (
                      <ShareComponent
                        language={this.props.language}
                        filename={this.props.filename}
                        chart={this.chart}
                      />
                    )
                    : null
                  }
              </div>
            )
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

HighChartsPackedbubble.defaultProps = {
  data: { entries: [] },
  exporting: false,
};

HighChartsPackedbubble.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string,
  data: PropTypes.array,
  text: PropTypes.string,
  exporting: PropTypes.bool,
  tooltipText: PropTypes.string,
};
