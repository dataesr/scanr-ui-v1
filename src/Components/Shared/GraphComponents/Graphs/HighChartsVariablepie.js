import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import HCmore from 'highcharts/highcharts-more.src';
import HCVariablePie from 'highcharts/modules/variable-pie';
import ShareComponent from './SubComponents/ShareComponent';

import classes from '../GraphComponents.scss';

HCmore(Highcharts);


HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);
HCVariablePie(Highcharts);

/**
 * HighChartsPackedbubble
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsVariablepie extends Component {
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
    if (prevProps.text !== this.props.text
      || prevProps.tooltipText !== this.props.tooltipText
      || prevProps.data !== this.props.data) {
      this.loadData();
    }
  }

  loadData = () => {
    const options = {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'variablepie',
      },
      tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value} '.concat(this.tooltipText),
      },
      title: {
        text: (this.props.text) ? (this.props.text) : '',
      },
      subtitle: {
        text: (this.props.subtitle) ? (this.props.subtitle) : '',
      },
      series: [{
        minPointSize: 1,
        innerSize: '50%',
        zMin: 0,
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

HighChartsVariablepie.defaultProps = {
  data: { entries: [] },
  exporting: false,
};

HighChartsVariablepie.propTypes = {
  language: PropTypes.string,
  filename: PropTypes.string,
  data: PropTypes.array,
  text: PropTypes.string,
  exporting: PropTypes.bool,
  tooltipText: PropTypes.string,
  subtitle: PropTypes.string,
};
