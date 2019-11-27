import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';
import classes from './GraphCard.scss';
import HighChartsTreemap from '../../Shared/GraphComponents/Graphs/HighChartsTreemap';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

export default class GenderTreemap extends Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    /* eslint-disable-next-line */
    const opendata = require('../../Focus/Data/'.concat(`${this.props.opendata}`));
    const data = [{
      id: 'F',
      name: 'Femmes',
      color: '#f75f00',
    }, {
      id: 'H',
      name: 'Hommes',
      color: '#43ab92',
    }];
    const typeNomination = { H: {}, F: {} };
    opendata.records.forEach((e) => {
      const nomination = e.fields.type_nomination;
      const gender = e.fields.sexe.substring(0, 1).toUpperCase();
      if (typeNomination[gender][nomination] === undefined) {
        typeNomination[gender][nomination] = { count: 0 };
      }
      typeNomination[gender][nomination].count += 1;
    });
    Object.keys(typeNomination).forEach((g) => {
      Object.keys(typeNomination[g]).forEach((nomin) => {
        const subCount = typeNomination[g][nomin].count;
        data.push({ name: nomin, value: subCount, parent: g });
      });
    });
    this.setState({ data, isLoading: false });
  }


  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        title={this.props.title}
        subtitle={this.props.subtitle}
      />
      {
        (this.state.data !== [] && !this.state.isLoading)
          ? (
            <HighChartsTreemap
              filename="Mot-clé des publications"
              data={this.state.data}
              language={this.props.language}
            />
          )
          : (<GraphSpinner />)
      }
    </div>
  );
}

GenderTreemap.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
