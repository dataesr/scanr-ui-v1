import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HcAccessibility from 'highcharts/modules/accessibility';

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


export default class HighChartsPie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: true,
      options: null,
      data: this.props.data,
    };
    this.toggleGraph = this.toggleGraph.bind(this);
  }

  componentWillMount() {
    const displayLabel = (this.state.data.percentage === false) ? '<b>{point.name} : {point.y}</b>' : '<b>{point.name} : {point.percentage:.1f}%</b>';

    const colors = (this.state.data.colors && this.state.data.colors.length > 0) ? this.state.data.colors : ['#FFD138'];

    const mySeries = [];
    for (let i = 0; i < this.state.data.values.length; i += 1) {
      mySeries.push([this.state.data.labels[i], this.state.data.values[i]]);
    }

    this.state.options = {
      chart: {
        marginBottom: 60,
      },
      title: '',
      credits: false,
      legend: {
        enabled: false,
      },
      tooltip: false,
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            format: displayLabel,
            style: {
              color: '#003259',
              fontSize: '25px',
            },
          },
          showInLegend: true,
          startAngle: 270,
          endAngle: 90,
          size: '80%',
        },
      },
      colors,
      series: [{
        type: 'pie',
        innerSize: '50%',
        borderWidth: 10,
        data: mySeries,
      }],
    };
  }

  createTable = () => {
    const table = [];
    for (let i = 0; i < this.state.data.values.length; i += 1) {
      table.push(
        <tr>
          <td>{this.state.data.labels[i]}</td>
          <td>{this.state.data.values[i]}</td>
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
    const txt = 'Afficher / masquer le tableau de données';

    return (
      <div style={{ textAlign: 'center' }}>
        { this.state.showGraph ? <HighchartsReact highcharts={Highcharts} options={this.state.options} /> : (
          <table style={{ margin: '0px auto' }}>
            <tr>
              <th>Catégorie</th>
              <th>Valeurs</th>
            </tr>
            {this.createTable()}
          </table>
        )}
        <button type="button" onClick={this.toggleGraph}>{txt}</button>
      </div>
    );
  }
}

HighChartsPie.propTypes = {
  data: PropTypes.object.isRequired,
};
