import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import wordCloudModule from 'highcharts/modules/wordcloud';
import ShareComponent from './SubComponents/ShareComponent';

import classes from '../GraphComponents.scss';

wordCloudModule(Highcharts);


HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);

/**
 * HighChartsWordCloud
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsWordCloud extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.data = this.props.data;
    this.max_nb_word = 50;
    this.state = {
      options: null,
    };
  }

  componentDidMount() {
    const localData = this.data.entries.map(item => ({ name: item.value, weight: item.count, name_normalized: item.value.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace('"', '') }));
    const r = {};
    localData.forEach((o) => {
      if (!(o.name_normalized in ['none', '--', '.'] || o.name_normalized.includes('mot-cle') || (o.name_normalized.length < 4))) {
        r[o.name_normalized] = {
          weight: (r[o.name_normalized] ? r[o.name_normalized].weight + o.weight : o.weight),
          name: (r[o.name_normalized] ? r[o.name_normalized].name : o.name),
        };
      }
    });

    let result = Object.keys(r).map(k => (
      { name: r[k].name, weight: r[k].weight }
    ));
    result = result.sort((a, b) => b.weight - a.weight);

    const wordData = [];
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].name.length <= 25 && wordData.length < this.max_nb_word) {
        wordData.push(result[i]);
      }
    }
    const options = {
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      colors: ['#43ab92', '#f75f00', '#c93838', '#512c62', '#8f4426', '#64ccda', '#5f6769', '#ff78ae', '#00818a', '#0c093c'],
      title: {
        text: '',
      },
      subtitle: {
        text: (this.props.subtitle) ? (this.props.subtitle) : '',
      },
      series: [{
        data: wordData,
        type: 'wordcloud',
        minFontSize: 10,
        rotation: {
          from: 0,
          to: 0,
        },
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

HighChartsWordCloud.defaultProps = {
  data: { entries: [] },
};

HighChartsWordCloud.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  data: PropTypes.object,
  subtitle: PropTypes.string,
};
