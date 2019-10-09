import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HcAccessibility from 'highcharts/modules/accessibility';
import { IntlProvider, FormattedMessage } from 'react-intl';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './TeamPie.scss';

/**
 * TeamPie component <br/>
 * Url : . <br/>
 * Description : Affiche un donut en fonction de data (colors, labels, values, percentage) <br/>
 * Ex:            "data" : { <br />
               "percentage" : false, <br />
               "values" : [52, 48], <br />
               "labels" : ["Chercheurs", "Enseignants-chercheurs"], <br />
               "colors" : ["#fe7747", "#96462a"] <br />
             } <br />
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>
 */

HcAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);


export default class HighChartsPie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: true,
    };
    this.toggleGraph = this.toggleGraph.bind(this);
  }

  createTable = () => {
    const table = [];
    for (let i = 0; i < this.props.data.values.length; i += 1) {
      table.push(
        <tr>
          <td>{this.props.data.labels[i]}</td>
          <td>{this.props.data.values[i]}</td>
        </tr>,
      );
    }
    return table;
  }

  toggleGraph() {
    this.setState(state => ({
      showGraph: !state.showGraph,
    }));
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    if (this.props.data.value && this.props.data.value[0] === 0 && this.props.data.value[1] === 0) {
      return null;
    }

    const displayLabel = (this.props.data.percentage === false) ? '<b>{point.y}<br />{point.name}</b>' : '<b>{point.name}<br />{point.percentage:.1f}%</b>';

    const colors = (this.props.data.colors && this.props.data.colors.length > 0) ? this.props.data.colors : ['#FFD138'];
    const bgColor = this.props.bgColor || 'white';
    const borderSize = this.props.borderSize || 5;
    const data = [];
    for (let i = 0; i < this.props.data.values.length; i += 1) {
      data.push([this.props.data.labels[i], this.props.data.values[i]]);
    }

    const options = {
      chart: {
        marginBottom: 16,
        height: 212,
        backgroundColor: bgColor,
      },
      title: 'Répartition par genre',
      credits: false,
      legend: {
        enabled: false,
      },
      tooltip: true,
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            format: displayLabel,
            style: {
              color: '#003259',
              fontSize: '18px',
            },
            distance: 0,
          },
          showInLegend: true,
          startAngle: 270,
          endAngle: 90,
          size: '70%',
        },
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: false,
          },
        },
      },
      colors,
      series: [{
        type: 'pie',
        innerSize: '40%',
        borderWidth: borderSize,
        data,
      }],
    };

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div className={classes.TeamPie}>
          { this.state.showGraph ? <HighchartsReact highcharts={Highcharts} options={options} /> : (
            <table className="table">
              <tr>
                <th><FormattedMessage id="TeamPie.string.table.category" /></th>
                <th><FormattedMessage id="TeamPie.string.table.values" /></th>
              </tr>
              {this.createTable()}
            </table>
          )}
          <button
            className={`btn ${classes.btn_scanrGrey}`}
            type="button"
            onClick={this.toggleGraph}
          >
            {
              (this.state.showGraph) ? <FormattedMessage id="TeamPie.string.button.graph" /> : <FormattedMessage id="TeamPie.string.button.dataTable" />
            }
          </button>
        </div>
      </IntlProvider>
    );
  }
}

HighChartsPie.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  borderSize: PropTypes.number,
  bgColor: PropTypes.string,
};
