import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import HighChartsBar from './Graphs/HighChartsBar';

const params = require('./GraphCurie-data/indicateurs.json');
const countryList = require('./GraphCurie-data/iso3.json');

const url = 'http://10.243.98.74/datastore/curie';

class GraphCurie extends Component {
  constructor(props) {
    super(props);
    this.country = null;
    this.state = {
      isMissing: true,
      data: null,
    };
    this.getGraphValues = this.getGraphValues.bind(this);
  }

  componentDidMount() {
    let i;

    this.country = this.props.countryCode;
    for (i = 0; i < countryList.length; i += 1) {
      if (countryList[i]['alpha-3'] === this.country) {
        this.setState({ isMissing: false });
        break;
      }
    }
    if (i === 249) {
      this.setState({ isMissing: true });
    }
    this.getGraphValues(this.props.graphType, 0);
  }

  getGraphValues(label, index) {
    if (params[label] == null) {
      this.setState({ isMissing: true });
      return;
    }
    this.setState({ data: null });
    // alert(params[label][0].unit[index].label);
    axios.get(url, {
      params: {
        where: `{"country_code":"${this.country}","code":"${params[label][0].unit[index].code}"}`,
      },
    })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div>
        { this.country === null ? <div>Initializing</div>
          : [this.state.isMissing ? <div>Ce graph est indisponible pour le moment.</div>
            : (
              <div>
                {'Welcome to my world ! I can see that you are from '}
                { this.country }
                {this.state.data ? <HighChartsBar data={this.state.data} /> : null
              }
                <button type="button" onClick={() => this.getGraphValues(this.props.graphType, 0)}>Monnaies locales</button>
                <button type="button" onClick={() => this.getGraphValues(this.props.graphType, 1)}>$PPA</button>
              </div>
            ),
          ]
        }
      </div>
    );
  }
}

export default GraphCurie;

GraphCurie.propTypes = {
  countryCode: PropTypes.string.isRequired,
  graphType: PropTypes.string.isRequired,
  // language: PropTypes.string.isRequired,
  // switchLanguage: PropTypes.func.isRequired,
};
