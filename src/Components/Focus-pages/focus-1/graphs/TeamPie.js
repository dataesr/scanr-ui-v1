import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

export default class HighChartsPie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: null,
      data: this.props.data,
    };
  }

  componentWillMount() {
    let displayLabel = [];


    if (this.state.data.percentage === true) {
      displayLabel = '<b>{point.name} : {point.percentage:.1f}%</b>';
    } else {
      displayLabel = '<b>{point.name} : {point.y}</b>';
    }

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
      colors: this.state.data.colors,
      series: [{
        type: 'pie',
        innerSize: '50%',
        borderWidth: 10,
        data: mySeries,
      }],
    };
  }

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.options}
        />
      </div>
    );
  }
}

HighChartsPie.propTypes = {
  data: PropTypes.object.isRequired,
};
